
const elementsToHide = [
  '#comments',                               // Comment section
  '#secondary',                              // Sidebar with related videos
  '#masthead-container',                     // YouTube top navbar (for logo and controls)
  '#related',                                // Related video section
  '#footer'                                  // Footer section
];

const alwaysVisible = [
  '#logo',                                   // YouTube home logo
  '#search',                                 // Search bar
  'video'                                    // Video player itself
];

function toggleVisibility(elementId, action) {
  const element = document.querySelector(elementId);
  if (element) {
    element.style.display = action === 'hide' ? 'none' : 'block';
  }
}

function applyMinimalView() {
  elementsToHide.forEach(id => {
    const checkbox = document.querySelector(`#toggle-${id}`);
    if (checkbox && checkbox.checked) {
      toggleVisibility(id, 'hide');
    } else {
      toggleVisibility(id, 'show');
    }
  });
}

function setupVideoPlayer() {
  const video = document.querySelector('video');
  if (video) {
    video.addEventListener('play', () => {
      applyMinimalView();  
    });
    video.addEventListener('pause', () => {
      applyMinimalView();  // Apply minimal view when video is paused
    });
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.toggle === "on") applyMinimalView();  // Apply minimal view when toggle is on
  else if (msg.toggle === "off") applyMinimalView();  // Restore view when toggle is off
});

setupVideoPlayer();
