---
agent: code-reviewer
---

# Code Review Checkliste – Portfolio-Website

Schnell-Referenz für Code-Reviews.

## JavaScript

- [ ] Funktionen ≤ 14 Zeilen
- [ ] Eine Aufgabe pro Funktion
- [ ] camelCase für Variablen und Funktionen
- [ ] Kein `console.log`
- [ ] Keine ungenutzten Variablen

## Sprachlogik (language.js / translations.js)

- [ ] `lang`-Attribut auf `<html>` wird gesetzt
- [ ] Spracheinstellung in `localStorage` gespeichert
- [ ] Jeder Übersetzungsschlüssel in DE und EN vorhanden
- [ ] Kein hartcodierter Text im HTML (nur über translations.js)

## Kontaktformular (contact-form.js / mail.php)

- [ ] Validierung nur `onBlur`
- [ ] Kein `location.reload()` nach Versand
- [ ] Senden-Button deaktiviert bis Formular valide
- [ ] Datenschutz-Checkbox Pflichtfeld
- [ ] Nutzer-Feedback nach Versand vorhanden

## CSS / HTML

- [ ] `cursor: pointer` auf Buttons
- [ ] Kein horizontaler Scrollbalken
- [ ] Mobile-First (`min-width` Media Queries)
- [ ] BEM-Klassen korrekt
- [ ] CSS Custom Properties aus `variables.css` genutzt
- [ ] Keine verzerrten Bilder (`object-fit` gesetzt)
- [ ] Schriftarten lokal eingebunden

## Dateien

- [ ] ≤ 400 LOC pro Datei
- [ ] Logische Trennung: `language.js`, `contact-form.js`, `translations.js`

## Git

- [ ] Keine `console.log` committed
- [ ] Klare englische Commit-Messages
- [ ] `.gitignore` beachtet

---

**Schnell-Fehler:**

- `console.log` → Ablehnen
- Validierung mit `onInput` → Ablehnen
- Funktion > 20 Zeilen → Überarbeitung anfordern
- Fehlende Übersetzung (DE oder EN) → Überarbeitung anfordern
