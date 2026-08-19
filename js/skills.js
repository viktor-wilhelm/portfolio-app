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
const DRAG_OPEN_RATIO = 0.75;
const OPEN_PROGRESS_THRESHOLD = 0.6;

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
 * Plays the existing frame animation between two frame indices (either
 * direction), then invokes a callback with the final index reached.
 * @param {HTMLImageElement} img - The image element to update.
 * @param {string[]} frames - Ordered list of image src values.
 * @param {number} fromIndex - Frame index to start from.
 * @param {number} toIndex - Frame index to end on.
 * @param {Function} onDone - Called with the final index once finished.
 */
function playFrameRange(img, frames, fromIndex, toIndex, onDone) {
  const step = fromIndex < toIndex ? 1 : -1;
  let i = fromIndex;
  function tick() {
    img.src = frames[i];
    if (i === toIndex) { onDone(i); return; }
    i += step;
    setTimeout(tick, FRAME_DELAY);
  }
  tick();
}

/**
 * Toggles the sticker fully open/closed by animating from its current
 * frame to the target end frame. Ignores calls while already animating,
 * mid-drag, or already in the requested state.
 * @param {HTMLElement} sticker - The sticker root element.
 * @param {HTMLImageElement} img - The sticker's frame image.
 * @param {object} state - Mutable sticker state.
 * @param {boolean} open - Whether the sticker should end up open.
 */
function setStickerOpen(sticker, img, state, open) {
  if (state.animating || state.dragging || state.open === open) return;
  state.animating = true;
  sticker.classList.remove("skills__sticker--frame-open");
  sticker.classList.toggle("skills__sticker--open", open);
  const frames = getStickerFrames();
  const targetIndex = open ? frames.length - 1 : 0;
  playFrameRange(img, frames, state.frameIndex, targetIndex, (finalIndex) => {
    state.frameIndex = finalIndex;
    state.open = open;
    state.animating = false;
  });
}

/**
 * Sets the sticker's current frame (closed or open) to match the active
 * language, without touching an in-progress transition or drag.
 * @param {HTMLImageElement} img - The sticker's frame image.
 * @param {object} state - Mutable sticker state.
 */
function syncStickerFrame(img, state) {
  if (state.animating || state.dragging) return;
  const frames = getStickerFrames();
  state.frameIndex = state.open ? frames.length - 1 : 0;
  img.src = frames[state.frameIndex];
}

/**
 * Computes how far a pointer has moved along the top-right-to-bottom-left
 * diagonal since the drag started, as a value clamped to [0, 1].
 * @param {PointerEvent} e - The current pointer event.
 * @param {object} state - Mutable sticker state (drag origin + distance).
 * @returns {number} Drag progress from 0 (not moved) to 1 (fully dragged).
 */
function computeDragProgress(e, state) {
  const dx = e.clientX - state.dragStartX;
  const dy = e.clientY - state.dragStartY;
  const diagonal = (dy - dx) / Math.SQRT2;
  return Math.max(0, Math.min(1, diagonal / state.dragMaxDistance));
}

/**
 * Maps drag progress to a discrete frame index among the available frames.
 * @param {number} progress - Drag progress from 0 to 1.
 * @param {number} frameCount - Number of available frames.
 * @returns {number} Frame index.
 */
function frameIndexForProgress(progress, frameCount) {
  return Math.min(frameCount - 1, Math.floor(progress * frameCount));
}

/**
 * Updates the displayed frame live to track the pointer during a drag.
 * @param {PointerEvent} e - The current pointer event.
 * @param {HTMLElement} sticker - The sticker root element.
 * @param {HTMLImageElement} img - The sticker's frame image.
 * @param {object} state - Mutable sticker state.
 */
function updateDragFrame(e, sticker, img, state) {
  const progress = computeDragProgress(e, state);
  const frames = state.dragFrames;
  state.frameIndex = frameIndexForProgress(progress, frames.length);
  img.src = frames[state.frameIndex];
  sticker.classList.toggle("skills__sticker--frame-open", state.frameIndex === frames.length - 1);
}

/**
 * Animates from the current drag frame to the fully open or fully closed
 * end state once the pointer is released.
 * @param {HTMLElement} sticker - The sticker root element.
 * @param {HTMLImageElement} img - The sticker's frame image.
 * @param {object} state - Mutable sticker state.
 * @param {boolean} shouldOpen - Whether the drag went far enough to open.
 */
function settleDrag(sticker, img, state, shouldOpen) {
  const frames = state.dragFrames;
  const targetIndex = shouldOpen ? frames.length - 1 : 0;
  state.animating = true;
  sticker.classList.remove("skills__sticker--frame-open");
  sticker.classList.toggle("skills__sticker--open", shouldOpen);
  playFrameRange(img, frames, state.frameIndex, targetIndex, (finalIndex) => {
    state.frameIndex = finalIndex;
    state.open = shouldOpen;
    state.animating = false;
  });
}

/**
 * Ends an in-progress drag: removes the temporary window listeners and
 * settles the sticker open or closed based on how far it was dragged.
 * @param {PointerEvent} e - The pointer event that ended the drag.
 * @param {HTMLElement} sticker - The sticker root element.
 * @param {HTMLImageElement} img - The sticker's frame image.
 * @param {object} state - Mutable sticker state.
 */
function endDrag(e, sticker, img, state) {
  window.removeEventListener("pointermove", state.dragListeners.onMove);
  window.removeEventListener("pointerup", state.dragListeners.onUp);
  window.removeEventListener("pointercancel", state.dragListeners.onUp);
  state.dragging = false;
  sticker.classList.remove("skills__sticker--dragging");
  const progress = computeDragProgress(e, state);
  settleDrag(sticker, img, state, progress >= OPEN_PROGRESS_THRESHOLD);
}

/**
 * Starts a drag gesture from the sticker's grab zone (folded corner).
 * Only allowed while the sticker is closed and not already animating.
 * @param {PointerEvent} e - The pointerdown event.
 * @param {HTMLElement} sticker - The sticker root element.
 * @param {HTMLImageElement} img - The sticker's frame image.
 * @param {object} state - Mutable sticker state.
 */
function startDrag(e, sticker, img, state) {
  if (state.open || state.animating || state.dragging) return;
  state.dragging = true;
  state.dragStartX = e.clientX;
  state.dragStartY = e.clientY;
  state.dragFrames = getStickerFrames();
  state.dragMaxDistance = sticker.getBoundingClientRect().width * DRAG_OPEN_RATIO;
  sticker.classList.add("skills__sticker--dragging");
  try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
  const onMove = (ev) => updateDragFrame(ev, sticker, img, state);
  const onUp = (ev) => endDrag(ev, sticker, img, state);
  state.dragListeners = { onMove, onUp };
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp, { once: true });
  window.addEventListener("pointercancel", onUp, { once: true });
}

/**
 * Handles a plain click/tap on the sticker: only closes it when already
 * open (closing the peeled sticker); opening requires the drag gesture.
 * @param {HTMLElement} sticker - The sticker root element.
 * @param {HTMLImageElement} img - The sticker's frame image.
 * @param {object} state - Mutable sticker state.
 */
function handleStickerClick(sticker, img, state) {
  if (!state.open) return;
  setStickerOpen(sticker, img, state, false);
}

/**
 * Handles Enter/Space as an accessible open/close toggle, independent of
 * the drag gesture required for pointer input.
 * @param {KeyboardEvent} e - The keydown event.
 * @param {HTMLElement} sticker - The sticker root element.
 * @param {HTMLImageElement} img - The sticker's frame image.
 * @param {object} state - Mutable sticker state.
 */
function handleStickerKeydown(e, sticker, img, state) {
  if (e.key !== "Enter" && e.key !== " ") return;
  e.preventDefault();
  setStickerOpen(sticker, img, state, !state.open);
}

/**
 * Wires up the skills sticker: dragging the folded corner peels it open,
 * clicking the opened sticker closes it, and Enter/Space toggle it for
 * keyboard users.
 */
function initSkillsSticker() {
  const sticker = document.getElementById("skillsSticker");
  const img = document.getElementById("skillsStickerImg");
  const grabZone = document.getElementById("skillsStickerGrabZone");
  if (!sticker || !img || !grabZone) return;
  const state = { open: false, animating: false, dragging: false, frameIndex: 0 };
  syncStickerFrame(img, state);
  grabZone.addEventListener("pointerdown", (e) => startDrag(e, sticker, img, state));
  sticker.addEventListener("click", () => handleStickerClick(sticker, img, state));
  sticker.addEventListener("keydown", (e) => handleStickerKeydown(e, sticker, img, state));
  document.addEventListener("i18n:applied", () => syncStickerFrame(img, state));
}

document.addEventListener("DOMContentLoaded", initSkillsSticker);
