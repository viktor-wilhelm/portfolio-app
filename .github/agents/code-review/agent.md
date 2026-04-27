---
agent: code-reviewer
---

# Code Review Agent – Portfolio-Website

## Zweck

Überprüfe Code-Änderungen gegen die Coding-Standards der Portfolio-Website.

## Projektdateien

```
portfolio-app/
├── index.html
├── mail.php
├── js/
│   ├── language.js        # DE/EN Sprachumschaltung
│   ├── contact-form.js    # Formularvalidierung & Versand
│   └── translations.js    # Übersetzungs-Objekte (de, en)
└── css/
    ├── variables.css
    ├── components/
    └── sections/
```

## Review-Bereiche

- Funktionslänge (≤ 14 Zeilen)
- Dateigröße (≤ 400 LOC)
- Keine `console.log`-Ausgaben
- Eine Funktion = eine Aufgabe
- Formularvalidierung nur `onBlur`
- Kein `location.reload()` nach Formularversand

## Review-Checkliste

### JavaScript

- [ ] Alle Funktionen ≤ 14 Zeilen
- [ ] Variablen und Funktionen in camelCase
- [ ] Kein `console.log`
- [ ] Keine ungenutzten Variablen
- [ ] `language.js` setzt `lang`-Attribut auf `<html>` dynamisch
- [ ] `translations.js` hat vollständige DE- und EN-Einträge für jeden Schlüssel
- [ ] `contact-form.js` validiert ausschließlich `onBlur`

### Kontaktformular (contact-form.js / mail.php)

- [ ] Validierung nur `onBlur`, nicht `onInput`
- [ ] Validierungsmeldungen ohne Layoutverschiebung (reservierter Platz)
- [ ] Senden-Button nur aktiv bei vollständig validem Formular
- [ ] Datenschutz-Checkbox als Pflichtfeld
- [ ] Klares Nutzer-Feedback nach Versand (Erfolg / Fehler)
- [ ] Kein `location.reload()` nach Versand
- [ ] Autofill-Styling (Webkit) explizit überschrieben

### CSS

- [ ] `cursor: pointer` auf allen Buttons
- [ ] Mobile-First: `min-width` Media Queries
- [ ] BEM-Klassen korrekt (Block\_\_Element--Modifier)
- [ ] CSS Custom Properties aus `variables.css` genutzt
- [ ] Kein horizontaler Scrollbalken

### HTML (index.html)

- [ ] Semantische Elemente: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- [ ] Hero-Sektion mit `id="hero"` und `height: 100vh`
- [ ] Schriftarten lokal eingebunden (kein Google Fonts CDN)
- [ ] Favicon eingebunden

## Maßnahmen bei Verstoß

1. Klare Beschreibung des Problems
2. Verweis auf die Regel (`.github/copilot-instructions.md`)
3. Korrekturvorschlag mit Codebeispiel

## Automatische Fehler (Block Merge)

- `console.log` im finalen Code → Blockieren
- Validierung mit `onInput` statt `onBlur` → Blockieren
- Funktionen > 20 Zeilen → Änderungen anfordern
- Fehlende DE- oder EN-Übersetzung → Änderungen anfordern
