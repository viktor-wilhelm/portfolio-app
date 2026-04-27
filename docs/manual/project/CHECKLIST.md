# Abgabe-Checkliste – Portfolio-Website

Gehe vor der Abgabe sorgfältig alle Punkte durch. Die Checkliste stellt sicher, dass deine Portfolio-Website technisch einwandfrei funktioniert, professionell aussieht und den Kursanforderungen entspricht.

---

## User Story 1 – Design

> Als Besucher möchte ich eine professionell gestaltete Portfolio-Website sehen, die optisch konsistent ist und dem Figma-Design entspricht.

- [ ] Design exakt nach Figma-Vorlage (Mobile + Desktop)
- [ ] Alle Abstände, Farben, Typografie und Bildgrößen stimmen mit dem Mockup überein
- [ ] Zwischengrößen / kleinere Screens eigenständig sinnvoll gelöst
- [ ] Hero-Bereich nimmt `height: 100vh` ein

---

## User Story 2 – Bilder

> Als Besucher möchte ich hochwertige, professionelle Fotos in der Hero- und About-me-Sektion sehen.

- [ ] Kein Bild verzerrt (`object-fit: cover` oder `contain`)
- [ ] Alle Bilder komprimiert (max. 500 KB)
- [ ] Kein Bild wird mehrfach verwendet
- [ ] Fotos wirken professionell (Pose, Hintergrund) *(Pflicht für AA-Kurse)*

---

## User Story 3 – Texte & Sprache

> Als Nutzer möchte ich korrekte und gut lesbare Texte auf Deutsch und Englisch sehen.

- [ ] Sprachumschalter (DE/EN) im Header / Responsive-Menü vorhanden
- [ ] Alle Texte in Deutsch **und** Englisch vorhanden
- [ ] Kein „Lorem Ipsum" – nur echte Inhalte
- [ ] Englische Texte mit DeepL / Grammarly geprüft
- [ ] Deutsche Texte mit LanguageTool auf Grammatik und Rechtschreibung geprüft

---

## User Story 4 – Projekte

> Als Besucher möchte ich eine Übersicht deiner Projekte sehen, die ich ausprobieren kann.

- [ ] Alle Projekte verlinkt (Live-Link + GitHub-Link)
- [ ] Projekte auf eigener Subdomain verfügbar
- [ ] Projekte laufen fehlerfrei (ggf. mit Einzel-Checklisten abgesichert)
- [ ] Vorschaubilder stimmig und passend

---

## User Story 5 – Social Media

> Als Besucher möchte ich deine berufsbezogenen Social-Media-Kanäle leicht finden können.

- [ ] LinkedIn korrekt verlinkt (mit `https://`)
- [ ] GitHub korrekt verlinkt (mit `https://`)
- [ ] Keine privaten Social-Media-Links (kein Facebook, Instagram etc.)

---

## User Story 6 – Domain & Hosting

> Als Besucher möchte ich deine Website unter einer professionellen Domain besuchen.

- [ ] Eigene Domain vorhanden (z. B. `https://vorname-nachname.de`)
- [ ] SSL-Zertifikat aktiv (HTTPS erzwungen)
- [ ] Favicon individuell angepasst (kein Framework-Standard-Logo)
- [ ] Seitentitel individuell angepasst (`<title>`)

---

## User Story 7 – Kontaktformular

> Als Nutzer möchte ich über das Kontaktformular sicher und benutzerfreundlich kommunizieren können.

- [ ] Validierung nur `onBlur` (nach Verlassen des Feldes – nicht während der Eingabe)
- [ ] Validierungsmeldungen verursachen keine Layoutverschiebung
- [ ] „Senden"-Button nur aktiv wenn Formular vollständig korrekt ausgefüllt (inkl. Datenschutz-Checkbox)
- [ ] Browser-Autovervollständigung beeinträchtigt Design nicht (Webkit-Fix)
- [ ] Klares Nutzer-Feedback nach Versand (Erfolgs- oder Fehlermeldung)

---

## User Story 8 – Rechtliches

> Als Benutzer möchte ich Zugang zu Datenschutzerklärung und Impressum haben.

- [ ] Links zu Impressum und Datenschutzerklärung im Footer vorhanden
- [ ] Inhalte klar strukturiert und verständlich formuliert
- [ ] Beide Seiten responsiv und auf allen Geräten gut lesbar
