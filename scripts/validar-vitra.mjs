// Verificação não destrutiva dos registros do VITRA.
// Executar: node scripts/validar-vitra.mjs
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const errors = [];
const assert = (ok, msg) => { if (!ok) errors.push(msg); };
const unique = (items, label) => {
  const seen = new Set();
  for (const x of items) {
    if (seen.has(x)) errors.push(label + ': duplicado ' + x);
    seen.add(x);
  }
};

function readObject(name) {
  const prefix = 'const ' + name + '=';
  const offset = html.indexOf(prefix);
  if (offset < 0) throw new Error('Coleção ausente: ' + name);
  const begin = offset + prefix.length;
  const opening = html[begin];
  const closing = opening === '{' ? '}' : opening === '[' ? ']' : null;
  if (!closing) throw new Error('Estrutura inesperada: ' + name);
  let depth = 0, quoted = false, escaped = false;
  for (let i = begin; i < html.length; i++) {
    const c = html[i];
    if (quoted) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') quoted = false;
    } else {
      if (c === '"') quoted = true;
      else if (c === opening) depth++;
      else if (c === closing && --depth === 0) {
        return JSON.parse(html.slice(begin, i + 1));
      }
    }
  }
  throw new Error('Coleção incompleta: ' + name);
}

try {
  const js = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
  assert(Boolean(js), 'Script principal ausente');
  if (js) new Script(js[1], { filename: 'index.html' });

  const groups = readObject('groups');
  const areas = readObject('A');
  const titulacoes = readObject('titulacaoRuas');
  const estoque = readObject('stockData');
  const tracked = new Set(execFileSync('git',
    ['ls-tree', '-r', '--name-only', '-z', 'HEAD'],
    { cwd: root, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
  ).split('\0').filter(Boolean));

  const statuses = ['acomp', 'colh', 'pausa', 'fim'];
  for (const key of statuses) assert(Array.isArray(groups[key]), 'Status ausente: ' + key);
  const groupCodes = statuses.flatMap(key => groups[key] || []);
  unique(groupCodes, 'Área em mais de uma situação');
  for (const code of Object.keys(areas)) {
    assert(groupCodes.includes(code), 'Área cadastrada sem situação: ' + code);
  }

  const recepcoes = [];
  const fieldRefs = new Set();
  for (const [code, area] of Object.entries(areas)) {
    for (const [i, rec] of (area.r || []).entries()) {
      assert(Array.isArray(rec) && rec.length >= 4, 'Recepção incompleta: ' + code + ' #' + i);
      if (Array.isArray(rec)) recepcoes.push(code + '|' + String(rec[0]));
    }
    for (const file of [area.fieldPdf, area.fieldPdfSource,
      ...Object.values(area.fieldPdfHistory || {})].filter(Boolean)) {
      fieldRefs.add('relatorios/acompanhamento de área/' + file);
    }
  }
  unique(recepcoes, 'Recepção');
  for (const path of fieldRefs) assert(tracked.has(path), 'PDF de campo não encontrado: ' + path);

  for (const [key, item] of Object.entries(titulacoes)) {
    assert(Array.isArray(item.rows) && item.rows.length > 0,
      'Titulação sem medições originais: ' + key);
  }

  assert(Array.isArray(estoque), 'Estoque precisa ser uma lista');
  unique(estoque.map(x => String(x.id)), 'Identificador de estoque');
  unique(estoque.map(x => String(x.file)), 'PDF de estoque');
  const stockRefs = new Set(estoque.map(x => 'relatorios/estoque/' + x.file));
  for (const path of stockRefs) assert(tracked.has(path), 'PDF de estoque não encontrado: ' + path);
  const stockFiles = [...tracked].filter(x => x.startsWith('relatorios/estoque/') && x.endsWith('.pdf'));
  for (const path of stockFiles) assert(stockRefs.has(path), 'PDF de estoque sem avaliação: ' + path);
  const fieldFiles = [...tracked].filter(x => x.startsWith('relatorios/acompanhamento de área/') && x.endsWith('.pdf'));
  for (const path of fieldFiles) assert(fieldRefs.has(path), 'PDF de campo sem registro: ' + path);

  console.log('Áreas com avaliação:', Object.keys(areas).length);
  console.log('Situações de áreas:', groupCodes.length);
  console.log('Recepções:', recepcoes.length);
  console.log('Titulações por data/área:', Object.keys(titulacoes).length);
  console.log('Estoque:', estoque.length, 'avaliações /', stockFiles.length, 'PDFs');
  console.log('PDFs de campo:', fieldFiles.length);
} catch (error) {
  errors.push(error.stack || String(error));
}

if (errors.length) {
  console.error('Falha na verificação do VITRA:\n- ' + errors.join('\n- '));
  process.exitCode = 1;
} else {
  console.log('Integridade do VITRA conferida. Nenhum registro foi alterado.');
}
