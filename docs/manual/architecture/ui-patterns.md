# UI Patterns – Portfolio-Website

## Kontaktformular

```html
<form id="contact-form" class="contact__form" novalidate>
  <div class="form__group">
    <label for="name" data-i18n="formName">Name</label>
    <input type="text" id="name" name="name" autocomplete="name" />
    <span class="form__error" id="name-error" aria-live="polite"></span>
  </div>

  <div class="form__group">
    <label for="email" data-i18n="formEmail">E-Mail</label>
    <input type="email" id="email" name="email" autocomplete="email" />
    <span class="form__error" id="email-error" aria-live="polite"></span>
  </div>

  <div class="form__group">
    <label for="message" data-i18n="formMessage">Nachricht</label>
    <textarea id="message" name="message" rows="5"></textarea>
    <span class="form__error" id="message-error" aria-live="polite"></span>
  </div>

  <div class="form__group form__group--checkbox">
    <input type="checkbox" id="privacy" name="privacy" />
    <label for="privacy" data-i18n="formPrivacy">Ich habe die Datenschutzerklärung gelesen.</label>
  </div>

  <button type="submit" class="contact__submit" disabled data-i18n="formSubmit">Nachricht senden</button>

  <div class="form__feedback" id="form-feedback" aria-live="polite"></div>
</form>
```

## Projektkarte

```html
<article class="project-card">
  <img src="assets/img/project-preview.jpg" alt="Projektname" class="project-card__img" />
  <div class="project-card__body">
    <h3 class="project-card__title" data-i18n="project1Title">Projektname</h3>
    <p class="project-card__desc" data-i18n="project1Desc">Kurzbeschreibung des Projekts</p>
    <div class="project-card__links">
      <a href="https://projekt.example.com" target="_blank" rel="noopener">Live</a>
      <a href="https://github.com/user/repo" target="_blank" rel="noopener">GitHub</a>
    </div>
  </div>
</article>
```

## Footer mit Links

```html
<footer class="footer">
  <div class="footer__social">
    <a href="https://linkedin.com/in/user" target="_blank" rel="noopener" aria-label="LinkedIn">
      <!-- SVG icon -->
    </a>
    <a href="https://github.com/user" target="_blank" rel="noopener" aria-label="GitHub">
      <!-- SVG icon -->
    </a>
  </div>
  <nav class="footer__legal">
    <a href="#impressum" data-i18n="footerImprint">Impressum</a>
    <a href="#datenschutz" data-i18n="footerPrivacy">Datenschutz</a>
  </nav>
</footer>
```

## Sprachumschalter

```html
<div class="lang-switch">
  <button class="lang-switch__btn lang-switch__btn--active" data-lang="de">DE</button>
  <span class="lang-switch__divider">|</span>
  <button class="lang-switch__btn" data-lang="en">EN</button>
</div>
```
