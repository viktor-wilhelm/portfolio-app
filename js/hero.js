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

let lastMoveTime = 0;
document.addEventListener("mousemove", () => {
  lastMoveTime = Date.now();
});

function isRealHover() {
  return Date.now() - lastMoveTime < 100;
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

function bindLetterEvents(span, wNormal, wHover) {
  let enterTimer = null;
  span.addEventListener("mouseenter", () => {
    if (!isRealHover()) return;
    enterTimer = setTimeout(() => {
      span.style.width = wHover + "px";
    }, 80);
  });
  span.addEventListener("mouseleave", () => {
    clearTimeout(enterTimer);
    span.style.width = wNormal + "px";
  });
}

function initLetter(span) {
  const { wNormal, wHover } = measureWidths(span);
  span.style.width = wNormal + "px";
  bindLetterEvents(span, wNormal, wHover);
}

function fixLetterWidths() {
  const letters = document.querySelectorAll(".hero__title-letter");
  letters.forEach(initLetter);
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
  document.fonts.ready.then(fixLetterWidths);
});
