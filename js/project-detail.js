const PROJECT_TITLES = {
  join: "Join",
  "el-pollo-loco": "El Pollo Loco",
  "da-bubble": "DA Bubble",
};

/**
 * Determines the active project key from the page's data-project attribute,
 * falling back to the 'project' URL query parameter, then to 'join'.
 * @returns {string} A valid key of PROJECT_TITLES/PROJECTS.
 */
function getProjectKey() {
  const keyFromHtml = document.documentElement.dataset.project;
  if (PROJECT_TITLES[keyFromHtml]) return keyFromHtml;

  const keyFromUrl = new URLSearchParams(window.location.search).get("project") ?? "join";
  if (PROJECT_TITLES[keyFromUrl]) return keyFromUrl;

  return "join";
}

/**
 * Sets the project data attribute, preload class and document title as
 * early as possible, before the rest of the page has initialized.
 */
function bootstrapProjectDetailPage() {
  const projectKey = getProjectKey();
  document.documentElement.dataset.project = projectKey;
  document.documentElement.classList.add("detail-preload");
  document.title = `${PROJECT_TITLES[projectKey]} – Viktor Wilhelm`;
}

bootstrapProjectDetailPage();

const PROJECTS = {
  join: {
    title: "Join",
    descKey: "projectJoinDescription",
    implKey: "detailJoinImpl",
    durationKey: "detailJoinDuration",
    image: "assets/img/07_Projects/Property 1=Join.png",
    imageAlt: "Join – Task Manager App",
    sticker: "assets/img/07_Projects/Sticker.png",
    github: "https://github.com/viktor-wilhelm/join",
    live: "https://join.viktor-wilhelm.de/",
    tech: ["CSS", "HTML", "Firebase", "JavaScript"],
    next: "el-pollo-loco",
  },
  "el-pollo-loco": {
    title: "El Pollo Loco",
    descKey: "projectElPolloLocoDescription",
    implKey: "detailElPolloLocoImpl",
    durationKey: "detailElPolloLocoDuration",
    image: "assets/img/07_Projects/Property 1=El Pollo Loco.png",
    imageAlt: "El Pollo Loco – Jump & Run Game",
    sticker: "assets/img/07_Projects/badge-viktor.svg",
    github: "https://github.com/viktor-wilhelm/loco-app",
    live: "https://el-pollo-loco.viktor-wilhelm.de/",
    tech: ["JavaScript", "HTML", "CSS"],
    next: "da-bubble",
  },
  "da-bubble": {
    title: "DA Bubble",
    descKey: "projectDaBubbleDescription",
    implKey: "detailDaBubbleImpl",
    durationKey: "detailDaBubbleDuration",
    image: "assets/img/07_Projects/Property 1=DABubble.png",
    imageAlt: "DA Bubble – Team Messenger App",
    sticker: "assets/img/07_Projects/badge-viktor.svg",
    github: "repo-coming-soon.html",
    live: "repo-coming-soon.html",
    tech: ["JavaScript", "HTML", "CSS"],
    next: "join",
  },
};

/**
 * Resolves the active project's key and data.
 * @returns {object} The project data merged with its key, keyed as
 *   { key, ...PROJECTS[key] }.
 */
function getProjectData() {
  const key = getProjectKey();
  if (PROJECTS[key]) return { key, ...PROJECTS[key] };
  return { key: "join", ...PROJECTS["join"] };
}

/**
 * Sets the `.detail--project-{key}` modifier class on the detail container,
 * removing any other project modifier classes first.
 * @param {object} project - The active project data, including its key.
 */
function syncProjectClass(project) {
  const detail = document.querySelector(".detail");
  if (!detail) return;
  detail.classList.remove("detail--project-join", "detail--project-el-pollo-loco", "detail--project-da-bubble");
  detail.classList.add(`detail--project-${project.key}`);
}

/**
 * Renders a single tech-stack tag's markup, handling string tags and
 * defaulting to the Angular icon otherwise.
 * @param {string|{id: string}} tag - A plain tag label, or an object with
 *   an id identifying a special icon tag.
 * @returns {string} HTML markup for the tech tag.
 */
function renderTechTag(tag) {
  if (typeof tag === "string") return `<span class="detail__tech-tag">${tag}</span>`;
  return `<span class="detail__tech-tag detail__tech-tag--icon"><img src="assets/img/06_skills-set/Property 1=Angular.png" alt="" aria-hidden="true" class="detail__tech-icon detail__tech-icon--angular" /> Angular</span>`;
}

/**
 * Renders the project's tech-stack tags into the detail page.
 * @param {object} project - The active project data.
 */
function populateTech(project) {
  const tech = document.querySelector(".detail__tech");
  if (!tech) return;
  tech.innerHTML = project.tech.map(renderTechTag).join("");
}

/**
 * Sizes the title underline to match the rendered width of the title text.
 */
function syncUnderlineWidth() {
  const underline = document.querySelector(".detail__title-underline");
  const title = document.querySelector(".detail__title");
  if (!underline || !title) return;
  const range = document.createRange();
  range.selectNodeContents(title);
  underline.style.width = `${range.getBoundingClientRect().width}px`;
}

/**
 * Populates the detail page's text content (title, description, i18n keys)
 * for the active project and applies translations.
 * @param {object} project - The active project data.
 */
function populateText(project) {
  const lang = localStorage.getItem("lang") ?? "de";
  document.title = `${project.title} – Viktor Wilhelm`;
  document.querySelector(".detail__title").textContent = project.title;
  document.querySelector(".detail__description").dataset.i18n = project.descKey;
  document.querySelector(".detail__impl").dataset.i18n = project.implKey;
  document.querySelector(".detail__duration-value").dataset.i18n = project.durationKey;
  applyTranslations(lang);
  syncUnderlineWidth();
}

/**
 * Populates the detail page's visual elements (image, sticker, action
 * links and the next-project link) for the active project.
 * @param {object} project - The active project data.
 */
function populateVisual(project) {
  const img = document.querySelector(".detail__image");
  img.src = project.image;
  img.alt = project.imageAlt;
  document.querySelector(".detail__sticker").src = project.sticker;
  document.querySelector(".detail__btn--github").href = project.github;
  document.querySelector(".detail__btn--live").href = project.live;
  document.querySelector(".detail__next-btn").href = `project-detail.html?project=${project.next}`;
}

/**
 * Loads the active project's data and renders it into the detail page.
 */
function initProject() {
  const project = getProjectData();
  syncProjectClass(project);
  populateText(project);
  populateTech(project);
  populateVisual(project);
}

/**
 * Wires up the back link to remember the projects section scroll target
 * before navigating back to the homepage.
 */
function initBackLink() {
  const backLink = document.querySelector(".detail__back");
  if (!backLink) return;
  backLink.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("scrollTo", "projects");
    window.location.href = "index.html";
  });
}

/**
 * Removes the preload class, revealing the detail page once it is fully
 * rendered.
 */
function markDetailReady() {
  document.documentElement.classList.remove("detail-preload");
}

/**
 * Keeps "Next Project" exactly 3rem below the action buttons on desktop (>900px).
 * The buttons' own height depends on the fluid project image, so a fixed CSS
 * offset can't track it — this measures the real gap and sets it inline.
 */
function positionNextProjectLink() {
  const next = document.querySelector(".detail__next");
  if (!next) return;
  if (window.innerWidth <= 900) {
    next.style.top = "";
    return;
  }
  const actions = document.querySelector(".detail__actions");
  const container = document.querySelector(".detail__container");
  if (!actions || !container) return;
  const gapPx = parseFloat(getComputedStyle(document.documentElement).fontSize) * 3;
  const top = actions.getBoundingClientRect().bottom - container.getBoundingClientRect().top + gapPx;
  next.style.top = `${top}px`;
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    initProject();
    initBackLink();
    syncUnderlineWidth();
    positionNextProjectLink();
  } finally {
    markDetailReady();
  }
});

document.addEventListener("i18n:applied", syncUnderlineWidth);
window.addEventListener("resize", syncUnderlineWidth);
window.addEventListener("resize", positionNextProjectLink);
if (document.fonts) document.fonts.ready.then(syncUnderlineWidth);
