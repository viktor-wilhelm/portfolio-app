const STICKER_FRAMES = {
  en: [
    "assets/img/06_skills-set/Property 1=Default.png",
    "assets/img/06_skills-set/Property 1=Variant3.png",
    "assets/img/06_skills-set/Property 1=Hover.png",
  ],
  de: [
    "assets/img/06_skills-set/Property 1=Default-clean.png",
    "assets/img/06_skills-set/Property 1=Variant3.png",
    "assets/img/06_skills-set/Property 1=Hover-clean.png",
  ],
};

const FRAME_DELAY = 60;

/**
 * Returns the frame set for the currently active language (English keeps
 * its original, untouched artwork; German uses the text-free variants).
 * @returns {string[]} Ordered list of image src values for the closed
 *   through open states.
 */
function getStickerFrames() {
  const lang = localStorage.getItem("lang") ?? "de";
  return STICKER_FRAMES[lang] ?? STICKER_FRAMES.de;
}

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

/**
 * Toggles the sticker open/closed: plays the existing frame animation and
 * syncs the text overlays, ignoring calls while already animating or
 * already in the requested state (prevents double-triggering).
 * @param {HTMLElement} sticker - The sticker root element.
 * @param {HTMLImageElement} img - The sticker's frame image.
 * @param {object} state - Mutable sticker state (open, animating).
 * @param {boolean} open - Whether the sticker should end up open.
 */
function setStickerOpen(sticker, img, state, open) {
  if (state.animating || state.open === open) return;
  state.animating = true;
  sticker.classList.toggle("skills__sticker--open", open);
  const states = getStickerFrames();
  const frames = open ? [...states] : [...states].reverse();
  playSequence(img, frames, () => {
    state.open = open;
    state.animating = false;
  });
}

/**
 * Sets the sticker's current frame (closed or open) to match the active
 * language, without touching the mid-transition frame. Used on load and
 * whenever the language changes while the sticker isn't mid-animation.
 * @param {HTMLImageElement} img - The sticker's frame image.
 * @param {object} state - Mutable sticker state.
 */
function syncStickerFrame(img, state) {
  if (state.animating) return;
  const frames = getStickerFrames();
  img.src = state.open ? frames[frames.length - 1] : frames[0];
}

/**
 * Wires up click/tap and keyboard (Enter/Space) activation for the skills
 * sticker's open/close animation.
 */
function initSkillsSticker() {
  const sticker = document.getElementById("skillsSticker");
  const img = document.getElementById("skillsStickerImg");
  if (!sticker || !img) return;
  const state = { open: false, animating: false };
  syncStickerFrame(img, state);
  sticker.addEventListener("click", () => setStickerOpen(sticker, img, state, !state.open));
  sticker.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    setStickerOpen(sticker, img, state, !state.open);
  });
  document.addEventListener("i18n:applied", () => syncStickerFrame(img, state));
}

document.addEventListener("DOMContentLoaded", initSkillsSticker);
