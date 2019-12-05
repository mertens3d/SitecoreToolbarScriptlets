var debug = {
    valueCombine : \"\",
    log : function(text){
        console.log(text);
        var ta = document.querySelector(\"#ta-debug\");
        if(ta){
            
            ta.value += (\"\\n\\r\" + text);

        }
    }
}
function WireMenuButtons() {
    document.querySelector('#btnEdit').onclick = function () { SetScMode('edit'); };
    document.querySelector('#btnPrev').onclick = function () { SetScMode('preview'); };
    document.querySelector('#btnNorm').onclick = function () { SetScMode('normal'); };
    document.querySelector('#btnAdminB').onclick = function () { AdminB(window.opener.document); };
    document.querySelector('#btnDesktop').onclick = function () { Desktop(window.opener); };
    document.querySelector('#btnSaveTheTrees').onclick = function () { SaveTheTrees(window.opener.document); };
    document.querySelector('#btnPlantTheTrees').onclick = function () { PlantTheTrees(window.opener.document); };
}
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


function WalkNodeRecursive(targetNode, depth) {
    // debug.log('WalkNodeRecursive ' + depth);
    var toReturn = [];
    depth = depth - 1;

    if (targetNode) {
        var id = targetNode.id;
        var className = targetNode.className;
        // debug.log('class: ' + className);
        if (className === 'scContentTreeNode') {
            var firstImg = targetNode.querySelector('.scContentTreeNodeGlyph');
            if (firstImg) {
                var srcAttr = firstImg.getAttribute(\"src\");
                if (srcAttr.indexOf('treemenu_expanded.png') > -1) {
                    debug.log('*******************************src: ' + srcAttr);
                    toReturn.push(firstImg.id);
                }
            }
        }

        if (id) {
            // debug.log('id: ' + id);

            var idx = id.indexOf('Tree_Node_');
            if (idx > -1) {
                // debug.log('pushing ' + id);
                // toReturn.push(id);
            }

        }
        var childNodes = targetNode.children;
        if (childNodes && childNodes.length > 0 && depth > 0) {
            for (var jdx = 0; jdx < childNodes.length; jdx++) {
                var oneChild = childNodes[jdx];
                toReturn = toReturn.concat(WalkNodeRecursive(oneChild, depth));
            }
        }
    }




    return toReturn;
}

function GetIframe(targetDoc) {
    var toReturn = null;
    var iframeAr = targetDoc.querySelectorAll('iframe[src*=content]');
    if (iframeAr) {
        debug.log('iframeAr: ' + iframeAr.length);
        for (var idx = 0; idx < iframeAr.length; idx++) {
            toReturn = iframeAr[idx].contentDocument;

        }
    }
    return toReturn;
}

function PlantTheTrees(targetDoc) {
    debug.log('s) LookAtExistingData');
    var foundInStorage = window.localStorage.getItem('nodeData-0');
    if (foundInStorage) {
        debug.log('foundInStorage: ' + foundInStorage);
        //note: no IE support. Maybe use split if needed
        var foundAr = foundInStorage.split(',');
        if (foundAr) {
            debug.log('foundAr: ' + foundAr.length + ' ' + foundAr);


var targetIframe = GetIframe(targetDoc);

            for (var idx = 0; idx < foundAr.length; idx++) {
                var candidate = foundAr[idx].replace(/\"/gi, '');
                candidate = candidate.replace('[', '').replace(']', '');
                debug.log('candidate: ' + candidate);
                var foundOnPage = targetIframe.getElementById(candidate);
                if (foundOnPage) {
                    debug.log('foundOnPage');
                    var currentSrc = foundOnPage.getAttribute('src');
                    debug.log('currentSrc' + currentSrc);
                    if(currentSrc.indexOf('treemenu_expanded.png') < 0 ){
                        debug.log('clicking it');

                        foundOnPage.click();
                    }
                }
            }
        }
    }
}



function SaveTheTrees(targetDoc) {
    debug.log('s) SaveTheTrees');

    var iframeAr = GetIframe(targetDoc);
    if (iframeAr) {
        var rootNode = oneIframeDoc.querySelector('#Tree_Node_11111111111111111111111111111111');
        debug.log('rootNode: ' + rootNode.innerHTML);
        if (rootNode) {
            var rootParent = rootNode.parentElement;

            var foundNodes = WalkNodeRecursive(rootParent, 100);
            debug.log(\"foundNodes: \" + foundNodes.length);
            debug.log(\"foundNodes: \" + foundNodes);

            window.localStorage.setItem('nodeData-' + idx, JSON.stringify(foundNodes));


        }

        debug.log('e) SaveTheTrees');

    }
}