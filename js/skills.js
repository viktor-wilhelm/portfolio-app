const STICKER_STATES = [
  "assets/img/skills-set/Property 1=Default.png",
  "assets/img/skills-set/Property 1=Variant3.png",
  "assets/img/skills-set/Property 1=Hover.png",
];

const FRAME_DELAY = 40;

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
  const frames = state.open ? [...STICKER_STATES].reverse() : [...STICKER_STATES];
  playSequence(img, frames, () => {
    state.open = !state.open;
    state.animating = false;
  });
}

function initSkillsSticker() {
  const sticker = document.getElementById("skillsSticker");
  const img = document.getElementById("skillsStickerImg");
  if (!sticker || !img) return;
  const state = { open: false, animating: false };
  sticker.addEventListener("click", () => handleStickerClick(img, state));
  sticker.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") handleStickerClick(img, state);
  });
}

document.addEventListener("DOMContentLoaded", initSkillsSticker);
