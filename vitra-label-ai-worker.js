// VITRA: leitura visual local. A foto permanece no worker do navegador.
let loaded=null,busy=false;
async function load(){
 if(loaded)return loaded;
 if(!self.navigator?.gpu)throw Error("Este navegador não oferece WebGPU.");
 const adapter=await navigator.gpu.requestAdapter();
 if(!adapter?.features.has("shader-f16"))throw Error("GPU sem suporte ao modelo visual de precisão reduzida.");
 const {Florence2ForConditionalGeneration,AutoProcessor,AutoTokenizer,RawImage,env}=await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1");
 env.allowLocalModels=false;env.useBrowserCache=true;
 const id="onnx-community/Florence-2-base-ft",revision="353633a1e0a9caa00f839ac15980f07f2fb2cf81";
 const progress_callback=p=>{if(p.status==="progress")self.postMessage({type:"progress",file:p.file,progress:Math.round(p.progress||0)});};
 const [model,processor,tokenizer]=await Promise.all([
 Florence2ForConditionalGeneration.from_pretrained(id,{revision,device:"webgpu",dtype:{embed_tokens:"fp16",vision_encoder:"fp16",encoder_model:"q4",decoder_model_merged:"q4"},progress_callback}),
 AutoProcessor.from_pretrained(id,{revision}),AutoTokenizer.from_pretrained(id,{revision})]);
 loaded={model,processor,tokenizer,RawImage};return loaded;
}
self.onmessage=async({data})=>{
 if(busy)return;busy=true;
 try{
  if(!(data.photo instanceof Blob))throw Error("Fotografia inválida.");
  const {model,processor,tokenizer,RawImage}=await load();
  self.postMessage({type:"reading"});
  const image=await RawImage.fromBlob(data.photo);
  const task="<OCR_WITH_REGION>",vision=await processor(image),tokens=tokenizer(processor.construct_prompts(task));
  const ids=await model.generate({...tokens,...vision,max_new_tokens:512,do_sample:false,num_beams:1});
  const decoded=tokenizer.batch_decode(ids,{skip_special_tokens:false})[0];
  const result=processor.post_process_generation(decoded,task,image.size)[task];
  const lines=Array.isArray(result?.labels)?result.labels.filter(x=>typeof x==="string").map(x=>x.trim()).filter(Boolean):[];
  if(!lines.length)throw Error("A IA não encontrou texto legível.");
  self.postMessage({type:"result",text:lines.join("\n").slice(0,12000)});
 }catch(e){self.postMessage({type:"error",message:String(e?.message||"IA local indisponível").slice(0,180)});}
 finally{busy=false;}
};