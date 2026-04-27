---
agent: maintenance-assistant
---

# Unused Code Finder – Portfolio-Website

## Zweck

Finde und entferne ungenutzten Code in `portfolio-app/`.

## Such-Muster

### Vergessene console.log

```bash
grep -rn "console.log" --include="*.js" portfolio-app/js/
```

### Auskommentierter Code

```bash
grep -rn "^[[:space:]]*//" --include="*.js" portfolio-app/js/
```

### Fehlende oder verwaiste Übersetzungsschlüssel (translations.js)

```bash
# Schlüssel in translations.js finden
grep -n "^\s\+\w\+:" portfolio-app/js/translations.js

# Prüfen ob Schlüssel auch in language.js / contact-form.js verwendet werden
grep -rn "translations\." portfolio-app/js/
```

### Verwaiste CSS-Klassen

```bash
# CSS-Klassen aus allen CSS-Dateien extrahieren
grep -rh "\." --include="*.css" portfolio-app/css/ | grep -oP '\.\K[a-z][a-z0-9_-]+' | sort -u

# Prüfen ob Klasse in index.html oder JS vorkommt
grep -rn "KLASSENNAME" portfolio-app/
```

### Ungenutzte Variablen / Funktionen

Typische Kandidaten:

- Debug-Variablen (`let debug = true`)
- Hilfsfunktionen in `contact-form.js` die nie aufgerufen werden
- Veraltete Übersetzungsschlüssel die im HTML nicht mehr referenziert werden
- Auskommentierte Sektionen in `index.html`

## Cleanup-Regeln

- Auskommentierter Code entfernen (nicht committen)
- Alle `console.log` entfernen
- Verwaiste Übersetzungsschlüssel in `translations.js` entfernen
- Verwaiste CSS-Klassen entfernen
- Leere Funktionen entfernen oder mit `// TODO` markieren

## Nach dem Cleanup

- [ ] Alle `console.log` entfernt
- [ ] Kein auskommentierter Code vorhanden
- [ ] Keine ungenutzten Variablen
- [ ] Keine verwaisten CSS-Klassen
- [ ] Keine verwaisten Übersetzungsschlüssel
- [ ] DE- und EN-Übersetzungen noch vollständig vorhanden
- [ ] Website im Browser vollständig getestet (DE + EN)
