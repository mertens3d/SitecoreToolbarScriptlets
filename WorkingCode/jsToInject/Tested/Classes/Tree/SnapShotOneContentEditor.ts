class SnapShotOneContentEditorManager extends SpokeBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }
  MakeNewData(id: string): IDataOneCE {
    this.Xyyz.debug.FuncStart('MakeNewData: ' + id);
    var toReturn: IDataOneCE = {
      Id: id,
      AllTreeNodeAr: []
    }
    this.Xyyz.debug.FuncEnd('MakeNewData: ' + id);
    return toReturn;
  }
  DebugDataOneNode(dataOneTreeNode: IDataOneTreeNode): string {
    this.Xyyz.debug.FuncStart('DebugDataOneNode');
    var toReturn: string = dataOneTreeNode.NodeId + ' ' + dataOneTreeNode.NodeFriendly;
    this.Xyyz.debug.FuncEnd('DebugDataOneNode');
    return toReturn;
  }
  GetDebugDataOneCE(dataOneCe: IDataOneCE): string[] {
    this.Xyyz.debug.FuncStart('GetDebugDataOneCE');
    var toReturn: string[] = [];
    toReturn.push('------ All Tree Nodes -----');

    for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
      this.Xyyz.debug.Log('idx: ' + idx);
      var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
      this.Xyyz.debug.Log("oneVal : " + oneVal);
      toReturn.push( oneVal);
    }

    this.Xyyz.debug.FuncEnd(this.GetDebugDataOneCE.name);
    return toReturn;
  }
}