function splitTitleLetters() {
  const titleEls = document.querySelectorAll(".hero__title-top, .hero__title-bottom");

  titleEls.forEach((el) => {
    const inBottom = el.classList.contains("hero__title-bottom");
    const chars = el.textContent.split("");
    el.textContent = "";

    chars.forEach((char) => {
      if (char === " ") {
        el.appendChild(document.createTextNode(" "));
        return;
      }

      const span = document.createElement("span");
      span.classList.add("hero__title-letter");

      const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();
      span.classList.add(isUpper ? "hero__title-letter--upper" : "hero__title-letter--lower");

      const normal = document.createElement("span");
      normal.classList.add("hero__title-letter__normal");
      normal.textContent = char;

      const hover = document.createElement("span");
      hover.classList.add("hero__title-letter__hover");
      hover.textContent = inBottom ? char.toLowerCase() : isUpper ? char.toLowerCase() : char.toUpperCase();

      span.appendChild(normal);
      span.appendChild(hover);
      el.appendChild(span);
    });
  });
}

let lastMoveTime = 0;
document.addEventListener("mousemove", () => {
  lastMoveTime = Date.now();
});

function isRealHover() {
  return Date.now() - lastMoveTime < 100;
}

function fixLetterWidths() {
  const letters = document.querySelectorAll(".hero__title-letter");
  letters.forEach((span) => {
    const inBottom = span.closest(".hero__title-bottom") !== null;

    // .hero__title-top: all letters animate width on hover (grow or shrink)
    if (!inBottom) {
      const normal = span.querySelector(".hero__title-letter__normal");
      const hover = span.querySelector(".hero__title-letter__hover");
      const wNormal = span.getBoundingClientRect().width;
      normal.style.position = "absolute";
      hover.style.position = "static";
      const wHover = span.getBoundingClientRect().width;
      normal.style.position = "";
      hover.style.position = "";
      span.style.width = wNormal + "px";
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
      return;
    }

    // .hero__title-bottom: debounced width animation — 80ms delay breaks the vibration loop
    const normal = span.querySelector(".hero__title-letter__normal");
    const hover = span.querySelector(".hero__title-letter__hover");
    const wNormal = span.getBoundingClientRect().width;
    normal.style.position = "absolute";
    hover.style.position = "static";
    const wHover = span.getBoundingClientRect().width;
    normal.style.position = "";
    hover.style.position = "";
    span.style.width = wNormal + "px";
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
  });
}

document.addEventListener("DOMContentLoaded", () => {
  splitTitleLetters();
  document.fonts.ready.then(fixLetterWidths);
});
