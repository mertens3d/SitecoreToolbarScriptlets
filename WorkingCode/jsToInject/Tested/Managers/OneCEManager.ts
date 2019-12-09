class OneCEManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }
  PlantTreesOneCE(storageData: IDataOneCE, targetDoc: Document): boolean {
    this.Xyyz.debug.FuncStart('PlantTreesOneCE');

    var toReturn: boolean = false;

    for (var idx = 0; idx < storageData.AllTreeNodeAr.length; idx++) {
      var candidate = storageData.AllTreeNodeAr[idx].NodeId;//.replace(/\u0022/gi, '');
      //candidate = candidate.replace('[', '').replace(']', '');
      this.Xyyz.debug.Log('candidate: ' + candidate);

      var foundOnPage = targetDoc.getElementById(candidate);
      if (foundOnPage) {
        this.Xyyz.debug.Log('foundOnPage');
        var currentSrc = foundOnPage.getAttribute('src');
        this.Xyyz.debug.Log('currentSrc' + currentSrc);
        if (currentSrc.indexOf('treemenu_expanded.png') < 0) {
          this.Xyyz.debug.Log('clicking it');
          foundOnPage.click();
        }
      }
    }
    this.Xyyz.debug.FuncEnd('PlantTreesOneCE');
    return toReturn;
  }
  SaveStateOneContentEditor(id: IGuid, docElem: Document) {
    this.Xyyz.debug.FuncStart('SaveOneContentEditor');
    this.Xyyz.debug.Log('SaveOneContentEditor');;
    this.Xyyz.debug.Log('docElem is null: ' + (docElem === null));;

    
    this.Xyyz.debug.Log('docElem is null: ' + (docElem === null));;
    var CeSnapShot: IDataOneCE = this.Xyyz.OneCEMan.MakeNewData(id);
    CeSnapShot.AllTreeNodeAr = this.Xyyz.OneTreeMan.GetOneLiveTreeData(CeSnapShot, docElem);

    this.Xyyz.OneWindowMan.DrawDebugDataPretty(null);
    this.Xyyz.OneWindowMan.PutCEDataToCurrentSnapShot(CeSnapShot);

    this.Xyyz.debug.FuncEnd('SaveOneContentEditor');
  }
  MakeNewData(id: IGuid): IDataOneCE {
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