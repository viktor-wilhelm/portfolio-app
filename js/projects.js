function getEnterEdge(event, element) {
  const rect = element.getBoundingClientRect();
  // Scale by the opposite axis so the split lines match the rectangle's
  // actual corners instead of a perfect 45° cross.
  const x = (event.clientX - rect.left - rect.width / 2) * rect.height;
  const y = (event.clientY - rect.top - rect.height / 2) * rect.width;
  const deg = (Math.atan2(y, x) * 180) / Math.PI;

  if (deg > -45 && deg <= 45) return "right";
  if (deg > 45 && deg <= 135) return "bottom";
  if (deg > -135 && deg <= -45) return "top";
  return "left";
}

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

  visual.addEventListener("mouseenter", (event) => {
    visual.dataset.enterEdge = getEnterEdge(event, visual);
    settleLaptopToCenter(laptop);
  });

  visual.addEventListener("mouseleave", () => {
    resumeLaptopFloat(laptop);
  });
}

document.addEventListener("DOMContentLoaded", initFeaturedHoverDirection);
