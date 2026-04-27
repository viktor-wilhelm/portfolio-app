# Portfolio Website

A professional, bilingual (DE/EN) developer portfolio website built as a one-page application.

---

## Design Preview

![About Me Section](docs/design-preview.png)

---


## Tech Stack

| Area        | Technology                    |
| ----------- | ----------------------------- |
| Markup      | HTML5 (semantic, accessible)  |
| Styling     | CSS3 (Custom Properties, BEM) |
| Logic       | Vanilla JavaScript (ES6+)     |
| i18n        | Custom language switcher      |
| Persistence | localStorage                  |
| Backend     | PHP (`mail.php`)              |
| Build tool  | None                          |

---

## Project Structure

```
portfolio-app/
├── index.html              # One-page – all sections
├── mail.php                # Contact form backend
├── assets/
│   ├── fonts/              # Locally hosted fonts
│   ├── img/                # Images (max. 500 KB each)
│   └── icons/              # SVG icons & favicon
├── css/
│   ├── variables.css       # CSS Custom Properties
│   ├── base.css            # Reset & global styles
│   ├── components/         # navbar.css, footer.css, ...
│   └── sections/           # hero.css, about.css, projects.css, contact.css
└── js/
    ├── translations.js     # Translation objects (de / en)
    ├── language.js         # Language switcher + localStorage
    └── contact-form.js     # onBlur validation & form submission
```

---

## Local Development

**Requirements:** VS Code + [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

```bash
# Clone the repository
git clone <repository-url>
cd portfolio-app

# Start Live Server
# index.html → right-click → "Open with Live Server"
# or:
python3 -m http.server 8000
```

Open in browser: `http://localhost:5500`

---

## Sections

| Section  | ID          | Description                                |
| -------- | ----------- | ------------------------------------------ |
| Header   | –           | Navigation + language switcher (DE \| EN)  |
| Hero     | `#hero`     | Fullscreen (100vh) – name, title, CTA      |
| About    | `#about`    | Photo, bio, skills                         |
| Projects | `#projects` | Project cards with live link + GitHub link |
| Contact  | `#contact`  | Form with onBlur validation                |
| Footer   | –           | Social links, imprint, privacy policy      |

---

## Adding Translations

Add new keys to `js/translations.js`:

```js
const translations = {
  de: {
    myKey: "Mein Text",
  },
  en: {
    myKey: "My text",
  },
};
```

Reference in HTML with `data-i18n="myKey"`:

```html
<p data-i18n="myKey">My text</p>
```

---

## Git Workflow

```bash
git checkout -b feature/section-name
# ... develop ...
git add .
git commit -m "Add hero section with 100vh layout"
git checkout dev
git merge feature/section-name
```

---

## Documentation

Further documentation is located in [`docs/manual/`](docs/manual/).

---

## Tech Stack

| Bereich    | Technologie                      |
| ---------- | -------------------------------- |
| Markup     | HTML5 (semantisch, barrierefrei) |
| Styling    | CSS3 (Custom Properties, BEM)    |
| Logik      | Vanilla JavaScript (ES6+)        |
| i18n       | Eigene Sprachumschaltung         |
| Persistenz | localStorage                     |
| Backend    | PHP (`mail.php`)                 |
| Build      | Kein Build-Tool                  |

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

| Sektion  | ID          | Beschreibung                              |
| -------- | ----------- | ----------------------------------------- |
| Header   | –           | Navigation + Sprachumschalter (DE \| EN)  |
| Hero     | `#hero`     | Fullscreen (100vh) – Name, Titel, CTA     |
| About    | `#about`    | Foto, Kurzvorstellung, Skills             |
| Projects | `#projects` | Projektkarten mit Live-Link + GitHub-Link |
| Contact  | `#contact`  | Formular mit onBlur-Validierung           |
| Footer   | –           | Social Links, Impressum, Datenschutz      |

---

## Übersetzung erweitern

Neue Schlüssel in `js/translations.js` ergänzen:

```js
const translations = {
  de: {
    myKey: "Mein Text",
  },
  en: {
    myKey: "My text",
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
