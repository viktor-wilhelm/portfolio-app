---
agent: agent
---

# GitHub Copilot Prompt – Portfolio-Website

## Projektkontext

**Portfolio-Website** ist eine professionelle, zweisprachige (DE/EN) Entwickler-Website.
Technologie: Vanilla JavaScript (ES6+), HTML5, CSS3.
Architektur: One-Page Application, kein Framework, kein Build-Tool.

## Coding-Standards

### JavaScript

- Funktionen max. **14 Zeilen**
- Dateien max. **400 LOC**
- **camelCase** für Variablen und Funktionen
- Keine `console.log` im Produktionscode
- Formularvalidierung **nur** `onBlur` – niemals `onInput`

### Sprachumschaltung

```javascript
// Aktuelle Sprache setzen und im DOM aktualisieren:
function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
}

// Übersetzungen aus translations.js anwenden:
function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = translations[lang][key] ?? el.textContent;
  });
}
```

### Formularvalidierung (onBlur)

```javascript
// Validierung nur beim Verlassen des Feldes!
inputEl.addEventListener("blur", () => validateField(inputEl));

function validateField(input) {
  const errorEl = document.getElementById(`${input.id}-error`);
  if (!input.value.trim()) {
    errorEl.textContent = translations[currentLang].fieldRequired;
  } else {
    errorEl.textContent = "";
  }
  updateSubmitButton();
}
```

### Senden-Button Aktivierung

```javascript
// Button nur aktiv wenn Formular vollständig gültig:
function updateSubmitButton() {
  const allValid = [...formFields].every((f) => isFieldValid(f)) && privacyCheckbox.checked;
  submitBtn.disabled = !allValid;
}
```

// Mute-Status anwenden
applyMuteToAllSounds(muted) {
this.sounds.forEach(s => s.muted = muted);
}

// Mute-Status speichern
localStorage.setItem("epl_muted", muted);

````

### Neustart

```javascript
// NICHT so:
location.reload(); // ❌

// Sondern so:
restartGame() {
    stopAllIntervals();
    clearGameObjects();
    initLevel();
    world = new World(canvas, keyboard);
}
````

## Responsiveness

```css
/* Touch-Controls nur mobil */
@media (max-width: 900px) and (orientation: landscape) {
  .touch-controls {
    display: flex;
  }
}

/* Hochformat blockieren */
@media (orientation: portrait) and (max-width: 900px) {
  .turn-device-overlay {
    display: flex;
  }
}
```

## Referenzen

- [Coding Rules](.github/docs/architecture/coding-rules.md)
- [Architecture](.github/docs/architecture/architecture.md)
- [Abgabe-Checkliste](.github/agents/code-review/cheklisteVorAbgabe.md)
