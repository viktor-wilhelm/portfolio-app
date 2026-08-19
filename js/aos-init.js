/**
 * Initializes AOS (Animate On Scroll) with a subtle, replaying config.
 * Respects prefers-reduced-motion by disabling animations entirely.
 */
function initAOS() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  AOS.init({
    duration: 700,
    easing: "ease-out",
    once: false,
    offset: 80,
    disable: prefersReducedMotion,
  });
}

document.addEventListener("DOMContentLoaded", initAOS);
window.addEventListener("load", () => AOS.refresh());
