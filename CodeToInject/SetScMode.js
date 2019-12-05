function SetScMode(newValue) {
    var newValueB = '=' + newValue;
    window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
}

function AdminB(ownerDoc) {
    debug.log('s) AdminB');

    debug.log('s) AdminB');
    ownerDoc.querySelector('#UserName').setAttribute('value', 'admin');
    ownerDoc.querySelector('#Password').setAttribute('value', 'b');
    ownerDoc.querySelector('#LogInBtn').click();
    debug.log('e) AdminB');
}



function Desktop(ownerWindow) {
    debug.log('owner: ' + ownerWindow);
    var pat = new RegExp('.*' + ownerWindow.location.hostname);
    debug.log('pat: ' + pat);
    var match = ownerWindow.location.href.match(pat);
    debug.log('match: ' + match);

    ownerWindow.location.href = '/sitecore/shell/default.aspx';

    TriggeRedButton(ownerWindow);


}

function TriggeRedButton(ownerWindow) {
    debug.log('TriggeRedButton');

    setTimeout(function () {
        RedButton(ownerWindow, 10);
    }, 1500);
}

function RedButton(ownerWindow, iteration) {
    debug.log();
    var found = ownerWindow.document.getElementById('StartButton');
    debug.log('Red Button: ' + found + '  ' + ownerWindow.location.href + ' ' + iteration);
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

