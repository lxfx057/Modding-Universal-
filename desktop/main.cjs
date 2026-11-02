const {app,BrowserWindow,ipcMain,shell,session}=require("electron");
const {execFile}=require("node:child_process");
const path=require("node:path");
const fs=require("node:fs");
const pendingDownloads=new Map();
function run(bin,args){return new Promise(resolve=>execFile(bin,args,{timeout:12000,windowsHide:true},(error,stdout,stderr)=>resolve({ok:!error,stdout:stdout||"",stderr:stderr||"",error:error?.message||null})))}
async function readAdbProfile(id){const props=["ro.product.model","ro.product.manufacturer","ro.product.device","ro.product.vendor.device","ro.build.product"];const results=await Promise.all(props.map(p=>run("adb",["-s",id,"shell","getprop",p])));const v=results.map(x=>x.stdout.trim());return{model:v[0],manufacturer:v[1],codename:v[2]||v[3]||v[4],vendorDevice:v[3],buildProduct:v[4]}}
async function detect(){const [a,f]=await Promise.all([run("adb",["devices","-l"]),run("fastboot",["devices"])]);const devices=[];for(const line of a.stdout.split(/\r?\n/).slice(1)){const m=line.trim().match(/^(\S+)\s+(\S+)/);if(m){let d={kind:"ADB",id:m[1],state:m[2]};if(m[2]==="device")Object.assign(d,await readAdbProfile(m[1]));devices.push(d)}}for(const line of f.stdout.split(/\r?\n/)){const m=line.trim().match(/^(\S+)\s+(\S+)/);if(m)devices.push({kind:"Fastboot",id:m[1],state:m[2]})}return{devices,adbAvailable:a.ok,fastbootAvailable:f.ok,adbError:a.error,fastbootError:f.error}}
function safeFilename(name){return String(name||"lineageos.zip").replace(/[^a-zA-Z0-9._-]/g,"_").slice(0,180)||"lineageos.zip"}
function createWindow(){const w=new BrowserWindow({width:1440,height:950,minWidth:900,minHeight:650,backgroundColor:"#090d16",webPreferences:{preload:path.join(__dirname,"preload.cjs"),contextIsolation:true,nodeIntegration:false,sandbox:true}});w.loadFile(path.join(__dirname,"../site/index.html"))}
app.whenReady().then(()=>{
  session.defaultSession.on("will-download",(_event,item,webContents)=>{
    const url=item.getURL(),pending=pendingDownloads.get(url);
    if(!pending||!pending.length)return;
    const job=pending.shift();if(!pending.length)pendingDownloads.delete(url);
    const {target,win}=job;item.setSavePath(target);
    item.on("updated",()=>{if(!win.isDestroyed())win.webContents.send("umc:download-progress",{filename:path.basename(target),received:item.getReceivedBytes(),total:item.getTotalBytes(),state:item.getState()})});
    item.once("done",(_event,state)=>{if(!win.isDestroyed())win.webContents.send("umc:download-done",{filename:path.basename(target),state,path:state==="completed"?target:null})});
  });
  ipcMain.handle("umc:detect",detect);
  ipcMain.handle("umc:open-url",(_e,url)=>{if(typeof url!=="string"||!/^https:\/\//i.test(url))throw Error("Solo URL HTTPS consentiti");return shell.openExternal(url)});
  ipcMain.handle("umc:download",async(event,{url,filename})=>{
    let parsed;try{parsed=new URL(url)}catch{throw Error("URL non valido")}
    if(parsed.protocol!=="https:"||!(parsed.hostname==="download.lineageos.org"||parsed.hostname.endsWith(".lineageos.org")))throw Error("Per sicurezza sono consentiti solo download HTTPS dai domini ufficiali LineageOS");
    const win=BrowserWindow.fromWebContents(event.sender);if(!win)throw Error("Finestra non disponibile");
    const dir=path.join(app.getPath("downloads"),"UMC");fs.mkdirSync(dir,{recursive:true});
    const target=path.join(dir,safeFilename(filename));const list=pendingDownloads.get(parsed.toString())||[];
    list.push({target,win});pendingDownloads.set(parsed.toString(),list);
    win.webContents.downloadURL(parsed.toString());
    return{started:true,filename:path.basename(target)};
  });
  createWindow();app.on("activate",()=>{if(!BrowserWindow.getAllWindows().length)createWindow()});
});
app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit()});