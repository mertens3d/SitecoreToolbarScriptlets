var xyyz = xyyz || {};

xyyz.OneCEIframe = function () {
  this.Index = -1;
  this.TreeData = {};
};

xyyz.TreeData = function () {
  this.DateStamp = Date.now();
  this.AllCEIframes = [];
};

xyyz.StorageMan = {
  DrawStorage: function () {
    try {
      var fromStorage = window.localStorage.getItem(xyyz.InjectConst.Storage.WindowRoot);

      var asAr = fromStorage.split('},{');
      for (var idx = 0; idx < asAr.length; idx++) {

        xyyz.debug.Log(asAr[idx]);
      }

      //var converted = JSON.parse(fromStorage);
      
      //xyyz.debug.Log(JSON.stringify(converted, null, 4));

    } catch (e) {
      xyyz.debug.Error(e.message);
    }
  },

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