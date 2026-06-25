function getBase() {
  const path = window.location.pathname;
  if (path.includes("project-detail") || path.includes("legal-notice")) return "index.html";
  return "";
}

function buildNavLinks(base) {
  return `<ul class="nav__links">
      <li><a href="${base}#about" class="nav__link nav__link--about" data-i18n="navAbout" draggable="false">About me</a></li>
      <li><a href="${base}#skills" class="nav__link nav__link--skills" data-i18n="navSkills" draggable="false">Skills</a></li>
      <li><a href="${base}#projects" class="nav__link nav__link--projects" data-i18n="navProjects" draggable="false">Projects</a></li>
      <li><a href="${base}#contact" class="nav__link nav__link--contact" data-i18n="navContact" draggable="false">Contact</a></li>
    </ul>`;
}

function buildLangSwitch() {
  return `<div class="lang-switch lang-switch--de" aria-label="Sprache wechseln">
      <button class="lang-switch__btn" data-lang="en">EN</button>
      <button class="lang-switch__toggle" aria-label="Sprache wechseln"><span class="lang-switch__knob"></span></button>
      <button class="lang-switch__btn lang-switch__btn--de lang-switch__btn--active" data-lang="de">DE</button>
    </div>`;
}

function buildBurger() {
  return `<button class="nav__burger" aria-label="Menü öffnen" aria-expanded="false">
      <img src="assets/img/00_Hand-drawn lines/00_Header/Menu - Mobile icon/Property 1=Defeult.png" alt="" aria-hidden="true" class="nav__burger-icon nav__burger-icon--default" />
      <img src="assets/img/00_Hand-drawn lines/00_Header/Menu - Mobile icon/Property 1=Hover.png" alt="" aria-hidden="true" class="nav__burger-icon nav__burger-icon--hover" />
    </button>`;
}

function buildHeader(base) {
  const cls = window.location.pathname.includes("project-detail") ? " header--detail" : "";
  return `<header class="header${cls}">
    <nav class="nav">
      <a href="${base}#hero" class="nav__logo" draggable="false">
        <img src="assets/img/04_Hero/vw-logo.png" alt="VW Logo" class="nav__logo-img" draggable="false" />
      </a>
      ${buildNavLinks(base)}
      ${buildLangSwitch()}
      ${buildBurger()}
    </nav>
  </header>`;
}

function buildOverlayTop(base) {
  return `<div class="nav__overlay-top">
      <a href="${base}#hero" class="nav__overlay-logo-link" aria-label="Zur Startseite">
        <img src="assets/img/04_Hero/vw-logo.png" alt="VW Logo" class="nav__overlay-logo-img" />
      </a>
      <button class="nav__overlay-close" aria-label="Menü schließen">
        <img src="assets/img/00_Hand-drawn lines/00_Header/Menu - Mobile icon/Property 1=Close.png" alt="" aria-hidden="true" class="nav__overlay-close-icon nav__overlay-close-icon--default" />
        <img src="assets/img/00_Hand-drawn lines/00_Header/Menu - Mobile icon/Property 1=Close hover.png" alt="" aria-hidden="true" class="nav__overlay-close-icon nav__overlay-close-icon--hover" />
      </button>
    </div>`;
}

function buildOverlayLinks(base) {
  return `<ul class="nav__overlay-links">
      <li><a href="${base}#about" class="nav__overlay-link nav__link--about" data-i18n="navAbout">About me</a></li>
      <li><a href="${base}#skills" class="nav__overlay-link nav__link--skills" data-i18n="navSkills">Skills</a></li>
      <li><a href="${base}#projects" class="nav__overlay-link nav__link--projects" data-i18n="navProjects">Projects</a></li>
      <li><a href="${base}#contact" class="nav__overlay-link nav__link--contact" data-i18n="navContact">Contact</a></li>
    </ul>`;
}

function buildOverlayLang() {
  return `<div class="lang-switch lang-switch--de nav__overlay-lang" aria-label="Sprache wechseln">
      <button class="lang-switch__btn" data-lang="en">EN</button>
      <button class="lang-switch__toggle" aria-label="Sprache wechseln"><span class="lang-switch__knob"></span></button>
      <button class="lang-switch__btn lang-switch__btn--de lang-switch__btn--active" data-lang="de">DE</button>
    </div>`;
}

function buildOverlaySocial() {
  return `<nav class="nav__overlay-social" aria-label="Social Media">
      <a href="https://www.linkedin.com/in/viktor-wilhelm/" class="hero__social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <img src="assets/img/04_Hero/17_Contact linkedin.png" alt="LinkedIn" class="hero__social-icon" />
      </a>
      <a href="https://github.com/viktor-wilhelm" class="hero__social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
        <img src="assets/img/04_Hero/18_Contact gihub.png" alt="GitHub" class="hero__social-icon" />
      </a>
      <a href="mailto:" class="hero__social-link" aria-label="E-Mail">
        <img src="assets/img/04_Hero/19. Button mail.png" alt="E-Mail" class="hero__social-icon" />
      </a>
    </nav>`;
}

function buildOverlay(base) {
  return `<div class="nav__overlay" id="nav-overlay" role="dialog" aria-modal="true" aria-label="Navigation" aria-hidden="true">
    ${buildOverlayTop(base)}
    ${buildOverlayLinks(base)}
    ${buildOverlayLang()}
    ${buildOverlaySocial()}
  </div>`;
}

function injectSiteHeader() {
  const base = getBase();
  const headerEl = document.getElementById("site-header");
  const overlayEl = document.getElementById("site-overlay");
  if (headerEl) headerEl.outerHTML = buildHeader(base);
  if (overlayEl) overlayEl.outerHTML = buildOverlay(base);
}

document.addEventListener("DOMContentLoaded", injectSiteHeader);
