/* VITRA Android: painel original, atualização discreta e consulta offline. */
(()=>{
"use strict";
const REPO="M0dustudy/acompanhamento-areas";
const BASE_SHA="0ff8a2fc0baa404651b289ccb568a70ed0d00e46";
const CSS=["vitra-access.css","vitra-labels-smart.css","vitra-areas.css"];
const JS=["vitra-access-config.js","vitra-access.js","vitra-areas.js","vitra-labels-smart.js"];
const FILES=["index.html",...CSS,...JS];
const FRAME=document.querySelector("#view");
const STATUS=document.querySelector("#sync-status");
const STATUS_LABEL=document.querySelector("#sync-label");
const POLL_MS=90000; // a cada 90 segundos, e imediatamente ao puxar para baixo
let snapshot=null,pending=null,mode="dashboard",syncing=false,lastCheck=0;
let statusTimer=0,noticeToken=0;
const dbPromise=new Promise((resolve,reject)=>{
 const req=indexedDB.open("vitra-mobile-snapshot-v1",1);
 req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("app"))req.result.createObjectStore("app")};
 req.onsuccess=()=>resolve(req.result);
 req.onerror=()=>reject(req.error);
});
async function getSaved(){
 const db=await dbPromise;
 return new Promise((resolve,reject)=>{
  const req=db.transaction("app","readonly").objectStore("app").get("latest");
  req.onsuccess=()=>resolve(req.result||null);
  req.onerror=()=>reject(req.error);
 });
}
async function saveSnapshot(value){
 const db=await dbPromise;
 return new Promise((resolve,reject)=>{
  const tx=db.transaction("app","readwrite");
  tx.objectStore("app").put(value,"latest");
  tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);
 });
}
function indicator(message,hold=0){
 clearTimeout(statusTimer);
 const token=++noticeToken;
 const state=message==="Sincronizando..."?"loading":message==="Atualizado"?"success":message?"notice":"";
 STATUS.dataset.mode=state;
 STATUS_LABEL.textContent=state==="loading"?"":state==="success"?"Sincronizado":message;
 STATUS.classList.toggle("visible",!!state);
 if(hold>0)statusTimer=setTimeout(()=>{
  if(token===noticeToken){STATUS.classList.remove("visible");STATUS.dataset.mode="";}
 },hold);
}
function isModalOpen(){
 try{return !!FRAME.contentDocument?.querySelector("#va-area-modal,#va-management-modal")}catch{return false}
}
function canApplyAutomatically(){
 if(mode!=="dashboard"||isModalOpen())return false;
 try{
  const doc=FRAME.contentDocument;
  if(!doc)return false;
  if(doc.querySelector("input:focus,textarea:focus,select:focus,[contenteditable=true]:focus"))return false;
  if(doc.querySelector("#panel .workspace-title,#panel .stockpanel,#panel .vl-module"))return false;
  return true;
 }catch{return false}
}
function navigateDashboard(){
 mode="dashboard";
 if(pending){snapshot=pending;pending=null}
 if(snapshot?.html){
  FRAME.removeAttribute("src");
  FRAME.srcdoc=snapshot.html;
 }else{
  FRAME.removeAttribute("srcdoc");
  FRAME.src="./dashboard.html";
 }
}
function openPdf(href){
 const url=new URL(href,location.href);
 if(url.origin!==location.origin||!url.pathname.endsWith("/visualizador.html"))return;
 mode="pdf";
 FRAME.removeAttribute("srcdoc");
 FRAME.src="./visualizador.html"+url.search;
}
function atTop(element,doc){
 let node=element;
 while(node&&node!==doc.body&&node!==doc.documentElement){
  if(node.scrollHeight>node.clientHeight+6&&node.scrollTop>5)return false;
  node=node.parentElement;
 }
 return (doc.scrollingElement?.scrollTop||0)<5;
}
function installFrameHandlers(){
 const doc=FRAME.contentDocument;
 if(!doc)return;
 doc.addEventListener("click",event=>{
  const a=event.target.closest?.("a[href]");
  if(!a)return;
  let url;try{url=new URL(a.href,location.href)}catch{return}
  if(url.origin!==location.origin)return;
  if(url.pathname.endsWith("/visualizador.html")){
   event.preventDefault();openPdf(url.href);
  }else if(mode==="pdf"&&["/","/index.html","/dashboard.html"].includes(url.pathname)){
   event.preventDefault();navigateDashboard();
  }
 },true);
 if(mode!=="dashboard")return;
 let touchStart=null;
 doc.addEventListener("touchstart",event=>{
  touchStart=null;
  if(event.touches.length!==1)return;
  const target=event.target;
  if(target.closest?.("input,textarea,select,[contenteditable=true],.va-area-modal"))return;
  if(atTop(target,doc))touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY};
 },{passive:true});
 doc.addEventListener("touchend",event=>{
  if(!touchStart||event.changedTouches.length!==1)return;
  const dx=event.changedTouches[0].clientX-touchStart.x;
  const dy=event.changedTouches[0].clientY-touchStart.y;
  touchStart=null;
  if(dy>115&&Math.abs(dx)<75)check(true);
 },{passive:true});
 if(pending&&canApplyAutomatically())applyPending(false);
}
FRAME.addEventListener("load",installFrameHandlers);
function assemble(fetched){
 let html=fetched["index.html"];
 const cssFound=new Set(),jsFound=new Set();
 html=html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="\.\/([^"?]+)(?:\?[^"]*)?"[^>]*>/gi,(tag,name)=>{
  if(!CSS.includes(name))return tag;
  cssFound.add(name);
  return '<style data-vitra-mobile="'+name+'">'+fetched[name].replace(/<\/style/gi,"<\\/style")+"</style>";
 });
 html=html.replace(/<script\b[^>]*src="\.\/([^"?]+)(?:\?[^"]*)?"[^>]*><\/script>/gi,(tag,name)=>{
  if(name==="vitra-auto-update.js")return "";
  if(!JS.includes(name))return tag;
  jsFound.add(name);
  return "";
 });
 if(cssFound.size!==CSS.length||jsFound.size!==JS.length)throw Error("Recursos do site não correspondem à versão atual. Dados anteriores mantidos.");
 const close="</scr"+"ipt>";
 const inline=JS.map(name=>{
  let source=fetched[name];
  if(name==="vitra-access.js"){
   const target="} catch (err) {\n      session = null; me = null; remember();";
   if(!source.includes(target))throw Error("Autenticação alterada; conferir antes de atualizar.");
   source=source.replace(target,"} catch (err) {\n      if (!navigator.onLine) return;\n      session = null; me = null; remember();");
  }
  return '<script data-vitra-mobile="'+name+'">'+source.replace(/<\/script/gi,"<\\/script")+close;
 }).join("\n");
 html=html.replace(/<head>/i,'<head><base href="'+location.origin+'/">');
 if(!html.includes("</body>"))throw Error("Página VITRA incompleta");
 return html.replace(/<\/body>/i,inline+"</body>");
}
async function fetchText(path,sha){
 const url="https://raw.githubusercontent.com/"+REPO+"/"+sha+"/"+path;
 const r=await fetch(url,{cache:"no-store",signal:AbortSignal.timeout(15000)});
 if(!r.ok)throw Error("Recurso temporariamente indisponível: "+path);
 return r.text();
}
async function applyPending(manual){
 if(!pending||mode!=="dashboard"||isModalOpen())return false;
 snapshot=pending;pending=null;
 const target=snapshot.html;
 await new Promise(resolve=>{
  let finished=false;
  const done=()=>{if(finished)return;finished=true;FRAME.removeEventListener("load",done);resolve()};
  FRAME.addEventListener("load",done);
  FRAME.removeAttribute("src");
  FRAME.srcdoc=target;
  setTimeout(done,8000);
 });
 if(manual)indicator("Atualizado",1050);
 return true;
}
async function refreshAreaEvents(){
 try{await FRAME.contentWindow?.VitraAreas?.refresh?.()}catch{}
}
async function check(manual=false){
 if(syncing)return;
 if(!navigator.onLine){
  if(manual)indicator("Sem internet",1000);
  return;
 }
 syncing=true;lastCheck=Date.now();
 if(manual)indicator("Sincronizando...");
 try{
  const versionResponse=await fetch("https://api.github.com/repos/"+REPO+"/commits/main",{cache:"no-store",signal:AbortSignal.timeout(15000)});
  if(!versionResponse.ok)throw Error("Não foi possível verificar a versão");
  const sha=(await versionResponse.json()).sha;
  if(!/^[a-f0-9]{40}$/.test(sha))throw Error("Versão inválida");
  await refreshAreaEvents();
  const current=pending?.sha||snapshot?.sha||BASE_SHA;
  if(sha!==current){
   const fetched=Object.fromEntries(await Promise.all(FILES.map(async name=>[name,await fetchText(name,sha)])));
   const newHtml=assemble(fetched);
   // O snapshot anterior só é substituído depois de validar todos os arquivos.
   const candidate={sha,html:newHtml,at:new Date().toISOString()};
   await saveSnapshot(candidate);
   pending=candidate;
   if(manual||canApplyAutomatically()){
    const applied=await applyPending(manual);
    if(!applied&&manual)indicator("",0);
   }else if(manual)indicator("",0);
  }else if(manual){
   if(pending)await applyPending(true);
   else indicator("",0); // não anunciar "atualizado" sem mudanças reais
  }
 }catch(error){
  console.warn("VITRA: sincronização sem perda de histórico",error);
  if(manual)indicator("Não foi possível sincronizar",1250);
 }finally{syncing=false}
}
window.addEventListener("online",()=>{if(Date.now()-lastCheck>30000)check(false)});
document.addEventListener("visibilitychange",()=>{
 if(!document.hidden){
  if(pending&&canApplyAutomatically())applyPending(false);
  if(Date.now()-lastCheck>45000)check(false);
 }
});
setInterval(()=>{
 if(!document.hidden&&Date.now()-lastCheck>=POLL_MS)check(false);
},15000);
getSaved().then(saved=>{
 if(saved?.html&&/^[a-f0-9]{40}$/.test(saved.sha)){
  snapshot=saved;navigateDashboard();
 }
}).catch(error=>console.warn("VITRA: dados locais preservados",error)).finally(()=>{
 if(navigator.onLine)check(false);
});
})();
