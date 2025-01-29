document.getElementById("featVideosToggle").addEventListener("change", (event) => {
  const isChecked = event.target.checked;
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
      command: "toggleComponent",
      component: "gg-home-feat-videos",
      visible: !isChecked, // Reversed logic here
    });
  });
});

// Get initial state when popup opens
browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
  browser.tabs
    .sendMessage(tabs[0].id, {
      command: "getState",
      component: "gg-home-feat-videos",
    })
    .then((response) => {
      if (response) {
        document.getElementById("featVideosToggle").checked = !response.visible; // Reversed logic here
      }
    });
});
