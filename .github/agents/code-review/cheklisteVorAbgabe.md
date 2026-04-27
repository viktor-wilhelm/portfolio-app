# Checkliste vor Abgabe – Portfolio-Website

## Git & Allgemeines

- [ ] GitHub-Repository aktuell und gepflegt
- [ ] Commits nach jeder Coding-Session
- [ ] Klare, aussagekräftige Commit-Messages (Englisch)
- [ ] `.gitignore` vorhanden
- [ ] Kein `console.log` im finalen Code
- [ ] Keine Konsolenfehler im Browser

## Design & UI

- [ ] Schriftart lokal in `assets/fonts/` eingebunden (kein Google Fonts CDN)
- [ ] Favicon in `assets/icons/` vorhanden (individuell, kein Framework-Standard)
- [ ] Alle Buttons haben `cursor: pointer`
- [ ] Hero-Sektion (`#hero`) nimmt `height: 100vh` ein
- [ ] Alle Abstände, Farben, Typografie gemäß Figma-Mockup
- [ ] CSS Custom Properties aus `css/variables.css` konsequent genutzt

## Texte & Sprache

- [ ] Sprachumschalter (DE/EN) im Header funktioniert
- [ ] `lang`-Attribut auf `<html>` wird dynamisch auf `de` oder `en` gesetzt
- [ ] Spracheinstellung wird in `localStorage` gespeichert
- [ ] Alle Texte in `translations.js` vorhanden – DE und EN vollständig
- [ ] Kein „Lorem Ipsum" – nur echte Inhalte
- [ ] Texte mit DeepL / LanguageTool gegengeprüft

## Bilder (`assets/img/`)

- [ ] Kein Bild verzerrt (`object-fit: cover` oder `contain`)
- [ ] Alle Bilder komprimiert (max. 500 KB)
- [ ] Fotos wirken professionell (gute Pose, neutraler Hintergrund)
- [ ] Kein Bild mehrfach verwendet

## Sektionen (index.html)

- [ ] `<header>` mit Navigation und Sprachumschalter vorhanden
- [ ] `<section id="hero">` – Name, Titel, CTA
- [ ] `<section id="about">` – Foto, Text, Skills
- [ ] `<section id="projects">` – Projektkarten
- [ ] `<section id="contact">` – Kontaktformular
- [ ] `<footer>` – Social Links, Impressum, Datenschutz

## Projekte

- [ ] Projektübersicht vorhanden
- [ ] Jedes Projekt hat einen Live-Link
- [ ] Jedes Projekt hat einen GitHub-Link
- [ ] Projekte sind testbar und laufen fehlerfrei
- [ ] Vorschaubilder in `assets/img/` vorhanden und stimmig

## Kontaktformular (contact-form.js / mail.php)

- [ ] Validierung nur `onBlur` (nach Verlassen des Feldes)
- [ ] Validierungsmeldungen ohne Layoutverschiebung (reservierter Platz)
- [ ] Senden-Button nur aktiv wenn Formular vollständig korrekt ausgefüllt
- [ ] Datenschutz-Checkbox ist Pflichtfeld
- [ ] Autofill-Styling (Webkit-Hintergrundfarbe) explizit überschrieben
- [ ] Klares Nutzer-Feedback nach Versand (Erfolg / Fehler)
- [ ] Kein `location.reload()` nach Versand
- [ ] `mail.php` läuft serverseitig fehlerfrei

## Social Media & Links

- [ ] LinkedIn-Link mit `https://`
- [ ] GitHub-Link mit `https://`
- [ ] Keine privaten Social-Media-Links (kein Facebook, Instagram etc.)

## Domain & Hosting

- [ ] Eigene Domain vorhanden
- [ ] SSL-Zertifikat aktiv (HTTPS erzwungen)

## Responsiveness

- [ ] Mobile-Ansicht entspricht Figma-Vorlage
- [ ] Desktop-Ansicht entspricht Figma-Vorlage
- [ ] Kein horizontaler Scrollbalken
- [ ] Zwischengrößen sinnvoll gestaltet

## Technische Umsetzung

- [ ] Hauptdatei heißt `index.html`
- [ ] Alle Funktionen ≤ 14 Zeilen
- [ ] Alle Dateien ≤ 400 LOC
- [ ] BEM-Methode konsequent eingehalten
- [ ] Semantische HTML-Elemente: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`

## Rechtliches

- [ ] Impressum vorhanden (mit echten Daten)
- [ ] Datenschutzerklärung vorhanden
- [ ] Links im Footer zugänglich
- [ ] Beide Seiten responsiv und gut lesbar
