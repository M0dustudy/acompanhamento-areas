/* VITRA | Atualizacao automatica apos publicacao efetiva no GitHub Pages. */
(() => {
  "use strict";
  if (!/^https?:$/.test(location.protocol) || typeof fetch !== "function") return;

  const INTERVALO = 120000; // Dois minutos, somente com a pagina visivel.
  const OCIOSIDADE = 12000; // Nao interromper navegacao ativa.
  const recursos = [
    new URL("./index.html", location.href),
    ...Array.from(document.querySelectorAll('script[src],link[rel~="stylesheet"][href]'))
      .map(el => new URL(el.src || el.href, location.href))
      .filter(url => url.origin === location.origin)
  ];
  const urls = [...new Map(recursos.map(url => [url.pathname, url])).values()];
  const camposEditados = new Set();
  let referencia = null;
  let verificando = false;
  let pendente = false;
  let ultimoUso = Date.now();
  let ultimaConsulta = 0;

  ["pointerdown", "keydown", "scroll"].forEach(tipo => {
    document.addEventListener(tipo, () => { ultimoUso = Date.now(); }, { passive: true, capture: true });
  });
  document.addEventListener("input", evento => {
    ultimoUso = Date.now();
    const campo = evento.target;
    if (!(campo instanceof Element) || !campo.matches("input,textarea,select,[contenteditable]")) return;
    if (campo.matches('input[type="search"],.searchbar') || campo.closest(".workspace-search,.searchwrap")) return;
    camposEditados.add(campo);
  }, true);

  function podeRecarregar() {
    for (const campo of camposEditados) if (!campo.isConnected) camposEditados.delete(campo);
    return !document.hidden &&
      camposEditados.size === 0 &&
      Date.now() - ultimoUso >= OCIOSIDADE &&
      !document.activeElement?.matches('textarea,[contenteditable="true"]');
  }

  function tentarRecarregar() {
    if (!pendente || !podeRecarregar()) return;
    const destino = new URL(location.href);
    destino.searchParams.set("_vitra_atualizado", String(Date.now()));
    location.replace(destino.href); // URL nova impede recuperar HTML antigo do cache.
  }

  async function assinatura(url) {
    const consulta = new URL(url.href);
    consulta.searchParams.set("_vitra_verificacao", String(Date.now()));
    const resposta = await fetch(consulta.href, { method: "HEAD", cache: "no-store" });
    if (!resposta.ok) throw new Error("Arquivo nao publicado");
    const versao = resposta.headers.get("etag") ||
      resposta.headers.get("last-modified") ||
      resposta.headers.get("content-length");
    if (!versao) throw new Error("Sem indicador de versao");
    return versao;
  }

  async function verificarPublicacao() {
    if (verificando || pendente || document.hidden) return;
    verificando = true;
    ultimaConsulta = Date.now();
    try {
      const versoes = await Promise.all(urls.map(assinatura));
      if (referencia && versoes.some((valor, i) => valor !== referencia[i])) {
        pendente = true; // Mudanca identificada no dominio do site, nao apenas no repositorio.
        tentarRecarregar();
        setInterval(tentarRecarregar, 5000);
      } else if (!referencia) {
        referencia = versoes;
      }
    } catch {
      // Falha de rede ou publicacao parcial: manter a pagina atual intacta.
    } finally {
      verificando = false;
    }
  }

  function verificarSeNecessario() {
    if (pendente) tentarRecarregar();
    else if (Date.now() - ultimaConsulta >= INTERVALO) verificarPublicacao();
  }
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) verificarSeNecessario();
  });
  window.addEventListener("focus", verificarSeNecessario);
  setInterval(verificarSeNecessario, 15000);
  verificarPublicacao();
})();