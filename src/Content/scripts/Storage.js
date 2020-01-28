var xyyz = xyyz || {};

xyyz.OneCEIframe = function () {
  this.Index = -1;
  this.TreeData = {};
};

xyyz.TreeData = function () {
  this.DateStamp = Date.now();
  this.AllCEIframes = [];
};
console.log('StorageMan loaded');

xyyz.StorageMan = {
  GetTreeData: function (treeIdx) {
    xyyz.debug.Log('s) GetTreeData');
    var toReturn = null;
    var foundInStorageJson = window.localStorage.getItem(xyyz.InjectConst.Storage.WindowRoot);
    if (foundInStorageJson) {
      var foundInStorage = JSON.parse(foundInStorageJson);

      var allTreeDataAr = foundInStorage[xyyz.InjectConst.prop.AllTreeData];
      if (allTreeDataAr.length <= treeIdx) {
        toReturn = allTreeDataAr[treeIdx];
      }
    }
    xyyz.debug.Log('e) GetTreeData');
    return treeIdx;
  }
};