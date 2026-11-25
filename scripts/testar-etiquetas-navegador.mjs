// Smoke test isolado de interface do módulo Etiquetas em desktop e celular.
// Não acessa credenciais ou dados de produção e não altera registros.
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {chromium} from 'playwright-core';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const js=readFileSync(join(root,'vitra-labels-smart.js'),'utf8');
const css=readFileSync(join(root,'vitra-labels-smart.css'),'utf8');
const exportLine='window.VITRA_LABEL_SMART={mount,catalogCount:catalog.length,reference:"DOC.CQ.056"};';
if(!js.includes(exportLine))throw Error('Exportação do módulo mudou.');
const testJS=js.replace(exportLine,'window.__labelSmoke={state,showResult,diagnosticV4};'+exportLine);
const chrome=[process.env.CHROME_BIN,'/usr/bin/google-chrome','/usr/bin/chromium'].find(x=>x&&existsSync(x));
if(!chrome)throw Error('Chromium indisponível.');
const browser=await chromium.launch({headless:true,executablePath:chrome,args:['--no-sandbox','--disable-dev-shm-usage']});
try{
 for(const width of [1280,390]){
  const page=await browser.newPage({viewport:{width,height:840}});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.setContent('<html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><div class="vitra-shell"><main class="vitra-main"><div id="panel"></div></main></div></body></html>');
  await page.addStyleTag({content:css});
  await page.addScriptTag({content:testJS});
  await page.evaluate(()=>{
   window.Tesseract={createWorker:async()=>({recognize:async()=>({data:{text:""}})})};
   window.VITRA_LABEL_SMART.mount({canAccess:()=>true,isMaster:()=>false,back:()=>{},api:async()=>({rows:[]})});
  });
  if(!await page.locator('#vl2-open-camera').count()||!await page.locator('#vl2-gallery').count()||
     !await page.locator('#vl2-capture-full').count())throw Error('Controles da câmera incompletos.');
  await page.evaluate(()=>{
   const st=window.__labelSmoke.state;
   st.photo={type:'image/jpeg'};st.scanCompleted=true;st.identity.kind='caixa';st.identity.variety='vitoria';st.identity.klass='Extra';
   st.fields={rastreio:'R-26-0106B-2110-C-VI'};
   st.detected={identity:{variety:'vitoria'},boxModel:{code:'MEI-PA50VI20',market:'MEI',color:'PA',weight:'50',variety:'VI',package:'20'},weightPhoto:'5,00 kg'};
   st.text='MEI-PA50VI20 EXTRA 5,00 KG PRODUZIDO POR COMERCIALIZADO POR';
   st.pairedEvidence={detected:true,box:{trace:'R-26-0106B-2110-C-VI',variety:'vitoria',model:'MEI-PA50VI20',klass:'Extra'},
    unit:{trace:'R-28-000V4-1411-5-VI',variety:'vitoria',ean:'7898366001754',date:'19/11/2026'}};
   window.__labelSmoke.showResult();
  });
  if(await page.locator('.vl2-pair-grid article').count()!==2)throw Error('Duas etiquetas não exibidas lado a lado/empilhadas.');
  // A referência independente permanece acessível sem ocupar a tela inicial.
  if(!await page.locator('.vl2-trace-order').evaluate(d=>d.open))await page.locator('.vl2-trace-order > summary').click();
  const referenceInput=page.locator('[data-vl2-trace="raw"]');
  if(await referenceInput.count()!==1)throw Error('Rastreabilidade de referência em campo único não encontrada.');
  await referenceInput.fill('R-26-0106B-2110-C-VI');
  if(await page.evaluate(()=>window.__labelSmoke.state.expected.raw)!=='R-26-0106B-2110-C-VI')
   throw Error('Campo de referência não preservou o código informado pelo operador.');

  const evidence=await page.evaluate(()=>({errors:window.__labelSmoke.state.diag?.checks?.filter(x=>x.status==='error').length||0,summary:window.__labelSmoke.state.diag?.summary||''}));
  if(!evidence.errors||!await page.locator('.vl3-verdict.vl3-error').count())throw Error('A divergência do par precisa aparecer em vermelho na prévia.');
  if(!await page.locator('.vl3-label').isVisible())throw Error('Etiqueta visual ausente.');
  if(await page.locator('.vl3-field[open]').count())throw Error('Detalhes técnicos devem iniciar recolhidos.');
  const result=await page.locator('#vl2-results').innerText();
  if(!result.includes('R-28-000V4-1411-5-VI')||!result.includes('R-26-0106B-2110-C-VI'))throw Error('Identificadores das duas etiquetas ausentes.');
  const measured=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:window.innerWidth}));
  if(measured.sw>measured.vw+18)throw Error('Largura horizontal excede a tela: '+JSON.stringify(measured));
  if(errors.length)throw Error('JavaScript falhou no navegador: '+errors.join('; '));
  console.log('Interface de etiquetas conferida em '+width+'px; par de rastreabilidades visível; divergências detectadas: '+evidence.errors+'.');
  await page.close();
 }
}finally{await browser.close();}
