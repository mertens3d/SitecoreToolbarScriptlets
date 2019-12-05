var xyyz = xyyz || {};

xyyz.debug = {
    valueCombine : \"\",
    log : function(text){
        console.log(text);
        var ta = document.querySelector(\"#ta-debug\");
        if(ta){
            
            ta.value += (\"\\n\\r\" + text);

        }
    }
}
var xyyz = xyyz || {};
xyyz.InjectConst = {
    ClassNames :{
        ContentTreeNode:'scContentTreeNode',
    },
    Selector :{
        ContentTreeNodeGlyph : '.scContentTreeNodeGlyph'
    },
    TreeExpandedPng : 'treemenu_expanded.png',

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

    TriggeRedButton(ownerWindow);


}

function TriggeRedButton(ownerWindow) {
    xyyz.debug.log('TriggeRedButton');

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


function WalkNodeRecursive(targetNode, depth) {
    // xyyz.debug.log('WalkNodeRecursive ' + depth);
    var toReturn = [];
    depth = depth - 1;

    if (targetNode) {
        var id = targetNode.id;
        var className = targetNode.className;
        // xyyz.debug.log('class: ' + className);
        if (className === xyyz.InjectConst.ClassName.ContentTreeNode ) {
            var firstImg = targetNode.querySelector(xyyz.InjectConst.Selector.ContentTreeNodeGlyph );
            if (firstImg) {
                var srcAttr = firstImg.getAttribute(\"src\");
                if (srcAttr.indexOf(xyyz.InjectConst.TreeExpandedPng ) > -1) {
                    xyyz.debug.log('src: ' + srcAttr);
                    toReturn.push(firstImg.id);
                }
            }
        }

        if (id) {
            // xyyz.debug.log('id: ' + id);

            var idx = id.indexOf('Tree_Node_');
            if (idx > -1) {
                // xyyz.debug.log('pushing ' + id);
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
        xyyz.debug.log('iframeAr: ' + iframeAr.length);
        for (var idx = 0; idx < iframeAr.length; idx++) {
            toReturn = iframeAr[idx].contentDocument;

        }
    }
    return toReturn;
}

function PlantTheTrees(targetDoc) {
    xyyz.debug.log('s) LookAtExistingData');
    var foundInStorage = window.localStorage.getItem('nodeData-0');
    if (foundInStorage) {
        xyyz.debug.log('foundInStorage: ' + foundInStorage);
        //note: no IE support. Maybe use split if needed
        var foundAr = foundInStorage.split(',');
        if (foundAr) {
            xyyz.debug.log('foundAr: ' + foundAr.length + ' ' + foundAr);


var targetIframe = GetIframe(targetDoc);

            for (var idx = 0; idx < foundAr.length; idx++) {
                var candidate = foundAr[idx].replace(/\"/gi, '');
                candidate = candidate.replace('[', '').replace(']', '');
                xyyz.debug.log('candidate: ' + candidate);
                var foundOnPage = targetIframe.getElementById(candidate);
                if (foundOnPage) {
                    xyyz.debug.log('foundOnPage');
                    var currentSrc = foundOnPage.getAttribute('src');
                    xyyz.debug.log('currentSrc' + currentSrc);
                    if(currentSrc.indexOf('treemenu_expanded.png') < 0 ){
                        xyyz.debug.log('clicking it');

                        foundOnPage.click();
                    }
                }
            }
        }
    }
}



function SaveTheTrees(targetDoc) {
    xyyz.debug.log('s) SaveTheTrees');

    var iframeAr = GetIframe(targetDoc);
    if (iframeAr) {
        var rootNode = oneIframeDoc.querySelector('#Tree_Node_11111111111111111111111111111111');
        xyyz.debug.log('rootNode: ' + rootNode.innerHTML);
        if (rootNode) {
            var rootParent = rootNode.parentElement;

            var foundNodes = WalkNodeRecursive(rootParent, 100);
            xyyz.debug.log(\"foundNodes: \" + foundNodes.length);
            xyyz.debug.log(\"foundNodes: \" + foundNodes);

            window.localStorage.setItem('nodeData-' + idx, JSON.stringify(foundNodes));


        }

        xyyz.debug.log('e) SaveTheTrees');

    }
}