const toggleMode = document.getElementById("toggleMode");
const hideSidebar = document.getElementById("hideSidebar");
const hideComments = document.getElementById("hideComments");
const hideHeader = document.getElementById("hideHeader");

const checkboxes = [hideSidebar, hideComments, hideHeader];

chrome.storage.sync.get(["enabled", "settings"], (data) => {
  toggleMode.checked = data.enabled ?? true;
  const settings = data.settings ?? { sidebar: true, comments: true, header: true };
  hideSidebar.checked = settings.sidebar;
  hideComments.checked = settings.comments;
  hideHeader.checked = settings.header;
});

toggleMode.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggleMode.checked });
});

checkboxes.forEach((cb) => {
  cb.addEventListener("change", () => {
    chrome.storage.sync.set({
      settings: {
        sidebar: hideSidebar.checked,
        comments: hideComments.checked,
        header: hideHeader.checked
      }
    });
  });
});
