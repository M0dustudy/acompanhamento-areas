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
  let session = null, me = null, userRows = [], logRows = [], working = false, checkInProgress = false, managementRequestId = 0, manualRequestId = 0, manualObjectUrl = null;
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
    root.innerHTML = "<div class=\"va-gate\" role=\"main\" aria-label=\"Acesso ao VITRA\">\n  <div class=\"va-frame\">\n    <aside class=\"va-scene\" aria-label=\"VITRA\">\n      <div class=\"va-brand\">\n        <div class=\"va-monogram\" aria-hidden=\"true\">V</div>\n        <div class=\"va-wordmark\"><strong>VITRA</strong><span>Inteligência e Rastreabilidade da Uva</span></div>\n      </div>\n      <div class=\"va-art\" aria-hidden=\"true\">\n        <svg viewBox=\"0 0 400 430\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n          <defs>\n            <linearGradient id=\"va-vine-stroke\" x1=\"70\" y1=\"25\" x2=\"330\" y2=\"380\" gradientUnits=\"userSpaceOnUse\">\n              <stop stop-color=\"#EED8A6\" stop-opacity=\".92\"/>\n              <stop offset=\"1\" stop-color=\"#A88D58\" stop-opacity=\".38\"/>\n            </linearGradient>\n          </defs>\n          <circle cx=\"205\" cy=\"221\" r=\"169\" stroke=\"#E3CAA0\" stroke-opacity=\".12\"/>\n          <circle cx=\"205\" cy=\"221\" r=\"132\" stroke=\"#E3CAA0\" stroke-opacity=\".12\"/>\n          <path d=\"M193 119C201 88 229 64 266 47M191 127C175 100 153 84 116 76M201 119c21 16 28 32 31 51\" stroke=\"url(#va-vine-stroke)\" stroke-width=\"3.2\" stroke-linecap=\"round\"/>\n          <path d=\"M189 106C166 53 115 43 84 59c26 40 59 57 95 61M215 100c17-56 64-83 106-71-13 50-44 75-95 78\" fill=\"#ACC9A1\" fill-opacity=\".065\" stroke=\"url(#va-vine-stroke)\" stroke-width=\"2.3\" stroke-linejoin=\"round\"/>\n          <path d=\"M118 77c23 5 44 17 60 41M318 31c-40 24-68 47-92 75\" stroke=\"#E5D0A4\" stroke-opacity=\".42\" stroke-width=\"1.5\"/>\n          <g stroke=\"url(#va-vine-stroke)\" stroke-width=\"2.7\" fill=\"#E4C898\" fill-opacity=\".045\">\n            <ellipse cx=\"177\" cy=\"165\" rx=\"41\" ry=\"45\"/>\n            <ellipse cx=\"249\" cy=\"168\" rx=\"41\" ry=\"45\"/>\n            <ellipse cx=\"140\" cy=\"236\" rx=\"41\" ry=\"45\"/>\n            <ellipse cx=\"212\" cy=\"238\" rx=\"41\" ry=\"45\"/>\n            <ellipse cx=\"283\" cy=\"236\" rx=\"41\" ry=\"45\"/>\n            <ellipse cx=\"177\" cy=\"307\" rx=\"41\" ry=\"45\"/>\n            <ellipse cx=\"248\" cy=\"310\" rx=\"41\" ry=\"45\"/>\n            <ellipse cx=\"211\" cy=\"373\" rx=\"37\" ry=\"41\"/>\n          </g>\n          <path d=\"M113 368c58 39 144 39 194 0\" stroke=\"#E3CAA0\" stroke-opacity=\".18\" stroke-width=\"1.5\"/>\n        </svg>\n      </div>\n      <div class=\"va-scene-rule\" aria-hidden=\"true\"><span></span><span></span><span></span></div>\n    </aside>\n    <div class=\"va-side\">\n      <section class=\"va-login\" aria-labelledby=\"va-login-title\">\n        <span class=\"va-login-overline\">ÁREA RESTRITA</span>\n        <h2 id=\"va-login-title\">Acesse sua conta</h2>\n        <p>Entre com seu usuário e senha.</p>\n        <form id=\"va-login-form\" autocomplete=\"on\">\n          <label class=\"va-field\" for=\"va-user\">Usuário</label>\n          <div class=\"va-input-wrap\">\n            <input class=\"va-input\" id=\"va-user\" name=\"username\" maxlength=\"32\" required autocomplete=\"username\" spellcheck=\"false\" placeholder=\"Nome de usuário\">\n          </div>\n          <div class=\"va-password-head\">\n            <label class=\"va-field\" for=\"va-password\">Senha</label>\n            <button type=\"button\" class=\"va-forgot\" id=\"va-forgot\">Esqueceu a senha?</button>\n          </div>\n          <div class=\"va-input-wrap\">\n            <input class=\"va-input va-password-input\" type=\"password\" id=\"va-password\" name=\"password\" required autocomplete=\"current-password\" placeholder=\"Digite sua senha\">\n            <button class=\"va-reveal\" type=\"button\" id=\"va-show-pass\" aria-label=\"Mostrar ou ocultar senha\">Mostrar</button>\n          </div>\n          " +
      (message ? '<div class="va-error" role="alert">' + safe(message) + '</div>' : '') +
      "\n          <button type=\"submit\" class=\"va-login-submit\" id=\"va-submit\" " +
      (!READY || busy ? ' disabled' : '') +
      ">\n            <span>" +
      (busy ? 'Verificando…' : 'Entrar') +
      "</span><svg aria-hidden=\"true\" viewBox=\"0 0 24 24\" fill=\"none\" width=\"19\" height=\"19\"><path d=\"M4 12h15m-6-6 6 6-6 6\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>\n          </button>\n        </form>\n      </section>\n    </div>\n  </div>\n</div>";
    q("#va-show-pass").addEventListener("click", () => {
      const field = q("#va-password");
      field.type = field.type === "password" ? "text" : "password";
      q("#va-show-pass").textContent = field.type === "password" ? "Mostrar" : "Ocultar";
    });
    q("#va-login-form").addEventListener("submit", submitLogin);
    q("#va-forgot").addEventListener("click", recoveryPage);
    if (!busy && window.matchMedia("(min-width: 801px)").matches) q("#va-user").focus();
  }
  function recoveryPage() {
    loginPage();
    q(".va-side").innerHTML = '<div class="va-login"><span class="va-badge">◇ Recuperação de acesso</span>' +
      '<h2>Redefinir senha</h2><p>Use o código de emergência que você guardou na Gestão de Acessos. Ele só pode ser utilizado uma vez.</p>' +
      '<form id="va-recovery-form">' +
      '<label class="va-field">Seu usuário<input class="va-input" name="username" autocomplete="username" required maxlength="32" placeholder="ex.: carlos.chagas"></label>' +
      '<label class="va-field">Código de recuperação<input class="va-input" name="code" autocomplete="off" required maxlength="85" placeholder="Cole seu código de emergência"></label>' +
      '<label class="va-field">Nova senha<input class="va-input" name="password" type="password" autocomplete="new-password" minlength="10" maxlength="128" required placeholder="Pelo menos 10 caracteres"></label>' +
      '<label class="va-field">Confirmar nova senha<input class="va-input" name="confirm_password" type="password" autocomplete="new-password" minlength="10" maxlength="128" required></label>' +
      '<div id="va-recovery-message" role="alert"></div>' +
      '<button class="va-login-submit" type="submit">Redefinir minha senha</button></form>' +
      '<div style="margin-top:17px;text-align:center"><button class="va-action" type="button" id="va-back-login">Voltar ao login</button></div>' +
      '<div class="va-login-footer">♢ Sem o código de emergência, a recuperação precisará ser feita pelo administrador da infraestrutura.</div></div>';
    q("#va-back-login").addEventListener("click", () => loginPage());
    q("#va-recovery-form").addEventListener("submit", async ev => {
      ev.preventDefault();
      const form = ev.currentTarget, fields = new FormData(form), btn = q('button[type="submit"]',form), msg=q("#va-recovery-message");
      if (fields.get("password") !== fields.get("confirm_password")) {
        msg.className="va-error";msg.textContent="As senhas não coincidem.";return;
      }
      btn.disabled=true;msg.className="";msg.textContent="";
      try {
        await call("recovery_reset",{username:fields.get("username"),code:fields.get("code"),password:fields.get("password")},false);
        msg.className="va-toast";
        msg.textContent="Senha redefinida. Seu código de emergência foi consumido e não poderá ser reutilizado.";
        btn.hidden=true;
        const back=q("#va-back-login");back.textContent="Entrar com a nova senha";
        form.reset();
      } catch(e) {
        msg.className="va-error";msg.textContent=errorMessage(e);
        btn.disabled=false;
      }
    });
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
    q("#cards .va-manual-nav")?.remove();
    closeManualPreview();
    q(".vitra-sidebar .va-account")?.remove();
    q("#va-management-modal")?.remove();
  }
  function unlock() {
    root.innerHTML = "";
    document.documentElement.classList.remove("va-locked");
    removeManagement();

    if (me?.role === "master") {
      const nav = document.createElement("div");
      nav.className = "card va-admin-nav";
      nav.dataset.main = "access";
      nav.innerHTML = '<b><span class="va-admin-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/><path d="M12 14v3"/></svg></span>GESTÃO DE ACESSOS</b>';
      nav.setAttribute("role", "button");
      nav.setAttribute("aria-label", "Abrir Gestão de Acessos");
      nav.tabIndex = 0;
      nav.addEventListener("click", openManagement);
      nav.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openManagement(); }});
      nav.classList.toggle("active", !!q(".vitra-shell.va-admin-view"));
      q("#cards")?.appendChild(nav);
      const manualsNav = document.createElement("div");
      manualsNav.className = "card va-manual-nav";
      manualsNav.dataset.main = "manuals";
      manualsNav.setAttribute("role", "button");
      manualsNav.setAttribute("aria-label", "Abrir manuais técnicos — teste privado");
      manualsNav.tabIndex = 0;
      manualsNav.innerHTML = '<b><span class="va-doc-nav-icon" aria-hidden="true">▤</span>MANUAIS TÉCNICOS <span class="va-doc-nav-test">TESTE</span></b>';
      manualsNav.addEventListener("click", openManuals);
      manualsNav.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") {e.preventDefault();openManuals();} });
      q("#cards")?.appendChild(manualsNav);
    }

    const sidebar = q(".vitra-sidebar");
    if (!sidebar) return;
    const firstName = String(me?.display_name || me?.username || "Conta").trim().split(/\s+/)[0] || "Conta";
    const avatar = firstName.charAt(0).toLocaleUpperCase("pt-BR");
    const account = document.createElement("details");
    account.className = "va-account";
    account.innerHTML = '<summary class="va-account-toggle" aria-label="Opções da conta">' +
      '<span class="va-avatar" aria-hidden="true">' + safe(avatar) + '</span>' +
      '<span class="va-account-name">' + safe(firstName) + '</span>' +
      '<svg class="va-account-chevron" aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>' +
      '<div class="va-account-options" role="group" aria-label="Ações da conta">' +
      (me?.role === "master" ? '<button type="button" class="va-account-mobile-access" id="va-mobile-access">Gestão de acessos</button><button type="button" class="va-account-mobile-access" id="va-mobile-manuals">Manuais técnicos · teste</button>' : '') +
      '<button type="button" id="va-signout">Sair do VITRA</button></div>';
    sidebar.appendChild(account);
    q("#va-signout", account).addEventListener("click", logout);
    q("#va-mobile-access", account)?.addEventListener("click", () => {
      account.open = false;
      openManagement();
    });
    q("#va-mobile-manuals", account)?.addEventListener("click", () => {
      account.open = false;
      openManuals();
    });
    if (me?.role !== "master" && q("#panel .va-manuals") && typeof window.showHome === "function") window.showHome();
  }
  async function logout() {
    managementRequestId++;
    manualRequestId++;
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

  /* Módulo experimental: PDF/DOCX em storage privado, sempre validado pelo servidor. */
  const manualDocuments = [
    { id:"DOC.CQ.056", name:"Manual de Etiquetas e Rotulagem",
      description:"Rastreabilidade, modelos de etiquetas, códigos de barras e requisitos específicos de clientes." },
    { id:"DOC.CQ.055", name:"Manual e Padrões de Qualidade — Marca Própria e Exportação",
      description:"Critérios de classificação e referências para Campesita, Happy Tree, Extra e Sacola." }
  ];
  async function manualApi(action, payload={}){
    if (me?.role!=="master") throw new Error("Acesso restrito ao administrador.");
    await freshSession();
    const uploading=action==="upload";
    const headers={apikey:settings.publishableKey,Authorization:"Bearer "+session.access_token};
    if(!uploading)headers["Content-Type"]="application/json";
    const response=await fetch(settings.url+"/functions/v1/vitra-manuais",{
      method:"POST",headers,body:uploading?payload:JSON.stringify({action,...payload}),cache:"no-store"
    });
    if(!response.ok){
      let explanation={};try{explanation=await response.json();}catch{}
      throw new Error(explanation.message||"Não foi possível acessar os manuais.");
    }
    return action==="get"?response.blob():response.json();
  }
  function closeManualPreview(){
    q("#va-manual-preview")?.remove();
    document.documentElement.classList.remove("va-doc-open");
    if(manualObjectUrl){URL.revokeObjectURL(manualObjectUrl);manualObjectUrl=null;}
  }
  function manualNotice(message,isError){
    const el=q("#va-manual-notice");
    if(!el)return;
    el.hidden=!message;
    el.className=isError?"va-error":"va-toast";
    el.textContent=message||"";
  }
  function renderManuals(files,notice=""){
    if(me?.role!=="master"||!q("#panel .va-manuals"))return;
    const available=new Set((files||[]).map(x=>x.name));
    const fileRow=(doc,format)=>{
      const exists=available.has(doc.id+"."+format),tag=format==="pdf"?"PDF":"Word";
      const name=doc.id+"."+format;
      return '<div class="va-doc-file-row"><div class="va-doc-file-info"><span class="va-doc-format">'+tag+'</span>' +
        '<div><strong>'+safe(format==="pdf"?"Documento para consulta":"Arquivo editável")+'</strong>' +
        '<small>'+safe(exists?name:"Arquivo ainda não enviado")+'</small></div></div>' +
        '<div class="va-doc-controls">' +
        (exists?'<button type="button" class="va-doc-button" data-va-file-action="'+(format==="pdf"?"view":"download")+
          '" data-va-doc="'+doc.id+'" data-va-format="'+format+'">'+(format==="pdf"?"Visualizar":"Baixar Word")+'</button>' +
          (format==="pdf"?'<button type="button" class="va-doc-button va-doc-download" data-va-file-action="download" data-va-doc="'+doc.id+'" data-va-format="pdf">Baixar</button>':"")
        :'<label class="va-doc-upload">Enviar '+tag+'<input aria-label="Enviar '+safe(name)+
          '" type="file" accept="'+(format==="pdf"?".pdf,application/pdf":".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document")+
          '" data-va-doc="'+doc.id+'" data-va-format="'+format+'"></label>')+
        '</div></div>';
    };
    const cards=manualDocuments.map((doc,i)=>
      '<article class="va-doc-card"><div class="va-doc-card-top">' +
        '<div class="va-doc-cover" aria-hidden="true"><span>V</span><small>'+safe(doc.id)+'</small></div>' +
        '<div class="va-doc-card-heading"><span class="va-doc-ref">'+safe(doc.id)+'</span><h3>'+safe(doc.name)+'</h3><p>'+safe(doc.description)+'</p></div>' +
        '</div><div class="va-doc-files">'+fileRow(doc,"pdf")+fileRow(doc,"docx")+'</div></article>'
    ).join("");
    q("#panel").innerHTML='<section class="va-manuals" aria-label="Biblioteca privada de manuais técnicos">' +
      '<div class="va-doc-head"><div><span class="va-doc-eyebrow">BIBLIOTECA TÉCNICA <span>TESTE PRIVADO</span></span>' +
      '<h2>Manuais e padrões</h2><p>Documentos de referência do Controle de Qualidade.</p></div>' +
      '<button type="button" id="va-manual-back" class="va-doc-back">Voltar ao painel</button></div>' +
      '<div class="va-doc-security"><span aria-hidden="true">●</span><div><strong>Acesso exclusivo do administrador</strong>' +
      '<p>Os arquivos ficam em armazenamento privado, fora do GitHub público. Consulta, envio e download exigem autenticação administrativa.</p></div></div>' +
      '<div id="va-manual-notice" hidden></div><div class="va-doc-grid">'+cards+'</div>' +
      '<p class="va-doc-footnote">Teste de apresentação. Os documentos só estarão disponíveis para leitura após o envio pelo administrador nesta seção; arquivos existentes nunca são substituídos automaticamente.</p>' +
      '</section>';
    q("#va-manual-back")?.addEventListener("click",()=>{closeManualPreview();if(typeof window.showHome==="function")window.showHome();});
    q("#panel").querySelectorAll("[data-va-file-action]").forEach(btn=>btn.addEventListener("click",async()=>{
      if(me?.role!=="master")return;
      btn.disabled=true;
      try{
        const blob=await manualApi("get",{doc:btn.dataset.vaDoc,format:btn.dataset.vaFormat});
        if(!q("#panel .va-manuals")||me?.role!=="master")return;
        const url=URL.createObjectURL(blob);
        if(btn.dataset.vaFileAction==="download"){
          const a=document.createElement("a");a.href=url;a.download=btn.dataset.vaDoc+"."+btn.dataset.vaFormat;
          document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
        }else{
          closeManualPreview();
          manualObjectUrl=url;
          const holder=document.createElement("div");holder.id="va-manual-preview";holder.className="va-doc-overlay";
          const windowContent=document.createElement("div");windowContent.className="va-doc-viewer";
          const top=document.createElement("div");top.className="va-doc-viewer-head";
          const title=document.createElement("strong");title.textContent=btn.dataset.vaDoc+" · Visualização do PDF";
          const close=document.createElement("button");close.type="button";close.textContent="Fechar";close.addEventListener("click",closeManualPreview);
          top.append(title,close);
          const frame=document.createElement("iframe");frame.src=url;frame.title="Manual técnico em PDF";
          windowContent.append(top,frame);holder.appendChild(windowContent);document.body.appendChild(holder);
          document.documentElement.classList.add("va-doc-open");
          holder.addEventListener("click",event=>{if(event.target===holder)closeManualPreview();});
        }
      }catch(e){manualNotice(errorMessage(e),true);}
      finally{if(btn.isConnected)btn.disabled=false;}
    }));
    q("#panel").querySelectorAll("input[type=file][data-va-doc]").forEach(input=>input.addEventListener("change",async()=>{
      const file=input.files?.[0];if(!file)return;
      if(file.size>30*1024*1024){manualNotice("O arquivo ultrapassa o limite de 30 MB.",true);input.value="";return;}
      const form=new FormData();form.set("action","upload");form.set("doc",input.dataset.vaDoc);
      form.set("format",input.dataset.vaFormat);form.set("file",file,file.name);
      input.disabled=true;
      manualNotice("Enviando "+input.dataset.vaDoc+"…",false);
      try{
        await manualApi("upload",form);
        const listing=await manualApi("list");
        if(me?.role==="master"&&q("#panel .va-manuals"))renderManuals(listing.files,input.dataset.vaDoc+" enviado e armazenado com acesso restrito.");
      }catch(e){manualNotice(errorMessage(e),true);}
      finally{if(input.isConnected){input.disabled=false;input.value="";}}
    }));
    if(notice)manualNotice(notice,false);
  }
  async function openManuals(){
    if(me?.role!=="master")return;
    const requestId=++manualRequestId;
    q(".va-account")?.removeAttribute("open");
    if(typeof window.markMain==="function")window.markMain("manuals");
    q("#panel").innerHTML='<section class="va-manuals"><div class="va-doc-loading" role="status">Verificando acesso administrativo…</div></section>';
    if(window.innerWidth<=900)q(".vitra-main")?.scrollIntoView({block:"start"});
    try{
      const verified=await call("me");
      if(verified.profile?.role!=="master"||verified.profile?.enabled!==true)throw new Error("Acesso reservado à conta administradora.");
      const listing=await manualApi("list");
      if(requestId!==manualRequestId||me?.role!=="master"||!q("#panel .va-manuals"))return;
      renderManuals(listing.files);
    }catch(e){
      if(requestId===manualRequestId&&q("#panel .va-manuals"))q("#panel").innerHTML='<section class="va-manuals"><div class="va-error" role="alert">'+safe(errorMessage(e))+'</div></section>';
    }
  }

  async function openManagement() {
    if (me?.role !== "master") return;
    const requestId = ++managementRequestId;
    q(".va-account")?.removeAttribute("open");
    if (typeof window.markMain === "function") window.markMain("access");
    const panel = q("#panel");
    if (panel) panel.innerHTML = '<section class="va-management"><div class="va-loading" role="status">Carregando acessos…</div></section>';
    if (window.innerWidth <= 900) q(".vitra-main")?.scrollIntoView({ block: "start" });
    try {
      const users = (await call("list")).users || [];
      const logs = (await call("logs")).logs || [];
      if (requestId !== managementRequestId || !q(".vitra-shell.va-admin-view")) return;
      userRows = users;
      logRows = logs;
    } catch (e) {
      if (requestId === managementRequestId && q(".vitra-shell.va-admin-view") && panel)
        panel.innerHTML = '<div class="va-error" role="alert">' + safe(errorMessage(e)) + '</div>';
      return;
    }
    renderManagement();
  }
  function renderManagement() {
    if (me?.role !== "master" || !q(".vitra-shell.va-admin-view")) return;
    const active = userRows.filter(x => x.enabled).length;
    const recent = logRows.filter(x => x.event === "login").length;
    const rows = userRows.map(u => '<tr><td><strong>' + safe(u.display_name || u.username) + '</strong><div class="va-subtle">@' +
      safe(u.username) + '</div></td><td>' + (u.role === "master" ? '<span class="va-pill">Administrador</span>' :
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
        block_user:"Acesso bloqueado",unblock_user:"Acesso reativado",delete_user:"Acesso excluído",recovery_code_created:"Código de recuperação gerado",recovery_password_reset:"Senha recuperada"}[x.event] || x.event)) +
      '</td></tr>').join("");
    q("#panel").innerHTML = '<section class="va-management">' +
      '<header class="va-heading"><h2>Gestão de acessos</h2><button class="va-admin-back" type="button" id="va-back-home">← Voltar</button></header>' +
      '<div class="va-stats"><div class="va-stat"><small>Contas cadastradas</small><strong>' + userRows.length + '</strong></div>' +
      '<div class="va-stat"><small>Contas ativas</small><strong>' + active + '</strong></div>' +
      '<div class="va-stat"><small>Entradas no histórico</small><strong>' + recent + '</strong></div></div>' +
      '<div id="va-notice" hidden></div>' +
      '<section class="va-panel"><div class="va-panel-head"><h3>Minha conta</h3></div>' +
      '<form class="va-admin-form" id="va-self-form">' +
      '<label>Seu nome<input name="display_name" maxlength="80" required value="' + safe(me.display_name) + '"></label>' +
      '<label>Seu usuário<input name="username" pattern="[A-Za-z0-9._-]{3,32}" maxlength="32" required value="' + safe(me.username) + '"></label>' +
      '<label>Senha atual<input name="current_password" type="password" autocomplete="current-password" required></label>' +
      '<label>Nova senha (opcional)<input name="new_password" minlength="10" maxlength="128" type="password" autocomplete="new-password" placeholder="Mantenha vazio para não alterar"></label>' +
      '<div class="va-full"><button type="submit" class="va-primary">Salvar minha conta</button></div></form>' +
      '<p class="va-subtle">Mudanças da sua conta exigem a senha atual. Alterar a senha encerrará esta sessão.</p></section>' +
      '<div class="va-recovery-highlight"><div class="va-recovery-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="m11 12 9-9 2 2-2 2 1 1-3 3-2-2-3 3"/></svg></div>' +
      '<div class="va-recovery-content"><strong>Código de recuperação</strong>' +
      '<p>Gere e guarde um código para recuperar seu acesso se esquecer a senha.</p></div>' +
      '<button type="button" id="va-generate-recovery" class="va-recovery-create">Gerar código <span aria-hidden="true">→</span></button></div>' +
      '<section class="va-panel"><div class="va-panel-head"><h3>Novo colaborador</h3></div>' +
      '<form class="va-admin-form" id="va-create-form">' +
      '<label>Nome da pessoa<input name="display_name" maxlength="80" required placeholder="Nome para identificação"></label>' +
      '<label>Nome de usuário<input name="username" minlength="3" maxlength="32" required pattern="[A-Za-z0-9._-]+" autocomplete="off" placeholder="ex.: equipe.cq"></label>' +
      '<label class="va-full">Senha inicial<input name="password" minlength="10" maxlength="128" type="password" required autocomplete="new-password" placeholder="Ao menos 10 caracteres"></label>' +
      '<div class="va-full"><button class="va-primary" type="submit">Criar usuário</button></div></form>' +
      '<p class="va-subtle">As senhas não são exibidas depois de cadastradas. Você poderá redefini-las quando necessário.</p></section>' +
      '<section class="va-panel"><div class="va-panel-head"><h3>Usuários autorizados</h3></div>' +
      '<div class="va-table-wrap"><table class="va-table"><thead><tr><th>Pessoa / usuário</th><th>Situação</th><th>Última entrada</th><th>Gerenciar</th></tr></thead><tbody>' + (rows || '<tr><td colspan="4" class="va-empty">Nenhuma conta cadastrada.</td></tr>') + '</tbody></table></div></section>' +
      '<section class="va-panel"><div class="va-panel-head"><h3>Histórico de acessos</h3><span class="va-subtle">Últimos 100 eventos</span></div>' +
      '<div class="va-table-wrap"><table class="va-table"><thead><tr><th>Data / hora</th><th>Conta</th><th>Atividade</th></tr></thead><tbody>' +
      (logs || '<tr><td colspan="3" class="va-empty">Nenhum evento registrado.</td></tr>') +
      '</tbody></table></div></section></section>';
    q("#va-back-home")?.addEventListener("click", () => { if (typeof window.showHome === "function") window.showHome(); window.scrollTo(0, 0); });
    q("#va-self-form").addEventListener("submit", updateMaster);
    q("#va-generate-recovery").addEventListener("click", showRecoveryGenerator);
    q("#va-create-form").addEventListener("submit", createUser);
    q("#panel").querySelectorAll("[data-va-action]").forEach(btn => btn.addEventListener("click", manageUser));
  }
  async function refreshManagement(message) {
    userRows = (await call("list")).users || [];
    logRows = (await call("logs")).logs || [];
    renderManagement();
    if (message) notify(message);
  }
  async function updateMaster(ev) {
    ev.preventDefault();
    const form=ev.currentTarget, btn=q('button[type="submit"]',form);
    const fd=new FormData(form);
    btn.disabled=true;
    try {
      const result=await call("self",{ username:fd.get("username"),
        display_name:fd.get("display_name"), current_password:fd.get("current_password"),
        new_password:fd.get("new_password")||null });
      form.reset();
      if(result.requires_relogin){ await logout(); return; }
      const resultMe=await call("me");
      me=resultMe.profile;
      unlock();
      await refreshManagement("Sua conta de administrador foi atualizada.");
    } catch(e){ notify(errorMessage(e),true); btn.disabled=false; }
  }
  async function createUser(ev) {
    ev.preventDefault();
    const form = ev.currentTarget, button = q("button[type=submit]", form);
    const fd = new FormData(form);
    button.disabled = true;
    try {
      await call("create", { display_name: fd.get("display_name"), username: fd.get("username"),
        password: fd.get("password") });
      await refreshManagement("Usuário cadastrado com sucesso.");
    } catch (e) { notify(errorMessage(e), true); button.disabled = false; }
  }

  function showRecoveryGenerator() {
    if (me?.role !== "master") return;
    closeModal();
    const holder = document.createElement("div");
    holder.id="va-management-modal";
    holder.className="va-modal-backdrop";
    holder.innerHTML='<div class="va-modal" role="dialog" aria-modal="true" aria-label="Gerar código de recuperação">' +
      '<h3>Código de emergência</h3><p>Confirme sua senha atual. O novo código substituirá qualquer código de recuperação anterior.</p>' +
      '<form id="va-recovery-generate">' +
      '<label>Senha atual<input name="current_password" type="password" autocomplete="current-password" required></label>' +
      '<div id="va-recovery-generate-msg" role="alert"></div>' +
      '<div class="va-modal-buttons"><button type="button" id="va-recovery-cancel">Cancelar</button>' +
      '<button type="submit" class="va-primary" style="width:auto;min-height:40px;padding:10px 18px!important">Gerar código</button></div></form></div>';
    document.body.appendChild(holder);
    q("#va-recovery-cancel",holder).addEventListener("click",closeModal);
    q("#va-recovery-generate",holder).addEventListener("submit",async ev=>{
      ev.preventDefault();
      const form=ev.currentTarget,btn=q('button[type="submit"]',form),msg=q("#va-recovery-generate-msg");
      btn.disabled=true;
      try {
        const data=await call("recovery_generate",{current_password:new FormData(form).get("current_password")});
        if(!/^[A-F0-9]{8}(?:-[A-F0-9]{8}){7}$/.test(data.code || ""))
          throw new Error("O servidor não retornou um código válido.");
        holder.querySelector(".va-modal").innerHTML='<h3>Guarde este código</h3>' +
          '<p>Esta é a única vez em que o código será exibido. Salve-o em um gerenciador de senhas ou anote em local seguro. Ele permite recuperar sua conta e funciona apenas uma vez.</p>' +
          '<input id="va-recovery-value" readonly spellcheck="false" aria-label="Seu código de recuperação" value="' + safe(data.code) + '" style="font:600 12px ui-monospace,monospace;letter-spacing:.025em">' +
          '<p class="va-subtle">Nunca envie este código pelo chat ou compartilhe com outras pessoas.</p>' +
          '<div class="va-modal-buttons"><button type="button" id="va-copy-recovery">Copiar</button>' +
          '<button type="button" class="va-primary" style="width:auto;min-height:40px;padding:10px 18px!important" id="va-done-recovery">Já guardei</button></div>';
        q("#va-copy-recovery",holder).addEventListener("click",async()=>{
          const input=q("#va-recovery-value",holder);
          try {await navigator.clipboard.writeText(input.value);q("#va-copy-recovery",holder).textContent="Copiado"; }
          catch {input.focus();input.select();q("#va-copy-recovery",holder).textContent="Selecione e copie";}
        });
        q("#va-done-recovery",holder).addEventListener("click",()=>{
          q("#va-recovery-value",holder).value="";
          closeModal();refreshManagement("Código de emergência gerado. Guarde-o em segurança.").catch(()=>{});
        });
      } catch(e) {
        msg.className="va-error";msg.textContent=errorMessage(e);btn.disabled=false;
      }
    });
    q('input[name="current_password"]',holder)?.focus();
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
  document.addEventListener("click", event => {
    const menu = q(".va-account");
    if (menu?.open && !menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") q(".va-account")?.removeAttribute("open");
  });
  setInterval(() => { if (session && !document.hidden) checkSession(); }, 60000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) checkSession(); });
})();