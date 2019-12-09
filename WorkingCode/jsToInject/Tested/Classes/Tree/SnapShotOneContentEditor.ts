class SnapShotOneContentEditor extends SpokeBase {
  Id: string;
  __allTreeDataAr: OneTreeNode[];
  constructor(id, xyyz: Hub) {
    super(xyyz);
    this.Id = id;
    this.__allTreeDataAr = [];
  }
  GetDebugDataOneCE() {
    this.Xyyz.debug.FuncStart(this.GetDebugDataOneCE.name);
    var toReturn = [];
    toReturn.push('------ All Tree Nodes -----');

    for (var idx = 0; idx < this.__allTreeDataAr.length; idx++) {
      toReturn.push(this.__allTreeDataAr[idx].NodeId + ' ' + this.__allTreeDataAr[idx].NodeFriendly);
    }

    this.Xyyz.debug.FuncEnd(this.GetDebugDataOneCE.name);
    return toReturn;
  }
}