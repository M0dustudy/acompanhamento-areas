// Testes de regressão não destrutivos para o extrator de etiquetas.
// Não dependem de fotos reais e não substituem o teste físico do OCR.
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join,dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {Script} from "node:vm";
const root=join(dirname(fileURLToPath(import.meta.url)),"..");
const source=readFileSync(join(root,"vitra-labels-smart.js"),"utf8");
const marker='window.VITRA_LABEL_SMART={mount,catalogCount:catalog.length,reference:"DOC.CQ.056"};';
assert(source.includes(marker),"Módulo de etiquetas ausente");
const context={
 window:{},
 document:{getElementById:()=>null,createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},drawImage(){}})})},
 createImageBitmap:async()=>({width:1600,height:1000,close(){}}),
 setTimeout,clearTimeout
};
const testHook='ctx={canAccess:()=>true};window.__test={ocrTraceCandidates,ocrConflictKeys,mergeOCRPassages,shouldScanOCRBands,canonicalCoordinates,extract,supplementExtractedFields,registryAudit,diagnosticV4,readPhoto,state};'+marker;
new Script(source.replace(marker,testHook)).runInNewContext(context);
const t=context.window.__test,trace="R-26-109A5-1611-5-SR",other="R-27-109A5-1611-5-SR";
assert.equal(t.ocrTraceCandidates("RASTREABILIDADE "+trace)[0],trace);
assert.equal(t.ocrTraceCandidates("R 26 -109A5 - 1611 - 5 - SR").length,1);
assert(t.ocrConflictKeys(["LOTE "+trace,"LOTE "+other]).includes("rastreio"));
assert(!t.ocrConflictKeys(["RASTREABILIDADE "+trace,"RASTREABILIDADE "+trace]).includes("rastreio"));
assert(!t.shouldScanOCRBands("PRODUZIDO POR\nCNPJ: 12345678901234\n"+trace));
assert(t.shouldScanOCRBands("PRODUZIDO POR\nCNPJ:\n"+trace));
assert(t.shouldScanOCRBands("PRODUZIDO POR\nCNPJ: 12345678901234\n"));
assert(t.shouldScanOCRBands("UVA VITORIA\n"+trace,true));
assert(t.shouldScanOCRBands("UVA VITORIA\n"+trace)); // Variedade divergente do sufixo SR; precisa reexaminar.
assert(!t.shouldScanOCRBands("UVA VITORIA\nR-26-109A5-1611-5-VI"));
assert(t.mergeOCRPassages(["LOTE 123\n"+trace,"GGN 1234567890123\n"+trace]).includes("GGN"));
const a="PRODUZIDO POR FAZENDA TESTE\nCNPJ: 12345678000190\nGGN: 1234567890123";
const b="PRODUZIDO POR FAZENDA TESTE\nCNPJ: 12345678000191\nGGN: 1234567890123";
assert(t.ocrConflictKeys([a,b]).includes("cnpj"));
assert(!t.ocrConflictKeys([a,a]).includes("cnpj"));
assert.equal(t.extract(a,"").fields.ggn,"1234567890123");
assert.equal(t.canonicalCoordinates("9°16’08”S 40°54’36”W"),t.canonicalCoordinates('09°16\'08"S 040°54\'36"O'));
assert.notEqual(t.canonicalCoordinates("9°16’08”S 40°54’36”W"),t.canonicalCoordinates("9°16’08”N 40°54’36”W"));
assert.equal(t.extract(trace,"").fields.rastreio,trace);
t.state.photo={};t.state.scanCompleted=true;t.state.clientConfirmed=true;t.state.identity.client="docemel";t.state.identity.kind="cumbuca500";
t.state.detected={identity:{kind:"cumbuca500",variety:"vitoria"},kindConfidence:"high",weightPhoto:"500 g"};
t.state.expected.raw=other;t.state.fields={rastreio:trace,barcode:"7898366001754",ggn:""};t.state.sources={};t.state.ocrConflicts=["rastreio"];
const report=t.diagnosticV4();
assert(report.checks.some(x=>x.title==="Rastreabilidade divergente"&&x.status==="pending"));
assert(report.checks.some(x=>x.title==="Leituras diferentes na fotografia"&&x.status==="pending"));
assert.notEqual(report.status,"aprovado");

const partial="PRODUZIDO POR FAZENDA TESTE\nCNPJ:\nGGN:";
const complete="PRODUZIDO POR FAZENDA TESTE\nCNPJ: 12345678000190\nGGN: 1234567890123";
const complete2="PRODUZIDO POR FAZENDA TESTE\nCNPJ: 12345678000191\nGGN: 1234567890123";
const augmented=t.supplementExtractedFields(t.extract(partial,""),[partial,complete],"");
assert.equal(augmented.fields.cnpj,"12345678000190");
assert.equal(augmented.fields.ggn,"1234567890123");
assert(t.ocrConflictKeys([complete,complete2]).includes("cnpj"));
t.state.text=partial+"\n"+complete;
t.state.ocrRawPassages=[partial,complete];t.state.refsLoaded=true;
t.state.entities=[{kind:"producer",name:"FAZENDA TESTE",cnpj:"12345678000190",ggn:"1234567890123",source_page:9,address:"RUA PRINCIPAL KM 12 BRASIL"}];
t.state.fields=augmented.fields;
const registry=t.registryAudit();
assert.equal(registry.producer?.name,"FAZENDA TESTE");
assert(registry.rows.some(x=>x.type==="ok"&&x.title==="CNPJ do produtor"));
assert(registry.rows.some(x=>x.type==="ok"&&x.title==="GGN do produtor"));
// Regressão da interface solicitada: rastreabilidade sem campo de digitação, parecer centralizado.
assert(!source.includes('id="vl2-trace-full"'));
assert(!source.includes('class="vl2-trace-manual"'));
assert(source.includes('class="vl2-trace-grid"'));
assert(source.includes("vl2-concise-result"));
assert(source.includes('readPass(canvas,12000)'));
assert(source.includes('await limitWork(run(),33000'));
assert.equal(t.extract("UVA VITORIA\\nR-26-109A5-1611-5-VI","7898366001754").identity.variety,"vitoria");
assert.equal(t.extract("MEI-V50VI10","").identity.kind,"sacola");
assert.equal(t.extract("MEI-V50VI20","").identity.variety,"vitoria");
assert.equal(t.extract("VITORIA\\n7898366001754","7898366001754").identity.kind,"cumbuca");

// Simulações não fotográficas do fluxo de alto volume:
// uma passagem no caso completo; somente uma passagem complementar no caso incompleto.
let readings=[],calls=0;
context.window.Tesseract={createWorker:async()=>({
 recognize:async()=>{calls++;return {data:{text:readings.shift()||""}};},
 terminate:async()=>{}
})};
const fullRead="PRODUZIDO POR FAZENDA TESTE\\nCOMERCIALIZADO POR EXPOFRUT\\nCNPJ: 12345678000190\\nGGN: 1234567890123\\nR-26-109A5-1611-5-VI\\nUVA VITORIA\\nEXTRA";
t.state.photo={type:"image/jpeg"};t.state.barcodeBars="";t.state.ocrRawPassages=[];
readings=[fullRead];calls=0;await t.readPhoto();
assert.equal(calls,1,"A leitura completa não deve executar regiões extras");
assert.equal(t.state.fields.rastreio,"R-26-109A5-1611-5-VI");
t.state.photo={type:"image/jpeg"};t.state.ocrRawPassages=[];t.state.barcodeBars="";
readings=["PRODUZIDO POR FAZENDA TESTE\\nCNPJ: 12345678000190","R-26-109A5-1611-5-VI\\nUVA VITORIA"];calls=0;
await t.readPhoto();
assert.equal(calls,2,"A leitura parcial deve tentar uma única região complementar");
assert.equal(t.state.fields.rastreio,"R-26-109A5-1611-5-VI");
console.log("Testes de OCR, interface, variedade, alerta e fluxo rápido: OK.");
