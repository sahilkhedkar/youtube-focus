
const elementsToHide = [
  "#comments",
  "#secondary",      
  "#related",        
  "#footer"
];

function hideDistractions() {
  const onWatchPage = window.location.href.includes("/watch");

  elementsToHide.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.display = onWatchPage ? "none" : "";
    }
  });
}

window.addEventListener("load", hideDistractions);

const observer = new MutationObserver(hideDistractions);
observer.observe(document.body, { childList: true, subtree: true });
