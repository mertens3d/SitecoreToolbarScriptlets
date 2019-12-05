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
            var fromStorageAr = foundInStorage.split(',');
            if (fromStorageAr) {
                xyyz.debug.log('foundAr: ' + fromStorageAr.length + ' ' + fromStorageAr);

                var allData = this.GetAllLiveTreeData(targetDoc)[treeIdx];

               // var targetIframe 

                for (var idx = 0; idx < fromStorageAr.length; idx++) {
                    var candidate = fromStorageAr[idx].replace(/"/gi, '');
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
                xyyz.debug.log('iframeIdx: ' + iframeIdx);
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