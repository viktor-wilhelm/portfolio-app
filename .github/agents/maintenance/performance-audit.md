---
agent: maintenance-assistant
---

# Performance Audit Agent – Portfolio-Website

## Zweck

Identifiziere und behebe Performance-Probleme in der Portfolio-Website (`portfolio-app/`).

## Typische Performance-Probleme

### 1. DOM-Manipulation im Loop (z. B. Projektliste)

```javascript
// ❌ Problem: Reflow bei jedem Schritt
projects.forEach((p) => {
  document.querySelector("#projects").innerHTML += renderCard(p);
});

// ✅ Lösung: DocumentFragment nutzen
const fragment = document.createDocumentFragment();
projects.forEach((p) => {
  const card = document.createElement("div");
  card.innerHTML = renderCard(p);
  fragment.appendChild(card);
});
document.querySelector("#projects").appendChild(fragment);
```

### 2. Event Listener mehrfach registriert (z. B. Sprachumschalter)

```javascript
// ❌ Problem: Bei jedem Seitenaufruf neu gebunden
document.querySelector("#lang-toggle").addEventListener("click", toggleLanguage);

// ✅ Lösung: Nur einmal binden, z. B. in DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#lang-toggle").addEventListener("click", toggleLanguage);
});
```

### 3. Bilder ohne Lazy Loading (Projektvorschauen)

```html
<!-- ❌ Problem: Alle Bilder sofort laden -->
<img src="assets/img/project-preview.jpg" alt="..." />

<!-- ✅ Lösung: Lazy Loading für Bilder unterhalb des Viewports -->
<img src="assets/img/project-preview.jpg" loading="lazy" alt="..." />
```

### 4. Schriftarten blockieren Rendering

```css
/* ✅ Lösung: font-display: swap in @font-face */
@font-face {
  font-family: "MyFont";
  src: url("../assets/fonts/myfont.woff2") format("woff2");
  font-display: swap;
}
```

## Audit-Checkliste

- [ ] Keine DOM-Manipulation im Loop
- [ ] Event Listener nur einmal registriert (DOMContentLoaded)
- [ ] Projektvorschau-Bilder mit `loading="lazy"`
- [ ] Schriftarten mit `font-display: swap`
- [ ] CSS-Animationen mit `transform` / `opacity` statt `top` / `left`
- [ ] Kein Memory Leak durch ungecleante Event Listener
- [ ] `mail.php` gibt klare HTTP-Statuscodes zurück (kein stiller Fehler)
