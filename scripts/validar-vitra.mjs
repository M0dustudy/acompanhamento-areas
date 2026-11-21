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
    const area = areas[code];
    for (const field of ['originalHarvestDate','finalizedDate','harvestClosureDate','areaFinalizationDate']) {
      if (area[field] === undefined) continue;
      const m = String(area[field]).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      const dt = m ? new Date(+m[3],+m[2]-1,+m[1]) : null;
      assert(Boolean(dt && dt.getFullYear()===+m[3] && dt.getMonth()===+m[2]-1 && dt.getDate()===+m[1]),
        'Data histórica inválida: '+code+' · '+field);
    }
    if (area.finalizedDate || area.harvestClosureDate || area.areaFinalizationDate)
      assert(groups.fim.includes(code), 'Data real em área não finalizada: '+code);
    if (area.harvestClosureKind==='sem_colheita_integral')
      assert(Boolean(area.harvestClosureDate) && !area.finalizedDate, 'Encerramento parcial tratado como finalização integral: '+code);
  }
  assert(html.includes('area-harvest-history'), 'Cartão finalizado sem histórico de colheita');

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

  const amostra208A=titulacoes['208A|21/11'];
  assert(Boolean(amostra208A) && amostra208A.tipoAmostragem==='ruas_em_colheita',
    'Titulação da 208A em 21/11 deve preservar amostragem das ruas em colheita');
  assert(amostra208A.rows.length===5 && amostra208A.rows[0][0]==='1 a 5',
    'As cinco ruas da imagem devem ser preservadas');
  assert(amostra208A.rows.every(row=>row[1]==='Verde'),
    'A condição da fruta no arquivo original precisa ser mantida nos dados');
  assert(amostra208A.observacaoRisco==='A área apresenta grande quantidade de cachos translúcidos.',
    'Falta a observação de cachos translúcidos');
  assert((areas['208A']?.t||[]).filter(row=>row[0]==='21/11').length===1,
    'Titulação duplicada ou ausente para 208A em 21/11');
  assert(areas['208A'].t.find(row=>row[0]==='21/11')[1].includes('Ruas em colheita: Brix 13,80 · Acidez 0,422 · Ratio 33,20'),
    'Médias da titulação representativa incorretas');
  assert(areas['208A'].t.find(row=>row[0]==='21/11')[1].includes('cachos translúcidos'),
    'Observação precisa constar no resumo da titulação');

  assert(Array.isArray(estoque), 'Estoque precisa ser uma lista');
  unique(estoque.map(x => String(x.id)), 'Identificador de estoque');
  unique(estoque.map(x => String(x.file)), 'PDF de estoque');
  const stockRefs = new Set(estoque.map(x => 'relatorios/estoque/' + x.file));
  const pendingStock = estoque.filter(x => x.pendingPdf === true);
  const namePattern = /^ESTOQUE_(\d{4})-(\d{2})-(\d{2})_DOC_(\d+)_LOT(ES|E)_([\d-]+)\.pdf$/;
  const automaticPattern = /^AVALIACAO_DE_ESTOQUE_EM_CAMARA_FRIA_-_FOR\.CQ\.-\d+-pt_BR\.pdf$/;
  // PDFs com nome "aplicacoes_" são válidos quando correspondem a uma
  // avaliação identificada; nunca eliminá-los apenas pela nomenclatura.
  const applicationsPattern = /^aplicacoes_\d+\.pdf$/;
  const isGeneric = name => /FOR\.CQ\.068\s*-\s*\d+\.pdf$/i.test(name);
  assert(html.includes('const stockVerifiedFiles=new Set(stockData.filter('),
    'Estoque deve obter os links diretamente dos registros, sem lista paralela');
  assert(html.includes('const fieldVerifiedFiles={has(filename)'),
    'Campo deve obter os links diretamente dos registros, sem lista paralela');
  const verified = new Set(estoque.filter(x => !x.pendingPdf).map(x => x.file));
  const viewerHtml = readFileSync(join(root, 'visualizador.html'), 'utf8');
  const viewerMatch = viewerHtml.match(/const map=(\{[^;]+\});/);
  assert(Boolean(viewerMatch), 'Mapa de compatibilidade do visualizador ausente');
  const viewerMap = viewerMatch ? JSON.parse(viewerMatch[1]) : {};
  const historicalMatch = viewerHtml.match(/const historicLegacyIds=new Set\((\[[^;]+\])\);/);
  assert(Boolean(historicalMatch), 'Vínculos legados de relatórios antigos ausentes');
  const historicalIds = historicalMatch ? JSON.parse(historicalMatch[1]) : [];
  assert(new Set(historicalIds).size === historicalIds.length,
    'Vínculos históricos duplicados');
  // Regra crítica: os links gerados no dashboard devem usar o nome real do PDF.
  // Não basta que o arquivo exista no GitHub: ele precisa abrir pelo visualizador.
  assert(html.includes('visualizador.html?v=20261120pdf3&amp;campo=\'+encodeURIComponent(pdf)'),
    'Campo não aponta para o visualizador por nome de arquivo');
  assert(html.includes('visualizador.html?v=20261120pdf3&amp;estoque=\'+encodeURIComponent(x.file)'),
    'Estoque não aponta para o visualizador por nome de arquivo');
  assert(viewerHtml.includes('const requestedField=params.get("campo")'),
    'Visualizador não recebe arquivos de campo');
  assert(viewerHtml.includes('const requestedStock=params.get("estoque")'),
    'Visualizador não recebe arquivos de estoque');
  assert(viewerHtml.includes('https://raw.githubusercontent.com/M0dustudy/acompanhamento-areas/'),
    'Visualizador deve ler os PDFs pelo GitHub Raw, pois estão excluídos do GitHub Pages');
  assert(viewerHtml.includes('getDocument(url)'),
    'Visualizador não carrega a URL resolvida do PDF');
  assert(!viewerHtml.includes('const fieldVerifiedFiles=new Set('),
    'Visualizador possui lista duplicada de documentos de campo');

  // Testar as URLs que o próprio visualizador produz para cada PDF registrado.
  const viewerModule = viewerHtml.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
  assert(Boolean(viewerModule), 'Script do visualizador ausente');
  const routePrefix = viewerModule?.split('if(url){')[0];
  assert(Boolean(routePrefix && routePrefix.includes('const url=')),
    'Resolução de URL do visualizador mudou sem atualizar os testes');
  const routeScript = routePrefix
    ? new Script(routePrefix + '\n({url,name,category,validName});',
        { filename: 'visualizador.html' })
    : null;
  const checkRoute = (filename, kind) => {
    if (!routeScript) return;
    const query = new URLSearchParams({ [kind]: filename }).toString();
    const result = routeScript.runInNewContext({
      location: {
        search: '?' + query,
        href: 'https://m0dustudy.github.io/acompanhamento-areas/visualizador.html'
      },
      URL, URLSearchParams,
      document: { getElementById: () => ({}) }
    }, { timeout: 1000 });
    const folder = kind === 'campo' ? 'acompanhamento de área' : 'estoque';
    const expectedPath = '/M0dustudy/acompanhamento-areas/main/relatorios/' + folder + '/' + filename;
    assert(result.validName === true && result.name === filename &&
      result.category === kind && result.url &&
      new URL(result.url).origin === 'https://raw.githubusercontent.com' &&
      decodeURIComponent(new URL(result.url).pathname) === expectedPath,
      'Visualizador não resolve o PDF corretamente: ' + filename);
  };
  unique([...verified], 'Lista de PDFs verificados');
  for (const item of estoque) {
    const path = 'relatorios/estoque/' + item.file;
    assert(typeof item.file === 'string' && item.file.endsWith('.pdf'),
      'Nome do PDF de estoque inválido: ' + item.id);
    assert(!isGeneric(item.file), 'PDF genérico vinculado ao VITRA: ' + item.file);
    const standardized = namePattern.exec(item.file);
    assert(automaticPattern.test(item.file) || Boolean(standardized) ||
      applicationsPattern.test(item.file),
      'Nome de estoque fora do padrão: ' + item.file);
    if (standardized) {
      const expectedDate = String(item.date || '').replace(
        /^(\d{2})\/(\d{2})\/(\d{4})$/, '$3-$2-$1'
      );
      assert(item.file.startsWith('ESTOQUE_' + expectedDate + '_'),
        'Data do nome diverge da avaliação: ' + item.id);
      assert(standardized[4] === String(item.doc || '').replace(/\D/g, ''),
        'Documento do nome diverge da avaliação: ' + item.id);
      const lotNumbers = [...String(item.lot || '').matchAll(/(?:\d{2}\.\d{3}|\b\d{5}\b)/g),
        ...String(item.lotNote || '').matchAll(/(?:\d{2}\.\d{3}|\b\d{5}\b)/g)]
        .map(match => match[0].replace(/\D/g, ''));
      const distinctLots = [...new Set(lotNumbers)];
      assert(standardized[6] === distinctLots.join('-') &&
        standardized[5] === (distinctLots.length > 1 ? 'ES' : 'E'),
        'Lote do nome diverge da avaliação: ' + item.id);
    }
    if (item.pendingPdf === true) {
      assert(!verified.has(item.file),
        'PDF pendente aparece na lista de links: ' + item.file);
      // O relatório está identificado no cadastro, mas o link continua indisponível.
      // Ele passa a ser obrigatório e verificável assim que o arquivo for hospedado.
      assert(!tracked.has(path), 'PDF hospedado continua pendente: ' + path);
      assert(Boolean(item.doc && item.date && item.lot && item.pallet),
        'Avaliação pendente sem identificação: ' + item.id);
      assert(Array.isArray(item.boxDetails) && item.boxDetails.length === Number(item.sampled),
        'Avaliação pendente sem caixas originais: ' + item.id);
    } else {
      assert(tracked.has(path), 'PDF de estoque não encontrado: ' + path);
      assert(verified.has(item.file), 'PDF hospedado fora da lista verificada: ' + item.file);
      if (standardized) {
        assert(viewerMap[item.pdf] === item.file,
          'Visualizador não vincula o nome padronizado: ' + item.id);
      }
    }
  }
  const stockFiles = [...tracked].filter(x => x.startsWith('relatorios/estoque/') && x.endsWith('.pdf'));
  for (const path of stockFiles) {
    assert(stockRefs.has(path), 'PDF de estoque sem avaliação: ' + path);
    assert(!isGeneric(path.split('/').pop()), 'PDF genérico no GitHub: ' + path);
  }
  for (const name of verified) {
    assert(stockRefs.has('relatorios/estoque/' + name),
      'PDF verificado sem avaliação: ' + name);
    assert(!isGeneric(name), 'PDF genérico na lista de links: ' + name);
  }
  for (const name of Object.values(viewerMap)) {
    assert(!isGeneric(name), 'Visualizador com link genérico: ' + name);
  }
  const archivedFiles = [...tracked].filter(x =>
    x.startsWith('relatorios/arquivados_sem_cadastro/') && x.endsWith('.pdf'));
  for (const path of archivedFiles) {
    assert(/^ARQUIVADO_SEM_CADASTRO_ID_\d+\.pdf$/.test(path.split('/').pop()),
      'Arquivo sem cadastro com nome não identificado: ' + path);
    assert(!stockRefs.has(path), 'Documento arquivado vinculado como estoque: ' + path);
  }
  const fieldFiles = [...tracked].filter(x => x.startsWith('relatorios/acompanhamento de área/') && x.endsWith('.pdf'));
  for (const path of fieldFiles) assert(fieldRefs.has(path), 'PDF de campo sem registro: ' + path);
  assert(fieldFiles.length === fieldRefs.size,
    'Relação de PDFs de campo não está 1:1 com os registros');
  assert(stockFiles.length === stockRefs.size,
    'Relação de PDFs de estoque não está 1:1 com os registros');
  for (const path of fieldFiles) checkRoute(path.split('/').pop(), 'campo');
  for (const path of stockFiles) checkRoute(path.split('/').pop(), 'estoque');
  for (const id of historicalIds) {
    assert(Boolean(viewerMap[id]), 'ID legado sem nome de PDF: ' + id);
    if (!routeScript || !viewerMap[id]) continue;
    const result = routeScript.runInNewContext({
      location: {search: '?pdf=' + encodeURIComponent(id),
        href: 'https://m0dustudy.github.io/acompanhamento-areas/visualizador.html'},
      URL, URLSearchParams, document: {getElementById: () => ({})}
    }, {timeout: 1000});
    const expectedPath = '/M0dustudy/acompanhamento-areas/ba9a5f023c08bfe7fc75ffde9be6015de5305249/relatorios/estoque/' + viewerMap[id];
    assert(result.validName === true && result.category === 'estoque' &&
      decodeURIComponent(new URL(result.url).pathname) === expectedPath,
      'PDF histórico não resolve o arquivo original: ' + id);
  }

  console.log('Áreas com avaliação:', Object.keys(areas).length);
  console.log('Situações de áreas:', groupCodes.length);
  console.log('Recepções:', recepcoes.length);
  console.log('Titulações por data/área:', Object.keys(titulacoes).length);
  console.log('Estoque:', estoque.length, 'avaliações /', stockFiles.length, 'PDFs hospedados /', pendingStock.length, 'PDFs pendentes');
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
