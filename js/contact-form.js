const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const privacyInput = document.getElementById('privacy');
const submitBtn = document.querySelector('.form__submit');
const feedback = document.getElementById('form-feedback');

/**
 * Returns the current language from localStorage.
 * @returns {string} Language code ('de' or 'en').
 */
function getCurrentLang() {
  return localStorage.getItem('lang') ?? 'de';
}

/**
 * Returns the error element for a given input field.
 * @param {HTMLElement} input - The input element.
 * @returns {HTMLElement} The corresponding error span.
 */
function getErrorEl(input) {
  return document.getElementById(`${input.id}-error`);
}

/**
 * Validates a required text input and sets its error message.
 * @param {HTMLInputElement} input - The input to validate.
 * @returns {boolean} True if valid.
 */
function validateTextField(input) {
  const errorEl = getErrorEl(input);
  const valid = input.value.trim().length > 0;
  errorEl.textContent = valid ? '' : translations[getCurrentLang()].errorRequired;
  return valid;
}

/**
 * Validates the email input field.
 * @returns {boolean} True if the email is valid.
 */
function validateEmailField() {
  const errorEl = getErrorEl(emailInput);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  errorEl.textContent = valid ? '' : translations[getCurrentLang()].errorEmail;
  return valid;
}

/**
 * Validates the privacy checkbox.
 * @returns {boolean} True if checked.
 */
function validatePrivacy() {
  const errorEl = getErrorEl(privacyInput);
  const valid = privacyInput.checked;
  errorEl.textContent = valid ? '' : translations[getCurrentLang()].errorPrivacy;
  return valid;
}

/**
 * Enables or disables the submit button based on all field states.
 */
function updateSubmitButton() {
  const allValid =
    nameInput.value.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()) &&
    messageInput.value.trim().length > 0 &&
    privacyInput.checked;
  submitBtn.disabled = !allValid;
}

/**
 * Handles the contact form submission.
 * @param {SubmitEvent} event - The submit event.
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  const t = translations[getCurrentLang()];

  try {
    const formData = new FormData(event.target);
    const response = await fetch('mail.php', { method: 'POST', body: formData });

    if (response.ok) {
      feedback.textContent = t.successMessage;
      feedback.className = 'form__feedback form__feedback--success';
      event.target.reset();
      submitBtn.disabled = true;
    } else {
      throw new Error('Server error');
    }
  } catch {
    feedback.textContent = t.errorMessage;
    feedback.className = 'form__feedback form__feedback--error';
  }
}

// onBlur validation
nameInput.addEventListener('blur', () => { validateTextField(nameInput); updateSubmitButton(); });
emailInput.addEventListener('blur', () => { validateEmailField(); updateSubmitButton(); });
messageInput.addEventListener('blur', () => { validateTextField(messageInput); updateSubmitButton(); });
privacyInput.addEventListener('change', () => { validatePrivacy(); updateSubmitButton(); });

document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
