/* VITRA Android | PDFs consultados sob demanda.
   Cada URL tem uma entrada única no IndexedDB. Nenhum download em lote. */
(() => {
 "use strict";
 const jobs=new Map();
 const database=new Promise((resolve,reject)=>{
   const request=indexedDB.open("vitra-mobile-pdfs-v1",1);
   request.onupgradeneeded=()=>{
     if(!request.result.objectStoreNames.contains("pdfs"))
       request.result.createObjectStore("pdfs",{keyPath:"url"});
   };
   request.onsuccess=()=>resolve(request.result);
   request.onerror=()=>reject(request.error);
 });
 async function read(url){
   const db=await database;
   return await new Promise((resolve,reject)=>{
     const request=db.transaction("pdfs","readonly").objectStore("pdfs").get(url);
     request.onsuccess=()=>resolve(request.result||null);
     request.onerror=()=>reject(request.error);
   });
 }
 async function save(entry){
   const db=await database;
   return await new Promise((resolve,reject)=>{
     const tx=db.transaction("pdfs","readwrite");
     tx.objectStore("pdfs").put(entry);
     tx.oncomplete=resolve;
     tx.onerror=()=>reject(tx.error||Error("Falha ao salvar o PDF"));
     tx.onabort=()=>reject(tx.error||Error("Espaço insuficiente para o PDF"));
   });
 }
 async function load(url){
   const parsed=new URL(url);
   if(parsed.origin!=="https://raw.githubusercontent.com" ||
      !parsed.pathname.startsWith("/M0dustudy/acompanhamento-areas/") ||
      !parsed.pathname.includes("/relatorios/") ||
      !parsed.pathname.toLowerCase().endsWith(".pdf"))
     throw new Error("Endereço de documento não autorizado");
   const key=parsed.href;
   const stored=await read(key);
   if(stored?.bytes instanceof ArrayBuffer && stored.bytes.byteLength>0)
     return stored.bytes;
   if(!navigator.onLine)throw new Error("Este documento ainda não foi aberto. Conecte-se à internet para baixá-lo.");
   const response=await fetch(key,{cache:"no-store",mode:"cors"});
   if(!response.ok)throw new Error("Documento indisponível no GitHub");
   const max=80*1024*1024;
   const reported=Number(response.headers.get("content-length")||0);
   if(reported>max)throw new Error("PDF excede o limite de 80 MB do aplicativo");
   const bytes=await response.arrayBuffer();
   if(bytes.byteLength===0 || bytes.byteLength>max)throw new Error("Documento vazio ou muito grande");
   const prefix=new TextDecoder().decode(bytes.slice(0,1024));
   if(!prefix.includes("%PDF-"))throw new Error("O arquivo recebido não é um PDF válido");
   // Só exibir como 'offline' depois da confirmação de armazenamento.
   await save({url:key,bytes,bytesCount:bytes.byteLength,savedAt:new Date().toISOString()});
   return bytes;
 }
 window.VitraPdfCache={
   open(url){
     const key=new URL(url).href;
     if(!jobs.has(key)){
       const task=load(key).finally(()=>jobs.delete(key));
       jobs.set(key,task);
     }
     return jobs.get(key);
   },
   async exists(url){return !!(await read(new URL(url).href));}
 };
})();
