// VITRA: validação externa dos PDFs originais servidos pelo GitHub Raw.
// Executar sob demanda ou via workflow diário. Não altera dados.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const BASE = 'https://raw.githubusercontent.com/M0dustudy/acompanhamento-areas/main/';
const ARCHIVE_BASE = 'https://raw.githubusercontent.com/M0dustudy/acompanhamento-areas/ba9a5f023c08bfe7fc75ffde9be6015de5305249/';

function readCollection(name) {
  const prefix = 'const ' + name + '=';
  const pos = html.indexOf(prefix);
  if (pos < 0) throw new Error('Coleção não encontrada: ' + name);
  const start = pos + prefix.length;
  const open = html[start], close = open === '{' ? '}' : open === '[' ? ']' : '';
  if (!close) throw new Error('Formato inesperado: ' + name);
  let depth = 0, quote = false, escaped = false;
  for (let i = start; i < html.length; i++) {
    const ch = html[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') quote = false;
    } else {
      if (ch === '"') quote = true;
      else if (ch === open) depth++;
      else if (ch === close && --depth === 0)
        return JSON.parse(html.slice(start, i + 1));
    }
  }
  throw new Error('Coleção incompleta: ' + name);
}

const areas = readCollection('A');
const stock = readCollection('stockData');
const docs = new Map();
for (const [code, a] of Object.entries(areas)) {
  for (const name of [a.fieldPdf, a.fieldPdfSource,
    ...Object.values(a.fieldPdfHistory || {})].filter(Boolean)) {
    if (!/^[a-z0-9_.-]+\.pdf$/i.test(name))
      throw new Error('Nome inválido em campo ' + code + ': ' + name);
    docs.set('campo/' + name, { name, category: 'campo', code });
  }
}
for (const r of stock.filter(x => !x.pendingPdf)) {
  if (!/^[a-z0-9_.-]+\.pdf$/i.test(r.file))
    throw new Error('Nome inválido em estoque: ' + r.file);
  docs.set('estoque/' + r.file, { name: r.file, category: 'estoque', code: r.doc || r.id, expectedBytes: Number.isFinite(r.sourceBytes) ? r.sourceBytes : null });
}

const viewerHtml = readFileSync(join(root, 'visualizador.html'), 'utf8');
const legacyMap = JSON.parse(viewerHtml.match(/const map=(\{[^;]+\});/)?.[1] || '{}');
const historicalIds = JSON.parse(viewerHtml.match(/const historicLegacyIds=new Set\((\[[^;]+\])\);/)?.[1] || '[]');
for (const id of historicalIds) {
  const name = legacyMap[id];
  if (!name || !/^[a-z0-9_.-]+\.pdf$/i.test(name))
    throw new Error('PDF histórico inválido: ' + id);
  docs.set('historico/' + id, {name, category: 'estoque', code: id, historical: true});
}
const all = [...docs.values()];
const errors = [];
let checked = 0;
const concurrency = 12;
let cursor = 0;

// Regra crítica: testar leitura real do PDF. HEAD isolado não prova visualização
// nem download. Um GET parcial verifica o conteúdo, evitando baixar gigabytes
// desnecessários em todas as execuções.
async function inspect(record) {
  const subdir = record.category === 'campo'
    ? 'relatorios/acompanhamento%20de%20%C3%A1rea/'
    : 'relatorios/estoque/';
  const url = (record.historical ? ARCHIVE_BASE : BASE) + subdir + encodeURIComponent(record.name);
  let message = '';
  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow',
        headers: {
          'User-Agent': 'VITRA-integridade/2.0',
          'Accept': 'application/pdf,application/octet-stream;q=0.9,*/*;q=0.1',
          'Range': 'bytes=0-1023'
        }
      });
      const mime = (response.headers.get('content-type') || '').toLowerCase();
      const length = Number(response.headers.get('content-length') || 0);
      if (!response.ok || mime.includes('text/html') || length === 1) {
        throw new Error('HTTP ' + response.status + ' | tipo ' + (mime || 'indisponível'));
      }
      const partial = response.status === 206;
      if (!partial && record.expectedBytes && length && length !== record.expectedBytes) {
        throw new Error('Tamanho diferente do PDF registrado: ' + length + ' / ' + record.expectedBytes);
      }
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Resposta sem corpo PDF para leitura');
      const chunk = await reader.read();
      if (chunk.done || !chunk.value?.length) throw new Error('PDF vazio ou sem bytes');
      const startBytes = Buffer.from(chunk.value.subarray(0, Math.min(1024, chunk.value.length)));
      const header = startBytes.toString('latin1');
      if (!header.includes('%PDF-')) throw new Error('Resposta GET não contém assinatura PDF');
      checked++;
      await reader.cancel().catch(() => {});
      return;
    } catch (error) {
      message = error instanceof Error ? error.message : String(error);
    } finally {
      clearTimeout(timeout);
      controller.abort();
    }
  }
  errors.push({filename: record.name, category: record.category, reason: message});
}
async function worker() {
  while (cursor < all.length) {
    const next = all[cursor++];
    await inspect(next);
  }
}
await Promise.all(Array.from({ length: Math.min(concurrency, all.length) }, () => worker()));
console.log('PDFs validados por leitura GET no GitHub Raw:', checked, '/', all.length);
if (errors.length) {
  console.error('Falha em ' + errors.length + ' arquivo(s). Exibição do nome completo:');
  for (const err of errors) {
    console.error(err.category + ': ' + err.reason);
    console.error('Arquivo: ' + err.filename);
  }
  process.exitCode = 1;
} else {
  console.log('Todos os endereços retornaram conteúdo de PDF por GET. A renderização e o download no navegador são testados separadamente.');
}
