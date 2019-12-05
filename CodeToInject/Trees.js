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
                var srcAttr = firstImg.getAttribute("src");
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
                var candidate = foundAr[idx].replace(/"/gi, '');
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
            xyyz.debug.log("foundNodes: " + foundNodes.length);
            xyyz.debug.log("foundNodes: " + foundNodes);

            window.localStorage.setItem('nodeData-' + idx, JSON.stringify(foundNodes));


        }

        xyyz.debug.log('e) SaveTheTrees');

    }
}