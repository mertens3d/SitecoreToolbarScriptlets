class SnapShotOneContentEditor {
  constructor(id) {
    this.Id = id;
    this.__allTreeDataAr = [];
  }
  GetDebugDataOneCE() {
    xyyz.debug.FuncStart(this.GetDebugDataOneCE.name);

    var toReturn = [];

    toReturn.push('------ All Tree Nodes -----');

    for (var idx = 0; idx < this.__allTreeDataAr.length; idx++) {
      toReturn.push(this.__allTreeDataAr[idx].NodeId + ' ' + this.__allTreeDataAr[idx].NodeFriendly);
    }

    xyyz.debug.FuncEnd(this.GetDebugDataOneCE.name);
    return toReturn;
  }
}