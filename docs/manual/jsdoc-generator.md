---
agent: documentation-writer
---

# JSDoc Generator Agent – Portfolio-Website

## Zweck

JSDoc-Dokumentation für alle JavaScript-Funktionen generieren oder vervollständigen.

## Erkennungskriterien

Scan nach fehlender Dokumentation:

```bash
# Dateien ohne JSDoc suchen
grep -rL "@param\|@returns\|@description" js/
```

## JSDoc Templates

### Funktion ohne Parameter

```javascript
/**
 * Reads the saved language from localStorage and applies it.
 */
function initLanguage() {
  const saved = localStorage.getItem('lang') ?? 'de';
  setLanguage(saved);
}
```

### Funktion mit Parameter

```javascript
/**
 * Sets the active language and updates all translated elements.
 * @param {string} lang - Language code ('de' or 'en').
 */
function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
}
```

### Funktion mit Parameter und Rückgabe

```javascript
/**
 * Checks whether a form field has a valid non-empty value.
 * @param {HTMLInputElement} input - The input element to validate.
 * @returns {boolean} True if the field value is non-empty.
 */
function isFieldValid(input) {
  return input.value.trim().length > 0;
}
```

### Event-Handler (onBlur)

```javascript
/**
 * Validates a text input field on blur and updates the error message.
 * @param {HTMLInputElement} input - The input element that lost focus.
 */
function handleFieldBlur(input) {
  const errorEl = document.getElementById(`${input.id}-error`);
  errorEl.textContent = isFieldValid(input)
    ? ''
    : translations[currentLang].fieldRequired;
  updateSubmitButton();
}
```

### Async-Funktion (Formularversand)

```javascript
/**
 * Handles the contact form submission.
 * Sends the form data and displays success or error feedback.
 * @param {SubmitEvent} event - The form submit event.
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  // ...
}
```

## Häufig verwendete Tags

| Tag | Verwendung |
|-----|-----------|
| `@param {type} name - desc` | Parameter dokumentieren |
| `@returns {type} desc` | Rückgabewert dokumentieren |
| `@description` | Ausführlichere Beschreibung |
| `@type {type}` | Variable typisieren |

## Qualitätscheckliste

- [ ] Alle exportierten Funktionen haben JSDoc
- [ ] Alle `@param` haben Typ, Name und Beschreibung
- [ ] Alle `@returns` haben Typ und Beschreibung
- [ ] Event-Handler dokumentieren den Event-Parameter
