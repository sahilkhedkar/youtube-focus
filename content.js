function applyMinimalMode({ enabled, settings }) {
    if (!enabled) return;
  
    const hide = (selector) => {
      const el = document.querySelector(selector);
      if (el) el.style.display = "none";
    };
  
    if (settings.comments) hide('#comments');
    if (settings.sidebar) {
      hide('#related');
      hide('#secondary');
    }
    if (settings.header) hide('#masthead-container');
  
    document.body.style.backgroundColor = "#000";
  }
  
  function runMinimalMode() {
    chrome.storage.sync.get(["enabled", "settings"], (data) => {
      const defaults = {
        enabled: true,
        settings: { sidebar: true, comments: true, header: true }
      };
      applyMinimalMode({
        enabled: data.enabled ?? defaults.enabled,
        settings: data.settings ?? defaults.settings
      });
    });
  }
  
  runMinimalMode();
  
  // Watch for page changes (YouTube is SPA)
  const observer = new MutationObserver(runMinimalMode);
  observer.observe(document.body, { childList: true, subtree: true });
  