let componentStates = {};

function toggleComponent(componentName, visible) {
  const component = document.querySelector(componentName);
  if (component) {
    component.style.display = visible ? "" : "none";
    componentStates[componentName] = visible;
  }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.command) {
    case "toggleComponent":
      toggleComponent(message.component, message.visible);
      break;
    case "getState":
      const component = document.querySelector(message.component);
      if (component) {
        sendResponse({
          visible: componentStates[message.component] !== false,
        });
      }
      break;
  }
});

// Initialize state when page loads
document.addEventListener("DOMContentLoaded", () => {
  const component = document.querySelector("gg-home-feat-videos");
  if (component) {
    componentStates["gg-home-feat-videos"] = true; // Initial state: visible
  }
});
