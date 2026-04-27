# Portfolio Website

Eine professionelle, zweisprachige (DE/EN) Entwickler-Portfolio-Website als One-Page Application.

---

## Tech Stack

| Bereich   | Technologie                        |
| --------- | ---------------------------------- |
| Markup    | HTML5 (semantisch, barrierefrei)   |
| Styling   | CSS3 (Custom Properties, BEM)      |
| Logik     | Vanilla JavaScript (ES6+)          |
| i18n      | Eigene Sprachumschaltung           |
| Persistenz | localStorage                      |
| Backend   | PHP (`mail.php`)                   |
| Build     | Kein Build-Tool                    |

---

## Projektstruktur

```
portfolio-app/
├── index.html              # One-Page – alle Sektionen
├── mail.php                # Kontaktformular-Backend
├── assets/
│   ├── fonts/              # Lokal eingebundene Schriftarten
│   ├── img/                # Bilder (max. 500 KB je Datei)
│   └── icons/              # SVG-Icons & Favicon
├── css/
│   ├── variables.css       # CSS Custom Properties
│   ├── base.css            # Reset & globale Styles
│   ├── components/         # navbar.css, footer.css, ...
│   └── sections/           # hero.css, about.css, projects.css, contact.css
└── js/
    ├── translations.js     # Übersetzungs-Objekte (de / en)
    ├── language.js         # Sprachumschalter + localStorage
    └── contact-form.js     # onBlur-Validierung & Formularversand
```

---

## Lokale Entwicklung

**Voraussetzungen:** VS Code + [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

```bash
# Repository klonen
git clone <repository-url>
cd portfolio-app

# Live Server starten
# index.html → Rechtsklick → "Open with Live Server"
# oder:
python3 -m http.server 8000
```

Seite aufrufen: `http://localhost:5500`

---

## Sektionen

| Sektion    | ID           | Beschreibung                                 |
| ---------- | ------------ | -------------------------------------------- |
| Header     | –            | Navigation + Sprachumschalter (DE \| EN)     |
| Hero       | `#hero`      | Fullscreen (100vh) – Name, Titel, CTA        |
| About      | `#about`     | Foto, Kurzvorstellung, Skills                |
| Projects   | `#projects`  | Projektkarten mit Live-Link + GitHub-Link    |
| Contact    | `#contact`   | Formular mit onBlur-Validierung              |
| Footer     | –            | Social Links, Impressum, Datenschutz         |

---

## Übersetzung erweitern

Neue Schlüssel in `js/translations.js` ergänzen:

```js
const translations = {
  de: {
    myKey: 'Mein Text',
  },
  en: {
    myKey: 'My text',
  },
};
```

Im HTML mit `data-i18n="myKey"` referenzieren:

```html
<p data-i18n="myKey">Mein Text</p>
```

---

## Git-Workflow

```bash
git checkout -b feature/section-name
# ... entwickeln ...
git add .
git commit -m "Add hero section with 100vh layout"
git checkout dev
git merge feature/section-name
```

---

## Dokumentation

Weitere Dokumentation liegt unter [`docs/manual/`](docs/manual/).
