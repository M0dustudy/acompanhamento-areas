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
function updateCounters(){
 // Os seis indicadores da tela inicial são criados uma vez e precisam refletir os movimentos.
 for(const [key,areas] of Object.entries(groups)){
   const count=String(areas.length);
   document.querySelectorAll('#vitraKpis .vitra-kpi[data-section="'+key+'"] strong').forEach(el=>{
     if(el.textContent!==count)el.textContent=count;
   });
   document.querySelectorAll('#cards [data-main="'+key+'"] .n').forEach(el=>{
     if(el.textContent!==count)el.textContent=count;
   });
 }
}

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
  }else if(event.action==="pause"){
    area.lastPauseDate=date;
    note(code,(event.from_status==="acomp"?"Acompanhamento pausado":"Colheita pausada")+" em "+date+".");
  }else if(event.action==="resume"){
    area.lastResumeDate=date;
    if(!area.harvestStartDate){
      area.harvestStartDate=date;
      note(code,"Colheita iniciada em "+date+".");
    }else note(code,"Colheita retomada em "+date+".");
  }else if(event.action==="finish"){
    if(!area.finalizedDate){area.finalizedDate=date;changed=true}
    note(code,"Colheita finalizada em "+date+".");
  }
  applied.add(event.id);
 }
 updateCounters();
 if(changed&&typeof render==="function"&&typeof st!=="undefined"&&st)render();
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
function showAdmin(){window.VITRA_IS_MASTER=role==="master";}
function openModal(areaCode){
 if(role!=="master"||!/^\d{3}[AB]$/.test(String(areaCode||""))||!A[areaCode])return;
 const current=groupOf(areaCode);
 const options={
   acomp:[{op:"start",label:"Iniciar colheita",to:"Em colheita"},{op:"pause",label:"Pausar área",to:"Pausada"}],
   colh:[{op:"pause",label:"Pausar colheita",to:"Pausada"},{op:"finish",label:"Finalizar colheita",to:"Finalizada"}],
   pausa:[{op:"resume",label:"Retomar colheita",to:"Em colheita"}]
 }[current]||[];
 if(!options.length)return;
 q("#va-area-modal")?.remove();
 const wrap=document.createElement("div");
 wrap.id="va-area-modal";wrap.className="va-area-backdrop";
 const area=A[areaCode];
 wrap.innerHTML='<section class="va-area-modal" role="dialog" aria-modal="true" aria-labelledby="va-area-title">'+
 '<div class="va-area-top"><h2 id="va-area-title">'+esc(areaCode)+' · '+esc(area.v||"Área")+'</h2><button type="button" class="va-area-close" aria-label="Fechar">×</button></div>'+
 '<p class="va-area-intro">Situação atual: <strong>'+esc({acomp:"Acompanhamento",colh:"Em colheita",pausa:"Pausada"}[current])+'</strong></p>'+
 '<form id="va-area-form"><fieldset class="va-area-options"><legend>Alterar para</legend>'+
 options.map((choice,i)=>'<label class="va-area-option"><input type="radio" name="operation" value="'+choice.op+'" '+(i===0?"checked":"")+'><span>'+esc(choice.label)+'</span></label>').join("")+'</fieldset>'+
 '<label class="va-area-field">Data da movimentação<input type="date" name="date" required></label>'+
 '<div class="va-area-summary" role="status"></div><button class="va-area-save" type="submit">Confirmar movimentação</button><p class="va-area-feedback" role="status" aria-live="polite"></p></form></section>';
 document.body.appendChild(wrap);
 const close=()=>wrap.remove();
 wrap.addEventListener("click",event=>{if(event.target===wrap)close()});
 q(".va-area-close",wrap).addEventListener("click",close);
 const form=q("#va-area-form",wrap),date=q('input[name="date"]',form);
 const summary=q(".va-area-summary",form),save=q(".va-area-save",form),feedback=q(".va-area-feedback",form);
 let requestId=null;
 date.value=today();date.max=today();
 const currentChoice=()=>options.find(x=>x.op===q('input[name="operation"]:checked',form)?.value)||options[0];
 function update(){
   requestId=null;
   const choice=currentChoice();
   save.disabled=busy;save.textContent="Confirmar: "+choice.label.toLowerCase();
   const earlier=area.harvestStartDate&&["finish","pause"].includes(choice.op)?
     "<br>Início da colheita preservado: "+esc(area.harvestStartDate)+".":"";
   summary.innerHTML="<strong>"+esc(areaCode)+" → "+esc(choice.to)+"</strong>Data: "+esc(pt(date.value))+"."+earlier;
   feedback.textContent="";feedback.dataset.ok="false";
 }
 form.querySelectorAll('input[name="operation"]').forEach(el=>el.addEventListener("change",update));
 date.addEventListener("input",update);
 form.addEventListener("submit",async event=>{
   event.preventDefault();if(busy||!date.value)return;
   const choice=currentChoice();
   busy=true;save.disabled=true;feedback.textContent="Registrando...";
   if(!requestId)requestId=crypto.randomUUID();
   try{
     await request("change",{area:areaCode,operation:choice.op,date:date.value,request_id:requestId});
     const ok=await refresh();
     if(!ok){
       feedback.textContent="Registrado no servidor. A atualização visual será aplicada na próxima sincronização.";
       feedback.dataset.ok="true";
       save.disabled=true;
     }else{
       close();
     }
   }catch(error){
     feedback.dataset.ok="false";feedback.textContent=error.message;
     save.disabled=false;
   }finally{busy=false}
 });
 update();
}
document.addEventListener("click",event=>{
 const btn=event.target.closest?.(".va-area-manage[data-vitra-area]");
 if(!btn)return;
 event.preventDefault();
 openModal(btn.dataset.vitraArea);
});
window.addEventListener("vitra:authenticated",e=>{
 role=e.detail?.role||null;
 if(role==="master")showAdmin();else{window.VITRA_IS_MASTER=false;remove();}
 try{const cache=JSON.parse(localStorage.getItem(CACHE)||"[]");if(Array.isArray(cache))apply(cache)}catch{}
 refresh();
});
window.addEventListener("vitra:logout",()=>{role=null;window.VITRA_IS_MASTER=false;remove()});
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&role)refresh()});
setInterval(()=>{if(role&&!document.hidden)refresh()},120000);
window.VitraAreas={refresh,open:openModal};
})();
