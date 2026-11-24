import { readFileSync, writeFileSync, cpSync, mkdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const here=resolve(fileURLToPath(new URL(".",import.meta.url)));
const root=resolve(here,"..");
const target=join(here,"www");
mkdirSync(target,{recursive:true});
const read=name=>readFileSync(join(root,name),"utf8");
const write=(name,content)=>writeFileSync(join(target,name),content,"utf8");
const copy=name=>cpSync(join(root,name),join(target,name),{recursive:true,force:true});

for(const name of [
 "vitra-access.css","vitra-labels-smart.css","vitra-access-config.js",
 "vitra-access.js","vitra-labels-smart.js"
])copy(name);
copy("imagens"); // Fotos das variedades, sem incluir PDFs ou relatórios.
write("dashboard.html",read("index.html"));
let viewer=read("visualizador.html");
function replaceOnce(original, replacement,description){
 if(viewer.split(original).length!==2)throw new Error("Visualizador mudou: "+description);
 viewer=viewer.replace(original,replacement);
}
replaceOnce(
 '<script type="module">',
 '<script src="./pdf-cache.js"></script><script type="module">',
 "biblioteca de cache"
);
replaceOnce(
 'await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs")',
 'await import("./pdf.min.mjs")',
 "PDF.js local"
);
replaceOnce(
 'pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";',
 'pdfjsLib.GlobalWorkerOptions.workerSrc="./pdf.worker.min.mjs";',
 "PDF.js worker local"
);
replaceOnce(
 'pdf=await pdfjsLib.getDocument(url).promise;',
 [
  'const offlinePdfBytes=await window.VitraPdfCache.open(url);',
  'const downloadObjectUrl=URL.createObjectURL(new Blob([offlinePdfBytes],{type:"application/pdf"}));',
  'download.href=downloadObjectUrl;',
  'download.download=name;',
  'download.hidden=false;',
  'direct.hidden=true;',
  'pdf=await pdfjsLib.getDocument({data:new Uint8Array(offlinePdfBytes.slice(0))}).promise;'
 ].join("\n  "),
 "visualização de PDF pelo cache"
);
replaceOnce(
 'if(url){direct.href=url;download.href=url;download.download=name;direct.hidden=false;download.hidden=false;}',
 'if(url){download.download=name;direct.hidden=true;download.hidden=true;}',
 "controles de PDF sem baixar de novo"
);
viewer=viewer
 .replaceAll("Relatório exibido online","Relatório disponível offline")
 .replaceAll("Relatório aberto online","Relatório armazenado no aparelho")
 .replaceAll("Carregando relatório para visualização online","Abrindo relatório")
 .replace("Visualização integrada indisponível. O PDF original pode ser aberto diretamente.",
          "Não foi possível abrir o documento. Para o primeiro acesso, conecte o celular à internet.");
// Evitar fallback silencioso para o PDF remoto: isso causaria novo download.
viewer=viewer.replace('if(url){\n    const a=document.createElement("a");',
                      'if(false && url){\n    const a=document.createElement("a");');
write("visualizador.html",viewer);

const base=join(here,"src");
for(const name of ["boot.html","app.js","pdf-cache.js"]){
 write(name==="boot.html"?"index.html":name,readFileSync(join(base,name),"utf8"));
}
const pdfjs=join(here,"node_modules","pdfjs-dist","build");
for(const name of ["pdf.min.mjs","pdf.worker.min.mjs"]){
 const source=join(pdfjs,name);
 if(!existsSync(source))throw new Error("PDF.js não foi instalado: "+source);
 cpSync(source,join(target,name));
}
console.log("VITRA Android preparado: HTML e dados locais, documentos PDF sob demanda.");
