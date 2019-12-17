function listenForClicks() {
  document.addEventListener("click", (e) => {

    function addAsHindsiteTarget(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "addAsHindSiteTarget",
      });
    }
    function removeAsHindsiteTarget(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "removeAsHindSiteTarget",
      });
    }

    function doAsHindsiteTarget(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "doHindSite",
      });
    }

    function reportError(error) {
      console.error(`Could not do something: ${error}`);
    }

    if (e.target.classList.contains("hindsite-add")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(addAsHindsiteTarget)
        .catch(reportError);
    }
    else if (e.target.classList.contains("hindsite-remove")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(removeAsHindsiteTarget)
        .catch(reportError);
    }
    else if (e.target.classList.contains("hindsite-do")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(doAsHindsiteTarget)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs.executeScript({ file: "/content_scripts/do-hind-site.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);

//function addAsHindsiteTargetBB(tabs) {
//  browser.tabs.sendMessage(tabs[0].id, {
//    command: "hindsiteTarget",
//  });
//}