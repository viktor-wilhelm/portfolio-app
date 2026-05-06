function splitTitleLetters() {
  const titleEls = document.querySelectorAll(".hero__title-top, .hero__title-bottom");

  titleEls.forEach((el) => {
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
      span.textContent = char;
      el.appendChild(span);
    });
  });
}

document.addEventListener("DOMContentLoaded", splitTitleLetters);
