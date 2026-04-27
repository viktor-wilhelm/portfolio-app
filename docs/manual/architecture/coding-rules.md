# Coding Rules – Portfolio-Website

## JavaScript Regeln

### Dateien & Funktionen

- **camelCase** für alle Variablen und Funktionen
- **Max. 14 Zeilen** pro Funktion
- **Max. 400 LOC** pro Datei
- **Eine Aufgabe** pro Funktion
- 1-2 Leerzeilen zwischen Funktionen

### Namen

- Beschreibend: `validateEmailField()` statt `checkEmail()`
- Konstanten: `UPPER_SNAKE_CASE`
- Event-Handler mit `handle`-Präfix: `handleFormSubmit()`

### Formularvalidierung (PFLICHT: onBlur)

```javascript
// Korrekt: Validierung erst beim Verlassen des Feldes
inputEl.addEventListener("blur", () => validateField(inputEl));

// FALSCH: Validierung während der Eingabe
// inputEl.addEventListener('input', ...);
```

### Verbotenes

- ❌ `console.log` im Produktionscode
- ❌ Validierung über `onInput` statt `onBlur`
- ❌ `location.reload()` nach Formularversand
- ❌ Private Social-Media-Links (Facebook, Instagram etc.)

## CSS Regeln

### Mobile-First (PFLICHT)

```css
/* Basis: Mobile-Styles ohne Media Query */
.hero {
  padding: 1rem;
}

/* Desktop: min-width Media Queries */
@media (min-width: 768px) {
  .hero {
    padding: 4rem;
  }
}

@media (max-width: 900px) and (orientation: landscape) {
  .touch-controls {
    display: flex;
  }
}

/* Hochformat-Warnung */
.turn-device-overlay {
  display: none;
}

@media (orientation: portrait) and (max-width: 900px) {
  .turn-device-overlay {
    display: flex;
  }
}
```

### Breakpoints

- `480px` – kleine Smartphones
- `768px` – Tablets
- `900px` – Tablet/Desktop-Grenze

### Sonstiges

- Alle interaktiven Elemente: `cursor: pointer`
- Kein sichtbarer Scrollbalken: `overflow: hidden` auf `html, body`
- Schriftart lokal einbinden
