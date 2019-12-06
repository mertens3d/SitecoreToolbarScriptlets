var xyyz = xyyz || {};

class TreeDataManager {
  constructor() {
    this.AllTreeData = [];
  }
  PutTreeData(newTreeData) {
    this.AllTreeData.push(newTreeData);

    window.localStorage.setItem(xyyz.InjectConst.Storage.Root + idx, nodesAsString);
  }
  CreateNewAllTreeData() {
    this.AllTreeData = [];
  }
  ShowDebugData() {
    xyyz.debug.FuncStart(this.ShowDebugData.name);
    for (var jdx = 0; jdx < this.AllTreeData.length; jdx++) {
      xyyz.debug.Log('Tree: ' + jdx + ' ' + allTreeData[jdx]);
    }
    xyyz.debug.FuncEnd(this.ShowDebugData.name);
  }
}

xyyz.TreeDataMan = new TreeDataManager();