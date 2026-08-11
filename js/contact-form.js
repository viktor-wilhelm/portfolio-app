const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const privacyInput = document.getElementById("privacy");
const submitBtn = document.querySelector(".form__submit");
const feedback = document.getElementById("form-feedback");

const PLACEHOLDER_KEYS = {
  name: "formNamePlaceholder",
  email: "formEmailPlaceholder",
  message: "formMessagePlaceholder",
};

/**
 * Returns the current language from localStorage.
 * @returns {string} Language code ('de' or 'en').
 */
function getCurrentLang() {
  return localStorage.getItem("lang") ?? "de";
}

/**
 * Shows error message as red placeholder inside the input.
 * @param {HTMLElement} input
 * @param {string} message
 */
function setInputError(input, message) {
  input.placeholder = message;
  input.classList.add("input--error");
  const errorEl = document.getElementById(`${input.id}-error`);
  if (errorEl) errorEl.textContent = message;
}

/**
 * Clears error state and restores the translated placeholder.
 * @param {HTMLElement} input
 */
function clearInputError(input) {
  input.placeholder = translations[getCurrentLang()][PLACEHOLDER_KEYS[input.id]];
  input.classList.remove("input--error");
  const errorEl = document.getElementById(`${input.id}-error`);
  if (errorEl) errorEl.textContent = "";
}

/**
 * Validates a required text input.
 * @param {HTMLInputElement} input
 * @returns {boolean}
 */
function validateTextField(input) {
  const valid = input.value.trim().length > 0;
  valid
    ? clearInputError(input)
    : setInputError(input, translations[getCurrentLang()].errorRequired);
  return valid;
}

/**
 * Validates the email input field.
 * @returns {boolean}
 */
function validateEmailField() {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  valid
    ? clearInputError(emailInput)
    : setInputError(emailInput, translations[getCurrentLang()].errorEmail);
  return valid;
}

/**
 * Validates the privacy checkbox.
 * @returns {boolean}
 */
function validatePrivacy() {
  const errorEl = document.getElementById("privacy-error");
  const valid = privacyInput.checked;
  errorEl.textContent = valid ? "" : translations[getCurrentLang()].errorPrivacy;
  return valid;
}

/**
 * Enables or disables the submit button based on the privacy checkbox.
 */
function updateSubmitButton() {
  submitBtn.disabled = !privacyInput.checked;
}

/**
 * Resets the form to its success state.
 * @param {HTMLFormElement} form
 * @param {object} t
 */
function showFormSuccess(form, t) {
  feedback.textContent = t.successMessage;
  feedback.className = "form__feedback form__feedback--success";
  form.reset();
  [nameInput, emailInput, messageInput].forEach(clearInputError);
  submitBtn.disabled = true;
}

/**
 * Handles the contact form submission.
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  const nameValid = validateTextField(nameInput);
  const emailValid = validateEmailField();
  const msgValid = validateTextField(messageInput);
  const privacyValid = validatePrivacy();
  if (!nameValid || !emailValid || !msgValid || !privacyValid) return;
  const t = translations[getCurrentLang()];
  try {
    const response = await fetch("mail.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(event.target))),
    });
    if (response.ok) { showFormSuccess(event.target, t); } else { throw new Error(); }
  } catch {
    const isLocalDev = ["localhost", "127.0.0.1"].includes(location.hostname);
    if (isLocalDev) { showFormSuccess(event.target, t); return; }
    feedback.textContent = t.errorMessage;
    feedback.className = "form__feedback form__feedback--error";
  }
}

nameInput.addEventListener("blur", () => { validateTextField(nameInput); updateSubmitButton(); });
emailInput.addEventListener("blur", () => { validateEmailField(); updateSubmitButton(); });
messageInput.addEventListener("blur", () => { validateTextField(messageInput); updateSubmitButton(); });
privacyInput.addEventListener("change", () => { validatePrivacy(); updateSubmitButton(); });

document.getElementById("contact-form").addEventListener("submit", handleFormSubmit);
