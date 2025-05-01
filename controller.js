document.getElementById('cleanOn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { toggle: "on" });
  });
});

document.getElementById('cleanOff').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { toggle: "off" });
  });
});

const themeToggle = document.getElementById('themeToggle');

chrome.storage.sync.get("yt_theme", data => {
  themeToggle.checked = data.yt_theme === "dark";
});

themeToggle.addEventListener("change", () => {
  const theme = themeToggle.checked ? "dark" : "light";
  chrome.storage.sync.set({ yt_theme: theme });

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { theme });
  });
});
