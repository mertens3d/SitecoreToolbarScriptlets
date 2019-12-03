function SetScMode(newValue){
    var newValueB = '=' + newValue;
    window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
}

function AdminB(ownerDoc){
    ownerDoc.querySelector('#UserName').setAttribute('value','admin');
    ownerDoc.querySelector('#Password').setAttribute('value','b');
    ownerDoc.querySelector('#LogInBtn').click();
}

function Desktop(ownerWindow){
    console.log('owner: ' + ownerWindow);
    var pat = new RegExp('.*' + ownerWindow.location.hostname );
    console.log('pat: ' + pat);
    var match = ownerWindow.location.href.match(pat);
    console.log('match: ' + match);
    


    ownerWindow.location.href = match + '/sitecore/shell/default.aspx';
    
    setTimeout(function(){
        RedButton(ownerWindow, 10);
    },1500);

}

function RedButton(ownerWindow, iteration){
    console.log();
    var found = ownerWindow.document.getElementById('StartButton');
    console.log('Red Button: ' + found + '  ' + ownerWindow.location.href + ' ' + iteration);
    if(found){
        found.click();
        ownerWindow.document.querySelector('.scStartMenuLeftOption').click();

    }else{
               
        if(iteration > 0){
            setTimeout(function(){
                RedButton(ownerWindow, iteration--);
            }, 1500);
        }
    }
}

