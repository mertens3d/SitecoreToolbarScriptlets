var xyyz = xyyz || {};


class TreeDataManager {
  constructor() {
    this.AllTreeData = [];
  }
  PutTreeData(newTreeData) {
    xyyz.debug.FuncStart(this.PutTreeData.name + ' ' + newTreeData);
    this.AllTreeData.push(newTreeData);

    var dataAsString = JSON.stringify(this.AllTreeData);

    xyyz.debug.Log('dataAsString: ' + dataAsString);
    window.localStorage.setItem(xyyz.InjectConst.Storage.Root, dataAsString);
    xyyz.debug.FuncEnd(this.PutTreeData.name);
  }
  CreateNewAllTreeData() {
    this.AllTreeData = [];
  }
  ShowDebugData() {
    xyyz.debug.FuncStart(this.ShowDebugData.name);
    for (var jdx = 0; jdx < this.AllTreeData.length; jdx++) {
      var oneTreeData = this.AllTreeData[jdx];
      xyyz.debug.Log('Tree: ' + jdx + ' ' + oneTreeData );
    }
    xyyz.debug.FuncEnd(this.ShowDebugData.name);
  }
}

xyyz.TreeDataMan = new TreeDataManager();