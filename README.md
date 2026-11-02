# Universal Modding Center

Catalogo open source di strumenti, firmware, recovery, driver e guide per dispositivi Android. Progetto indipendente e non affiliato ai produttori.

## MVP v0.4.0
- Interfaccia web responsive dark.
- Catalogo iniziale di fonti ufficiali e community.
- Ricerca e filtri per categoria e brand.
- Ricerca repository pubblici tramite GitHub API.
- App desktop Electron per Windows, macOS e Linux.
- Rilevamento ADB dei dispositivi Android con lettura di modello, produttore e codename.
- Ricerca del supporto LineageOS verificando il codename nel wiki ufficiale.
- Verifica multi-ROM conservativa sugli otto cataloghi ufficiali aggiuntivi: richiede identità ADB coerente e corrispondenza del modello; se il catalogo non è accessibile o la corrispondenza è parziale, UMC non propone file.
- Controllo dinamico delle release KSign tramite GitHub API ufficiale; download e firma IPA restano sul dispositivo iOS e nel repository originale.
- Elenco delle build ZIP pubblicate dall'API ufficiale LineageOS v2.
- Download desktop dei pacchetti LineageOS nella cartella Download/UMC.
- Generazione di una guida TXT per la build selezionata.
- Catalogo informativo di nove progetti ROM: LineageOS, crDroid, GrapheneOS, CalyxOS, /e/OS, Evolution X, PixelOS, DerpFest e BlissROMs.
- Sezione iPhone 12 e successivi con controllo preliminare della compatibilità jailbreak per modello/versione iOS.
- Collegamenti ufficiali per AltStore PAL/Classic, SideStore, KSign, Sideloadly e Dopamine.
- Nota di compatibilità Android su iPhone basata sullo stato ufficiale di Project Sandcastle.
- In modalità web, download delegato al browser e guida TXT generata localmente.

## Avvio web
Apri `site/index.html` oppure esegui `npm run web`.

## Avvio desktop
Richiede Node.js LTS:
```bash
npm install
npm start
```
Per creare pacchetti: `npm run dist` (la compilazione per ogni OS è preferibile sul relativo sistema).

Installa ADB/Fastboot dal sito ufficiale: https://developer.android.com/tools/releases/platform-tools

## Flusso Custom ROM
1. Collega il telefono via USB, abilita Debug USB e autorizza il PC.
2. Nell'app desktop apri **Dispositivi** e premi **Rileva via ADB / Fastboot**. UMC legge modello, produttore e codename tramite proprietà Android non identificative.
3. Apri **Custom ROM**. UMC verifica il codename nel repository dati ufficiale del wiki LineageOS.
4. Se il dispositivo è presente, UMC consulta l'API pubblica v2 di LineageOS e mostra gli ZIP effettivamente pubblicati per quel codename.
5. Scarica lo ZIP e genera il TXT della build selezionata. Nell'app desktop i download sono salvati in `Download/UMC`; nel browser il download è gestito dal browser.

Fonti dati:
- https://github.com/LineageOS/lineage_wiki
- https://download.lineageos.org/api/v2/devices/<codename>/builds
- https://wiki.lineageos.org/devices/<codename>/install/

## iPhone Lab
- Il controllo jailbreak è indicativo e rimanda alla iOS Guide per verificare il firmware esatto. Non esegue jailbreak, firma IPA o installazioni.
- AltStore PAL è il marketplace alternativo per l'UE; AltStore Classic, SideStore e KSign sono strumenti di sideloading/firma e non equivalgono a un jailbreak.
- KSign deve essere scaricato solo dalle release del repository ufficiale: https://github.com/Nyasami/Ksign/releases
- Project Sandcastle dichiara supporto Android attuale per iPhone 7 / 7 Plus e iPod touch 7, non per iPhone 12 e successivi: https://projectsandcastle.org/status

## Limiti e sicurezza
- La verifica multi-ROM consulta i cataloghi ufficiali di crDroid, GrapheneOS, CalyxOS, /e/OS, Evolution X, PixelOS, DerpFest e BlissROMs. Una corrispondenza viene considerata verificata solo quando la fonte contiene sia il codename esatto sia il nome modello; le fonti che non espongono dati accessibili via browser vengono indicate come non verificabili. I file vengono collegati solo se trovati nella pagina ufficiale e sul dominio ufficiale del progetto. La disponibilità può variare e non equivale a certificazione d'installazione.
- La presenza nel wiki non significa che ogni variante commerciale sia compatibile: controlla sempre modello, codename, variante e requisiti firmware.
- Se il dispositivo non è supportato o l'API non restituisce build, UMC non propone ZIP alternativi né inventa link.
- Il TXT è una guida di orientamento con link alla documentazione ufficiale; non sostituisce le istruzioni aggiornate specifiche del dispositivo.
- Il download desktop accetta solo URL HTTPS appartenenti a domini `.lineageos.org`.
- UMC non sblocca il bootloader, non esegue il flash e non automatizza Odin. Lo sblocco può cancellare i dati: esegui un backup.
- Controlla SHA-256 e firma quando disponibili prima di installare.

## Roadmap
- [x] Catalogo, ricerca e filtri
- [x] Ricerca GitHub
- [x] Shell desktop e rilevamento ADB/Fastboot
- [x] Rilevamento modello e codename
- [x] Verifica LineageOS e ricerca build ufficiali
- [x] Catalogo di nove progetti ROM
- [x] iPhone Lab con compatibilità jailbreak preliminare e strumenti sideloading
- [x] Download ZIP desktop e guida TXT
- [ ] Download manager con progressi visibili, checksum automatico e ripresa
- [x] Verifica multi-ROM prudenziale sui cataloghi ufficiali (match modello + codename, senza fallback presunti)
- [ ] Database dispositivi per più produttori e varianti
- [ ] Test automatici e build desktop firmate

## Licenza
MIT. Software e marchi di terze parti restano dei rispettivi proprietari.