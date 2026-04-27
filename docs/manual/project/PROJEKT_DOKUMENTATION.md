# Portfolio-Website – Technische Projektdokumentation

## Projektübersicht

Professionelle, zweisprachige (DE/EN) Entwickler-Portfolio-Website als One-Page Application.
Ziel: Sich als Entwickler optimal präsentieren und Recruitern alle relevanten Informationen übersichtlich bereitstellen.

## Technologie-Stack

| Bereich | Technologie |
|---------|------------|
| Markup | HTML5 (semantische Elemente) |
| Styling | CSS3 (Custom Properties, Flexbox, Grid) |
| Logik | Vanilla JavaScript (ES6+) |
| i18n | Eigene Sprachumschaltung via `translations.js` |
| Persistenz | localStorage (Spracheinstellung) |
| Formularversand | EmailJS / Backend-Endpunkt |
| Build-Tool | Kein Build-Tool |

## Architektur

One-Page Application – alle Sektionen in einer `index.html`.
Navigation scrollt zu Anker-IDs. Sprachumschaltung über `data-i18n`-Attribute.

## Projektstruktur

```
portfolio-app/
├── index.html                  # Einzige HTML-Seite (alle Sektionen)
├── style.css                   # Haupt-Stylesheet
├── script.js                   # Initialisierung, Sprachlogik
├── README.md
├── .gitignore
├── assets/
│   ├── img/                    # Profilbild, Projektvorschauen (max. 500 KB)
│   ├── fonts/                  # Lokal eingebundene Schriftarten
│   └── icons/                  # SVG-Icons (Favicon, Social)
├── js/
│   ├── language.js             # DE/EN Toggle, localStorage
│   ├── contact-form.js         # Validierung (onBlur), Formularversand
│   └── translations.js         # Übersetzungs-Objekte { de: {}, en: {} }
└── css/
    ├── variables.css           # CSS Custom Properties (Farben, Abstände)
    ├── components/             # Navbar, Cards, Buttons, Footer
    └── sections/               # hero.css, about.css, projects.css, contact.css
```

## Seitenstruktur

| Sektion | ID | Beschreibung |
|---------|-----|-------------|
| Header | – | Navigation + Sprachumschalter (DE \| EN) |
| Hero | `#hero` | Fullscreen (100vh) – Name, Titel, CTA |
| About | `#about` | Foto, Kurzvorstellung, Skills |
| Projects | `#projects` | Projektkarten mit Live-Link + GitHub-Link |
| Contact | `#contact` | Kontaktformular mit onBlur-Validierung |
| Footer | – | LinkedIn, GitHub, Impressum, Datenschutz |

## i18n-Konzept

- Alle übersetzbaren Elemente haben `data-i18n="key"`
- `translations.js` enthält `{ de: { key: 'Text' }, en: { key: 'Text' } }`
- `language.js` schreibt `textContent` aller markierten Elemente
- `document.documentElement.lang` wird dynamisch gesetzt
- Sprachauswahl wird in `localStorage` gespeichert

## Kontaktformular

- Validierung ausschließlich `onBlur` (nicht `onInput`)
- `<span class="form__error">` mit `min-height` reserviert Platz (kein Layout-Shift)
- Senden-Button bleibt `disabled` bis alle Felder gültig + Datenschutz-Checkbox gesetzt
- Webkit-Autofill-Hintergrundfarbe explizit überschrieben
- Nutzer-Feedback nach Versand (Erfolg / Fehler) via `#form-feedback`

## Responsive Design

- Mobile-First: Basis-Styles ohne Media Query
- `min-width: 768px` für Tablet
- `min-width: 1200px` für Desktop
- Kein horizontaler Scrollbalken
