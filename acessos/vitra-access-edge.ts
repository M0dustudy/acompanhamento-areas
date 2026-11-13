/**
 * VITRA - autenticação e gestão de acessos. Supabase Edge Function.
 * Requer projeto Supabase EXCLUSIVO do VITRA + esquema vitra-auth-schema.sql.
 * Não aceitar operações administrativas sem JWT verificado + role=master no banco.
 * Nunca expor secret key ou dados de senha ao browser.
 * Publicação: verify_jwt=false, pois login/bootstrap autenticam dentro da função;
 * demais ações verificam JWT no servidor com auth.getUser().
 */
import { createClient } from "npm:@supabase/supabase-js@2.119.0";

const URL = Deno.env.get("SUPABASE_URL") || "";
const secrets = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}");
const pubs = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") || "{}");
const SECRET = secrets.default || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const PUB = pubs.default || Deno.env.get("SUPABASE_ANON_KEY") || "";
const ORIGIN = Deno.env.get("VITRA_ALLOWED_ORIGIN") || "https://m0dustudy.github.io";
if (!URL || !SECRET || !PUB) throw new Error("VITRA: secrets Supabase indisponíveis");
const options = { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } };
const db = createClient(URL, SECRET, options);
const newAuthClient = () => createClient(URL, PUB, options);
const USER = "vitra_access_users", EVENT = "vitra_access_events";
const userField = "id, username, display_name, role, enabled, last_login_at, created_at";
const CORS = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "content-type, apikey, authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8"
};
function respond(body, status = 200) { return new Response(JSON.stringify(body), { status, headers: CORS }); }
function fail(message = "Não foi possível concluir esta operação.", status = 400) { return respond({ ok:false, message }, status); }
const badCredentials = () => fail("Usuário ou senha inválidos.", 401);
const userName = (value) => String(value ?? "").trim().toLowerCase();
const validName = (v) => /^[a-z0-9._-]{3,32}$/.test(v);
const validPassword = (value) => typeof value === "string" && value.length >= 10 && value.length <= 128;
const validDisplayName = (name) => typeof name === "string" && name.trim().length >= 2 && name.trim().length <= 80;
const validId = (v) => typeof v === "string" &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
async function digest(v) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v));
  return [...new Uint8Array(bytes)].map(x => x.toString(16).padStart(2, "0")).join("");
}
function constantTimeEqual(a,b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let n = 0; for (let i = 0; i < a.length; i++) n |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return n === 0;
}
async function logEvent({ id, username }, event, actor = null) {
  const { error } = await db.from(EVENT).insert({
    user_id: id || null, username, event, actor_id: actor, occurred_at: new Date().toISOString()
  });
  if (error) console.error("VITRA access audit log failed:", error.code);
}
async function sessionUser(req) {
  const bearer = req.headers.get("authorization") || "";
  const token = /^Bearer (.+)$/i.exec(bearer)?.[1];
  if (!token) return null;
  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user) return null;
  const { data: profile } = await db.from(USER).select(userField).eq("id", data.user.id).maybeSingle();
  return profile?.enabled ? profile : null;
}
async function throttle(req, username) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") || "unknown";
  const fingerprint = await digest(username + "|" + forwarded + "|" + SECRET.slice(-24));
  const from = new Date(Date.now() - 15 * 60_000).toISOString();
  const { count, error } = await db.from("vitra_login_attempts")
    .select("*", { count: "exact", head: true })
    .eq("fingerprint", fingerprint).gte("attempted_at", from);
  if (error) throw new Error("Limitador de tentativas indisponível");
  if ((count || 0) >= 12) return false;
  const inserted = await db.from("vitra_login_attempts").insert({ fingerprint });
  if (inserted.error) throw new Error("Não foi possível verificar o limite de tentativas");
  return true;
}
async function createAccount(username, displayName, password, role = "member") {
  const email = "user-" + crypto.randomUUID() + "@accounts.vitra.example.com";
  const created = await db.auth.admin.createUser({ email, password, email_confirm:true });
  if (created.error || !created.data?.user?.id)
    throw new Error("Não foi possível criar a credencial no serviço de autenticação.");
  const id = created.data.user.id;
  const saved = await db.from(USER).insert({
    id, username, display_name:displayName.trim(), auth_email:email, role, enabled:true
  }).select(userField).single();
  if (saved.error) {
    await db.auth.admin.deleteUser(id);
    if (saved.error.code === "23505") throw new Error("Esse nome de usuário já está cadastrado.");
    throw new Error("Falha na criação da conta; nenhuma credencial parcial foi mantida.");
  }
  return saved.data;
}
async function handle(req, payload) {
  const action = String(payload?.action || "");
  if (action === "bootstrap") {
    // Inicialização de uso único. Código inicial não está no repositório.
    const setup = await db.from("vitra_auth_setup").select("secret_hash,used_at")
      .eq("id", true).maybeSingle();
    if (setup.error || !setup.data || setup.data.used_at) return fail("Configuração inicial indisponível.", 403);
    const code = String(payload.code || "");
    if (code.length < 32 || code.length > 200 ||
        !constantTimeEqual(await digest(code), setup.data.secret_hash)) return fail("Código de ativação inválido.", 403);
    const username = userName(payload.username);
    if (!validName(username) || !validDisplayName(payload.display_name) || !validPassword(payload.password))
      return fail("Informe nome, usuário válido e senha com pelo menos 10 caracteres.");
    const masters = await db.from(USER).select("id", { count:"exact", head:true }).eq("role","master");
    if (masters.error || (masters.count || 0) !== 0) return fail("Administrador já configurado.", 403);
    const created = await createAccount(username, payload.display_name, payload.password, "master");
    const marked = await db.from("vitra_auth_setup").update({ used_at:new Date().toISOString() })
      .eq("id",true).is("used_at",null);
    if (marked.error) throw new Error("O cadastro inicial foi criado, mas precisa ser revisado pelo responsável técnico.");
    return respond({ ok:true, message:"Administrador mestre configurado. Faça login." });
  }
  if (action === "login") {
    const username = userName(payload.username);
    if (!validName(username) || typeof payload.password !== "string" || payload.password.length > 128)
      return badCredentials();
    if (!await throttle(req, username)) return fail("Muitas tentativas. Tente novamente mais tarde.", 429);
    const { data, error } = await db.from(USER)
      .select(userField + ",auth_email").eq("username",username).maybeSingle();
    if (error || !data || !data.enabled) return badCredentials();
    const loginClient = newAuthClient();
    const { data: signed, error: denied } = await loginClient.auth.signInWithPassword({
      email:data.auth_email, password:payload.password
    });
    if (denied || !signed?.session || signed.user.id !== data.id) return badCredentials();
    const at = new Date().toISOString();
    await db.from(USER).update({ last_login_at:at }).eq("id",data.id);
    await logEvent(data, "login");
    const { auth_email: _hidden, ...profile } = data;
    return respond({ok:true,profile:{...profile,last_login_at:at},
      session:{ access_token:signed.session.access_token,refresh_token:signed.session.refresh_token,
        expires_at:signed.session.expires_at }});
  }
  if (action === "recovery_reset") {
    const username = userName(payload.username);
    const code = typeof payload.code === "string" ? payload.code.replace(/[\s-]/g, "").toLowerCase() : "";
    if (!validName(username) || !/^[a-f0-9]{64}$/.test(code) || !validPassword(payload.password))
      return fail("Usuário, código de recuperação ou nova senha inválidos.", 400);
    if (!await throttle(req, "recover:" + username))
      return fail("Muitas tentativas. Tente novamente mais tarde.", 429);
    const { data: user, error: findError } = await db.from(USER)
      .select("id,username,role,enabled").eq("username", username).maybeSingle();
    if (findError || !user || user.role !== "master" || user.enabled !== true)
      return fail("Código de recuperação inválido ou já utilizado.", 401);
    const { data: recovery, error: recoveryError } = await db.from("vitra_recovery_codes")
      .select("code_hash,used_at").eq("user_id",user.id).maybeSingle();
    if (recoveryError || !recovery || recovery.used_at ||
        !constantTimeEqual(await digest(code), recovery.code_hash))
      return fail("Código de recuperação inválido ou já utilizado.", 401);
    const usedAt = new Date().toISOString();
    const consumed = await db.from("vitra_recovery_codes").update({ used_at:usedAt })
      .eq("user_id",user.id).eq("code_hash",recovery.code_hash).is("used_at",null)
      .select("user_id").maybeSingle();
    if (consumed.error || !consumed.data)
      return fail("Código de recuperação inválido ou já utilizado.", 401);
    const reset = await db.auth.admin.updateUserById(user.id,{ password:payload.password });
    if (reset.error) {
      await db.from("vitra_recovery_codes").update({used_at:null})
        .eq("user_id",user.id).eq("code_hash",recovery.code_hash).eq("used_at",usedAt);
      throw new Error("Falha ao redefinir senha; tente novamente.");
    }
    await logEvent(user, "recovery_password_reset", user.id);
    return respond({ok:true,message:"Senha redefinida com sucesso. Entre com sua nova senha."});
  }
  const caller = await sessionUser(req);
  if (!caller) return fail("Sessão inválida ou acesso bloqueado.", 401);
  if (action === "me") return respond({ok:true,profile:caller});
  if (action === "logout") {
    await logEvent(caller, "logout", caller.id);
    return respond({ok:true});
  }
  if (caller.role !== "master") return fail("Somente o administrador mestre pode gerenciar acessos.", 403);
  if (action === "recovery_generate") {
    const currentPassword = payload.current_password;
    if (typeof currentPassword !== "string" || currentPassword.length > 128 || currentPassword.length === 0)
      return fail("Informe sua senha atual para gerar o código de recuperação.");
    const {data: own,error:ownError} = await db.from(USER)
      .select("auth_email").eq("id",caller.id).single();
    if (ownError || !own) return fail("Conta mestre não encontrada.",404);
    const verified = await newAuthClient().auth.signInWithPassword({
      email:own.auth_email,password:currentPassword
    });
    if (verified.error || verified.data.user?.id !== caller.id)
      return fail("Senha atual incorreta.",403);
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const plain = [...bytes].map(x=>x.toString(16).padStart(2,"0")).join("");
    const grouped = plain.toUpperCase().match(/.{1,8}/g).join("-");
    const {error} = await db.from("vitra_recovery_codes").upsert({
      user_id:caller.id, code_hash:await digest(plain),used_at:null,created_at:new Date().toISOString()
    },{onConflict:"user_id"});
    if (error) throw new Error("Não foi possível gerar o código de emergência.");
    await logEvent(caller,"recovery_code_created",caller.id);
    return respond({ok:true,code:grouped,message:"Guarde o código em local seguro. Ele é exibido apenas uma vez."});
  }
  if (action === "self") {
    const username = userName(payload.username);
    const displayName = String(payload.display_name ?? "").trim();
    const currentPassword = payload.current_password;
    const newPassword = payload.new_password;
    if (!validName(username) || !validDisplayName(displayName) ||
        typeof currentPassword !== "string" || currentPassword.length > 128 ||
        (newPassword && !validPassword(newPassword)))
      return fail("Dados da conta ou senha inválidos.");
    const { data: own } = await db.from(USER).select("auth_email,username,display_name")
      .eq("id",caller.id).single();
    if (!own) return fail("Conta mestre não encontrada.",404);
    const confirmed = await newAuthClient().auth.signInWithPassword({
      email:own.auth_email, password:currentPassword
    });
    if (confirmed.error || confirmed.data.user?.id !== caller.id)
      return fail("Senha atual incorreta.",403);
    const profileChange = username !== own.username || displayName !== own.display_name;
    if (profileChange) {
      const renamed = await db.from(USER).update({ username,display_name:displayName })
        .eq("id",caller.id);
      if (renamed.error) return fail(renamed.error.code==="23505" ?
        "Nome de usuário já cadastrado.":"Não foi possível alterar sua conta.");
    }
    if (newPassword) {
      const changed = await db.auth.admin.updateUserById(caller.id,{password:newPassword});
      if (changed.error) {
        if (profileChange) await db.from(USER).update({username:own.username,
          display_name:own.display_name}).eq("id",caller.id);
        throw new Error("Não foi possível alterar a senha mestre.");
      }
      await logEvent({id:caller.id,username},"reset_password",caller.id);
    }
    if (profileChange) await logEvent({id:caller.id,username},"update_user",caller.id);
    return respond({ok:true,requires_relogin:Boolean(newPassword)});
  }
  if (action === "list") {
    const { data, error } = await db.from(USER).select(userField).order("created_at", { ascending:true });
    if (error) throw new Error("Não foi possível listar os usuários.");
    return respond({ok:true, users:data});
  }
  if (action === "logs") {
    const { data, error } = await db.from(EVENT).select("username,event,occurred_at")
      .order("occurred_at", { ascending:false }).limit(100);
    if (error) throw new Error("Não foi possível consultar o histórico.");
    return respond({ok:true, logs:data});
  }
  if (action === "create") {
    const username = userName(payload.username);
    if (!validName(username)) return fail("Usuário: use 3 a 32 letras, números, pontos, traços ou sublinhados.");
    if (!validPassword(payload.password)) return fail("A senha precisa ter de 10 a 128 caracteres.");
    if (!validDisplayName(payload.display_name)) return fail("Informe o nome completo da pessoa.");
    const existing = await db.from(USER).select("id").eq("username",username).maybeSingle();
    if (existing.data) return fail("Esse nome de usuário já está cadastrado.", 409);
    const created = await createAccount(username, payload.display_name, payload.password);
    await logEvent(created, "create_user", caller.id);
    return respond({ok:true,user:created},201);
  }
  if (!validId(payload.id) || payload.id === caller.id) return fail("Essa conta não pode ser alterada por esta opção.",403);
  const found = await db.from(USER).select(userField).eq("id",payload.id).maybeSingle();
  if (found.error || !found.data) return fail("Usuário não encontrado.",404);
  const target = found.data;
  if (target.role === "master") return fail("A conta mestre não pode ser removida ou bloqueada.",403);
  if (action === "update") {
    const username = userName(payload.username);
    if (!validName(username) || !validDisplayName(payload.display_name)) return fail("Nome ou usuário inválido.");
    const { error } = await db.from(USER).update({
      username,display_name:String(payload.display_name).trim()
    }).eq("id",target.id);
    if (error) return fail(error.code==="23505" ? "Nome de usuário já utilizado." : "Não foi possível salvar a alteração.");
    await logEvent({id:target.id,username}, "update_user",caller.id);
    return respond({ok:true});
  }
  if (action === "password") {
    if (!validPassword(payload.password)) return fail("A senha precisa ter de 10 a 128 caracteres.");
    const result = await db.auth.admin.updateUserById(target.id, {password:payload.password});
    if (result.error) throw new Error("A senha não pôde ser alterada.");
    await logEvent(target,"reset_password",caller.id);
    return respond({ok:true});
  }
  if (action === "toggle") {
    if (typeof payload.enabled !== "boolean") return fail("Situação inválida.");
    if (target.enabled !== payload.enabled) {
      const ban = await db.auth.admin.updateUserById(target.id, {
        ban_duration:payload.enabled ? "0h" : "876000h"
      });
      if (ban.error) throw new Error("Não foi possível atualizar o bloqueio no serviço de autenticação.");
      const { error } = await db.from(USER).update({enabled:payload.enabled}).eq("id",target.id);
      if (error) {
        await db.auth.admin.updateUserById(target.id, {ban_duration:target.enabled ? "0h":"876000h"});
        throw new Error("Não foi possível atualizar o acesso.");
      }
      await logEvent(target,payload.enabled ? "unblock_user":"block_user",caller.id);
    }
    return respond({ok:true});
  }
  if (action === "remove") {
    const result = await db.auth.admin.deleteUser(target.id);
    if (result.error) throw new Error("Não foi possível excluir o acesso. Nenhuma avaliação foi afetada.");
    await logEvent(target,"delete_user",caller.id);
    return respond({ok:true});
  }
  return fail("Operação não reconhecida.", 404);
}
Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response(null, {status:204, headers:CORS});
  if (req.method !== "POST") return fail("Método não permitido.",405);
  const origin = req.headers.get("origin");
  if (origin && origin !== ORIGIN) return fail("Origem não autorizada.",403);
  try {
    const payload = await req.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload))
      return fail("Requisição inválida.");
    return await handle(req,payload);
  } catch (err) {
    console.error("VITRA access operation error:", String(err?.message || err));
    return fail("Não foi possível concluir a operação. Tente novamente.",500);
  }
});