# 📱 Modding Hub

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)
![Made with](https://img.shields.io/badge/made%20with-JSON%20%7C%20HTML%20%7C%20JS-orange.svg)

**Modding Hub** è un archivio centralizzato e sempre aggiornato di link, guide e strumenti per lo sblocco del bootloader, l'installazione di custom recovery (TWRP/OrangeFox) e il modding degli smartphone Android più diffusi (Google Pixel, Xiaomi/Poco/Redmi, Motorola, OnePlus).

Il progetto nasce per risolvere un problema comune a chi fa modding: i link ufficiali cambiano spesso e le guide sparse per il web diventano obsolete. Qui trovi tutto in un unico posto, verificato automaticamente e organizzato per brand e modello.

## ✨ Caratteristiche

- Database strutturati in JSON per ogni brand (Google, Xiaomi, Motorola, OnePlus)
- Link a tool essenziali (ADB, Fastboot, driver USB) sempre verificati
- Controllo automatico dei link tramite GitHub Actions, per evitare riferimenti morti
- Guide scritte in stile chiaro e passo-passo, pensate anche per utenti poco esperti
- Interfaccia web statica con barra di ricerca istantanea per trovare subito il proprio modello
- Struttura facilmente estendibile per aggiungere nuovi brand o dispositivi

## 📂 Struttura del progetto
text````
modding-hub/
├── .github/
│ └── workflows/
│ └── update-check.yml # GitHub Action per la verifica automatica dei link
├── assets/
│ ├── css/ # Stili CSS minimali per il sito
│ └── img/ # Loghi e icone dei brand
├── data/
│ ├── brands/
│ │ ├── google.json # Database dispositivi Google (es. Pixel 3a, 6, ecc.)
│ │ ├── xiaomi.json # Database Xiaomi / Poco / Redmi
│ │ ├── motorola.json # Database Motorola
│ │ └── oneplus.json # Database OnePlus
│ └── global-tools.json # Link stabili e verificati per ADB, Fastboot e Driver USB
├── docs/ # Guide in stile "Aranzulla" (Markdown)
│ ├── 01-riconoscimento.md # Come trovare il codename e identificare il telefono
│ ├── 02-bootloader.md # Guida universale allo sblocco (regole dei produttori)
│ └── 03-recovery.md # Come flashare OrangeFox / TWRP senza fare danni
├── site/ # Interfaccia Web statica
│ ├── index.html # Homepage con barra di ricerca istantanea
│ └── device.html # Pagina dinamica del modello selezionato
├── README.md # Questo file
└── LICENSE # Licenza Open Source (MIT)
    ````

## 🚀 Come iniziare

1. Clona il repository:
   ```bash
   git clone https://github.com/<tuo-username>/modding-hub.git
   cd modding-hub
   ```
2. Apri `site/index.html` nel browser per usare l'interfaccia di ricerca in locale, oppure consulta direttamente i file JSON in `data/brands/`.
3. Segui le guide in `docs/` nell'ordine consigliato: riconoscimento del dispositivo → sblocco bootloader → installazione recovery.

## 📖 Guide disponibili

| Guida | Contenuto |
|---|---|
| `01-riconoscimento.md` | Come trovare il codename e identificare correttamente il proprio telefono |
| `02-bootloader.md` | Regole e procedure per lo sblocco del bootloader, brand per brand |
| `03-recovery.md` | Come flashare OrangeFox o TWRP in sicurezza, evitando i danni più comuni |

## 🗂️ Database dispositivi

Ogni brand ha un file JSON dedicato in `data/brands/` con i modelli supportati, i link ufficiali e le note specifiche per lo sblocco. I tool trasversali (ADB, Fastboot, driver USB) sono raccolti in `data/global-tools.json` per evitare duplicazioni.

## ⚙️ Controllo automatico dei link

Il workflow `update-check.yml` in `.github/workflows/` esegue periodicamente una verifica automatica su tutti i link presenti nei database JSON, segnalando eventuali link non più funzionanti così da mantenere l'archivio affidabile nel tempo.

## 🤝 Contribuire

I contributi sono benvenuti! Per aggiungere un nuovo dispositivo, un brand o correggere un link:

1. Fai un fork del repository
2. Crea un branch dedicato (`git checkout -b nuovo-dispositivo`)
3. Modifica il file JSON o Markdown pertinente
4. Apri una Pull Request con una descrizione chiara della modifica

## ⚠️ Disclaimer

Sbloccare il bootloader e installare custom recovery può annullare la garanzia del dispositivo e, se eseguito in modo errato, può renderlo inutilizzabile (brick). Segui sempre le guide con attenzione e procedi a tuo rischio.
