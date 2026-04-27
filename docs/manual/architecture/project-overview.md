# Project Overview – Portfolio-Website

## Was ist die Portfolio-Website?

Eine professionelle, zweisprachige (DE/EN) Entwickler-Portfolio-Website als One-Page Application.
Ziel: Sich als Entwickler optimal präsentieren und Bewerbern/Recruitern alle relevanten Informationen übersichtlich bereitstellen.

## Technologie

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Architektur**: One-Page Application – alle Sektionen in einer HTML-Datei
- **Keine Bibliotheken / Frameworks**
- **Persistenz**: localStorage (Spracheinstellung)

## Zielplattform

- Desktop-Browser (Chrome, Firefox, Edge)
- Mobile Geräte (Hochformat, Mobile-First)

## Sektionen & Kernfunktionen

| Sektion          | Beschreibung                                                  |
| ---------------- | ------------------------------------------------------------- |
| Hero             | Fullscreen-Einstieg (100vh) – Name, Titel, CTA-Button         |
| About Me         | Foto, Kurzvorstellung, Skills                                 |
| Projects         | Projektkarten mit Live-Link + GitHub-Link                     |
| Contact          | Formular mit onBlur-Validierung, Datenschutz-Checkbox         |
| Footer           | LinkedIn, GitHub, Impressum, Datenschutz                      |
| Sprachumschalter | DE/EN Toggle im Header, localStorage, dynamisches `lang`-Attr |
