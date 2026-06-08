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

function revealFeaturedHoverImage(visual, hoverImage, edge) {
  // :hover and the [data-enter-edge] change land in the same style
  // recalculation, so a transition driven by :hover would always start
  // from the *previous* off-stage position. Instead, jump to the new
  // edge's position with transitions off, flush it, then reveal — that
  // way the slide-in animates from the side the cursor just entered.
  hoverImage.style.transition = "none";
  visual.dataset.enterEdge = edge;
  void hoverImage.offsetWidth;
  hoverImage.style.transition = "";
  visual.classList.add("is-revealed");
}

function initFeaturedHoverDirection() {
  const visual = document.querySelector(".projects__featured-visual");
  const hoverImage = document.querySelector(".projects__featured-image--hover");
  if (!visual || !hoverImage) return;

  visual.addEventListener("mouseenter", (event) => {
    revealFeaturedHoverImage(visual, hoverImage, getEnterEdge(event, visual));
  });

  visual.addEventListener("mouseleave", () => {
    visual.classList.remove("is-revealed");
  });
}

document.addEventListener("DOMContentLoaded", initFeaturedHoverDirection);
