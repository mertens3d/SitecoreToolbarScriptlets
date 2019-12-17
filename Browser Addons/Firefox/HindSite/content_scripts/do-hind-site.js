(function () {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function addAsHindSiteTarget() {
    console.log('add as target');
  }
  function removeAsHindSiteTarget() {
    console.log('remove as target');
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "addAsHindSiteTarget") {
      addAsHindSiteTarget();
    }
    else if (message.command === "removeAsHindSiteTarget") {
      removeAsHindSiteTarget();
    }
  });
})();