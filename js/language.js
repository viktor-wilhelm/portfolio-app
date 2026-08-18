/**
 * Reads the saved language from localStorage and initializes the UI.
 */
function initLanguage() {
  const saved = localStorage.getItem("lang") ?? "de";
  setLanguage(saved);
}

/**
 * Sets the active language, updates the DOM and persists the choice.
 * @param {string} lang - Language code ('de' or 'en').
 */
function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
  updateLangButtons(lang);
}

/**
 * Applies all translations to elements with a data-i18n attribute.
 * @param {string} lang - Language code ('de' or 'en').
 */
function applyTranslations(lang) {
  const t = translations[lang];
  applyTextTranslations(t);
  applyPlaceholderTranslations(t);
  applySrcTranslations(t);
  applyAltTranslations(t);
  applyAriaLabelTranslations(t);
  document.dispatchEvent(new CustomEvent("i18n:applied"));
}

/**
 * Sets textContent on all elements with a data-i18n attribute.
 * @param {object} t - Translation strings for the active language.
 */
function applyTextTranslations(t) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });
}

/**
 * Sets the placeholder on all elements with a data-i18n-placeholder attribute.
 * @param {object} t - Translation strings for the active language.
 */
function applyPlaceholderTranslations(t) {
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });
}

/**
 * Sets the src on all elements with a data-i18n-src attribute.
 * @param {object} t - Translation strings for the active language.
 */
function applySrcTranslations(t) {
  document.querySelectorAll("[data-i18n-src]").forEach((el) => {
    const key = el.dataset.i18nSrc;
    if (t[key]) el.src = t[key];
  });
}

/**
 * Sets the alt text on all elements with a data-i18n-alt attribute.
 * @param {object} t - Translation strings for the active language.
 */
function applyAltTranslations(t) {
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.dataset.i18nAlt;
    if (t[key]) el.alt = t[key];
  });
}

/**
 * Sets the aria-label on all elements with a data-i18n-aria-label attribute.
 * @param {object} t - Translation strings for the active language.
 */
function applyAriaLabelTranslations(t) {
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.dataset.i18nAriaLabel;
    if (t[key]) el.setAttribute("aria-label", t[key]);
  });
}

/**
 * Updates the active state on language switch buttons and toggle.
 * @param {string} lang - Currently active language code.
 */
function updateLangButtons(lang) {
  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.classList.toggle("lang-switch__btn--active", btn.dataset.lang === lang);
  });
  document.querySelectorAll(".lang-switch").forEach((switcher) => {
    switcher.classList.toggle("lang-switch--de", lang === "de");
    switcher.classList.toggle("lang-switch--en", lang === "en");
  });
}

/**
 * Registers click handlers on all language switch buttons and the toggle.
 */
function setupLangSwitch() {
  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupLangSwitch();
  initLanguage();
});
