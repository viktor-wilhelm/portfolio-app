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

function initFeaturedHoverDirection() {
  const visual = document.querySelector(".projects__featured-visual");
  if (!visual) return;

  visual.addEventListener("mouseenter", (event) => {
    visual.dataset.enterEdge = getEnterEdge(event, visual);
  });
}

document.addEventListener("DOMContentLoaded", initFeaturedHoverDirection);
