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