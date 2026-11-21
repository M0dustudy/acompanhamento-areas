// Verificação real da prévia online no navegador. Testes por amostragem;
 // a integridade e a leitura GET de TODOS os PDFs são verificadas em outro passo.
import { chromium } from 'playwright-core';
import { readFileSync, existsSync, mkdtempSync, statSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const viewer = readFileSync(new URL('../visualizador.html', import.meta.url), 'utf8');
function collection(name) {
  const key = 'const ' + name + '=';
  const start = html.indexOf(key) + key.length;
  if (start < key.length) throw new Error('Coleção não encontrada: ' + name);
  const open = html[start], close = open === '{' ? '}' : ']';
  let level = 0, quoted = false, escaped = false;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (quoted) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') quoted = false;
    } else if (c === '"') quoted = true;
    else if (c === open) level++;
    else if (c === close && --level === 0) return JSON.parse(html.slice(start, i + 1));
  }
  throw new Error('Coleção incompleta: ' + name);
}
const stock = collection('stockData').filter(r => !r.pendingPdf);
const areas = collection('A');
const fields = [...new Set(Object.values(areas).flatMap(a =>
  [a.fieldPdf, a.fieldPdfSource, ...Object.values(a.fieldPdfHistory || {})].filter(Boolean)))];
if (!stock.length || !fields.length) throw new Error('Coleções sem relatórios');
const historic = JSON.parse(viewer.match(/const historicLegacyIds=new Set\((\[[^;]+\])\);/)?.[1] || '[]');
if (!historic.length) throw new Error('Histórico de PDFs ausente');
const large = stock.filter(x => Number(x.sourceBytes) > 25 * 1024 * 1024)
  .sort((a, b) => b.sourceBytes - a.sourceBytes)[0];
const smallest = [...stock].filter(x => x.sourceBytes > 0)
  .sort((a, b) => a.sourceBytes - b.sourceBytes)[0] || stock[0];
const examples = [
  {label: 'Estoque recente', kind: 'estoque', file: stock[0].file},
  {label: 'Campo', kind: 'campo', file: fields[0]},
  {label: 'Campo no celular', kind: 'campo', file: fields[fields.length - 1], mobile: true},
  {label: 'PDF histórico', kind: 'pdf', file: historic[0]},
  ...(large ? [{label: 'PDF grande', kind: 'estoque', file: large.file}] : []),
];
const chrome = [process.env.CHROME_BIN, '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium', '/opt/google/chrome/chrome'].find(p => p && existsSync(p));
if (!chrome) throw new Error('Chrome/Chromium não encontrado no executor');
const browser = await chromium.launch({headless: true, executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage']});
const directory = mkdtempSync(join(tmpdir(), 'vitra-pdf-'));
let success = 0;
try {
  for (const sample of examples) {
    const context = await browser.newContext({
      viewport: sample.mobile ? {width: 390, height: 844} : {width: 1200, height: 800},
      acceptDownloads: true
    });
    const page = await context.newPage();
    try {
      const target = new URL('visualizador.html', 'https://m0dustudy.github.io/acompanhamento-areas/');
      target.searchParams.set(sample.kind, sample.file);
      const response = await page.goto(target.toString(), {waitUntil: 'domcontentloaded', timeout: 60000});
      if (!response?.ok()) throw new Error('Visualizador HTTP ' + response?.status());
      await page.waitForFunction(() => {
        const status = document.querySelector('#status')?.textContent || '';
        const canvas = [...document.querySelectorAll('canvas.page')]
          .find(c => c.width > 0 && c.height > 0);
        if (status.includes('indisponível')) throw new Error(status);
        return canvas && /Relatório (aberto|exibido) online/.test(status);
      }, null, {timeout: 120000});
      const links = await page.evaluate(() => ({
        open: document.querySelector('#directPdf')?.href,
        download: document.querySelector('#downloadPdf')?.href,
        canvasCount: document.querySelectorAll('canvas.page').length
      }));
      if (!links.open?.includes('.pdf') || links.open !== links.download || !links.canvasCount)
        throw new Error('Botões de visualização/download sem o mesmo PDF');
      // O clique de download deve resultar em arquivo salvo, não só em link HTTP.
      // Selecionar arquivo pequeno evita baixar grandes laudos duas vezes.
      if (sample.label === 'Estoque recente' && Number(smallest.sourceBytes) < 5 * 1024 * 1024) {
        const [download] = await Promise.all([
          page.waitForEvent('download', {timeout: 60000}),
          page.locator('#downloadPdf').click()
        ]);
        const destination = join(directory, 'teste-download.pdf');
        await download.saveAs(destination);
        const bytes = readFileSync(destination);
        if (bytes.length < 32 || !bytes.subarray(0, 1024).toString('latin1').includes('%PDF-'))
          throw new Error('Download não produziu PDF válido');
      }
      success++;
      console.log('Prévia real aprovada:', sample.label, sample.file);
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
  rmSync(directory, {recursive: true, force: true});
}
console.log('Prévia no navegador aprovada:', success, '/', examples.length);
