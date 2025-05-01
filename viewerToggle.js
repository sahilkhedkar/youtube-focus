
const elementsToHide = [
  '#comments',                               // Comment section
  '#secondary',                              // Sidebar with related videos
  'ytd-video-secondary-info-renderer',        // Secondary video info (likes, views, etc.)
  'ytd-merch-shelf-renderer',                 // Merch shelf (if visible)
  'ytd-watch-next-secondary-results-renderer', // Secondary results after the video
  'ytd-item-section-renderer',                // Section containing recommended videos
  '#masthead-container',                     // YouTube top navbar (for logo and controls)
  '#related',                                // Related video section
  '#footer'                                  // Footer section
];

const elementsToAlwaysShow = [
  '#logo',                                   // YouTube logo (on the home page)
  '#search'                                  // Search bar
];

function applyMinimalView() {
  elementsToHide.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) element.style.display = 'none';
  });
}

function restoreLayout() {
  elementsToHide.forEach(selector => {
    const element = document.querySelector(selector);
    if (element) element.style.display = '';
  });

  document.body.removeAttribute("data-theme");
}

function onVideoPlay() {
  applyMinimalView();

  const logo = document.querySelector('#logo');
  if (logo) logo.style.display = 'none';
}

function onVideoPause() {
  restoreLayout();

  const logo = document.querySelector('#logo');
  if (logo) logo.style.display = '';
}

function setupVideoPlayer() {
  const video = document.querySelector('video');
  if (video) {
    video.addEventListener('play', onVideoPlay);  // Trigger minimal view when the video plays
    video.addEventListener('pause', onVideoPause); // Restore layout when the video pauses
  }
}

function observeChanges() {
  const observer = new MutationObserver(setupVideoPlayer);
  observer.observe(document.body, { childList: true, subtree: true });
}

setupVideoPlayer();
observeChanges();

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.toggle === "on") applyMinimalView();  // Apply minimal view if toggle is on
  else if (msg.toggle === "off") restoreLayout(); // Restore full layout if toggle is off
  if (msg.theme) document.body.setAttribute("data-theme", msg.theme); // Change theme if requested
});
