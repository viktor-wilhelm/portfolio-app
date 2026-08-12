const STICKER_STATES = [
  "assets/img/06_skills-set/Property 1=Default.png",
  "assets/img/06_skills-set/Property 1=Variant3.png",
  "assets/img/06_skills-set/Property 1=Hover.png",
];

const FRAME_DELAY = 60;

/**
 * Plays a sequence of image frames on an element with a fixed delay
 * between frames, then invokes a callback.
 * @param {HTMLImageElement} img - The image element to update.
 * @param {string[]} frames - Ordered list of image src values to play.
 * @param {Function} onDone - Called once the last frame has been shown.
 */
function playSequence(img, frames, onDone) {
  let i = 0;
  function step() {
    img.src = frames[i++];
    if (i < frames.length) setTimeout(step, FRAME_DELAY);
    else onDone();
  }
  step();
}

function handleStickerClick(img, state) {
  if (state.animating) return;
  state.animating = true;
  const frames = open ? [...STICKER_STATES] : [...STICKER_STATES].reverse();
  playSequence(img, frames, () => {
    state.open = open;
    state.animating = false;
  });
}

/**
 * Wires up click and keyboard (Enter/Space) activation for the skills
 * sticker's open/close animation.
 */
function initSkillsSticker() {
  const sticker = document.getElementById("skillsSticker");
  const img = document.getElementById("skillsStickerImg");
  if (!sticker || !img) return;
  const state = { open: false, animating: false };
  sticker.addEventListener("mouseenter", () => handleStickerHover(img, state, true));
  sticker.addEventListener("mouseleave", () => handleStickerHover(img, state, false));
  sticker.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") handleStickerHover(img, state, !state.open);
  });
}

document.addEventListener("DOMContentLoaded", initSkillsSticker);
