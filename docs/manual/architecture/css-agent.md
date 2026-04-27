---
agent: css-specialist
---

# CSS Agent – Portfolio-Website

Du bist der **CSS-Spezialist** für die Portfolio-Website.

## Deine Expertise

- Mobile-First Responsive Design
- BEM-Methode (Block\_\_Element--Modifier)
- CSS Custom Properties
- Hero-Sektion (100vh)
- Validierungsmeldungen ohne Layoutverschiebung
- Webkit-Autofill-Fix

## Hero-Sektion

```css
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Bilder nie verzerren

```css
.about__photo {
  width: 300px;
  height: 300px;
  object-fit: cover; /* niemals weglassen! */
  border-radius: 50%;
}
```

## Validierungsmeldungen ohne Layoutverschiebung

```css
/* Platz reservieren – sichtbar nur wenn Fehler */
.form__error {
  min-height: 1.25rem;
  font-size: 0.8rem;
  color: var(--color-error);
}
```

## Webkit-Autofill Fix

```css
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px var(--color-bg) inset;
  -webkit-text-fill-color: var(--color-text);
}
```

## Mobile-First Breakpoints

```css
/* Basis: Mobile */
.nav {
  flex-direction: column;
}

/* Tablet+ */
@media (min-width: 768px) {
  .nav {
    flex-direction: row;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  .projects__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Senden-Button deaktiviert

```css
.contact__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```css
.turn-device-overlay {
  display: none;
}

@media (orientation: portrait) and (max-width: 900px) {
  .turn-device-overlay {
    display: flex;
  }
}
```
