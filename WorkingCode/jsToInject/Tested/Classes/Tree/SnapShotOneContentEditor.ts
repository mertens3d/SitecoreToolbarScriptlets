class SnapShotOneContentEditor extends SpokeBase {
  Id: any;
  __allTreeDataAr: any[];
  constructor(id, zzyx: Hub) {
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