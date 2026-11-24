/* VITRA Android - shell local, snapshots integrais e sincronização segura. */
(() => {
 "use strict";
 const REPO="M0dustudy/acompanhamento-areas";
 const BASE_SHA="0ff8a2fc0baa404651b289ccb568a70ed0d00e46";
 const ROOT="https://raw.githubusercontent.com/"+REPO+"/main/";
 const CSS=["vitra-access.css","vitra-labels-smart.css","vitra-areas.css"];
 const JS=["vitra-access-config.js","vitra-access.js","vitra-areas.js","vitra-labels-smart.js"];
 const FILES=["index.html",...CSS,...JS];
 const frame=document.querySelector("#view");
 const back=document.querySelector("#back");
 const syncBtn=document.querySelector("#sync");
 const status=document.querySelector("#connection");
 const toast=document.querySelector("#toast");
 const toastMessage=document.querySelector("#toastMessage");
 const apply=document.querySelector("#apply");
 let snapshot=null, nextSnapshot=null, mode="dashboard", syncing=false, lastCheck=0;
 const dbPromise=new Promise((resolve,reject)=>{
   const req=indexedDB.open("vitra-mobile-snapshot-v1",1);
   req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("app"))req.result.createObjectStore("app")};
   req.onerror=()=>reject(req.error);
   req.onsuccess=()=>resolve(req.result);
 });
 async function dbGet(key){
   const db=await dbPromise;
   return await new Promise((res,rej)=>{
     const request=db.transaction("app","readonly").objectStore("app").get(key);
     request.onsuccess=()=>res(request.result||null);
     request.onerror=()=>rej(request.error);
   });
 }
 async function dbSet(key,value){
   const db=await dbPromise;
   return await new Promise((res,rej)=>{
     const tx=db.transaction("app","readwrite");
     tx.objectStore("app").put(value,key);
     tx.oncomplete=res;
     tx.onerror=()=>rej(tx.error);
     tx.onabort=()=>rej(tx.error);
   });
 }
 function connected(){return navigator.onLine}
 function updateStatus(label){
   status.textContent=label||(connected()?"Conectado":"Sem internet");
 }
 function notify(message,canApply){
   toastMessage.textContent=message;
   apply.style.display=canApply?"inline-block":"none";
   toast.dataset.show="true";
 }
 function dismiss(){toast.dataset.show="false"}
 function setDocMode(value){mode=value;back.style.display=value==="pdf"?"block":"none";}
 function mountDashboard(){
   dismiss();setDocMode("dashboard");
   if(snapshot?.html){
     frame.removeAttribute("src");
     frame.srcdoc=snapshot.html;
   }else{
     frame.removeAttribute("srcdoc");
     frame.src="./dashboard.html";
   }
 }
 function openPdf(href){
   const url=new URL(href,location.href);
   if(url.origin!==location.origin || !url.pathname.endsWith("/visualizador.html"))return;
   dismiss();setDocMode("pdf");
   frame.removeAttribute("srcdoc");
   frame.src="./visualizador.html"+url.search;
 }
 function installNavigation(){
   try{
     const doc=frame.contentDocument;
     if(!doc)return;
     doc.addEventListener("click",event=>{
       const anchor=event.target.closest?.("a[href]");
       if(!anchor)return;
       const url=new URL(anchor.href,location.href);
       if(url.origin!==location.origin)return;
       if(url.pathname.endsWith("/visualizador.html")){
         event.preventDefault();openPdf(url.href);
       }else if(mode==="pdf" && (url.pathname==="/" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/dashboard.html"))){
         event.preventDefault();mountDashboard();
       }
     },true);
     if(mode!=="dashboard")return;
     let touchY=null;
     doc.addEventListener("touchstart",e=>{
       touchY=null;
       if(e.touches.length!==1 || e.target.closest?.("input,textarea,select,[contenteditable=true]"))return;
       const y=doc.scrollingElement?.scrollTop||0;
       if(y<5)touchY=e.touches[0].clientY;
     },{passive:true});
     doc.addEventListener("touchend",e=>{
       if(touchY===null || !e.changedTouches.length)return;
       const diff=e.changedTouches[0].clientY-touchY;
       touchY=null;
       if(diff>125)check(true);
     },{passive:true});
   }catch(e){console.warn("VITRA: navegação interna indisponível",e)}
 }
 frame.addEventListener("load",installNavigation);
 back.addEventListener("click",mountDashboard);
 apply.addEventListener("click",()=>{
   if(nextSnapshot){snapshot=nextSnapshot;nextSnapshot=null;mountDashboard()}
 });
 function assemble(fetched){
   let html=fetched["index.html"];
   const scriptFound=new Set(),cssFound=new Set();
   html=html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="\.\/([^"?]+)(?:\?[^"]*)?"[^>]*>/gi,(all,name)=>{
     if(!CSS.includes(name))return all;
     cssFound.add(name);
     const contents=fetched[name].replace(/<\/style/gi,"<\\/style");
     return '<style data-vitra-mobile="'+name+'">'+contents+"</style>";
   });
   html=html.replace(/<script\b[^>]*src="\.\/([^"?]+)(?:\?[^"]*)?"[^>]*><\/script>/gi,(all,name)=>{
     if(name==="vitra-auto-update.js")return "";
     if(!JS.includes(name))return all;
     scriptFound.add(name);
     return "";
   });
   if(cssFound.size!==CSS.length||scriptFound.size!==JS.length)
     throw new Error("O formato do site mudou. Mantendo os dados anteriores.");
   const closer="</scr"+"ipt>";
   const inline=JS.map(name=>{
     let source=fetched[name];
     if(name==="vitra-access.js"){
       const start='} catch (err) {\\n      session = null; me = null; remember();'.replace(/\\n/g,"\n");
       if(!source.includes(start))throw new Error("Fluxo de autenticação incompatível");
       source=source.replace(start,'} catch (err) {\n      if (!navigator.onLine) return;\n      session = null; me = null; remember();');
     }
     return '<script data-vitra-mobile="'+name+'">'+source.replace(/<\/script/gi,"<\\/script")+closer;
   }).join("\n");
   html=html.replace(/<head>/i,'<head><base href="'+location.origin+'/">');
   if(!html.includes("</body>"))throw new Error("Página principal incompleta.");
   return html.replace(/<\/body>/i,inline+"</body>");
 }
 async function fetchText(path){
   const response=await fetch(ROOT+path+"?t="+Date.now(),{cache:"no-store"});
   if(!response.ok)throw new Error("Não foi possível receber "+path);
   return response.text();
 }
 async function check(manual=false){
   if(syncing)return;
   if(!connected()){
     updateStatus("Sem internet");
     if(manual)notify("Sem conexão. As avaliações previamente disponíveis e PDFs já abertos continuam no aparelho.",false);
     return;
   }
   syncing=true;lastCheck=Date.now();syncBtn.disabled=true;
   updateStatus("Sincronizando…");
   try{
     const response=await fetch("https://api.github.com/repos/"+REPO+"/commits/main",{cache:"no-store"});
     if(!response.ok)throw new Error("Verificação da versão indisponível");
     const version=(await response.json()).sha;
     if(!/^[a-f0-9]{40}$/.test(version))throw new Error("Resposta inválida do repositório");
     const current=snapshot?.sha||BASE_SHA;
     if(version===current){
       updateStatus("Atualizado");
       if(manual)notify("As avaliações já estão na versão mais recente disponível.",false);
       return;
     }
     const pairs=await Promise.all(FILES.map(async name=>[name,await fetchText(name)]));
     const data=Object.fromEntries(pairs);
     const html=assemble(data);
     // Apenas após receber e validar todos os recursos atualizamos o snapshot.
     const candidate={sha:version,html,at:new Date().toISOString()};
     await dbSet("latest",candidate);
     nextSnapshot=candidate;
     updateStatus("Nova versão");
     notify("Novos dados do VITRA foram guardados no celular. Abra a atualização quando for conveniente.",true);
   }catch(error){
     console.warn("VITRA: sincronização",error);
     updateStatus("Dados locais");
     if(manual)notify("Não foi possível sincronizar agora. Os registros locais foram preservados.",false);
   }finally{syncing=false;syncBtn.disabled=false}
 }
 syncBtn.addEventListener("click",()=>{check(true);try{frame.contentWindow?.VitraAreas?.refresh?.()}catch{}});
 window.addEventListener("online",()=>check(false));
 window.addEventListener("offline",()=>updateStatus("Sem internet"));
 document.addEventListener("visibilitychange",()=>{
   if(!document.hidden && Date.now()-lastCheck>120000)check(false);
 });
 setInterval(()=>{if(!document.hidden&&Date.now()-lastCheck>120000)check(false)},30000);
 dbGet("latest").then(saved=>{
   if(saved?.html && /^[a-f0-9]{40}$/.test(saved.sha)){
     snapshot=saved;mountDashboard();
   }
 }).catch(error=>console.warn("VITRA: armazenamento",error)).finally(()=>{
   updateStatus();if(connected())check(false);
 });
})();
