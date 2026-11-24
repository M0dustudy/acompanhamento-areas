/* VITRA — reconciliação de movimentações do Supabase com o GitHub (main).
   Execução idempotente, com verificação de integridade e sem alterar medições. */
import {readFileSync,writeFileSync} from "node:fs";
import vm from "node:vm";
const endpoint="https://avzdnzzohryokzyrxnap.supabase.co/functions/v1/vitra-areas?scope=publish";
const response=await fetch(endpoint,{headers:{"accept":"application/json"},signal:AbortSignal.timeout(20000)});
if(!response.ok)throw Error("Operações VITRA indisponíveis: HTTP "+response.status);
const payload=await response.json();
if(payload?.ok!==true||!Array.isArray(payload.events))throw Error("Resposta inválida do servidor");
const original=readFileSync("index.html","utf8");
const gm=original.match(/const groups=(\{.*?\});/);
const am=original.match(/const A=(\{.*?\});\n\/\/ Data original de colheita/s);
const mm=original.match(/const vitraAreaLastAppliedEvent=(\d+);/);
const stock=original.match(/const stockData=(\[.*?\]);\n/s);
if(!gm||!am||!mm||!stock)throw Error("Estrutura oficial de dados não reconhecida. Nenhuma alteração será feita.");
const groups=JSON.parse(gm[1]),areas=JSON.parse(am[1]);
const nAreas=Object.keys(areas).length,nStock=JSON.parse(stock[1]).length;
const count=Object.values(groups).flat().length;
let marker=Number(mm[1]);
const initialMarker=marker;
if(!Number.isSafeInteger(marker))throw Error("Marcador inválido");
const toBr=s=>s.slice(8)+"/"+s.slice(5,7)+"/"+s.slice(0,4);
const state=area=>Object.keys(groups).find(key=>groups[key].includes(area));
for(const e of payload.events){
 if(!Number.isSafeInteger(e.id)||e.id<=marker)continue;
 if(e.id<=0||!/^\d{3}[AB]$/.test(e.area)||!areas[e.area]||
   !["start","pause","resume","finish"].includes(e.action)||!/^\d{4}-\d{2}-\d{2}$/.test(e.effective_date)||
   !["acomp","pausa","colh"].includes(e.from_status)||!["colh","pausa","fim"].includes(e.to_status))
   throw Error("Evento inválido: "+e.id);
 const allowed=(e.action==="start"&&e.from_status==="acomp"&&e.to_status==="colh")||
   (e.action==="pause"&&["acomp","colh"].includes(e.from_status)&&e.to_status==="pausa")||
   (e.action==="resume"&&e.from_status==="pausa"&&e.to_status==="colh")||
   (e.action==="finish"&&e.from_status==="colh"&&e.to_status==="fim");
 if(!allowed)throw Error("Transição inconsistente no evento "+e.id);
 const current=state(e.area);
 if(current!==e.from_status&&current!==e.to_status)
   throw Error("Conflito da área "+e.area+": GitHub="+current+" evento="+e.from_status+"→"+e.to_status);
 const field=areas[e.area],date=toBr(e.effective_date);
 const putNote=annotation=>{if(!String(field.note||"").includes(annotation))field.note=(String(field.note||"")+" "+annotation).trim()};
 if(e.action==="start"){
   if(field.harvestStartDate&&field.harvestStartDate!==date)throw Error("Data de início divergente, área "+e.area);
   field.harvestStartDate=date;putNote("Colheita iniciada em "+date+".");
 }else if(e.action==="pause"){
   field.lastPauseDate=date;
   putNote((e.from_status==="acomp"?"Acompanhamento":"Colheita")+" pausado em "+date+".");
 }else if(e.action==="resume"){
   field.lastResumeDate=date;
   if(!field.harvestStartDate){field.harvestStartDate=date;putNote("Colheita iniciada em "+date+".");}
   else putNote("Colheita retomada em "+date+".");
 }else if(e.action==="finish"){
   if(field.finalizedDate&&field.finalizedDate!==date)throw Error("Data de finalização divergente, área "+e.area);
   field.finalizedDate=date;putNote("Colheita finalizada em "+date+".");
 }
 if(current===e.from_status){
   groups[current]=groups[current].filter(x=>x!==e.area);
   groups[e.to_status].push(e.area);
   groups[e.to_status].sort((a,b)=>a.localeCompare(b,"pt-BR",{numeric:true}));
 }
 marker=e.id;
}
if(marker===initialMarker){console.log("VITRA: nenhuma movimentação nova. Último evento="+marker);process.exit(0);}
let updated=original.replace(gm[1],JSON.stringify(groups)).replace(am[1],JSON.stringify(areas));
updated=updated.replace("const vitraAreaLastAppliedEvent="+initialMarker+";","const vitraAreaLastAppliedEvent="+marker+";");
const checkGroup=updated.match(/const groups=(\{.*?\});/),checkAreas=updated.match(/const A=(\{.*?\});\n\/\/ Data original de colheita/s);
const checkStock=updated.match(/const stockData=(\[.*?\]);\n/s);
if(!checkGroup||!checkAreas||!checkStock||checkStock[1]!==stock[1]||
   Object.keys(JSON.parse(checkAreas[1])).length!==nAreas||
   JSON.parse(checkStock[1]).length!==nStock||
   Object.values(JSON.parse(checkGroup[1])).flat().length!==count||
   new Set(Object.values(JSON.parse(checkGroup[1])).flat()).size!==count)
   throw Error("Verificação de integridade falhou. Gravação cancelada.");
const inline=updated.match(/<script>([\s\S]*?)<\/script>/);
if(!inline)throw Error("Script de aplicação não encontrado");
new vm.Script(inline[1],{filename:"vitra-index-inline.js"});
writeFileSync("index.html",updated,"utf8");
console.log("VITRA: "+(marker-initialMarker)+" evento(s) aplicado(s); último ID "+marker+"; "+nAreas+" áreas; "+nStock+" relatórios de estoque preservados.");
