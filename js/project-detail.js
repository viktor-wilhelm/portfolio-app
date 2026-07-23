const PROJECT_TITLES = {
  join: "Join",
  "el-pollo-loco": "El Pollo Loco",
  "da-bubble": "DA Bubble",
};

function getProjectKey() {
  const keyFromHtml = document.documentElement.dataset.project;
  if (PROJECT_TITLES[keyFromHtml]) return keyFromHtml;

  const keyFromUrl = new URLSearchParams(window.location.search).get("project") ?? "join";
  if (PROJECT_TITLES[keyFromUrl]) return keyFromUrl;

  return "join";
}

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
    tech: ["CSS", "HTML", { id: "firebase" }, "JavaScript"],
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
    github: "#",
    live: "#",
    tech: ["JavaScript", "HTML", "CSS"],
    next: "join",
  },
};

function getProjectData() {
  const key = getProjectKey();
  if (PROJECTS[key]) return { key, ...PROJECTS[key] };
  return { key: "join", ...PROJECTS["join"] };
}

function syncProjectClass(project) {
  const detail = document.querySelector(".detail");
  if (!detail) return;
  detail.classList.remove("detail--project-join", "detail--project-el-pollo-loco", "detail--project-da-bubble");
  detail.classList.add(`detail--project-${project.key}`);
}

function renderTechTag(tag) {
  if (typeof tag === "string") return `<span class="detail__tech-tag">${tag}</span>`;
  if (tag.id === "firebase") {
    return `<span class="detail__tech-tag detail__tech-tag--icon"><span class="detail__tech-icon--firebase-wrap" role="img" aria-hidden="true"></span> Firebase</span>`;
  }
  return `<span class="detail__tech-tag detail__tech-tag--icon"><img src="assets/img/06_skills-set/Property 1=Angular.png" alt="" aria-hidden="true" class="detail__tech-icon detail__tech-icon--angular" /> Angular</span>`;
}

function populateTech(project) {
  const tech = document.querySelector(".detail__tech");
  if (!tech) return;
  tech.innerHTML = project.tech.map(renderTechTag).join("");
}

function syncUnderlineWidth() {
  const underline = document.querySelector(".detail__title-underline");
  const title = document.querySelector(".detail__title");
  if (!underline || !title) return;
  const range = document.createRange();
  range.selectNodeContents(title);
  underline.style.width = `${range.getBoundingClientRect().width}px`;
}

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

function populateVisual(project) {
  const img = document.querySelector(".detail__image");
  img.src = project.image;
  img.alt = project.imageAlt;
  document.querySelector(".detail__sticker").src = project.sticker;
  document.querySelector(".detail__btn--github").href = project.github;
  document.querySelector(".detail__btn--live").href = project.live;
  document.querySelector(".detail__next-btn").href = `project-detail.html?project=${project.next}`;
}

function initProject() {
  const project = getProjectData();
  syncProjectClass(project);
  populateText(project);
  populateTech(project);
  populateVisual(project);
}

function initBackLink() {
  const backLink = document.querySelector(".detail__back");
  if (!backLink) return;
  backLink.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("scrollTo", "projects");
    window.location.href = "index.html";
  });
}

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
