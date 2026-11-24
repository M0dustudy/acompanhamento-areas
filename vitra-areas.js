/* VITRA: movimentos administrativos de colheita, com registro no servidor. */
(()=>{
"use strict";
const CFG=window.VITRA_ACCESS_CONFIG||{},API=String(CFG.url||"")+"/functions/v1/vitra-areas",CACHE="vitra_area_events_v1";
let role=null,busy=false;
const applied=new Set();
const base=typeof vitraAreaLastAppliedEvent==="number"?vitraAreaLastAppliedEvent:0;
const q=(s,p=document)=>p.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pt=s=>/^\d{4}-\d{2}-\d{2}$/.test(s||"")?s.slice(8)+"/"+s.slice(5,7)+"/"+s.slice(0,4):s;
const today=()=>{
 const x=new Intl.DateTimeFormat("en-US",{timeZone:"America/Recife",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
 const p=Object.fromEntries(x.filter(z=>z.type!=="literal").map(z=>[z.type,z.value]));
 return p.year+"-"+p.month+"-"+p.day;
};
const groupOf=code=>Object.keys(groups).find(key=>groups[key].includes(code));
function note(area,text){
 A[area].note=(String(A[area].note||"").includes(text)?A[area].note:(String(A[area].note||"")+" "+text).trim());
}
function apply(events){
 let changed=false;
 for(const event of events){
  if(!Number.isSafeInteger(event.id)||event.id<=base||applied.has(event.id))continue;
  const code=event.area,area=A[code];
  if(!area||!/^\d{3}[AB]$/.test(code))continue;
  const current=groupOf(code),date=pt(event.effective_date);
  if(current!==event.from_status&&current!==event.to_status){
    console.warn("VITRA: divergência no estado da área",code);continue;
  }
  if(event.action==="start"&&area.harvestStartDate&&area.harvestStartDate!==date){
    console.warn("VITRA: data de início divergente",code);continue;
  }
  if(event.action==="finish"&&area.finalizedDate&&area.finalizedDate!==date){
    console.warn("VITRA: data de finalização divergente",code);continue;
  }
  if(current===event.from_status){
    groups[event.from_status]=groups[event.from_status].filter(x=>x!==code);
    if(!groups[event.to_status].includes(code))groups[event.to_status].push(code);
    groups[event.to_status].sort((a,b)=>a.localeCompare(b,"pt-BR",{numeric:true}));
    changed=true;
  }
  if(event.action==="start"){
    if(!area.harvestStartDate){area.harvestStartDate=date;changed=true}
    note(code,"Colheita iniciada em "+date+".");
  }else if(event.action==="finish"){
    if(!area.finalizedDate){area.finalizedDate=date;changed=true}
    note(code,"Colheita finalizada em "+date+".");
  }
  applied.add(event.id);
 }
 if(changed){
   for(const [key,values] of Object.entries(groups)){
    const card=document.querySelector('#cards [data-main="'+key+'"] .n');
    if(card)card.textContent=String(values.length);
   }
   if(typeof showHome==="function")showHome();
 }
}
async function request(action,payload={}){
 const session=JSON.parse(sessionStorage.getItem("vitra_access_session_v1")||"null");
 if(!session?.access_token)throw Error("É necessário entrar no VITRA novamente.");
 if(!navigator.onLine)throw Error("Conecte-se à internet para salvar ou sincronizar.");
 const resp=await fetch(API,{method:"POST",cache:"no-store",headers:{
   "Content-Type":"application/json","apikey":CFG.publishableKey,"Authorization":"Bearer "+session.access_token
 },body:JSON.stringify({action,...payload})});
 const data=await resp.json().catch(()=>null);
 if(!resp.ok||!data?.ok)throw Error(data?.message||"Falha ao comunicar com o servidor");
 return data;
}
async function refresh(){
 if(!role||!navigator.onLine)return false;
 try{
   const data=await request("list");
   localStorage.setItem(CACHE,JSON.stringify(data.events));
   apply(data.events);
   return true;
 }catch(e){console.warn("VITRA: sincronização de áreas",e.message);return false}
}
function remove(){q("#va-area-admin-card")?.remove();q("#va-area-modal")?.remove()}
function showAdmin(){
 if(role!=="master"||q("#va-area-admin-card"))return;
 const cards=q("#cards");if(!cards)return;
 const button=document.createElement("button");
 button.id="va-area-admin-card";button.type="button";button.className="card va-area-card";
 button.dataset.main="area-movements";
 button.innerHTML='<span class="va-area-symbol">↗</span><b>MOVIMENTAR ÁREAS</b><small>Iniciar ou finalizar a colheita</small>';
 button.addEventListener("click",openModal);
 cards.appendChild(button);
}
function openModal(){
 if(role!=="master")return;
 q("#va-area-modal")?.remove();
 const wrap=document.createElement("div");
 wrap.id="va-area-modal";wrap.className="va-area-backdrop";
 wrap.innerHTML='<section class="va-area-modal" role="dialog" aria-modal="true" aria-labelledby="va-area-title">'+
 '<div class="va-area-top"><h2 id="va-area-title">Movimentar áreas</h2><button type="button" class="va-area-close" aria-label="Fechar">×</button></div>'+
 '<p class="va-area-intro">Escolha uma área e confira a data. As avaliações e documentos originais serão preservados.</p>'+
 '<div class="va-area-switch"><button type="button" data-op="start" aria-pressed="false">Iniciar colheita</button><button type="button" data-op="finish" aria-pressed="true">Finalizar colheita</button></div>'+
 '<form id="va-area-form"><label class="va-area-field">Área<select name="area" required></select></label>'+
 '<label class="va-area-field">Data do movimento<input type="date" name="date" required></label>'+
 '<div class="va-area-summary" role="status"></div><button class="va-area-save" type="submit">Confirmar</button><p class="va-area-feedback" role="status"></p></form></section>';
 document.body.appendChild(wrap);
 const close=()=>wrap.remove();
 wrap.addEventListener("click",e=>{if(e.target===wrap)close()});
 q(".va-area-close",wrap).addEventListener("click",close);
 const form=q("#va-area-form",wrap),select=q('select[name="area"]',form),date=q('input[name="date"]',form);
 const summary=q(".va-area-summary",form),save=q(".va-area-save",form),feedback=q(".va-area-feedback",form);
 let op="finish",requestId=null;
 date.value=today();date.max=today();
 function update(keep=true){
  feedback.textContent="";feedback.dataset.ok="false";
  const allowed=op==="start"?[...groups.acomp,...groups.pausa]:[...groups.colh];
  allowed.sort((a,b)=>a.localeCompare(b,"pt-BR",{numeric:true}));
  const previous=keep?select.value:"";
  select.replaceChildren();
  for(const id of allowed)select.add(new Option(id+" · "+String(A[id]?.v||"Variedade não identificada"),id));
  if(previous&&allowed.includes(previous))select.value=previous;
  const area=A[select.value],id=select.value;
  save.disabled=busy||!id;
  save.textContent=op==="start"?"Confirmar início da colheita":"Confirmar finalização";
  if(!id){summary.textContent="Não há áreas disponíveis para esta operação.";return}
  summary.innerHTML="<strong>"+esc(id)+" · "+esc(area.v)+"</strong>"+
    (op==="start"?"Início":"Finalização")+" em "+esc(pt(date.value))+". "+
    (op==="finish"&&area.harvestStartDate?"Data de início preservada: "+esc(area.harvestStartDate)+". ":"")+
    "Os resultados, registros e relatórios anteriores permanecerão intactos.";
 }
 wrap.querySelectorAll("[data-op]").forEach(button=>button.addEventListener("click",()=>{
   op=button.dataset.op;requestId=null;
   wrap.querySelectorAll("[data-op]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
   update(false);
 }));
 select.addEventListener("change",()=>{requestId=null;update(true)});
 date.addEventListener("change",()=>{requestId=null;update(true)});
 form.addEventListener("submit",async e=>{
   e.preventDefault();if(busy||!select.value)return;
   busy=true;save.disabled=true;feedback.textContent="Registrando movimentação…";
   if(!requestId)requestId=crypto.randomUUID();
   try{
    await request("change",{area:select.value,operation:op,date:date.value,request_id:requestId});
    const synced=await refresh();
    if(synced)update(false);
    feedback.dataset.ok="true";
    feedback.textContent=synced?"Registrado. A publicação no GitHub ocorre na sincronização automática.":"Registrado no servidor; consulte novamente quando houver conexão.";
    requestId=null;save.disabled=!synced;
   }catch(error){feedback.dataset.ok="false";feedback.textContent=error.message;save.disabled=false}
   finally{busy=false}
 });
 update();
}
window.addEventListener("vitra:authenticated",e=>{
 role=e.detail?.role||null;
 if(role==="master")showAdmin();else remove();
 try{const cache=JSON.parse(localStorage.getItem(CACHE)||"[]");if(Array.isArray(cache))apply(cache)}catch{}
 refresh();
});
window.addEventListener("vitra:logout",()=>{role=null;remove()});
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&role)refresh()});
setInterval(()=>{if(role&&!document.hidden)refresh()},120000);
window.VitraAreas={refresh};
})();
