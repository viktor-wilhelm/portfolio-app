const FADE_DURATION = 125;

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
