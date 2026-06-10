function initBackLink() {
  const backLink = document.querySelector(".detail__back");
  if (!backLink) return;
  backLink.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("scrollTo", "projects");
    window.location.href = "index.html";
  });
}

document.addEventListener("DOMContentLoaded", initBackLink);
