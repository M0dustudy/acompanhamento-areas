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
const testHook='ctx={canAccess:()=>true};window.__test={ocrTraceCandidates,ocrConflictKeys,mergeOCRPassages,shouldScanOCRBands,canonicalCoordinates,extract,supplementExtractedFields,registryAudit,diagnosticV4,interpretPairedText,readPhoto,formatCnpj,cnpjVisualCandidate,candidateCnpj,getEAN,state};'+marker;
new Script(source.replace(marker,testHook)).runInNewContext(context);
const t=context.window.__test;
assert.equal(t.formatCnpj("03438392000163"),"03.438.392/0001-63");
assert.equal(t.formatCnpj("03.438.392/0001-63"),"03.438.392/0001-63");
assert.equal(t.cnpjVisualCandidate("CNPJ: O3.438.392/0001-63"),"03438392000163");
assert.equal(t.cnpjVisualCandidate("CNPJ: O3.438.392/0001-64"),"");
assert.equal(t.getEAN("PRODUZIDO POR FAZENDA TESTE\nGGN: 4069453004221"),"","GGN não é EAN");
assert.equal(t.getEAN("COMERCIALIZADO POR FAZENDA TESTE\n4069453004221"),"","Número institucional sem rótulo não vira EAN");
assert.equal(t.getEAN("UVA VITORIA\n7898366001754"),"7898366001754");
const institutional=t.extract("PRODUZIDO POR FAZENDA TESTE\nCNPJ: 03.438.392/0001-63\nGGN: 4069453004221\nCOMERCIALIZADO POR EMPRESA TESTE\nBR-235 KM 50 CASA NOVA\nCEP: 47300-000","");
assert.equal(institutional.fields.produtor,"FAZENDA TESTE");
assert.equal(institutional.fields.comercializado,"EMPRESA TESTE");
assert.equal(institutional.fields.cepComercial,"47300000");
assert(institutional.fields.enderecoComercial.includes("KM 50"));
const trace="R-26-109A5-1611-5-SR",other="R-27-109A5-1611-5-SR";
const pair=t.interpretPairedText("BRS VITÓRIA\nMEI-PA50VI20\nCOMERCIALIZADO POR EXPOFRUT\nPRODUZIDO POR NOVO RUMO\nR-26-0106B-2110-C-VI",
"UVA BRS VITÓRIA\nEmb 19/11/2026\nR-26-0106B-2110-5-VI\n7898366001754","7898366001754");
assert.equal(pair?.detected,true,"O par físico deve gerar duas leituras sem mesclar dados.");
assert.equal(pair.box.model,"MEI-PA50VI20");
assert.equal(pair.unit.ean,"7898366001754");
assert.equal(pair.box.trace,"R-26-0106B-2110-C-VI");
assert.equal(pair.unit.trace,"R-26-0106B-2110-5-VI");
t.state.pairedEvidence={detected:true,box:pair.box,unit:{...pair.unit,trace:"R-28-000V4-1411-5-VI"}};t.state.scanCompleted=true;t.state.photo={};t.state.identity.kind="caixa";t.state.fields={rastreio:pair.box.trace};t.state.clientConfirmed=false;
assert(t.diagnosticV4().checks.some(x=>x.title==="Caixa × cumbuca · rastreabilidade"&&x.status==="error"),"Rastreabilidades divergentes do par devem impedir aprovação.");
t.state.pairedEvidence=null;t.state.photo=null;t.state.scanCompleted=false;

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
// Regressão da interface atual: um único campo para a ordem, composição detalhada opcional.
assert(!source.includes('id="vl2-trace-full"'));
assert(source.includes('data-vl2-trace="raw"'));
assert(source.includes('class="vl2-trace-manual"'));
assert(source.includes('class="vl2-trace-grid"'));
assert(source.includes('function visualLabel(report)'));
assert(source.includes('vl3-verdict'));
assert(source.includes('readPass(canvas,16000,"3")'),"A leitura principal deve ter limite explícito e segmentação automática.");
assert(source.includes('focusLabelCanvas(photo,deep?4200:3600)'),"A região da etiqueta deve ser ampliada automaticamente.");
assert(source.includes('await limitWork(run(),deep||state.pairRequested?240000:localAIEnabled?115000:65000'),"O processamento total deve continuar limitado.");
assert(source.includes('function interpretPairedText('));
assert(source.includes('"qr_code"'));
assert(source.includes('vl2-capture-full'));
assert(source.includes('id="vl2-native-camera"'),"A câmera móvel precisa ter fallback nativo.");
assert(source.includes('capture="environment"'),"O seletor deve solicitar a câmera traseira.");
assert(source.includes('deep?4200:3200'),"A análise ampliada precisa reprocessar a foto inteira.");
assert(source.includes('data-vl2-trace-check="yes"'),"Confirmação visual necessária.");
assert(source.includes('data-vl2-trace-check="no"'),"Correção sob demanda necessária.");
assert(source.includes('state.detected?.printedNameVariety'),"O nome impresso deve ser independente do catálogo e da sigla.");

assert(source.includes('Caixa × cumbuca · rastreabilidade'));
assert(source.includes('state.pairedEvidence'));
assert.equal(t.extract("UVA VITORIA\nR-26-109A5-1611-5-VI","7898366001754").identity.variety,"vitoria");
assert.equal(t.extract("MEI-V50VI10","").identity.kind,"sacola");
assert.equal(t.extract("MEI-V50VI20","").identity.variety,"vitoria");
assert.equal(t.extract("VITORIA\n7898366001754","7898366001754").identity.kind,"cumbuca");
assert(source.includes("EAN compartilhado autorizado"),"Não criar erro automático por EAN compartilhado.");
const shared=t.extract("UVA VITORIA\n7898366001754","7898366001754");
assert.equal(shared.codeClients.length,2);
for (const client of ["docemel","trielo"]) {
 t.state.photo={};t.state.scanCompleted=true;t.state.clientConfirmed=true;
 t.state.identity={client,kind:"cumbuca500",variety:"vitoria",klass:""};
 t.state.fields={barcode:"7898366001754",rastreio:"R-26-109A5-1611-5-VI"};
 t.state.detected={identity:{kind:"cumbuca500",variety:"vitoria"},wordClients:[],kindConfidence:"high"};
 const diagnosis=t.diagnosticV4();
 assert(diagnosis.checks.some(x=>x.title==="EAN compartilhado autorizado"&&x.status==="ok"),"EAN compartilhado autorizado para "+client);
 assert(!diagnosis.checks.some(x=>x.title==="EAN incompatível com o cliente"&&x.status==="error"),"EAN compartilhado não é erro.");
}

// EAN identificado como mista no catálogo, mas a rastreabilidade VI informa Vitória:
 // sem leitura independente das barras não pode gerar reprovação por espécie.
t.state.barcodeBars="";
t.state.barcodePrinted="";
t.state.ocrConflicts=[];
t.state.clientConfirmed=true;
t.state.identity={client:"expofrut",kind:"cumbuca500",variety:"vitoria",klass:""};
t.state.fields={barcode:"7898923868165",rastreio:"R-26-0106B-2110-5-VI"};
t.state.detected={identity:{variety:"vitoria",kind:"cumbuca500"},varietySource:"Texto ou código impresso",kindConfidence:"high"};
t.state.photo={};t.state.scanCompleted=true;
const ambiguous=t.diagnosticV4();
assert(ambiguous.checks.some(x=>x.title==="Variedade associada ao EAN"&&x.status==="pending"),"EAN não confirmado exige pendência em vez de reprovação.");
assert(!ambiguous.checks.some(x=>x.title==="Variedade associada ao EAN"&&x.status==="error"),"Não afirmar uva mista por inferência.");
t.state.traceVisualCheck="yes";
const confirmed=t.diagnosticV4();
assert(confirmed.checks.some(x=>x.title==="Leitura conferida na fotografia"&&x.status==="ok"));
assert.notEqual(confirmed.status,"aprovado","Confirmação visual isolada não substitui a ordem de produção.");
t.state.traceVisualCheck="";

// Simulações não fotográficas do fluxo de alto volume:
// uma passagem no caso completo; somente uma passagem complementar no caso incompleto.
let readings=[],calls=0;
context.window.Tesseract={createWorker:async()=>({
 recognize:async()=>{calls++;return {data:{text:readings.shift()||""}};},
 terminate:async()=>{}
})};
const fullRead="PRODUZIDO POR FAZENDA TESTE\nCOMERCIALIZADO POR EXPOFRUT\nCNPJ: 12345678000190\nGGN: 1234567890123\nR-26-109A5-1611-5-VI\nUVA VITORIA\nEXTRA";
t.state.photo={type:"image/jpeg"};t.state.barcodeBars="";t.state.ocrRawPassages=[];
readings=[fullRead];calls=0;await t.readPhoto();
assert.equal(calls,1,"A leitura completa não deve executar regiões extras");
assert.equal(t.state.fields.rastreio,"R-26-109A5-1611-5-VI");
t.state.photo={type:"image/jpeg"};t.state.ocrRawPassages=[];t.state.barcodeBars="";
readings=["PRODUZIDO POR FAZENDA TESTE\nCNPJ: 12345678000190","R-26-109A5-1611-5-VI\nUVA VITORIA"];calls=0;
await t.readPhoto();
assert.equal(calls,2,"A leitura parcial deve tentar uma única região complementar");
assert.equal(t.state.fields.rastreio,"R-26-109A5-1611-5-VI");
// Alta resolução repete a leitura completa em até 4200 px e cruza regiões ampliadas.
t.state.photo={type:"image/jpeg"};t.state.ocrRawPassages=[fullRead];t.state.barcodeBars="";
readings=[fullRead,fullRead,fullRead,fullRead];calls=0;
await t.readPhoto(true);
assert(calls>=2,"Alta resolução não pode reutilizar só o texto da primeira análise.");
assert(t.state.ocrPasses>=2,"Alta resolução deve registrar passagens adicionais.");
// Regressões observadas nas duas amostras de 24/11: classe explícita e data discrepante.
const orange="UVA BRS VITÓRIA\nEmb:19/11/2026\nRastreabilidade:\nR-26-000V4-1411-5-VI\n7898366001754";
const orangeRead=t.extract(orange,"7898366001754");
assert.equal(orangeRead.track.areaValve,"000V4");
assert.equal(orangeRead.fields.peso,"");
assert.equal(orangeRead.codeClients.length,2);
Object.assign(t.state,{photo:{},scanCompleted:true,clientConfirmed:false,text:orange,fields:orangeRead.fields,detected:orangeRead,identity:{...orangeRead.identity,client:""},barcodeBars:"7898366001754",barcodePrinted:"7898366001754",ocrConflicts:[],expected:{raw:"",area:"",valve:"",year:"26",day:"",month:"",method:"",variety:"",klass:""}});
const orangeDiag=t.diagnosticV4();
assert(orangeDiag.checks.some(x=>x.title==="Data divergente"&&x.status==="error"),"A divergência interna aparece sem redigitar a ordem.");
assert(orangeDiag.checks.some(x=>x.title==="EAN cadastrado"&&x.status==="ok"));
assert.equal(orangeDiag.status,"reprovado");
assert(!orangeDiag.referenceComplete);
const box=t.extract("UVAS SELECIONADAS\nBRS VITÓRIA\nMEI-PA50VI20\nCLASSE: Extra\nPESO: 5,00 KG\nR-26-0106B-2110-C-VI","");
assert.equal(box.identity.klass,"Extra","A classe impressa não pode ser substituída pelo título Uvas selecionadas.");
assert.equal(box.track.areaValve,"0106B");
assert.equal(box.boxModel.package,"20");
console.log("Testes de OCR, câmera, rastreabilidade visual, alta resolução e EAN ambíguo: OK.");
