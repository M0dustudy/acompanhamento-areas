/* Ícone iOS 1024px opaco para catálogo do Xcode, identidade VITRA. */
import {mkdirSync,readFileSync,writeFileSync,existsSync} from "node:fs";
import {join,resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {deflateSync} from "node:zlib";
const here=resolve(fileURLToPath(new URL(".",import.meta.url)));
const dir=join(here,"../android-app/ios/App/App/Assets.xcassets/AppIcon.appiconset");
mkdirSync(dir,{recursive:true});
const contents=join(dir,"Contents.json");
const metadata=existsSync(contents)?JSON.parse(readFileSync(contents,"utf8")):{images:[]};
const filenames=[...new Set((metadata.images||[]).map(x=>x.filename).filter(Boolean))];
if(!filenames.length){
 filenames.push("AppIcon-512@2x.png");
 writeFileSync(contents,JSON.stringify({images:[{filename:filenames[0],idiom:"universal",platform:"ios",size:"1024x1024"}],info:{author:"xcode",version:1}},null,2));
}
const size=1024;
const data=Buffer.alloc(size*(size*4+1));
function isInsideRoundedRect(x,y,cx,cy,width,height,radius){
 const dx=Math.max(Math.abs(x-cx)-width/2+radius,0);
 const dy=Math.max(Math.abs(y-cy)-height/2+radius,0);
 return dx*dx+dy*dy<radius*radius;
}
for(let y=0;y<size;y++)for(let x=0;x<size;x++){
 const xx=(x+.5)/size,yy=(y+.5)/size;
 const at=y*(size*4+1)+1+x*4;
 const tile=isInsideRoundedRect(xx,yy,.5,.5,.74,.74,.16);
 const inLetter=yy>.30&&yy<.71;
 const posLeft=.32+(.5-.32)*(yy-.30)/(.71-.30);
 const posRight=.68-(.68-.5)*(yy-.30)/(.71-.30);
 const letter=tile&&inLetter&&(Math.abs(xx-posLeft)<.036||Math.abs(xx-posRight)<.036);
 let c;
 if(letter)c=[16,65,44];
 else if(tile)c=[Math.round(220-15*yy),Math.round(191-11*yy),Math.round(123-8*yy)];
 else c=[Math.round(12+9*yy),Math.round(59+20*(1-yy)),Math.round(40+6*yy)];
 data[at]=c[0];data[at+1]=c[1];data[at+2]=c[2];data[at+3]=255;
}
let table=Array.from({length:256},(_,i)=>{let v=i;for(let j=0;j<8;j++)v=(v&1)?0xedb88320^(v>>>1):v>>>1;return v>>>0});
function crc(bytes){let c=0xffffffff;for(const byte of bytes)c=table[(c^byte)&255]^(c>>>8);return(c^0xffffffff)>>>0}
function chunk(type,bytes){const name=Buffer.from(type),n=Buffer.alloc(4),v=Buffer.alloc(4);n.writeUInt32BE(bytes.length);v.writeUInt32BE(crc(Buffer.concat([name,bytes])));return Buffer.concat([n,name,bytes,v])}
const head=Buffer.alloc(13);head.writeUInt32BE(size,0);head.writeUInt32BE(size,4);head[8]=8;head[9]=6;
const png=Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk("IHDR",head),chunk("IDAT",deflateSync(data,{level:9})),chunk("IEND",Buffer.alloc(0))]);
for(const filename of filenames)writeFileSync(join(dir,filename),png);
console.log("Ícone VITRA iOS gerado:",filenames.join(", "));
