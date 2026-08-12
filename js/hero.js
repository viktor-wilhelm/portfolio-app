/**
 * Creates a span for a single title letter with a normal and hover variant
 * (the hover variant shows the opposite case, or lowercase for the bottom row).
 * @param {string} char - The character to render.
 * @param {boolean} inBottom - Whether the letter belongs to the bottom title row.
 * @returns {HTMLSpanElement} The letter span element.
 */
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

/**
 * Appends a character to a title element, as a plain text node for spaces
 * or as a letter span (see createLetterSpan) otherwise.
 * @param {HTMLElement} el - The title element to append to.
 * @param {string} char - The character to append.
 * @param {boolean} inBottom - Whether the element is the bottom title row.
 */
function appendChar(el, char, inBottom) {
  if (char === " ") {
    el.appendChild(document.createTextNode(" "));
    return;
  }
  el.appendChild(createLetterSpan(char, inBottom));
}

/**
 * Replaces a title element's text content with per-letter spans.
 * @param {HTMLElement} el - The title row element to split.
 */
function splitElement(el) {
  const inBottom = el.classList.contains("hero__title-bottom");
  const chars = el.textContent.split("");
  el.textContent = "";
  chars.forEach((char) => appendChar(el, char, inBottom));
}

/**
 * Splits both hero title rows into per-letter spans.
 */
function splitTitleLetters() {
  const titleEls = document.querySelectorAll(".hero__title-top, .hero__title-bottom");
  titleEls.forEach(splitElement);
}

/**
 * Measures a letter span's rendered width in both its normal and hover state.
 * @param {HTMLSpanElement} span - The letter span to measure.
 * @returns {{wNormal: number, wHover: number}} The measured widths in pixels.
 */
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

/**
 * Measures and stores each letter span's normal/hover widths and its
 * initial center position, used later for hover-zone detection.
 */
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

/**
 * Switches a letter span into its active (hover) visual state.
 * @param {HTMLSpanElement} span - The letter span to activate.
 */
function activateLetter(span) {
  span.classList.add("hero__title-letter--active");
  span.style.width = span.dataset.wHover + "px";
}

/**
 * Switches a letter span back to its normal (non-hover) visual state.
 * @param {HTMLSpanElement} span - The letter span to deactivate.
 */
function deactivateLetter(span) {
  span.classList.remove("hero__title-letter--active");
  span.style.width = span.dataset.wNormal + "px";
}

const ACTIVATE_ZONE = 1.4;

/**
 * Deactivates all currently active letter spans within a title row.
 * @param {HTMLElement} rowEl - The title row element.
 */
function clearRowActive(rowEl) {
  rowEl.querySelectorAll(".hero__title-letter--active").forEach(deactivateLetter);
}

/**
 * Activates or deactivates each letter in a title row based on the cursor's
 * horizontal distance from the letter's center, and updates the bottom
 * row's hover class when its last letter is active.
 * @param {HTMLElement} rowEl - The title row element.
 * @param {boolean} isBottom - Whether the row is the bottom title row.
 * @param {MouseEvent} e - The mousemove event.
 */
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

/**
 * Clears active letters when the cursor leaves a title row.
 * @param {HTMLElement} rowEl - The title row element.
 * @param {boolean} isBottom - Whether the row is the bottom title row.
 */
function onRowMouseLeave(rowEl, isBottom) {
  clearRowActive(rowEl);
  if (isBottom) rowEl.classList.remove("hero__title-bottom--r-hover");
}

/**
 * Wires up mousemove (throttled via requestAnimationFrame) and mouseleave
 * handlers for a title row's letter hover effect.
 * @param {HTMLElement} rowEl - The title row element.
 */
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

/**
 * Initializes the letter hover effect for both hero title rows.
 */
function initTitleHover() {
  document.querySelectorAll(".hero__title-top, .hero__title-bottom").forEach(initRowHover);
}

/**
 * Resets and re-measures each letter span's widths and center position,
 * used after the title's layout changes (e.g. on resize).
 */
function recalcLetterWidths() {
  document.querySelectorAll(".hero__title-letter").forEach((span) => {
    span.style.width = "";
  });
  void document.querySelector(".hero__title")?.offsetWidth;
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

/**
 * Observes the hero title element for size changes and recalculates letter
 * widths (throttled via requestAnimationFrame) whenever it resizes.
 */
function setupResizeRecalc() {
  const titleEl = document.querySelector(".hero__title");
  if (!titleEl) return;
  let rafId = null;
  new ResizeObserver(() => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      document.querySelectorAll(".hero__title-top, .hero__title-bottom").forEach((row) => {
        clearRowActive(row);
        row.classList.remove("hero__title-bottom--r-hover");
      });
      recalcLetterWidths();
      rafId = null;
    });
  }).observe(titleEl);
}

/**
 * Adds a brief "leaving" class flash to social links on mouseleave.
 */
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
  document.fonts.ready.then(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initLetterWidths();
        setupResizeRecalc();
      });
    });
  });
});
