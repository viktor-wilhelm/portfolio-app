---
agent: refactoring-assistant
---

# Component Cleanup & Optimization – Portfolio-Website

## Zweck

Funktionen und Module in `portfolio-app/js/` bereinigen, optimieren und auf Coding-Standards prüfen.

## Typische Cleanup-Aufgaben

### contact-form.js aufteilen wenn > 400 LOC

```javascript
// ❌ Alles in einer Funktion
function handleForm() {
    validateName();
    validateEmail();
    validateMessage();
    validateCheckbox();
    sendToMailPhp();
    showSuccessFeedback();
}

// ✅ Einzelne, fokussierte Funktionen (≤ 14 Zeilen je)
function validateName(value) { ... }
function validateEmail(value) { ... }
function sendForm(formData) { ... }
function showFeedback(success) { ... }
```

### Duplizierte Validierungslogik zusammenführen

```javascript
// ❌ Gleiche Mindestlängen-Prüfung mehrfach
function validateName(val) {
  return val.trim().length >= 2;
}
function validateCity(val) {
  return val.trim().length >= 2;
}

// ✅ Generische Hilfsfunktion
function hasMinLength(val, min = 2) {
  return val.trim().length >= min;
}
```

### Übersetzungs-Objekte konsistent halten (translations.js)

```javascript
// Sicherstellen: Jeder Schlüssel in DE hat ein EN-Äquivalent
const translations = {
  de: {
    heroTitle: "Hallo, ich bin Viktor",
    contactSend: "Senden",
  },
  en: {
    heroTitle: "Hi, I am Viktor", // ← muss immer vorhanden sein
    contactSend: "Send",
  },
};
```

### language.js: localStorage-Logik isoliert halten

```javascript
// ✅ Spracheinstellung klar trennen
function getSavedLanguage() {
  return localStorage.getItem("lang") || "de";
}

function saveLanguage(lang) {
  localStorage.setItem("lang", lang);
}
```

## Cleanup-Checkliste

- [ ] Alle Funktionen ≤ 14 Zeilen
- [ ] Keine duplizierte Validierungslogik
- [ ] `js/`-Dateien ≤ 400 LOC
- [ ] `translations.js`: DE und EN vollständig und synchron
- [ ] `language.js`: localStorage-Zugriff isoliert
- [ ] `contact-form.js`: Validierung und Versand getrennt
- [ ] Event Listener sauber registriert (kein Doppel-Binding)
- [ ] Keine ungenutzten Hilfsfunktionen
