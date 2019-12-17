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
  function doAsHindSiteTarget() {
    console.log('do as target');
    TestDog();
  }


  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "addAsHindSiteTarget") {
      addAsHindSiteTarget();
    }
    else if (message.command === "removeAsHindSiteTarget") {
      removeAsHindSiteTarget();
    }
    else if (message.command === "doHindSite") {
      doAsHindSiteTarget();
    }
  });
})();