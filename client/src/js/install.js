const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  // Store the triggered events
  window.deferredPrompt = event;

  // Remove the hidden class from the button.
  butInstall.classList.toggle("hidden", false);
});

//Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async (event) => {
  event.preventDefault();
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show prompt
  promptEvent.prompt();

  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;

  butInstall.classList.toggle("hidden", true);
});

//Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  event.preventDefault();
  // Clear prompt
  window.deferredPrompt = null;
});
