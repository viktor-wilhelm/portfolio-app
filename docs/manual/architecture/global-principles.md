# Global Principles – Portfolio-Website

Alle Entscheidungen und Code-Generierungen müssen diese Prinzipien priorisieren:

## 1. Einfachheit

- Vanilla JavaScript – keine Bibliotheken, keine Frameworks
- Kein Build-Tool, kein Bundler
- Eine HTML-Datei für alle Inhalte

## 2. Nutzererfahrung zuerst

- Design exakt nach Figma-Vorlage (Mobile + Desktop)
- Kein Bild darf verzerrt dargestellt werden
- Formularfehler erst nach Verlassen eines Feldes (kein Stress beim Tippen)
- Klares Feedback nach Formularversand

## 3. Clean Code

- Funktionen max. 14 Zeilen
- Eine Funktion = eine Aufgabe
- Sprechende Namen für Variablen und Funktionen
- Kein `console.log` im finalen Code

## 4. Responsiveness

- Mobile-First: Basis-Styles ohne Media Query, Desktop via `min-width`
- Kein horizontaler Scrollbalken
- Zwischengrößen sinnvoll gestaltet

## 5. Zweisprachigkeit

- Alle Texte in DE und EN vorhanden (`translations.js`)
- Sprachumschalter im Header immer sichtbar
- `lang`-Attribut auf `<html>` wird dynamisch gesetzt
- Spracheinstellung in `localStorage` gespeichert

## 6. Git-Disziplin

- Nach jeder Session committen
- Klare englische Commit-Messages
- Kein `console.log` committen
- `.gitignore` gepflegt halten
