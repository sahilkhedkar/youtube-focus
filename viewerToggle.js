const hiddenParts = [
  '#comments',
  '#secondary',
  'ytd-video-secondary-info-renderer',
  'ytd-merch-shelf-renderer',
  'ytd-watch-next-secondary-results-renderer',
  'ytd-item-section-renderer',
  '#masthead-container',
  '#related'
];

function applyMinimalView() {
  hiddenParts.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.style.display = 'none';
  });
}

function restoreLayout() {
  hiddenParts.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.style.display = '';
  });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.toggle === "on") applyMinimalView();
  else if (msg.toggle === "off") restoreLayout();
});
