var xyyz = xyyz || {};

function SetScMode(newValue) {
  var newValueB = '=' + newValue;
  window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
}

function AdminB(ownerDoc) {
  xyyz.debug.Log('s) AdminB');

  xyyz.debug.Log('s) AdminB');
  ownerDoc.getElementById('UserName').setAttribute('value', 'admin');
  ownerDoc.getElementById('Password').setAttribute('value', 'b');
  ownerDoc.getElementById('LogInBtn').click();
  xyyz.debug.Log('e) AdminB');
}

function Desktop(ownerWindow) {
  xyyz.debug.FuncStart(this.Desktop.name);

  var currentLoc = ownerWindow.location.href;
  xyyz.debug.Log('currentLoc: ' + currentLoc);

  if (currentLoc.indexOf(xyyz.InjectConst.Url.ShellDefaultAspx) < 0) {
    xyyz.debug.Log('owner: ' + JSON.stringify(ownerWindow));

    var pat = new RegExp('.*' + ownerWindow.location.hostname);
    xyyz.debug.Log('pat: ' + pat);
    var match = ownerWindow.location.href.match(pat);
    xyyz.debug.Log('match: ' + match);

    ownerWindow.location.href = xyyz.InjectConst.Url.ShellDefaultAspx;
  }

  TriggerRedButton(ownerWindow);

  xyyz.debug.FuncEnd(this.Desktop.name);
}

function TriggerRedButton(ownerWindow) {
  xyyz.debug.Log('TriggerRedButton');

  setTimeout(function () {
    RedButton(ownerWindow, 10);
  }, 1500);
}

function RedButton(ownerWindow, iteration) {
  xyyz.debug.Log();
  var found = ownerWindow.document.getElementById('StartButton');
  xyyz.debug.Log('Red Button: ' + found + '  ' + ownerWindow.location.href + ' ' + iteration);
  if (found) {
    found.click();
    ownerWindow.document.querySelector('.scStartMenuLeftOption').click();
  } else {
    iteration = iteration - 1;

    if (iteration > 0) {
      setTimeout(function () {
        RedButton(ownerWindow, iteration);
      }, 1500);
    }
  }
}