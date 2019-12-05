function SetScMode(newValue) {
    var newValueB = '=' + newValue;
    window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
}

function AdminB(ownerDoc) {
    xyyz.debug.log('s) AdminB');

    xyyz.debug.log('s) AdminB');
    ownerDoc.querySelector('#UserName').setAttribute('value', 'admin');
    ownerDoc.querySelector('#Password').setAttribute('value', 'b');
    ownerDoc.querySelector('#LogInBtn').click();
    xyyz.debug.log('e) AdminB');
}



function Desktop(ownerWindow) {
    xyyz.debug.log('owner: ' + ownerWindow);
    var pat = new RegExp('.*' + ownerWindow.location.hostname);
    xyyz.debug.log('pat: ' + pat);
    var match = ownerWindow.location.href.match(pat);
    xyyz.debug.log('match: ' + match);

    ownerWindow.location.href = '/sitecore/shell/default.aspx';

    TriggerRedButton(ownerWindow);


}

function TriggerRedButton(ownerWindow) {
    xyyz.debug.log('TriggerRedButton');

    setTimeout(function () {
        RedButton(ownerWindow, 10);
    }, 1500);
}

function RedButton(ownerWindow, iteration) {
    xyyz.debug.log();
    var found = ownerWindow.document.getElementById('StartButton');
    xyyz.debug.log('Red Button: ' + found + '  ' + ownerWindow.location.href + ' ' + iteration);
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

