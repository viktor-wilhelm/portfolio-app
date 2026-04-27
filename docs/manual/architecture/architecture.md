# Architecture – Portfolio-Website

## System Overview

Die Portfolio-Website ist eine **One-Page Application (OPA)** mit einem rein statischen Frontend.
Alle Inhalte befinden sich in einer einzigen `index.html` – Navigation scrollt zu Anker-Sektionen.

## Schichtenarchitektur

```
┌─────────────────────────────────────┐
│   Präsentationsschicht              │
│   - index.html (Sektionen)          │
│   - style.css / css/ (Styles)       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Logikschicht (JS)                 │
│   - language.js (DE/EN Toggle)      │
│   - contact-form.js (Validierung)   │
│   - translations.js (i18n Objekte)  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Persistenzschicht                 │
│   - localStorage (Spracheinstellung)│
│   - EmailJS / Backend (Formular)    │
└─────────────────────────────────────┘
```

## Seitenstruktur

```
<header>           Navigation + Sprachumschalter (DE | EN)
<section#hero>     Fullscreen-Hero (height: 100vh)
<section#about>    Über mich – Foto, Bio, Skills
<section#projects> Projektübersicht – Karten mit Links
<section#contact>  Kontaktformular
<footer>           Social Links, Impressum, Datenschutz
```

## Dateistruktur

```
portfolio-app/
├── index.html              # One-Page (alle Sektionen, Sprachumschalter)
├── style.css               # Haupt-Stylesheet
├── script.js               # Initialisierung, Sprachlogik, Formularvalidierung
├── assets/
│   ├── img/                # Profilbild, Projektvorschauen (max. 500 KB)
│   ├── fonts/              # Lokal eingebundene Schriftarten
│   └── icons/              # SVG-Icons (Favicon, Social)
├── js/
│   ├── language.js         # DE/EN Toggle, localStorage
│   ├── contact-form.js     # Validierung (onBlur), Versand
│   └── translations.js     # Übersetzungs-Objekte { de: {}, en: {} }
└── css/
    ├── variables.css       # CSS Custom Properties
    ├── components/         # Navbar, Cards, Buttons, Footer
    └── sections/           # hero.css, about.css, projects.css, contact.css
```

## i18n-Konzept

- Alle übersetzbaren Elemente bekommen `data-i18n="key"`
- `translations.js` enthält `{ de: { key: 'Text' }, en: { key: 'Text' } }`
- `language.js` liest die Schlüssel und schreibt `textContent`
- `localStorage.setItem('lang', 'de'|'en')` speichert die Auswahl

## Input-System

- `Keyboard`-Klasse speichert Zustand aller relevanten Tasten (LEFT, RIGHT, UP, SPACE, D)
- `keydown`/`keyup` Events in `script.js`
- Touch-Events von mobilen Buttons setzen dieselben Keyboard-Properties

## Kern-Prinzipien

- **Keine Business-Logik in HTML**
- **Kein CSS in JavaScript** (außer Canvas-Operationen)
- **Kein `location.reload()` für Neustart** – stattdessen Objekte neu initialisieren
- **Alle Intervals stoppen** bevor neue gestartet werden (Neustart, Game Over)
