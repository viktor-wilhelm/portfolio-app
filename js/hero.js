function createLetterSpan(char, inBottom) {
  const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();
  const span = document.createElement("span");
  span.classList.add("hero__title-letter");
  span.classList.add(isUpper ? "hero__title-letter--upper" : "hero__title-letter--lower");
  const normal = document.createElement("span");
  normal.classList.add("hero__title-letter__normal");
  normal.textContent = char;
  const hover = document.createElement("span");
  hover.classList.add("hero__title-letter__hover");
  hover.textContent = inBottom ? char.toLowerCase() : isUpper ? char.toLowerCase() : char.toUpperCase();
  span.appendChild(normal);
  span.appendChild(hover);
  return span;
}

function appendChar(el, char, inBottom) {
  if (char === " ") {
    el.appendChild(document.createTextNode(" "));
    return;
  }
  el.appendChild(createLetterSpan(char, inBottom));
}

function splitElement(el) {
  const inBottom = el.classList.contains("hero__title-bottom");
  const chars = el.textContent.split("");
  el.textContent = "";
  chars.forEach((char) => appendChar(el, char, inBottom));
}

function splitTitleLetters() {
  const titleEls = document.querySelectorAll(".hero__title-top, .hero__title-bottom");
  titleEls.forEach(splitElement);
}

function measureWidths(span) {
  const normal = span.querySelector(".hero__title-letter__normal");
  const hover = span.querySelector(".hero__title-letter__hover");
  const wNormal = span.getBoundingClientRect().width;
  normal.style.position = "absolute";
  hover.style.position = "static";
  const wHover = span.getBoundingClientRect().width;
  normal.style.position = "";
  hover.style.position = "";
  return { wNormal, wHover };
}

function initLetterWidths() {
  document.querySelectorAll(".hero__title-letter").forEach((span) => {
    const { wNormal, wHover } = measureWidths(span);
    span.dataset.wNormal = wNormal;
    span.dataset.wHover = wHover;
    span.style.width = wNormal + "px";
  });
  document.querySelectorAll(".hero__title-letter").forEach((span) => {
    const rect = span.getBoundingClientRect();
    span.dataset.initCenterX = rect.left + rect.width / 2;
    span.dataset.initHalfW = rect.width / 2;
  });
}

function activateLetter(span) {
  span.classList.add("hero__title-letter--active");
  span.style.width = span.dataset.wHover + "px";
}

function deactivateLetter(span) {
  span.classList.remove("hero__title-letter--active");
  span.style.width = span.dataset.wNormal + "px";
}

const ACTIVATE_ZONE = 1.4;

function clearRowActive(rowEl) {
  rowEl.querySelectorAll(".hero__title-letter--active").forEach(deactivateLetter);
}

function onRowMouseMove(rowEl, isBottom, e) {
  const letters = Array.from(rowEl.querySelectorAll(".hero__title-letter"));
  const cx = e.clientX;
  letters.forEach((span) => {
    const centerX = parseFloat(span.dataset.initCenterX);
    const halfW = parseFloat(span.dataset.initHalfW);
    const inZone = Math.abs(cx - centerX) < halfW * ACTIVATE_ZONE;
    const isActive = span.classList.contains("hero__title-letter--active");
    if (inZone && !isActive) activateLetter(span);
    else if (!inZone && isActive) deactivateLetter(span);
  });
  if (!isBottom) return;
  const last = letters[letters.length - 1];
  rowEl.classList.toggle("hero__title-bottom--r-hover", last.classList.contains("hero__title-letter--active"));
}

function onRowMouseLeave(rowEl, isBottom) {
  clearRowActive(rowEl);
  if (isBottom) rowEl.classList.remove("hero__title-bottom--r-hover");
}

function initRowHover(rowEl) {
  const isBottom = rowEl.classList.contains("hero__title-bottom");
  let rafId = null;
  rowEl.addEventListener("mousemove", (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      onRowMouseMove(rowEl, isBottom, e);
      rafId = null;
    });
  });
  rowEl.addEventListener("mouseleave", () => onRowMouseLeave(rowEl, isBottom));
}

function initTitleHover() {
  document.querySelectorAll(".hero__title-top, .hero__title-bottom").forEach(initRowHover);
}

function initSocialFlash() {
  const links = document.querySelectorAll(".hero__social-link");
  links.forEach((link) => {
    link.addEventListener("mouseleave", () => {
      link.classList.add("hero__social-link--leaving");
      setTimeout(() => link.classList.remove("hero__social-link--leaving"), 100);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  splitTitleLetters();
  initSocialFlash();
  initTitleHover();
  document.fonts.ready.then(initLetterWidths);
});
