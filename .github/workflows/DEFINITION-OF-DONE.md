# Definition of Done – Portfolio-Website

Ein Feature / eine User Story ist **abgeschlossen**, wenn:

## Code-Qualität

- [ ] Alle Funktionen ≤ 14 Zeilen
- [ ] Alle Dateien ≤ 400 LOC
- [ ] Kein `console.log`
- [ ] Kein auskommentierter Code
- [ ] Keine Konsolenfehler im Browser

## Funktionalität

- [ ] Feature funktioniert wie in der User Story beschrieben
- [ ] Keine JS-Fehler beim Testen
- [ ] Auf Desktop und Mobilgerät getestet (Mobile-First)

## Design & UI (je nach Feature)

- [ ] Design entspricht Figma-Vorlage (Mobile + Desktop)
- [ ] Kein Bild verzerrt (`object-fit: cover` oder `contain`)
- [ ] Kein horizontaler Scrollbalken
- [ ] Alle Buttons haben `cursor: pointer`

## Sprache & Texte

- [ ] Alle neuen Texte in DE **und** EN in `translations.js` vorhanden
- [ ] `data-i18n`-Attribute gesetzt
- [ ] Keine Lorem-Ipsum-Texte

## Kontaktformular (wenn betroffen)

- [ ] Validierung nur `onBlur` – nicht `onInput`
- [ ] Validierungsmeldungen verursachen keine Layoutverschiebung
- [ ] Senden-Button deaktiviert bis Formular vollständig gültig
- [ ] Datenschutz-Checkbox Pflichtfeld
- [ ] Webkit-Autofill-Fix gesetzt

## Abgabe-Checkliste (Pflicht vor Projektabgabe)

- [ ] `cheklisteVorAbgabe.md` vollständig abgehakt
- [ ] Alle 8 User Stories erfüllt
- [ ] Impressum mit echten Daten
- [ ] Datenschutzerklärung vorhanden
- [ ] Favicon individuell angepasst
- [ ] Seitentitel individuell angepasst
- [ ] Schriftart lokal eingebunden
- [ ] LinkedIn + GitHub korrekt verlinkt (https://)
- [ ] Eigene Domain mit SSL aktiv
- [ ] `.gitignore` vorhanden und gepflegt
- [ ] GitHub Repository aktuell
