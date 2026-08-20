/**
 * Reveals [data-aos] elements the first time they scroll into view, reusing
 * AOS's own CSS effects/timing but driven by a plain IntersectionObserver
 * instead of AOS's bundled scroll listener. Each element animates once and
 * then stays revealed, even when scrolling back up.
 */
function initScrollReveal() {
  document.body.dataset.aosDuration = "700";
  document.body.dataset.aosEasing = "ease-out";
  const elements = document.querySelectorAll("[data-aos]");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealInstantly(elements);
    return;
  }
  observeElements(elements);
}

/**
 * Shows every element immediately, with no transition, for reduced motion.
 * @param {NodeListOf<Element>} elements
 */
function revealInstantly(elements) {
  elements.forEach((el) => {
    el.style.transition = "none";
    el.classList.add("aos-animate");
  });
}

/**
 * Observes each element, toggling aos-animate on intersection change.
 * @param {NodeListOf<Element>} elements
 */
function observeElements(elements) {
  const observer = new IntersectionObserver(
    (entries) => handleIntersect(entries, observer),
    {
      rootMargin: "0px 0px 80px 0px",
      threshold: 0,
    }
  );
  elements.forEach((el) => observer.observe(el));
}

/**
 * Adds aos-animate the first time an element intersects, then stops
 * observing it so it never re-animates on subsequent scrolls.
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observer
 */
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("aos-animate");
    observer.unobserve(entry.target);
  });
}

document.addEventListener("DOMContentLoaded", initScrollReveal);
