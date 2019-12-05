var xyyz = xyyz || {};

xyyz.debug = {
    log : function(text){
        console.log(text);
        var ta = document.querySelector('#ta-debug');
        if(ta){
            
            ta.value += ('\\n\\r' + text);

        }
    }
}
var xyyz = xyyz || {};


xyyz.WireMenuButtons = function() {
    xyyz.debug.log('s) WireMenuButtons' );
    
    document.querySelector('#btnEdit').onclick = function () { SetScMode('edit'); };
    document.querySelector('#btnPrev').onclick = function () { SetScMode('preview'); };
    document.querySelector('#btnNorm').onclick = function () { SetScMode('normal'); };
    document.querySelector('#btnAdminB').onclick = function () { AdminB(window.opener.document); };
    document.querySelector('#btnDesktop').onclick = function () { Desktop(window.opener); };
    document.querySelector('#btnSaveTheTrees').onclick = function () { xyyz.ManyTrees.SaveAllTrees(window.opener.document); };
    document.querySelector('#btnPlantTheTrees').onclick = function () { xyyz.ManyTrees.PlantTheTrees(window.opener.document, 0); };
    xyyz.debug.log('e) WireMenuButtons ');
}
var xyyz = xyyz || {};

xyyz.InjectConst = {
    ClassNames :{
        ContentTreeNode:'scContentTreeNode',
    },
    Selector :{
        ContentTreeNodeGlyph : '.scContentTreeNodeGlyph',
        RootNodeId : '#Tree_Node_11111111111111111111111111111111'
    },
    Storage :{
        Root: 'xyyz'
    },
    TreeExpandedPng : 'treemenu_expanded.png',
    MaxIter : 100,
    prop :{
        AllTreeData : 'AllTreeData',
    }

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


var xyyz = xyyz || {};


xyyz.OneCEIframe = function () {
    this.Index = -1;
    this.TreeData = {}
};

xyyz.TreeData = function () {
    this.DateStamp = Date.now();
    this.AllCEIframes = [];
};

xyyz.StorageMan = {
    GetTreeData: function (treeIdx) {
        xyyz.debug.log('s) GetTreeData');
        var toReturn = null;
        var foundInStorageJson = window.localStorage.getItem(xyyz.InjectConst.Storage.root);
        if (foundInStorageJson) {
            var foundInStorage = JSON.parse(foundInStorageJson);
            
            var allTreeDataAr = foundInStorage[xyyz.InjectConst.prop.AllTreeData];
            if (allTreeDataAr.length <= treeIdx) {
                toReturn = allTreeDataAr[treeIdx];
            }
            
        }
        xyyz.debug.log('e) GetTreeData');
        return treeIdx;
    }
};

xyyz.OneLivingTreeData = function (index, docElem) {
    xyyz.debug.log('s) OneLivingTreeData: ' + index);
    this.Index = index;
    this.DocElem = docElem;
    xyyz.debug.log('e) OneLivingTreeData');
};
var xyyz = xyyz || {};

xyyz.ManyTrees = {
    GetAllLiveTreeData: function (targetDoc) {
        xyyz.debug.log('s) GetAllLiveTreeData');
        var toReturn = [];
        var iframeAr = targetDoc.querySelectorAll('iframe[src*=content]');
        if (iframeAr) {
            xyyz.debug.log('iframeAr: ' + iframeAr.length);
            for (var jdx = 0; jdx < iframeAr.length; jdx++) {
                // if (idx <= iframeAr.length) {
                xyyz.debug.log('pushing: ' + jdx);
                toReturn.push(new xyyz.OneLivingTreeData(jdx, iframeAr[jdx].contentDocument));
                // } else {
                // xyyz.debug.log('ERROR - invalid iframe index: ' + idx);
                // }
            }
        }
        xyyz.debug.log('e) GetAllLiveTreeData');
        return toReturn;
    },

    PlantTheTrees: function (targetDoc, treeIdx) {
        xyyz.debug.log('s) LookAtExistingData: ' + treeIdx);
        var foundInStorage = xyyz.StorageMan.GetTreeData(treeIdx);

        if (foundInStorage) {
            xyyz.debug.log('foundInStorage: ' + foundInStorage);
            //note: no IE support. Maybe use split if needed
            var foundAr = foundInStorage.split(',');
            if (foundAr) {
                xyyz.debug.log('foundAr: ' + foundAr.length + ' ' + foundAr);


                var targetIframe = this.GetAllLiveTreeData(targetDoc)[treeIdx];

                for (var idx = 0; idx < foundAr.length; idx++) {
                    var candidate = foundAr[idx].replace(/\"/gi, '');
                    candidate = candidate.replace('[', '').replace(']', '');
                    xyyz.debug.log('candidate: ' + candidate);
                    var foundOnPage = targetIframe.getElementById(candidate);
                    if (foundOnPage) {
                        xyyz.debug.log('foundOnPage');
                        var currentSrc = foundOnPage.getAttribute('src');
                        xyyz.debug.log('currentSrc' + currentSrc);
                        if (currentSrc.indexOf('treemenu_expanded.png') < 0) {
                            xyyz.debug.log('clicking it');

                            foundOnPage.click();
                        }
                    }
                }
            }
        }
    },

    SaveAllTrees: function (targetDoc) {
        xyyz.debug.log('s) ' + this.SaveAllTrees.name);

        var allTreeData = [];

        var iframeAr = this.GetAllLiveTreeData(targetDoc);
        if (iframeAr && iframeAr.length > 0) {

            for (var iframeIdx = 0; iframeIdx < iframeAr.length; iframeIdx++) {
                var targetCe = iframeAr[iframeIdx];
                var oneCeData = xyyz.oneCeData.GetOneLiveCeData(iframeIdx, targetCe.contentDocument);
                allTreeData.push(oneCeData);
            }
            xyyz.debug.log('e) ' + this.SaveAllTrees.name);
        }

        for (var jdx = 0; jdx < allTreeData.length; jdx++) {
            xyyz.debug('Tree: ' + jdx + ' ' + allTreeData[jdx]);
        }
    }
};
var xyyz = xyyz || {};

xyyz.OneTree = {
    WalkNodeRecursive: function (targetNode, depth) {
        // xyyz.debug.log('WalkNodeRecursive ' + depth);
        var toReturn = [];
        depth = depth - 1;

        if (targetNode) {
            var id = targetNode.id;
            var className = targetNode.className;
            // xyyz.debug.log('class: ' + className);
            if (className === xyyz.InjectConst.ClassName.ContentTreeNode) {
                var firstImg = targetNode.querySelector(xyyz.InjectConst.Selector.ContentTreeNodeGlyph);
                if (firstImg) {
                    var srcAttr = firstImg.getAttribute('src');
                    if (srcAttr.indexOf(xyyz.InjectConst.TreeExpandedPng) > -1) {
                        xyyz.debug.log('src: ' + srcAttr);
                        toReturn.push(firstImg.id);
                    }
                }
            }

            var childNodes = targetNode.children;
            if (childNodes && childNodes.length > 0 && depth > 0) {
                for (var jdx = 0; jdx < childNodes.length; jdx++) {
                    var oneChild = childNodes[jdx];
                    toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
                }
            }
        }
        return toReturn;
    },
    GetOneLiveTreeData: function (idx, targetDoc){
        xyyz.debug.log('s) SaveOneCeData idx: ' + idx);
        
        var toReturn = new xyyz.Storage.LivingCE(idx, targetDoc);
        
        var rootNode = targetDoc.querySelector(xyyz.InjectConst.Selector.RootNodeId );
        xyyz.debug.log('rootNode: '  + rootNode.innerHTML);
        if (rootNode) {
            var rootParent = rootNode.parentElement;
            
            var foundNodes = this.WalkNodeRecursive(rootParent, xyyz.InjectConst.MaxIter);
            xyyz.debug.log('foundNodes: ' + foundNodes.length);
            xyyz.debug.log('foundNodes: ' + foundNodes);
            
            window.localStorage.setItem(xyyz.Storage.root + idx, JSON.stringify(foundNodes));
            
            
        }
        xyyz.debug.log('e) SaveOneCeData');

    },

}
xyyz.WireMenuButtons();