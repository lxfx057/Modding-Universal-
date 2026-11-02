const {contextBridge,ipcRenderer}=require("electron");
contextBridge.exposeInMainWorld("UMC",Object.freeze({
detect:()=>ipcRenderer.invoke("umc:detect"),
openUrl:url=>ipcRenderer.invoke("umc:open-url",url),
download:payload=>ipcRenderer.invoke("umc:download",payload),
onDownloadProgress:callback=>{if(typeof callback!=="function")return;const handler=(_e,data)=>callback(data);ipcRenderer.on("umc:download-progress",handler);return()=>ipcRenderer.removeListener("umc:download-progress",handler)},
onDownloadDone:callback=>{if(typeof callback!=="function")return;const handler=(_e,data)=>callback(data);ipcRenderer.on("umc:download-done",handler);return()=>ipcRenderer.removeListener("umc:download-done",handler)}
}));