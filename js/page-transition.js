const FADE_DURATION = 125;

/**
 * Fades the page out and navigates to the clicked link's target after the
 * fade completes, instead of navigating immediately.
 * @this {HTMLAnchorElement} The clicked link element.
 * @param {MouseEvent} e - The click event.
 */
function handleNavClick(e) {
  e.preventDefault();
  const href = this.getAttribute('href');
  document.body.classList.add('is-leaving');
  setTimeout(() => { window.location.href = href; }, FADE_DURATION);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;
    link.addEventListener('click', handleNavClick);
  });
});
