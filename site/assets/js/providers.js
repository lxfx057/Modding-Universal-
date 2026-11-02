/* Official multi-ROM catalogue verifier.
 * Conservative by design: no model/codename guess and no third-party mirror downloads.
 */
(()=>{
"use strict";
const $=s=>document.querySelector(s);
const providers=[
 {id:"crdroid",name:"crDroid",url:"https://crdroid.net/downloads",host:"crdroid.net"},
 {id:"graphene",name:"GrapheneOS",url:"https://grapheneos.org/releases",host:"grapheneos.org"},
 {id:"calyx",name:"CalyxOS",url:"https://calyxos.org/install/",host:"calyxos.org"},
 {id:"eos",name:"/e/OS",url:"https://doc.e.foundation/devices/",host:"doc.e.foundation"},
 {id:"evolution",name:"Evolution X",url:"https://evolution-x.org/",host:"evolution-x.org"},
 {id:"pixelos",name:"PixelOS",url:"https://pixelos.net/download",host:"pixelos.net"},
 {id:"derpfest",name:"DerpFest",url:"https://derpfest.org/",host:"derpfest.org"},
 {id:"bliss",name:"BlissROMs",url:"https://blissroms.org/",host:"blissroms.org"}
];
const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function exactToken(text,code){const t=String(text||"").toLowerCase();return new RegExp("(^|[^a-z0-9])"+code.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"([^a-z0-9]|$)","i").test(t)}
function officialHost(url,host){try{const u=new URL(url);return u.protocol==="https:"&&(u.hostname===host||u.hostname.endsWith("."+host))}catch{return false}}
function identity(){
 const d=window.umcActiveDevice;
 if(!d||d.kind==="Fastboot")return{ok:false,reason:"Collega un dispositivo Android acceso e autorizzato via ADB."};
 if(d.identitySource==="manual"||d.manufacturer==="Non verificato")return{ok:false,reason:"Codename inserito manualmente: non è una prova dell'identità del telefono. Usa il rilevamento ADB."};
 if(d.identityWarning)return{ok:false,reason:d.identityWarning};
 if(!d.identityVerified||!d.model||!d.manufacturer||!d.codename)return{ok:false,reason:"Identità incompleta o ambigua: servono produttore, modello e un codename coerente."};
 if(d.codenameCandidates&&d.codenameCandidates.length>1)return{ok:false,reason:"Le proprietà ADB restituiscono più codename: verifica manualmente prima di cercare file."};
 return{ok:true,device:d};
}
function installPanel(){
 const section=$("#view-roms"),catalog=$("#romCatalog");
 if(!section||!catalog)return;
 const panel=document.createElement("article");panel.className="panel";panel.id="multiRomPanel";
 panel.innerHTML='<h3>Verifica multi-ROM ufficiale</h3><p>Controlla il dispositivo rilevato nei cataloghi ufficiali degli altri otto progetti. UMC non propone file se il codename e il modello non sono confermati dalla fonte.</p><button class="primary" id="verifyAllRoms">Verifica tutti i progetti</button><div id="multiRomStatus" class="muted" style="margin-top:12px">In attesa del rilevamento ADB.</div><div id="multiRomResults" class="rom-list"></div>';
 catalog.parentNode.insertBefore(panel,catalog);
 $("#verifyAllRoms").addEventListener("click",verifyAll);
}
async function checkProvider(p,d){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
 try{
  const r=await fetch(p.url,{signal:controller.signal,cache:"no-store"});
  if(!r.ok)throw Error("HTTP "+r.status);
  const html=await r.text(),doc=new DOMParser().parseFromString(html,"text/html");
  const text=norm(doc.body?.textContent||"");
  const codeMatch=exactToken(text,d.codename);
  const model=norm(d.model),modelMatch=model.length>=3&&text.includes(model);
  const anchors=[...doc.querySelectorAll("a[href]")].map(a=>({url:new URL(a.getAttribute("href"),p.url).href,label:(a.textContent||"").trim()}));
  const exactFiles=anchors.filter(a=>officialHost(a.url,p.host)&&exactToken(a.url+" "+a.label,d.codename)&&/\.(zip|img|bin|tar|xz|apk)$/i.test(new URL(a.url).pathname));
  const guideLinks=anchors.filter(a=>officialHost(a.url,p.host)&&exactToken(a.url+" "+a.label,d.codename));
  if(!codeMatch)return{p,status:"not-listed",message:"Codename non trovato nel catalogo consultato.",files:[],links:[]};
  if(!modelMatch)return{p,status:"codename-only",message:"Codename trovato, ma il nome modello non coincide in modo verificabile. Nessun file proposto.",files:[],links:guideLinks.slice(0,3)};
  return{p,status:"verified",message:"Modello e codename trovati nella fonte ufficiale. Verifica la guida del progetto prima di procedere.",files:exactFiles,links:guideLinks.slice(0,3)};
 }catch(e){return{p,status:"unavailable",message:"Verifica automatica non disponibile ("+(e.name==="AbortError"?"timeout":e.message)+"). Apri la fonte ufficiale e verifica manualmente.",files:[],links:[]}}
 finally{clearTimeout(timer)}
}
function renderResult(x){
 const labels={verified:"Corrispondenza trovata", "codename-only":"Verifica parziale", "not-listed":"Non trovato", unavailable:"Fonte non verificabile"};
 const cls=x.status==="verified"?"good":x.status==="codename-only"?"warn":"muted";
 let links='<a href="'+esc(x.p.url)+'" target="_blank" rel="noopener">Apri catalogo ufficiale ↗</a>';
 if(x.links.length)links+=' '+x.links.map(a=>'<a href="'+esc(a.url)+'" target="_blank" rel="noopener">'+esc(a.label||"Guida dispositivo")+' ↗</a>').join(" ");
 if(x.files.length)links+=' '+x.files.map(a=>'<a href="'+esc(a.url)+'" target="_blank" rel="noopener">File ufficiale: '+esc(a.label||a.url.split("/").pop())+' ↓</a>').join(" ");
 return '<article class="rom-card"><div><span class="tag">'+esc(x.p.name.toUpperCase())+'</span><h3>'+esc(labels[x.status])+'</h3><p class="'+cls+'">'+esc(x.message)+'</p><p class="muted">Codename: '+esc(window.umcActiveDevice.codename)+' · Modello: '+esc(window.umcActiveDevice.model)+'</p><div class="actions">'+links+'</div></div></article>';
}
async function verifyAll(){
 const id=identity(),status=$("#multiRomStatus"),out=$("#multiRomResults");
 out.innerHTML="";
 if(!id.ok){status.textContent=id.reason+" Nessun download sarà mostrato.";return}
 const d=id.device;
 status.textContent="Identità ADB: "+d.manufacturer+" "+d.model+" · "+d.codename+". Controllo le fonti ufficiali…";
 const results=await Promise.all(providers.map(p=>checkProvider(p,d)));
 out.innerHTML=results.map(renderResult).join("");
 const good=results.filter(x=>x.status==="verified").length;
 status.textContent="Controllo terminato: "+good+" progetti con corrispondenza modello + codename; "+results.filter(x=>x.status==="codename-only").length+" corrispondenze parziali. Nessun file da mirror terzi viene proposto.";
}
async function loadKSign(){
 const card=document.querySelector('#iosTools article');
 const target=[...document.querySelectorAll('#iosTools article')].find(x=>/KSign/i.test(x.textContent));
 if(!target)return;
 const p=document.createElement("p");p.className="muted";p.textContent="Controllo release ufficiale GitHub…";target.appendChild(p);
 try{
  const r=await fetch("https://api.github.com/repos/Nyasami/Ksign/releases?per_page=10",{headers:{Accept:"application/vnd.github+json"}});
  if(!r.ok)throw Error("GitHub API "+r.status);
  const releases=await r.json(),stable=releases.find(x=>!x.draft&&!x.prerelease),beta=releases.find(x=>!x.draft&&x.prerelease);
  const chosen=stable||beta;
  if(!chosen)throw Error("Nessuna release pubblicata");
  p.innerHTML='Release stabile: <strong>'+esc(stable?.tag_name||"non disponibile")+'</strong>'+(beta?' · Beta: '+esc(beta.tag_name):'')+'<br><a href="'+esc(chosen.html_url)+'" target="_blank" rel="noopener">Apri release ufficiale e asset IPA ↗</a><br><span class="muted">KSign è un signer iOS: richiede un certificato/provisioning valido. Non è un jailbreak e UMC non firma né installa IPA.</span>';
 }catch(e){p.textContent="Release non caricabile ora. Usa solo il repository ufficiale: github.com/Nyasami/Ksign/releases."}
}
document.addEventListener("DOMContentLoaded",()=>{installPanel();loadKSign()});
})();
