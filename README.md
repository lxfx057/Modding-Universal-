# Modding-Universal-
A list how to unlock and mod any device with screen (tv escluded)
modding-hub/
├── .github/
│   └── workflows/
│       └── update-check.yml       # GitHub Action per la verifica automatica dei link
├── assets/
│   ├── css/                       # Stili CSS minimali per il sito
│   └── img/                       # Loghi e icone dei brand (Xiaomi, Google, OnePlus, ecc.)
├── data/
│   ├── brands/
│   │   ├── google.json            # Database dispositivi Google (es. Pixel 3a, 6, ecc.)
│   │   ├── xiaomi.json            # Database Xiaomi / Poco / Redmi
│   │   ├── motorola.json          # Database Motorola
│   │   └── oneplus.json           # Database OnePlus
│   └── global-tools.json          # Link stabili e verificati per ADB, Fastboot e Driver USB
├── docs/                          # Guide e spiegazioni in stile "Aranzulla" (Markdown)
│   ├── 01-riconoscimento.md       # Come trovare il codename e identificare il telefono
│   ├── 02-bootloader.md           # Guida universale allo sblocco (regole dei produttori)
│   └── 03-recovery.md             # Come flashare OrangeFox / TWRP senza fare danni
├── site/                          # Interfaccia Web statica (es. HTML/JS o Astro)
│   ├── index.html                 # Homepage con barra di ricerca istantanea
│   └── device.html                # Pagina dinamica del modello selezionato
├── README.md                      # Vetrina principale del progetto su GitHub
└── LICENSE                        # Licenza Open Source (es. MIT)

