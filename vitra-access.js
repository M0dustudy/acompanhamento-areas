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
  let session = null, me = null, userRows = [], logRows = [], working = false, checkInProgress = false, managementRequestId = 0, labelAccessReserved = 0;
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
    q("#cards .vl-nav")?.remove();
    stopLabelCamera();
    revokeLabelPhoto();
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
      const navLabels = document.createElement("div");
      navLabels.className = "card vl-nav";
      navLabels.dataset.main = "labels";
      navLabels.innerHTML = '<b><span class="vl-nav-icon" aria-hidden="true">▧</span>VERIFICAÇÃO DE ETIQUETAS <span class="vl-nav-tag">TESTE</span></b>';
      navLabels.setAttribute("role","button");navLabels.setAttribute("aria-label","Abrir verificação de etiquetas");navLabels.tabIndex=0;
      navLabels.addEventListener("click",openLabelReview);
      navLabels.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openLabelReview();}});
      q("#cards")?.appendChild(navLabels);
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
      (me?.role === "master" ? '<button type="button" class="va-account-mobile-access" id="va-mobile-access">Gestão de acessos</button><button type="button" class="va-account-mobile-access" id="va-mobile-labels">Verificação de etiquetas · teste</button>' : '') +
      '<button type="button" id="va-signout">Sair do VITRA</button></div>';
    sidebar.appendChild(account);
    q("#va-signout", account).addEventListener("click", logout);
    q("#va-mobile-access", account)?.addEventListener("click", () => {
      account.open = false;
      openManagement();
    });
    q("#va-mobile-labels", account)?.addEventListener("click", () => {
      account.open = false;
      openLabelReview();
    });
    if (me?.role !== "master" && q("#panel .vl-module") && typeof window.showHome === "function") window.showHome();
  }
  async function logout() {
    managementRequestId++;
    labelRequestId++;
    stopLabelCamera();revokeLabelPhoto();
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


  /* VITRA · Verificação experimental de etiquetas
     Referências técnicas: DOC.CQ.056 (12/09/2026), DOC.CQ.055 rev. 02 (29/05/2026).
     Toda decisão automática é indicativa; conferir a foto e o modelo aprovado. */
  const labelClients=[
    ["expofrut","Expofrut / Novo Rumo"],["caco","CACO"],["docemel","Doce Mel"],["trielo","Trielo"],
    ["debrand","Comércio de Frutas Debrand"],["tt","T&T"],["assai","Assaí / Bratrade"],
    ["paguemenos","Pague Menos"],["casaavenida","Casa Avenida"],["gmap","GMAP"],["condor","Condor"],
    ["mambo","Mambo"],["patrulha","Patrulha Canina"],["sangiuseppe","San Giuseppe"],
    ["potiguara","Potiguara"],["cia","CIA PA (SP / RJ / PE / CE)"],["carrefour","Carrefour Mercado"],
    ["sq","Carrefour S&Q"],["outro","Outro cliente / modelo aprovado"]
  ];
  const labelVarieties=[
    ["arra15","ARRA 15 / ARRA Sweeties","AR",["ARRA 15","ARRA SWEETIES","WHITE SEEDLESS"]],
    ["sugar","Sugar Crisp / IFG Eleven","SR",["SUGAR CRISP","IFG ELEVEN","WHITE SEEDLESS"]],
    ["autumn","Autumn Crisp","AC",["AUTUMN CRISP","SUGRATHIRTYFIVE","WHITE SEEDLESS"]],
    ["sweet","Sweet Globe / IFG Ten","SG",["SWEET GLOBE","IFG TEN","WHITE SEEDLESS"]],
    ["timpson","Timpson / Sheegene 2","TI",["TIMPSON","SHEEGENE","WHITE SEEDLESS"]],
    ["vitoria","BRS Vitória","VI",["VITÓRIA","VITORIA","BLACK SEEDLESS"]],
    ["melodia","BRS Melodia","ME",["MELODIA","RED SEEDLESS"]],
    ["nubia","BRS Núbia / Black Seedless","NB",["NÚBIA","NUBIA","BLACK SEEDLESS"]],
    ["isis","BRS Ísis","IS",["ÍSIS","ISIS","RED SEEDLESS"]],
    ["midnight","Midnight Beauty / Sugra 48","MB",["MIDNIGHT BEAUTY","MIDNIGHT","SUGRA 48"]],
    ["scarlotta","Scarlotta Seedless","SC",["SCARLOTTA","SUGRANINETEEN"]],
    ["itum9","Itum 9","I9",["ITUM 9","ITUM"]],
    ["cherry","ARRA Cherry Crush","ACR",["CHERRY CRUSH","ARRA CHERRY"]],
    ["redglobe","Red Globe","RG",["RED GLOBE"]],
    ["ard36","ARD 36","",["ARD 36","ARDTHIRTYSIX"]],
    ["mista","Uva mista","",["UVA MISTA"]]
  ];
  const labelModels=[
    ["caixa","Etiqueta de caixa","5 kg ou 8 kg"],
    ["cumbuca500","Cumbuca de 500 g","500 g"],
    ["cumbuca250","Cumbuca de 250 g","250 g"],
    ["cinta500","Cinta de 500 g","500 g"],
    ["cinta250","Cinta de 250 g","250 g"],
    ["selo","Selo / etiqueta complementar","Variável"],
    ["sacola","Etiqueta de sacola","5 kg ou 8 kg"],
    ["exportacao","Etiqueta de exportação","Conforme destino"],
    ["outro","Outro modelo aprovado","Conforme pedido"]
  ];
  const labelClasses=["Campesita","Happy Tree / Extra A","Extra","Sacola","Selecionada","Outra"];
  const labelBarcodes={
    caco:{white:"7898941149994"},
    docemel:{white:"7898366000542",red:"7898366000429",vitoria:"7898366001754",midnight:"7898366000481"},
    trielo:{white:"7898366000542",red:"7898366000429",vitoria:"7898366001754",midnight:"7898366000481"},
    assai:{white:"7898923868974",red:"7898923868998",vitoria:"7898923868981"}
  };
  const labelFieldNames=[
    ["produto","Nome comercial / produto"],["peso","Peso declarado"],["lote","Lote"],
    ["data","Data de embalagem"],["rastreio","Código de rastreabilidade"],
    ["barcode","Código de barras / GTIN"],["produtor","Produtor"],
    ["cnpj","CNPJ do produtor"],["ggn","GGN (quando aplicável)"],["comercializado","Comercializado por"],
    ["destino","Destino / país de exportação"],["observacao","Observação complementar"]
  ];
  let labelPhotoFile=null,labelPhotoUrl=null,labelLastText="",labelCameraStream=null,labelRequestId=0;
  function labelSelected(id){return q("#"+id)?.value||""}
  function labelNormalize(value){return String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/\s+/g," ").trim()}
  function labelEAN(value){let n=String(value||"").replace(/\D/g,"");if(n.length!==13)return false;let sum=0;for(let i=0;i<12;i++)sum+=Number(n[i])*(i%2?3:1);return (10-(sum%10))%10===Number(n[12])}
  function labelOption(rows,placeholder){return '<option value="">'+safe(placeholder)+'</option>'+rows.map(r=>'<option value="'+safe(r[0])+'">'+safe(r[1])+'</option>').join("")}
  function labelNotice(message,error=false){
    const el=q("#vl-message");if(!el)return;
    el.hidden=!message;el.className=error?"vl-notice vl-notice-error":"vl-notice";
    el.textContent=message||"";
  }
  function stopLabelCamera(){
    if(labelCameraStream){labelCameraStream.getTracks().forEach(t=>t.stop());labelCameraStream=null;}
    const v=q("#vl-live");if(v){v.srcObject=null;v.hidden=true;}
    q("#vl-shot")?.setAttribute("hidden","");
    q("#vl-start")?.removeAttribute("hidden");
  }
  function revokeLabelPhoto(){if(labelPhotoUrl){URL.revokeObjectURL(labelPhotoUrl);labelPhotoUrl=null;}labelPhotoFile=null;}
  function chooseLabelPhoto(file){
    if(!file)return;
    if(!/^image\/(jpeg|png|webp)$/i.test(file.type)||file.size>10*1024*1024){
      labelNotice("Escolha uma foto JPG, PNG ou WebP de até 10 MB.",true);return;
    }
    revokeLabelPhoto();labelPhotoFile=file;labelPhotoUrl=URL.createObjectURL(file);
    const img=q("#vl-photo");if(img){img.src=labelPhotoUrl;img.hidden=false;}
    q("#vl-photo-empty")?.setAttribute("hidden","");
    labelLastText="";
    const text=q("#vl-ocr-text");if(text)text.value="";
    labelNotice("Foto carregada. Toque em «Ler texto da etiqueta» para analisar.",false);
    stopLabelCamera();labelCheck();
  }
  async function labelStartCamera(){
    if(!navigator.mediaDevices?.getUserMedia){labelNotice("Câmera direta indisponível. Use «Tirar foto ou escolher arquivo».",true);return;}
    try{
      labelCameraStream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:{ideal:"environment"},width:{ideal:1600},height:{ideal:1200}}});
      const video=q("#vl-live");if(!video){stopLabelCamera();return;}
      video.srcObject=labelCameraStream;video.hidden=false;await video.play();
      q("#vl-shot")?.removeAttribute("hidden");q("#vl-start")?.setAttribute("hidden","");
      q("#vl-photo")?.setAttribute("hidden","");q("#vl-photo-empty")?.setAttribute("hidden","");
    }catch(e){labelNotice("Não consegui abrir a câmera. Verifique a permissão do navegador ou escolha uma foto.",true);stopLabelCamera();}
  }
  function labelCapture(){
    const video=q("#vl-live");if(!video||!labelCameraStream||!video.videoWidth)return;
    const cn=document.createElement("canvas");const scale=Math.min(1,1800/video.videoWidth);
    cn.width=Math.round(video.videoWidth*scale);cn.height=Math.round(video.videoHeight*scale);
    cn.getContext("2d").drawImage(video,0,0,cn.width,cn.height);
    cn.toBlob(blob=>{if(blob)chooseLabelPhoto(new File([blob],"etiqueta-"+Date.now()+".jpg",{type:"image/jpeg"}));}, "image/jpeg",0.9);
  }
  async function labelEnsureOCR(){
    if(window.Tesseract?.createWorker)return;
    await new Promise((resolve,reject)=>{
      const src="https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
      const existing=document.querySelector('script[data-vl-ocr]');
      if(existing){existing.addEventListener("load",resolve,{once:true});existing.addEventListener("error",reject,{once:true});return;}
      const script=document.createElement("script");script.src=src;script.async=true;script.dataset.vlOcr="true";
      script.onload=resolve;script.onerror=()=>reject(new Error("Leitor de texto não disponível"));
      document.head.appendChild(script);
    });
    if(!window.Tesseract?.createWorker)throw Error("Reconhecimento não carregado");
  }
  function labelExtract(text){
    const t=String(text||"").replace(/[ \t]+/g," ");
    const normalized=labelNormalize(t);
    const bar=t.match(/(?:\d[\s-]*){13}/g)||[];
    const ean=bar.map(x=>x.replace(/\D/g,"")).find(labelEAN)||bar.map(x=>x.replace(/\D/g,""))[0]||"";
    const trace=t.match(/\bR[\s-]*\d{2}[\s-]*\d{3,5}[A-Z]?[\s-]*\d{4}[\s-]*[C58][\s-]*[A-Z]{2,3}\b/i);
    const data=t.match(/\b([0-3]?\d)[./-]([01]?\d)[./-](20\d{2})\b/);
    const weight=t.match(/\b(?:PESO\s*[:=]?\s*)?(\d{1,2}(?:[,.]\d{1,2})?)\s*(KG|G)\b/i);
    const lot=t.match(/\b(?:LOTE|LOT)\s*[:#-]?\s*([0-9A-Z./-]{2,24})\b/i);
    const fields={barcode:ean,rastreio:trace?trace[0].replace(/\s+/g,""):"",data:data?data[1].padStart(2,"0")+"/"+data[2].padStart(2,"0")+"/"+data[3]:"",peso:weight?weight[1].replace(".",",")+" "+weight[2].toUpperCase():"",lote:lot?lot[1]:""};
    const variety=labelVarieties.find(v=>v[3].some(alias=>normalized.includes(labelNormalize(alias))&&!alias.endsWith("SEEDLESS")));
    return {fields,variety:variety?.[0]||""};
  }
  async function labelRead(){
    if(!labelPhotoFile){labelNotice("Tire uma foto ou selecione uma imagem primeiro.",true);return;}
    const button=q("#vl-read");if(button)button.disabled=true;
    labelNotice("Reconhecendo o texto da etiqueta. A leitura pode exigir revisão manual…");
    let worker=null;
    try{
      await labelEnsureOCR();
      worker=await window.Tesseract.createWorker("por+eng",1);
      const result=await worker.recognize(labelPhotoFile);
      labelLastText=String(result?.data?.text||"").trim();
      q("#vl-ocr-text").value=labelLastText;
      const found=labelExtract(labelLastText);
      if(found.variety&&!labelSelected("vl-variety"))q("#vl-variety").value=found.variety;
      for(const [key,value] of Object.entries(found.fields)){
        const field=q("#vl-f-"+key);if(field&&value&&!field.value)field.value=value;
      }
      labelCheck();
      labelNotice(labelLastText?"Leitura concluída. Confira os dados reconhecidos antes de salvar.":"Nenhum texto legível identificado. Preencha os campos manualmente.",!labelLastText);
    }catch(e){labelNotice("Leitura automática indisponível nesta foto ou conexão. Você pode preencher tudo manualmente.",true);}
    finally{if(worker)try{await worker.terminate();}catch{}if(button?.isConnected)button.disabled=false;}
  }
  function labelCheck(){
    const client=labelSelected("vl-client"),kind=labelSelected("vl-kind"),variety=labelSelected("vl-variety"),klass=labelSelected("vl-class");
    const t=labelVarieties.find(v=>v[0]===variety);
    const fields=Object.fromEntries(labelFieldNames.map(([key])=>[key,q("#vl-f-"+key)?.value.trim()||""]));
    const result=[],required=["produto","peso","lote","data","rastreio"];
    if(kind==="caixa"||kind==="sacola"||kind==="exportacao")required.push("produtor","comercializado");
    if(["cumbuca500","cumbuca250","cinta500","cinta250"].includes(kind))required.push("barcode");
    if(kind==="exportacao")required.push("destino");
    if(kind==="selo")required.splice(0,required.length,"produto","data");
    if(!client)result.push(["pendente","Cliente","Selecione o cliente da etiqueta."]);
    if(!kind)result.push(["pendente","Modelo","Selecione o tipo de etiqueta."]);
    if(!variety)result.push(["pendente","Variedade","Selecione a variedade real da uva."]);
    if(!klass)result.push(["pendente","Classificação","Confirme a classificação; não é determinada somente pela foto."]);
    for(const key of required)if(!fields[key])result.push(["pendente",labelFieldNames.find(x=>x[0]===key)?.[1]||key,"Não identificado ou ainda não informado."]);
    const barcode=fields.barcode.replace(/\D/g,"");
    if(barcode&&!labelEAN(barcode))result.push(["atencao","Código de barras","O dígito verificador EAN-13 não confere. Revise a leitura."]);
    const color=t?["arra15","sugar","autumn","sweet","timpson"].includes(variety)?"white":["vitoria","nubia","midnight"].includes(variety)?"black":"red":"";
    const expectedCodes=labelBarcodes[client]||{};
    const expected=(variety==="vitoria"&&expectedCodes.vitoria)||(variety==="midnight"&&expectedCodes.midnight)||(color==="white"&&expectedCodes.white)||(color==="red"&&expectedCodes.red)||"";
    if(expected&&barcode&&barcode!==expected)result.push(["atencao","Código de barras","Código diferente da referência geral disponível para este cliente. Verifique o modelo aprovado, a embalagem e a variedade antes de corrigir."]);
    if(client==="caco"&&color!=="white"&&client)result.push(["revisar","CACO","Nas demais variedades, utilizar o código autorizado da fazenda (DOC.CQ.056, p. 10)."]);
    if(client==="tt"&&variety==="isis")result.push(["revisar","T&T · Ísis","Confira a identificação comercial Crimson quando aplicável (p. 17)."]);
    if(client==="assai"&&t)result.push(["revisar","Assaí / Bratrade","Conferir as denominações comerciais Thompson, Vitória e Crimson segundo a cor da uva (pp. 18–19)."]);
    if(["carrefour","sq"].includes(client))result.push(["revisar","Carrefour","Mercado e S&Q usam códigos diferentes; consultar o modelo aprovado específico (pp. 32–33)."]);
    if(client==="outro")result.push(["revisar","Modelo não parametrizado","Obrigatória a conferência com o modelo aprovado pelo cliente."]);
    if(["cumbuca500","cinta500"].includes(kind)&&fields.peso&&/250\s*G/i.test(fields.peso))result.push(["atencao","Peso","O peso informado diverge da embalagem selecionada (500 g)."]);
    if(["cumbuca250","cinta250"].includes(kind)&&fields.peso&&/500\s*G/i.test(fields.peso))result.push(["atencao","Peso","O peso informado diverge da embalagem selecionada (250 g)."]);
    if(fields.rastreio&&t?.[2]&&/^R[-\s]/i.test(fields.rastreio)){
      const found=fields.rastreio.toUpperCase().match(/-([A-Z]{2,3})$/);
      if(found&&found[1]!==t[2])result.push(["atencao","Rastreabilidade","A sigla final "+found[1]+" difere da sigla "+t[2]+" registrada no manual. Confira a etiqueta original."]);
    }
    if(fields.data&&!/^\d{2}\/\d{2}\/20\d{2}$/.test(fields.data))result.push(["atencao","Data","Use DD/MM/AAAA e confira com a data real da embalagem."]);
    if(!labelPhotoFile)result.push(["revisar","Evidência","Nenhuma fotografia anexada. A conferência depende de inspeção visual."]);
    result.push(["revisar","Conferência física","Confirme legibilidade, modelo aprovado, posição e compatibilidade da etiqueta com a ordem de produção (DOC.CQ.056, p. 4)."]);
    const panel=q("#vl-checks");if(panel){
      const missing=result.filter(r=>r[0]==="pendente").length,alert=result.filter(r=>r[0]==="atencao").length;
      q("#vl-count").textContent=missing+" pendência(s) · "+alert+" divergência(s)";
      panel.innerHTML=result.map(item=>'<div class="vl-check vl-check-'+item[0]+'"><span class="vl-check-dot" aria-hidden="true"></span><div><strong>'+safe(item[1])+'</strong><p>'+safe(item[2])+'</p></div></div>').join("");
    }
    return {fields,checklist:result,review_status:result.some(x=>x[0]==="atencao")?"atencao":"pendente"};
  }
  function labelRender(){
    const p=q("#panel");if(!p||me?.role!=="master")return;
    p.innerHTML='<section class="vl-module" aria-label="Verificação de etiquetas">' +
      '<div class="vl-header"><div><span class="vl-kicker">CONTROLE DE QUALIDADE <span>TESTE ADMIN</span></span><h2>Verificação de etiquetas</h2><p>Fotografe a etiqueta, confira a leitura e complete os dados que faltam.</p></div><button class="vl-back" type="button" id="vl-back">Voltar ao painel</button></div>'+
      '<div class="vl-layout"><div class="vl-column">' +
      '<section class="vl-card"><div class="vl-section-head"><span>01 / Fotografia</span><h3>Capture a etiqueta</h3><p>Posicione-a inteira, com boa iluminação e sem reflexos.</p></div>'+
      '<div class="vl-viewbox"><div id="vl-photo-empty"><span class="vl-camera-symbol">▧</span><strong>Nenhuma imagem selecionada</strong><small>Abra a câmera ou envie uma foto</small></div><video id="vl-live" autoplay muted playsinline hidden></video><img id="vl-photo" alt="Foto da etiqueta para conferência" hidden></div>'+
      '<div class="vl-photo-actions"><button type="button" class="vl-primary" id="vl-start">Abrir câmera</button><button type="button" class="vl-primary" id="vl-shot" hidden>Capturar foto</button><label class="vl-file-label">Tirar foto ou escolher arquivo<input id="vl-file" type="file" accept="image/jpeg,image/png,image/webp" capture="environment"></label><button type="button" class="vl-ghost" id="vl-read">Ler texto da etiqueta</button></div>'+
      '<p class="vl-hint">A leitura é feita no aparelho quando disponível. O resultado não substitui a conferência da etiqueta e do modelo comercial.</p></section>'+
      '<section class="vl-card"><div class="vl-section-head"><span>02 / Identificação</span><h3>Produto e destino</h3><p>Escolha o padrão que corresponde à embalagem fotografada.</p></div><div class="vl-form-grid">'+
      '<label>Cliente / marca<select id="vl-client">'+labelOption(labelClients,"Selecione o cliente")+'</select></label>'+
      '<label>Tipo de etiqueta<select id="vl-kind">'+labelOption(labelModels,"Selecione o modelo")+'</select></label>'+
      '<label>Variedade<select id="vl-variety">'+labelOption(labelVarieties,"Selecione a variedade")+'</select></label>'+
      '<label>Classificação<select id="vl-class">'+labelOption(labelClasses.map((n,i)=>[n,n]),"Selecione a classe")+'</select></label>'+
      '</div></section></div><div class="vl-column">'+
      '<section class="vl-card"><div class="vl-section-head"><span>03 / Dados</span><h3>Conferência dos campos</h3><p>Corrija o que a câmera não reconhecer. Os campos são editáveis.</p></div><div class="vl-form-grid">'+
      labelFieldNames.map(([key,name])=>'<label>'+safe(name)+'<input type="text" id="vl-f-'+safe(key)+'" autocomplete="off" placeholder="Não identificado"></label>').join("")+
      '</div><details class="vl-ocr-details"><summary>Texto bruto reconhecido da foto</summary><textarea id="vl-ocr-text" rows="4" placeholder="Texto reconhecido pela câmera (editável)"></textarea></details></section>'+
      '<section class="vl-card"><div class="vl-section-head vl-section-result"><div><span>04 / Resultado</span><h3>Itens para conferir</h3></div><small id="vl-count">Selecione os dados</small></div><div id="vl-checks" class="vl-checks"></div>'+
      '<label class="vl-notes-label">Observações do responsável<textarea id="vl-notes" rows="3" placeholder="Registre ajustes, dúvidas ou itens que deverão ser corrigidos na etiqueta."></textarea></label>'+
      '<label class="vl-confirm"><input id="vl-confirm" type="checkbox"> Eu conferi os dados, o modelo aprovado e a foto. Salvar como registro de conferência, não como aprovação automática.</label>'+
      '<button type="button" id="vl-save" class="vl-primary vl-save">Salvar conferência</button></section></div></div>'+
      '<div id="vl-message" class="vl-notice" hidden></div>'+
      '<section class="vl-card vl-history"><div class="vl-section-head"><span>HISTÓRICO</span><h3>Últimas verificações</h3></div><div id="vl-history">Carregando histórico…</div></section></section>';
    q("#vl-back").addEventListener("click",()=>{stopLabelCamera();revokeLabelPhoto();if(typeof window.showHome==="function")window.showHome();});
    q("#vl-file").addEventListener("change",e=>{if(e.target.files?.[0])chooseLabelPhoto(e.target.files[0]);});
    q("#vl-start").addEventListener("click",labelStartCamera);q("#vl-shot").addEventListener("click",labelCapture);
    q("#vl-read").addEventListener("click",labelRead);
    q("#vl-ocr-text").addEventListener("input",e=>{labelLastText=e.target.value;labelCheck();});
    p.querySelectorAll(".vl-form-grid input,.vl-form-grid select").forEach(el=>el.addEventListener("input",labelCheck));
    q("#vl-save").addEventListener("click",labelSave);
    labelCheck();labelHistory();
  }
  async function labelApi(action,payload={}){
    if(me?.role!=="master")throw Error("Acesso restrito");
    await freshSession();
    const isUpload=action==="save";
    const response=await fetch(settings.url+"/functions/v1/vitra-etiquetas",{
      method:"POST",headers:{apikey:settings.publishableKey,Authorization:"Bearer "+session.access_token,...(!isUpload?{"Content-Type":"application/json"}:{})},
      body:isUpload?payload:JSON.stringify({action,...payload}),cache:"no-store"
    });
    if(!response.ok){let x={};try{x=await response.json();}catch{}throw Error(x.message||"Não foi possível processar a conferência.");}
    return response.json();
  }
  async function labelHistory(){
    try{
      const rows=(await labelApi("history")).rows||[];
      if(!q("#vl-history"))return;
      q("#vl-history").innerHTML=rows.length?rows.map(r=>
        '<div class="vl-history-row"><div><strong>'+safe(labelClients.find(c=>c[0]===r.client)?.[1]||r.client)+'</strong>'+
        '<span>'+safe(labelVarieties.find(c=>c[0]===r.variety)?.[1]||r.variety)+' · '+safe(labelModels.find(c=>c[0]===r.label_kind)?.[1]||r.label_kind)+'</span></div>'+
        '<div><small>'+safe(stamp(r.created_at))+'</small><em>'+safe(r.review_status==="atencao"?"Divergência":r.review_status==="conferido"?"Conferido":"Pendente")+'</em></div></div>'
      ).join(""):'<p class="vl-empty">Nenhuma conferência salva até agora.</p>';
    }catch(e){if(q("#vl-history"))q("#vl-history").textContent="Não foi possível carregar o histórico.";}
  }
  async function labelSave(){
    if(me?.role!=="master")return;
    const client=labelSelected("vl-client"),kind=labelSelected("vl-kind"),variety=labelSelected("vl-variety"),klass=labelSelected("vl-class");
    if(!client||!kind||!variety||!klass){labelNotice("Selecione cliente, tipo de etiqueta, variedade e classificação.",true);return;}
    if(!q("#vl-confirm")?.checked){labelNotice("Confirme a conferência manual antes de registrar.",true);return;}
    const checked=labelCheck(),form=new FormData();
    const payload={client,variety,label_kind:kind,label_class:klass,packaging:labelModels.find(x=>x[0]===kind)?.[2]||"",
      review_status:checked.review_status,detected_text:q("#vl-ocr-text")?.value||"",fields:checked.fields,
      checklist:checked.checklist,notes:q("#vl-notes")?.value||""};
    form.set("action","save");form.set("payload",JSON.stringify(payload));
    if(labelPhotoFile)form.set("photo",labelPhotoFile,labelPhotoFile.name);
    const btn=q("#vl-save");btn.disabled=true;labelNotice("Salvando a conferência no histórico…");
    try{await labelApi("save",form);labelNotice("Conferência registrada no histórico. Nenhum relatório de estoque foi modificado.");q("#vl-confirm").checked=false;await labelHistory();}
    catch(e){labelNotice(e.message||"Falha ao salvar a conferência.",true);}
    finally{if(btn.isConnected)btn.disabled=false;}
  }
  async function openLabelReview(){
    if(me?.role!=="master")return;
    const requestId=++labelRequestId;
    q(".va-account")?.removeAttribute("open");
    if(typeof window.markMain==="function")window.markMain("labels");
    q("#panel").innerHTML='<div class="vl-loading">Verificando acesso ao módulo de etiquetas…</div>';
    try{
      const info=await call("me");
      if(info.profile?.role!=="master"||info.profile?.enabled!==true)throw Error("Acesso reservado ao administrador.");
      await labelApi("history");
      if(requestId!==labelRequestId||me?.role!=="master")return;
      labelRender();
      if(window.innerWidth<=900)q(".vitra-main")?.scrollIntoView({block:"start"});
    }catch(e){if(requestId===labelRequestId)q("#panel").innerHTML='<div class="va-error" role="alert">'+safe(e.message||"Acesso não autorizado")+'</div>';}
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