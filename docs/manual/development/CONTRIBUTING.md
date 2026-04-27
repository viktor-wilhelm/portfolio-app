# Contributing – Portfolio-Website

## Willkommen

Dies ist eine Vanilla JavaScript Portfolio-Website (One-Page, zweisprachig DE/EN).
Diese Anleitung hilft dir beim Einstieg in die lokale Entwicklung.

---

## Voraussetzungen

- **Browser**: Chrome, Firefox oder Edge (aktuell)
- **Editor**: VS Code (empfohlen)
- **Git**: Versionskontrolle
- **Live Server**: VS Code Extension

## Lokale Entwicklung starten

1. **Repository klonen**

   ```bash
   git clone <repository-url>
   cd portfolio-app
   ```

2. **Live Server starten**
   - `index.html` → Rechtsklick → "Open with Live Server"
   - Oder: `python3 -m http.server 8000`

3. **Seite aufrufen**
   - `http://localhost:5500` im Browser öffnen

---

## Projektstruktur

```
portfolio-app/
├── index.html                  # Einzige HTML-Seite (alle Sektionen)
├── style.css                   # Haupt-Stylesheet
├── script.js                   # Initialisierung, Sprachlogik
├── assets/
│   ├── img/                    # Bilder (max. 500 KB je Datei)
│   ├── fonts/                  # Lokal eingebundene Schriftarten
│   └── icons/                  # SVG-Icons (Favicon, Social)
├── js/
│   ├── language.js             # DE/EN Toggle, localStorage
│   ├── contact-form.js         # Formularvalidierung & Versand
│   └── translations.js         # Übersetzungs-Objekte { de, en }
└── css/
    ├── variables.css           # CSS Custom Properties
    ├── components/             # Navbar, Cards, Buttons, Footer
    └── sections/               # hero.css, about.css, etc.
```

---

## Neue Sektion hinzufügen

1. `<section id="name">` in `index.html` einfügen
2. Style-Datei in `css/sections/name.css` anlegen und verlinken
3. Übersetzungsschlüssel in `js/translations.js` ergänzen (de + en)
4. `data-i18n`-Attribute auf alle übersetzbaren Elemente setzen

---

## Übersetzung ergänzen

```js
// js/translations.js
export const translations = {
  de: {
    heroTitle: 'Hallo, ich bin ...',
    // neue Schlüssel hier
  },
  en: {
    heroTitle: 'Hello, I am ...',
    // neue Schlüssel hier
  }
};
```

---

## Git-Workflow

```bash
# Status prüfen
git status

# Alle Änderungen stagen
git add .

# Commit mit aussagekräftiger Message
git commit -m "Add projects section with preview images"

# Pushen
git push origin dev
```

### Commit-Message Regeln

- Englisch, Imperativ
- Klar und beschreibend
- Beispiele:
  - `Add hero section with CTA button`
  - `Fix contact form onBlur validation`
  - `Implement DE/EN language toggle`
  - `Compress project preview images`

---

## Code-Style

- Funktionen max. **14 Zeilen**
- Dateien max. **400 LOC**
- **camelCase** für alle Variablen und Funktionen
- Formularvalidierung nur `onBlur` – niemals `onInput`
- Kein `console.log` committen

Vollständige Regeln: [coding-rules.md](../architecture/coding-rules.md)

---

## Häufige Probleme

| Problem | Lösung |
|---------|--------|
| Sprachumschalter funktioniert nicht | `data-i18n`-Key in `translations.js` prüfen |
| Bild verzerrt | `object-fit: cover` oder `contain` setzen |
| Formular-Button bleibt disabled | Alle Felder + Checkbox auf Validität prüfen |
| Autofill verändert Design | Webkit-Autofill-Fix in CSS anwenden |
| Validierungsmeldung verschiebt Layout | `min-height` auf `.form__error` setzen |
