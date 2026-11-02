# Universal Modding Center

Catalogo open source di strumenti, firmware, recovery, driver e guide per dispositivi Android. Progetto indipendente e non affiliato ai produttori.

## MVP v0.1.0
- Interfaccia web responsive dark.
- Catalogo iniziale di fonti ufficiali e community.
- Ricerca e filtri per categoria e brand.
- Coda di selezione e apertura delle fonti originali.
- Ricerca repository pubblici tramite GitHub API.
- Shell desktop Electron per Windows, macOS e Linux.
- Rilevamento dispositivi ADB/Fastboot nell'app desktop (richiede Platform Tools installati).

## Avvio web
Apri `site/index.html` oppure esegui `npx serve site`.

## Avvio desktop
Richiede Node.js LTS:
```bash
npm install
npm start
```
Per creare pacchetti: `npm run dist` (la compilazione per ogni OS è preferibile sul relativo sistema).

Installa ADB/Fastboot dal sito ufficiale: https://developer.android.com/tools/releases/platform-tools

## Download e sicurezza
La web app apre i link alle fonti originali; non ospita copie di firmware e non aggira login o protezioni. La coda MVP non è ancora un download manager integrato. Prima di flashare, verifica modello esatto, codename, variante e regione; controlla checksum quando disponibili ed esegui un backup. Lo sblocco bootloader può cancellare i dati.

UMC non distribuisce Odin e non automatizza il flash. Odin è proprietario: usa solo fonti affidabili e procedure specifiche per il modello. Nessuna compatibilità universale è garantita.

## Roadmap
- [x] Catalogo, ricerca e filtri
- [x] Ricerca GitHub
- [x] Selezione multipla
- [x] Shell desktop e rilevamento ADB/Fastboot
- [ ] Download manager con progressi, checksum e ripresa
- [ ] Database dispositivi per codename/variante
- [ ] Controllo automatico dei link
- [ ] Guide guidate e controlli di compatibilità

## Licenza
MIT. Software e marchi di terze parti restano dei rispettivi proprietari.
