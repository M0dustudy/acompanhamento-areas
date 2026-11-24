/* Configuração isolada do VITRA iOS. Não modifica o APK Android publicado. */
import {readFileSync,writeFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {resolve,join} from "node:path";
const dir=resolve(fileURLToPath(new URL(".",import.meta.url)));
const path=join(dir,"../android-app/capacitor.config.json");
const cfg=JSON.parse(readFileSync(path,"utf8"));
if(!cfg.webDir||cfg.appName!=="VITRA")throw Error("Configuração principal inesperada.");
cfg.appId="br.com.vitra.qualidade";
cfg.server={iosScheme:"capacitor",androidScheme:"https",hostname:"localhost"};
cfg.ios={...cfg.ios,backgroundColor:"#103e2c",preferredContentMode:"mobile"};
// O login e o painel mestre aceitam capacitor://localhost via lista CORS explícita.
writeFileSync(path,JSON.stringify(cfg,null,2)+"\n");
console.log("VITRA iOS preparado: Bundle ID",cfg.appId,"origem capacitor://localhost");
