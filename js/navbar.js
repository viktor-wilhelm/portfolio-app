function openOverlay() {
  const overlay = document.getElementById("nav-overlay");
  overlay.classList.add("nav__overlay--open");
  overlay.removeAttribute("aria-hidden");
  document.querySelector(".nav__burger").setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeOverlay() {
  const overlay = document.getElementById("nav-overlay");
  const burger = document.querySelector(".nav__burger");
  burger.focus();
  overlay.classList.remove("nav__overlay--open");
  overlay.setAttribute("aria-hidden", "true");
  burger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

function setupOverlayLinks() {
  document.querySelectorAll(".nav__overlay-link").forEach((link) => {
    link.addEventListener("click", closeOverlay);
  });
}

function handleOverlayKeydown(event) {
  if (event.key === "Escape") closeOverlay();
}

function initNavOverlay() {
  document.querySelector(".nav__burger").addEventListener("click", openOverlay);
  document.querySelector(".nav__overlay-close").addEventListener("click", closeOverlay);
  document.querySelector(".nav__overlay-logo-link").addEventListener("click", closeOverlay);
  document.addEventListener("keydown", handleOverlayKeydown);
  setupOverlayLinks();
}

document.addEventListener("DOMContentLoaded", initNavOverlay);
