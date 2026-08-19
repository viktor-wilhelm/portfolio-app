/**
 * Reveals [data-aos] elements as they scroll into view and hides them again
 * once they leave, reusing AOS's own CSS effects/timing but driven by a
 * plain IntersectionObserver instead of AOS's bundled scroll listener —
 * this replays reliably on slow scrolls in both directions.
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
  const observer = new IntersectionObserver(handleIntersect, {
    rootMargin: "0px 0px 80px 0px",
    threshold: 0,
  });
  elements.forEach((el) => observer.observe(el));
}

/**
 * Adds aos-animate while an element intersects, removes it once it leaves.
 * @param {IntersectionObserverEntry[]} entries
 */
function handleIntersect(entries) {
  entries.forEach((entry) => {
    entry.target.classList.toggle("aos-animate", entry.isIntersecting);
  });
}

document.addEventListener("DOMContentLoaded", initScrollReveal);
