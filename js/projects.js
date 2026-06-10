function settleLaptopToCenter(laptop) {
  // The float animation continuously drives `transform`; capture its
  // current value before silencing it so the settle-to-center transition
  // starts from wherever the laptop happens to be, not from a jump.
  const current = getComputedStyle(laptop).transform;
  laptop.style.transition = "none";
  laptop.style.animation = "none";
  laptop.style.transform = current;
  void laptop.offsetWidth;
  laptop.style.transition = "";
  laptop.style.transform = "translateY(0)";
}

function resumeLaptopFloat(laptop) {
  laptop.style.transition = "";
  laptop.style.animation = "";
  laptop.style.transform = "";
}

function initFeaturedHoverDirection() {
  const visual = document.querySelector(".projects__featured-visual");
  const laptop = document.querySelector(".projects__featured-laptop");
  if (!visual || !laptop) return;

  visual.addEventListener("mouseenter", () => {
    visual.dataset.enterEdge = "left";
    settleLaptopToCenter(laptop);
  });

  visual.addEventListener("mouseleave", () => {
    resumeLaptopFloat(laptop);
  });
}

document.addEventListener("DOMContentLoaded", initFeaturedHoverDirection);

function handleScrollOnLoad() {
  const target = sessionStorage.getItem("scrollTo");
  if (!target) return;
  sessionStorage.removeItem("scrollTo");
  const el = document.getElementById(target);
  if (!el) return;
  document.documentElement.style.scrollBehavior = "auto";
  el.scrollIntoView();
  document.documentElement.style.scrollBehavior = "";
}

document.addEventListener("DOMContentLoaded", handleScrollOnLoad);
