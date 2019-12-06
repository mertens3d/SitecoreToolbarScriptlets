class TreeDataManager {
  constructor() {
    this.CreateNewAllTreeData();
    
  }
  PutTreeData(newTreeData) {
    xyyz.debug.FuncStart(this.PutTreeData.name + ' ' + JSON.stringify( newTreeData));




    var dataAsString = JSON.stringify(newTreeData);
    xyyz.debug.Log('dataAsString: ' + dataAsString);

    this.__allTreeData.AllTreeDataAr.push(dataAsString);

    var allTreeAsString = JSON.stringify(this.__allTreeData);

    window.localStorage.setItem(xyyz.InjectConst.Storage.Root, allTreeAsString);

    xyyz.debug.FuncEnd(this.PutTreeData.name);
  }
  CreateNewAllTreeData() {
    this.__allTreeData = {
      TimeStamp: Date.now(),
      AllTreeDataAr: [],
    };
  }
  ShowDebugData() {
    xyyz.debug.FuncStart(this.ShowDebugData.name);
    for (var jdx = 0; jdx < this.__allTreeData.length; jdx++) {
      var oneTreeData = this.__allTreeData[jdx];
      xyyz.debug.Log('Tree: ' + jdx + ' ' + oneTreeData);
    }
    xyyz.debug.FuncEnd(this.ShowDebugData.name);
  }
}