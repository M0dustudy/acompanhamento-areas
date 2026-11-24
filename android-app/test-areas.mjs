/* Testes sem movimentações reais: valida contadores, transições e proteção visual. */
import {readFileSync} from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
const source=readFileSync("vitra-areas.js","utf8");
const html=readFileSync("index.html","utf8");
const original=JSON.parse(html.match(/const groups=(\{.*?\});/)[1]);
const area=JSON.parse(html.match(/const A=(\{.*?\});\n\/\/ Data original de colheita/s)[1]);
const stock=JSON.parse(html.match(/const stockData=(\[.*?\]);\n/s)[1]);
assert.equal(stock.length,481);
assert.equal(Object.keys(area).length,34);
assert.equal(new Set(Object.values(original).flat()).size,35);
assert.deepEqual(Object.values(original).flat().filter(code=>!area[code]),["301B"],"Não inventar dados para a área 301B sem cadastro original");
assert.ok(html.includes('window.VITRA_IS_MASTER===true&&st!=="fim"'));
const events=[
 {id:10001,area:"304A",action:"pause",from_status:"colh",to_status:"pausa",effective_date:"2026-11-24"},
 {id:10002,area:"304A",action:"resume",from_status:"pausa",to_status:"colh",effective_date:"2026-11-24"}
];
function fixture(role){
 const groups=structuredClone(original),A=structuredClone(area),listener={};
 const counters=Object.fromEntries(Object.keys(groups).map(k=>[k,{textContent:String(groups[k].length)}]));
 let cached="[]",renders=0;
 const context={
  window:{addEventListener:(type,fn)=>{listener[type]=fn},VITRA_ACCESS_CONFIG:{}},
  document:{
   querySelector:()=>null,
   querySelectorAll:(selector)=>{
    const match=selector.match(/data-section="([^"]+)"/);
    return match&&counters[match[1]]?[counters[match[1]]]:[];
   },
   addEventListener:()=>{},hidden:false
  },
  groups,A,
  navigator:{onLine:false},
  console:{warn:()=>{}},
  setInterval:()=>0,
  localStorage:{getItem:()=>cached,setItem:(_,v)=>{cached=v}},
  sessionStorage:{getItem:()=>null},
  render:()=>{renders++},st:"colh",vitreAreaLastAppliedEvent:0,
  vitraAreaLastAppliedEvent:0
 };
 vm.runInNewContext(source,context,{filename:"vitra-areas.js",timeout:1000});
 function notify(arr){
  cached=JSON.stringify(arr);
  listener["vitra:authenticated"]({detail:{role}});
 }
 return {groups,A,counters,notify,role,context,get renders(){return renders}};
}
const master=fixture("master");
master.notify([events[0]]);
assert.equal(master.context.window.VITRA_IS_MASTER,true);
assert.equal(master.groups.colh.length,1);
assert.equal(master.groups.pausa.length,2);
assert.equal(master.counters.colh.textContent,"1","KPI em colheita precisa diminuir");
assert.equal(master.counters.pausa.textContent,"2","KPI pausadas precisa aumentar");
assert.equal(master.A["304A"].harvestStartDate,area["304A"].harvestStartDate);
assert.equal(master.A["304A"].lastPauseDate,"24/11/2026");
master.notify(events);
assert.equal(master.groups.colh.length,2);
assert.equal(master.groups.pausa.length,1);
assert.equal(master.counters.colh.textContent,"2");
assert.equal(master.counters.pausa.textContent,"1");
assert.equal(master.A["304A"].lastResumeDate,"24/11/2026");
assert.equal(master.A["304A"].harvestStartDate,area["304A"].harvestStartDate);
assert.equal(new Set(Object.values(master.groups).flat()).size,35);
const viewer=fixture("member");
viewer.notify([]);
assert.equal(viewer.context.window.VITRA_IS_MASTER,false,"Controle não deve aparecer para outros usuários");
console.log("VITRA testes OK: KPIs 2→1→2, pausadas 1→2→1, histórico e visibilidade ADM.");
