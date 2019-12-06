var xyyz = xyyz || {};

xyyz.ManyTrees = {
    GetAllLiveIframeData: function (targetDoc) {
        xyyz.debug.FuncStart(this.GetAllLiveIframeData.name);
        var toReturn = [];
        var iframeAr = targetDoc.querySelectorAll('iframe[src*=content]');
        if (iframeAr) {
            xyyz.debug.Log('iframeAr: ' + iframeAr.length);
            for (var jdx = 0; jdx < iframeAr.length; jdx++) {
                xyyz.debug.Log('pushing: ' + jdx);
                toReturn.push(new xyyz.ClassOneLivingIframe(jdx, iframeAr[jdx].contentDocument));
            }
        }
        xyyz.debug.FuncEnd(this.GetAllLiveIframeData.name + ' ' + toReturn.length);
        return toReturn;
    },

    PlantTheTrees: function (targetDoc, treeIdx) {
        xyyz.debug.Log('s) LookAtExistingData: ' + treeIdx);
        var foundInStorage = xyyz.StorageMan.GetTreeData(treeIdx);

        if (foundInStorage) {
            xyyz.debug.Log('foundInStorage: ' + foundInStorage);
            var fromStorageAr = foundInStorage.split(',');
            if (fromStorageAr) {
                xyyz.debug.Log('foundAr: ' + fromStorageAr.length + ' ' + fromStorageAr);

                var allData = this.GetAllLiveIframeData(targetDoc)[treeIdx];


                for (var idx = 0; idx < fromStorageAr.length; idx++) {
                    var candidate = fromStorageAr[idx].replace(/\u0022/gi, '');
                    candidate = candidate.replace('[', '').replace(']', '');
                    xyyz.debug.Log('candidate: ' + candidate);
                    var foundOnPage = targetIframe.getElementById(candidate);
                    if (foundOnPage) {
                        xyyz.debug.Log('foundOnPage');
                        var currentSrc = foundOnPage.getAttribute('src');
                        xyyz.debug.Log('currentSrc' + currentSrc);
                        if (currentSrc.indexOf('treemenu_expanded.png') < 0) {
                            xyyz.debug.Log('clicking it');

                            foundOnPage.click();
                        }
                    }
                }
            }
        }
    },

    SaveAllTrees: function (targetDoc) {
        xyyz.debug.FuncStart(this.SaveAllTrees.name);

        xyyz.TreeDataMan.CreateNewAllTreeData();


        var livingIframeAr = this.GetAllLiveIframeData(targetDoc);
        if (livingIframeAr && livingIframeAr.length > 0) {

            for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
                xyyz.debug.Log('iframeIdx: ' + iframeIdx);

                var targetIframe = livingIframeAr[iframeIdx];
                xyyz.debug.Log('targetIframe: ' + JSON.stringify(targetIframe));
                var oneCeData = xyyz.OneTree.GetOneLiveTreeData(iframeIdx, targetIframe.DocElem);
                xyyz.TreeDataMan.PutTreeData(oneCeData);
            }
        }
        xyyz.debug.Log('done gathering tree data');

        xyyz.TreeDataMan.ShowDebugData();

        xyyz.debug.FuncEnd(this.SaveAllTrees.name);
    }
};