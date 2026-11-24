/* Gera ícones PNG do VITRA sem dependências externas. */
import { writeFileSync,mkdirSync } from "node:fs";
import { join } from "node:path";
import { deflateSync } from "node:zlib";
const root=new URL("./android/app/src/main/res/",import.meta.url);
const path=decodeURIComponent(root.pathname);
const densities={mdpi:48,hdpi:72,xhdpi:96,xxhdpi:144,xxxhdpi:192};
const table=new Uint32Array(256);
for(let i=0;i<256;i++){let v=i;for(let j=0;j<8;j++)v=(v&1)?0xedb88320^(v>>>1):v>>>1;table[i]=v>>>0}
function crc(buffer){let c=0xffffffff;for(const b of buffer)c=table[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0}
const chunk=(type,data)=>{const t=Buffer.from(type),n=Buffer.alloc(4),c=Buffer.alloc(4);n.writeUInt32BE(data.length);c.writeUInt32BE(crc(Buffer.concat([t,data])));return Buffer.concat([n,t,data,c])};
function png(size,kind="normal"){
 const rows=Buffer.alloc(size*(size*4+1));
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
   const at=y*(size*4+1)+1+x*4;
   // Supersampling 8×8: preservar desenho, cor e proporções do símbolo original.
   let red=0,green=0,blue=0,opacity=0;
   for(let sy=0;sy<8;sy++)for(let sx=0;sx<8;sx++){
    const X=(x+(sx+.5)/8)/size,Y=(y+(sy+.5)/8)/size;
    const radius=.22;
    const dx=Math.max(Math.abs(X-.5)-(.5-radius),0),dy=Math.max(Math.abs(Y-.5)-(.5-radius),0);
    const inside=dx*dx+dy*dy<radius*radius;
    const stroke=.072;
    const left=Math.abs(X-(.31+(.5-.31)*(Y-.28)/(.69-.28)))<stroke/2;
    const right=Math.abs(X-(.69-(.69-.5)*(Y-.28)/(.69-.28)))<stroke/2;
    const letter=Y>.28&&Y<.70&&(left||right);
    const visible=kind==="foreground"?letter:inside;
    if(!visible)continue;
    opacity++;red+=letter?255:Math.round(16+18*Y);
    green+=letter?255:Math.round(71+47*(1-Y));
    blue+=letter?255:Math.round(46+15*Y);
   }
   rows[at]=opacity?Math.round(red/opacity):0;
   rows[at+1]=opacity?Math.round(green/opacity):0;
   rows[at+2]=opacity?Math.round(blue/opacity):0;
   rows[at+3]=Math.round(255*opacity/64);
 }
 const head=Buffer.alloc(13);head.writeUInt32BE(size,0);head.writeUInt32BE(size,4);head[8]=8;head[9]=6;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk("IHDR",head),chunk("IDAT",deflateSync(rows,{level:9})),chunk("IEND",Buffer.alloc(0))]);
}
for(const [density,size] of Object.entries(densities)){
 const dir=join(path,"mipmap-"+density);mkdirSync(dir,{recursive:true});
 writeFileSync(join(dir,"ic_launcher.png"),png(size));
 writeFileSync(join(dir,"ic_launcher_round.png"),png(size));
 writeFileSync(join(dir,"ic_launcher_foreground.png"),png(Math.round(size*108/48),"foreground"));
}
const values=join(path,"values");mkdirSync(values,{recursive:true});
writeFileSync(join(values,"ic_launcher_background.xml"),'<?xml version="1.0" encoding="utf-8"?><resources><color name="ic_launcher_background">#103E2C</color></resources>');
console.log("Ícones personalizados do VITRA preparados.");
