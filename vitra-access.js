/* VITRA | Autenticação por usuário, controle administrativo e histórico de acessos.
   Nenhuma senha, hash secreto ou chave privilegiada é enviada ao navegador.
   O servidor deve validar TODAS as ações de administrador. */
(() => {
  "use strict";
  const settings = window.VITRA_ACCESS_CONFIG || {};
  const READY = /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(settings.url || "") &&
    /^sb_publishable_[A-Za-z0-9_-]+$|^eyJ[A-Za-z0-9._-]+$/.test(settings.publishableKey || "");
  const KEY = "vitra_access_session_v1";
  const ENDPOINT = READY ? settings.url + "/functions/v1/vitra-access" : "";
  const root = document.createElement("div");
  root.id = "vitra-access-root";
  document.body.appendChild(root);
  let session = null, me = null, userRows = [], logRows = [], working = false, checkInProgress = false;
  const q = (selector, base = document) => base.querySelector(selector);
  const safe = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, s =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[s]));
  const stamp = (value) => value ? new Date(value).toLocaleString("pt-BR", {
    dateStyle: "short", timeStyle: "short", timeZone: "America/Bahia"
  }) : "—";
  const credentials = () => {
    try { return JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch { return null; }
  };
  const remember = () => { if (session) sessionStorage.setItem(KEY, JSON.stringify(session)); else sessionStorage.removeItem(KEY); };
  const errorMessage = (e) => e && e.message || "Não foi possível concluir a operação.";
  const configError = "A autenticação está em preparação. O VITRA oficial permanece disponível sem alterações.";
  function loginPage(message = "", busy = false) {
    document.documentElement.classList.add("va-locked");
    root.innerHTML = '<div class="va-gate" role="main" aria-label="Acesso ao VITRA">' +
      '<div class="va-scene"><div class="va-brand"><div class="va-monogram">V</div>' +
      '<div class="va-wordmark"><strong>VITRA</strong><span>Inteligência e Rastreabilidade da Uva</span></div></div>' +
      '<div class="va-scene-copy"><span class="va-kicker">Controle de qualidade</span>' +
      '<h1>Rastreabilidade que inspira confiança.</h1>' +
      '<p>Informações de campo, recepção e câmara fria reunidas em um único ambiente de trabalho.</p></div>' +
      '<div class="va-scene-foot">VITRA · Acesso individual aos módulos de qualidade</div></div>' +
      '<div class="va-side"><div class="va-login"><span class="va-badge">◇ Acesso autorizado</span>' +
      '<h2>Bem-vindo ao VITRA</h2><p>Entre com o usuário e a senha fornecidos pelo administrador.</p>' +
      '<form id="va-login-form" autocomplete="on">' +
      '<label class="va-field" for="va-user">Usuário</label><div class="va-input-wrap">' +
      '<input class="va-input" id="va-user" name="username" maxlength="32" required autocomplete="username" spellcheck="false" placeholder="Seu usuário"></div>' +
      '<label class="va-field" for="va-password">Senha</label><div class="va-input-wrap">' +
      '<input class="va-input" type="password" id="va-password" name="password" required autocomplete="current-password" placeholder="Sua senha">' +
      '<button class="va-reveal" type="button" id="va-show-pass" aria-label="Mostrar ou ocultar senha">Mostrar</button></div>' +
      (message ? '<div class="va-error" role="alert">' + safe(message) + '</div>' : '') +
      '<button type="submit" class="va-login-submit" id="va-submit"' + (!READY || busy ? ' disabled' : '') + '>' +
      (busy ? "Verificando acesso…" : "Entrar no VITRA →") + '</button>' +
      '</form><div class="va-login-footer">♢ Suas credenciais são pessoais. Não compartilhe seu acesso.</div></div></div></div>';
    q("#va-show-pass").addEventListener("click", () => {
      const field = q("#va-password");
      field.type = field.type === "password" ? "text" : "password";
      q("#va-show-pass").textContent = field.type === "password" ? "Mostrar" : "Ocultar";
    });
    q("#va-login-form").addEventListener("submit", submitLogin);
    if (!busy) q("#va-user").focus();
  }
  async function call(action, payload = {}, needAuth = true) {
    if (!READY) throw new Error(configError);
    if (needAuth) await freshSession();
    const headers = { "Content-Type": "application/json", "apikey": settings.publishableKey };
    if (needAuth && session?.access_token) headers.Authorization = "Bearer " + session.access_token;
    const response = await fetch(ENDPOINT, { method: "POST", headers,
      body: JSON.stringify({ action, ...payload }), cache: "no-store" });
    let result;
    try { result = await response.json(); } catch { throw new Error("Resposta inválida do serviço de autenticação."); }
    if (!response.ok || result?.ok === false) throw new Error(result?.message || "Acesso não autorizado.");
    return result;
  }
  async function freshSession() {
    if (!session?.access_token || !session?.refresh_token) throw new Error("Faça login novamente.");
    const expiry = session.expires_at || 0;
    if (expiry && Date.now() / 1000 < expiry - 90) return;
    const response = await fetch(settings.url + "/auth/v1/token?grant_type=refresh_token", {
      method: "POST", headers: { "Content-Type": "application/json", "apikey": settings.publishableKey },
      body: JSON.stringify({ refresh_token: session.refresh_token }), cache: "no-store"
    });
    const newTokens = await response.json();
    if (!response.ok || !newTokens.access_token) throw new Error("Sua sessão expirou. Entre novamente.");
    session = { access_token: newTokens.access_token, refresh_token: newTokens.refresh_token,
      expires_at: newTokens.expires_at || Math.floor(Date.now() / 1000) + newTokens.expires_in };
    remember();
  }
  async function submitLogin(ev) {
    ev.preventDefault();
    if (working || !READY) return;
    working = true;
    const username = q("#va-user").value.trim().toLowerCase();
    const password = q("#va-password").value;
    q("#va-submit").disabled = true;
    q("#va-submit").textContent = "Verificando acesso…";
    try {
      const data = await call("login", { username, password }, false);
      if (!data.session?.access_token || !data.profile?.username) throw new Error("Sessão inválida.");
      session = data.session;
      remember();
      me = data.profile;
      unlock();
    } catch (e) {
      const msg = /fetch/i.test(errorMessage(e)) ? "Não foi possível conectar ao serviço. Tente novamente." : errorMessage(e);
      loginPage(msg);
      q("#va-user").value = username;
    } finally { working = false; }
  }
  function removeManagement() {
    q("#cards .va-admin-nav")?.remove();
    q("#va-management-modal")?.remove();
  }
  function unlock() {
    root.innerHTML = "";
    document.documentElement.classList.remove("va-locked");
    removeManagement();
    const chip = document.createElement("div");
    chip.className = "va-session";
    chip.innerHTML = "<span title=\"Sessão individual\">" + safe(me?.display_name || me?.username || "Usuário") +
      "</span><button type=\"button\" id=\"va-signout\">Sair</button>";
    root.appendChild(chip);
    q("#va-signout").addEventListener("click", logout);
    if (me?.role === "master") {
      const nav = document.createElement("div");
      nav.className = "card va-admin-nav";
      nav.dataset.main = "access";
      nav.innerHTML = "<b>♢ GESTÃO DE ACESSOS</b>";
      nav.setAttribute("role", "button");
      nav.tabIndex = 0;
      nav.addEventListener("click", openManagement);
      nav.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openManagement(); }});
      q("#cards")?.appendChild(nav);
    }
  }
  async function logout() {
    try { if (session?.access_token) await call("logout", {}, true); } catch { /* Saída local sempre prevalece */ }
    session = null;
    me = null;
    remember();
    root.innerHTML = "";
    removeManagement();
    if (typeof window.showHome === "function") window.showHome();
    loginPage();
  }
  async function checkSession() {
    if (!session || checkInProgress || !READY) return;
    checkInProgress = true;
    try {
      const info = await call("me");
      if (!info.profile?.username || info.profile.enabled !== true) throw new Error("Acesso revogado.");
      if (!me || info.profile.role !== me.role || info.profile.username !== me.username) {
        me = info.profile;
        unlock();
      }
    } catch (err) {
      session = null; me = null; remember(); root.innerHTML = ""; removeManagement(); loginPage("Sessão encerrada. Entre novamente.");
    } finally { checkInProgress = false; }
  }
  function notify(message, isError = false) {
    const div = q("#va-notice");
    if (!div) return;
    div.className = isError ? "va-error" : "va-toast";
    div.textContent = message;
    div.hidden = false;
  }
  async function openManagement() {
    if (me?.role !== "master") return;
    if (typeof window.markMain === "function") window.markMain("access");
    try { userRows = (await call("list")).users || []; logRows = (await call("logs")).logs || []; }
    catch (e) { notify(errorMessage(e), true); return; }
    renderManagement();
  }
  function renderManagement() {
    if (me?.role !== "master") return;
    const active = userRows.filter(x => x.enabled).length;
    const recent = logRows.filter(x => x.event === "login").length;
    const rows = userRows.map(u => '<tr><td><strong>' + safe(u.display_name || u.username) + '</strong><div class="va-subtle">@' +
      safe(u.username) + '</div></td><td>' + (u.role === "master" ? '<span class="va-pill">Administrador mestre</span>' :
      (u.enabled ? '<span class="va-status-on">Ativo</span>' : '<span class="va-status-off">Bloqueado</span>')) +
      '</td><td>' + safe(stamp(u.last_login_at)) + '</td><td>' +
      (u.role === "master" ? '<span class="va-subtle">Conta principal</span>' :
      '<button type="button" class="va-action" data-va-action="edit" data-id="' + safe(u.id) + '">Editar</button>' +
      '<button type="button" class="va-action" data-va-action="password" data-id="' + safe(u.id) + '">Senha</button>' +
      '<button type="button" class="va-action" data-va-action="toggle" data-id="' + safe(u.id) + '">' + (u.enabled ? "Bloquear" : "Ativar") + '</button>' +
      '<button type="button" class="va-action va-action-danger" data-va-action="remove" data-id="' + safe(u.id) + '">Excluir</button>') +
      '</td></tr>').join("");
    const logs = logRows.map(x => '<tr><td>' + safe(stamp(x.occurred_at)) +
      '</td><td><strong>' + safe(x.username) + '</strong></td><td>' +
      safe(({login:"Entrou no VITRA",logout:"Saiu",create_user:"Usuário criado",
        update_user:"Acesso alterado",reset_password:"Senha redefinida",
        block_user:"Acesso bloqueado",unblock_user:"Acesso reativado",delete_user:"Acesso excluído"}[x.event] || x.event) +
      '</td></tr>').join("");
    q("#panel").innerHTML = '<section class="va-management">' +
      '<header class="va-heading"><div><span class="va-tag">ADMINISTRAÇÃO · VITRA</span><h2>Gestão de Acessos</h2>' +
      '<p>Contas individuais, permissões e histórico de entradas.</p></div><span class="va-pill">Exclusivo do administrador mestre</span></header>' +
      '<div class="va-stats"><div class="va-stat"><small>Contas cadastradas</small><strong>' + userRows.length + '</strong></div>' +
      '<div class="va-stat"><small>Acessos ativos</small><strong>' + active + '</strong></div>' +
      '<div class="va-stat"><small>Entradas recentes*</small><strong>' + recent + '</strong></div></div>' +
      '<p class="va-subtle">* Eventos exibidos no histórico disponível, não usuários conectados neste instante.</p>' +
      '<div id="va-notice" hidden></div><section class="va-panel"><div class="va-panel-head"><h3>Cadastrar colaborador</h3><span class="va-subtle">Usuário e senha exclusivos</span></div>' +
      '<form class="va-admin-form" id="va-create-form">' +
      '<label>Nome da pessoa<input name="display_name" maxlength="80" required placeholder="Nome para identificação"></label>' +
      '<label>Nome de usuário<input name="username" minlength="3" maxlength="32" required pattern="[A-Za-z0-9._-]+" autocomplete="off" placeholder="ex.: equipe.cq"></label>' +
      '<label class="va-full">Senha inicial<input name="password" minlength="10" maxlength="128" type="password" required autocomplete="new-password" placeholder="Ao menos 10 caracteres"></label>' +
      '<div class="va-full"><button class="va-primary" type="submit">Criar acesso individual</button></div></form>' +
      '<p class="va-subtle">As senhas não são exibidas depois de cadastradas. Você poderá redefini-las quando necessário.</p></section>' +
      '<section class="va-panel"><div class="va-panel-head"><h3>Usuários autorizados</h3><span class="va-subtle">Somente sua conta pode administrar</span></div>' +
      '<div class="va-table-wrap"><table class="va-table"><thead><tr><th>Pessoa / usuário</th><th>Situação</th><th>Última entrada</th><th>Gerenciar</th></tr></thead><tbody>' + (rows || '<tr><td colspan="4" class="va-empty">Nenhuma conta cadastrada.</td></tr>') + '</tbody></table></div></section>' +
      '<section class="va-panel"><div class="va-panel-head"><h3>Histórico de acessos</h3><span class="va-subtle">Últimos 100 eventos</span></div>' +
      '<div class="va-table-wrap"><table class="va-table"><thead><tr><th>Data / hora</th><th>Conta</th><th>Atividade</th></tr></thead><tbody>' +
      (logs || '<tr><td colspan="3" class="va-empty">Nenhum evento registrado.</td></tr>') +
      '</tbody></table></div></section></section>';
    q("#va-create-form").addEventListener("submit", createUser);
    q("#panel").querySelectorAll("[data-va-action]").forEach(btn => btn.addEventListener("click", manageUser));
  }
  async function refreshManagement(message) {
    userRows = (await call("list")).users || [];
    logRows = (await call("logs")).logs || [];
    renderManagement();
    if (message) notify(message);
  }
  async function createUser(ev) {
    ev.preventDefault();
    const form = ev.currentTarget, button = q("button[type=submit]", form);
    const fd = new FormData(form);
    button.disabled = true;
    try {
      await call("create", { display_name: fd.get("display_name"), username: fd.get("username"),
        password: fd.get("password") });
      await refreshManagement("Acesso individual criado com sucesso.");
    } catch (e) { notify(errorMessage(e), true); button.disabled = false; }
  }
  function closeModal() { q("#va-management-modal")?.remove(); }
  function modal(title, description, html, onSubmit) {
    closeModal();
    const holder = document.createElement("div");
    holder.id = "va-management-modal";
    holder.className = "va-modal-backdrop";
    holder.innerHTML = '<div class="va-modal" role="dialog" aria-modal="true" aria-label="' + safe(title) +
      '"><h3>' + safe(title) + '</h3><p>' + safe(description) + '</p><form id="va-modal-form">' + html +
      '<div class="va-modal-buttons"><button type="button" id="va-cancel">Cancelar</button>' +
      '<button type="submit" class="va-primary" style="width:auto;min-height:40px;padding:10px 18px!important">Confirmar</button></div></form></div>';
    document.body.appendChild(holder);
    q("#va-cancel", holder).addEventListener("click", closeModal);
    holder.addEventListener("click", e => { if (e.target === holder) closeModal(); });
    q("#va-modal-form", holder).addEventListener("submit", async ev => {
      ev.preventDefault();
      const button = q('button[type="submit"]', holder);
      button.disabled = true;
      try { await onSubmit(new FormData(ev.currentTarget)); closeModal(); await refreshManagement("Alteração salva."); }
      catch (e) { button.disabled = false; const warn = document.createElement("p"); warn.className = "va-error"; warn.textContent = errorMessage(e); q("#va-modal-form", holder).prepend(warn); }
    });
    q("input", holder)?.focus();
  }
  function manageUser(ev) {
    const btn = ev.currentTarget, action = btn.dataset.vaAction;
    const u = userRows.find(x => String(x.id) === btn.dataset.id);
    if (!u || u.role === "master") return;
    if (action === "edit") {
      modal("Editar acesso", "Altere o nome e o usuário deste colaborador.",
        '<label>Nome completo<input name="display_name" maxlength="80" required value="' + safe(u.display_name || "") + '"></label>' +
        '<label>Usuário<input name="username" minlength="3" maxlength="32" pattern="[A-Za-z0-9._-]+" required value="' + safe(u.username) + '"></label>',
        f => call("update", { id:u.id, username:f.get("username"),display_name:f.get("display_name") }));
    } else if (action === "password") {
      modal("Redefinir senha", "A senha atual não será exibida. Defina uma nova senha de pelo menos 10 caracteres.",
        '<label>Nova senha<input name="password" type="password" autocomplete="new-password" minlength="10" maxlength="128" required></label>',
        f => call("password", { id:u.id, password:f.get("password") }));
    } else if (action === "toggle") {
      modal(u.enabled ? "Bloquear acesso" : "Reativar acesso",
        "Conta: @" + u.username + ". A alteração será aplicada no servidor.",
        '<p>Deseja confirmar esta alteração?</p>',
        () => call("toggle", { id:u.id, enabled:!u.enabled }));
    } else if (action === "remove") {
      modal("Excluir acesso", "A conta @" + u.username + " perderá o acesso. O histórico de entradas será preservado.",
        '<label>Digite EXCLUIR para confirmar<input name="confirm" autocomplete="off" required></label>',
        f => { if (f.get("confirm") !== "EXCLUIR") throw new Error("Confirmação incorreta."); return call("remove", { id:u.id }); });
    }
  }
  session = credentials();
  if (!READY) { loginPage(configError); }
  else if (session?.access_token) {
    loginPage("", true);
    call("me").then(info => {
      if (!info.profile?.username || !info.profile.enabled) throw new Error("Acesso encerrado");
      me = info.profile; unlock();
    }).catch(() => { session = null; remember(); loginPage(); });
  } else loginPage();
  setInterval(() => { if (session && !document.hidden) checkSession(); }, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) checkSession(); });
})();