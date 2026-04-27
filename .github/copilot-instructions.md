# Copilot Instructions – Portfolio-Website

## Projektübersicht

**Portfolio-Website** – eine professionelle, zweisprachige (DE/EN) Entwickler-Portfolio-Website.
Technologie: Vanilla JavaScript (ES6+), HTML5, CSS3.
Kein Framework, kein Build-Tool.

---

## Technologie-Stack

- **HTML5** – Semantische Struktur, barrierefreie Sektionen
- **CSS3** – Responsive Design (Mobile-First), Custom Properties, BEM
- **Vanilla JavaScript (ES6+)** – Sprachumschaltung, Formularvalidierung, UI-Logik
- **localStorage** – Spracheinstellung speichern
- **mail.php** – Kontaktformular-Versand (PHP-Backend, serverseitiger Mailversand)

---

## Projektstruktur

**Aktueller Stand (in Entwicklung):**

```
portfolio-app/
├── index.html                    # Einzige HTML-Seite (One-Page)
├── mail.php                      # Backend: Kontaktformular-Versand (PHP)
├── README.md
└── .gitignore
```

**Geplante Zielstruktur:**

```
portfolio-app/
├── index.html                    # Einzige HTML-Seite (One-Page)
├── mail.php                      # Backend: Kontaktformular-Versand (PHP)
├── README.md
├── .gitignore
├── assets/
│   ├── img/                      # Bilder (max. 500 KB je Bild)
│   ├── fonts/                    # Lokal eingebundene Schriftarten
│   └── icons/                    # SVG-Icons (Favicon, Social-Icons)
├── js/
│   ├── language.js               # Sprachlogik (DE/EN Toggle)
│   ├── contact-form.js           # Formularvalidierung & Versand
│   └── translations.js           # Übersetzungs-Objekte (de, en)
└── css/
    ├── variables.css             # CSS Custom Properties (Farben, Abstände)
    ├── components/               # Komponentenspezifische Styles
    └── sections/                 # Sektions-Styles (hero, about, projects, contact)
```

---

## Coding-Standards (STRIKT einhalten)

### JavaScript

- **ES6+ Module** oder eingebundene Script-Dateien (je nach Projektentscheidung)
- **camelCase** für Variablen und Funktionen
- **Funktionslänge max. 14 Zeilen**
- **Max. 400 LOC pro Datei**
- **Eine Funktion = eine Aufgabe**
- Kein `console.log` im Produktionscode
- Formularvalidierung ausschließlich `onBlur` (nicht `onInput`)

### CSS

- **Mobile-First** – Basis-Styles für mobile Geräte, `min-width` Media Queries für Desktop
- Alle Buttons: `cursor: pointer`
- **BEM-Methode** für CSS-Klassen (Block\_\_Element--Modifier)
- Hero-Sektion: `height: 100vh`
- Bilder: `object-fit: cover` oder `object-fit: contain` – niemals verzerren
- CSS Custom Properties für Farben und Abstände
- Validierungsmeldungen verursachen **keine Layoutverschiebung** (reservierter Platz)

### HTML

- Hauptdatei: `index.html` (One-Page, alle Sektionen als `<section>`)
- Semantische Elemente: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Favicon einbinden (individuell angepasst)
- Schriftarten lokal einbinden (kein Google Fonts CDN)
- `lang`-Attribut auf `<html>` dynamisch setzen (DE/EN)

---

## Seitenstruktur & Sektionen

```
<header>          Navigation + Sprachumschalter (DE | EN)
<section#hero>    Fullscreen-Hero (height: 100vh) – Name, Titel, CTA
<section#about>   Über mich – Foto, Text, Skills
<section#projects>Projektübersicht – Karten mit Live-Link + GitHub-Link
<section#contact> Kontaktformular mit Validierung
<footer>          Social Links (LinkedIn, GitHub), Impressum, Datenschutz
```

---

## Funktionale Anforderungen (Checkliste)

### Design & UI

- [ ] Design exakt nach Figma-Vorlage (Mobile + Desktop)
- [ ] Hero-Sektion nimmt `height: 100vh` ein
- [ ] Alle Abstände, Farben, Typografie gemäß Mockup
- [ ] Favicon individuell (kein Framework-Standard-Logo)
- [ ] Seitentitel individuell angepasst (`<title>`)

### Texte & Sprache

- [ ] Sprachumschalter (DE/EN) im Header / Responsive-Menü
- [ ] Alle Texte in Deutsch **und** Englisch vorhanden
- [ ] Kein „Lorem Ipsum" – nur echte Inhalte
- [ ] Texte mit Sprachprüftools gegengeprüft (DeepL, Grammarly, LanguageTool)

### Bilder

- [ ] Kein Bild verzerrt (`object-fit: cover` oder `contain`)
- [ ] Alle Bilder komprimiert (max. 500 KB)
- [ ] Kein Bild wird mehrfach verwendet
- [ ] Fotos wirken professionell (gute Pose, neutraler Hintergrund)

### Projekte

- [ ] Projektübersicht vorhanden
- [ ] Jedes Projekt hat einen Live-Link (Subdomain des eigenen Servers)
- [ ] Jedes Projekt hat einen GitHub-Link
- [ ] Projekte sind testbar und laufen fehlerfrei
- [ ] Vorschaubilder stimmig und passend

### Social Media & Links

- [ ] LinkedIn-Link mit `https://`
- [ ] GitHub-Link mit `https://`
- [ ] Keine privaten Social-Media-Links (kein Facebook, Instagram etc.)

### Domain & Hosting

- [ ] Eigene Domain (z. B. `https://vorname-nachname.de`)
- [ ] SSL-Zertifikat aktiv (HTTPS erzwungen)

### Kontaktformular

- [ ] Validierung nur `onBlur` (nach Verlassen des Feldes)
- [ ] Validierungsmeldungen ohne Layoutverschiebung
- [ ] Senden-Button nur aktiv wenn Formular vollständig korrekt ausgefüllt
- [ ] Datenschutz-Checkbox Pflichtfeld
- [ ] Browser-Autovervollständigung beeinträchtigt Design nicht (Webkit-Fix)
- [ ] Klares Nutzer-Feedback nach Versand (Erfolg / Fehler)

### Rechtliches

- [ ] Impressum vorhanden (mit echten Daten)
- [ ] Datenschutzerklärung vorhanden
- [ ] Links im Footer zugänglich
- [ ] Beide Seiten responsiv und gut lesbar

### Responsiveness

- [ ] Mobile-Ansicht entspricht Figma-Vorlage
- [ ] Desktop-Ansicht entspricht Figma-Vorlage
- [ ] Kein horizontaler Scrollbalken
- [ ] Zwischengrößen sinnvoll gestaltet

### Code-Qualität

- [ ] Kein `console.log` im finalen Code
- [ ] Keine Konsolenfehler
- [ ] Alle Buttons haben `cursor: pointer`
- [ ] Schriftart lokal eingebunden

---

## Häufige Fehler vermeiden

- Bilder nicht verzerren – immer `object-fit: cover` oder `contain` verwenden
- Validierung nicht `onInput` auslösen – erst `onBlur`
- Kein `location.reload()` nach Formularversand
- Keine privaten Social-Media-Links einbinden
- Autofill-Styling (Webkit-Hintergrundfarbe) explizit überschreiben
- Layoutverschiebung durch Validierungsmeldungen verhindern (reservierter Platz)

---

## Git-Workflow

- Committen nach jeder Coding-Session
- Klare, aussagekräftige Commit-Messages auf Englisch
- `.gitignore` verwenden
- Keine `console.log`-Ausgaben committen

---

## Referenzen

- [MDN HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [BEM Methodik](https://getbem.com/)
