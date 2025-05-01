const elementsToHide = [
  { id: "#comments", label: "Hide Comments" },
  { id: "#secondary", label: "Hide Sidebar" },
  { id: "#footer", label: "Hide Footer" },
  { id: "#related", label: "Hide Related Videos" },
];

function toggleElement(selector, shouldHide) {
  const el = document.querySelector(selector);
  if (el) {
    el.style.display = shouldHide ? "none" : "";
  }
}

function applyUserSettings() {
  const isWatchPage = window.location.href.includes("/watch");

  elementsToHide.forEach(({ id }) => {
    const checkbox = document.getElementById(`toggle-${id}`);
    if (checkbox) {
      toggleElement(id, isWatchPage && checkbox.checked);
    }
  });
}

document.addEventListener("DOMContentLoaded", applyUserSettings);

const observer = new MutationObserver(applyUserSettings);
observer.observe(document.body, { childList: true, subtree: true });
