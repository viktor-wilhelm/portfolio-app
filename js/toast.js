const toastEl = document.getElementById("toast");
/* body has its own load-in animation (page-fade-in), and any transform on
   an ancestor turns position:fixed into "fixed relative to that ancestor"
   instead of the viewport. Re-parenting onto <html> keeps the toast pinned
   to the viewport regardless of scroll position or that unrelated animation. */
document.documentElement.appendChild(toastEl);
let toastTimeoutId = null;

/**
 * Shows a dismissible toast message, anchored just below the given field
 * (falls back to its default top-left CSS position if omitted). Reuses the
 * single toast element, so a repeated call just replaces the text/position
 * and restarts the auto-hide timer instead of stacking multiple toasts.
 * @param {string} message
 * @param {HTMLElement} [anchorEl]
 */
function showToast(message, anchorEl) {
  toastEl.textContent = message;
  positionToast(anchorEl);
  toastEl.classList.add("toast--visible");
  clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(hideToast, 4000);
}

/**
 * Positions the toast just below the given field, in viewport coordinates.
 * @param {HTMLElement} [anchorEl]
 */
function positionToast(anchorEl) {
  if (!anchorEl) return;
  const rect = anchorEl.getBoundingClientRect();
  toastEl.style.top = `${rect.bottom + 8}px`;
  toastEl.style.left = `${rect.left}px`;
}

/**
 * Hides the current toast.
 */
function hideToast() {
  toastEl.classList.remove("toast--visible");
}
