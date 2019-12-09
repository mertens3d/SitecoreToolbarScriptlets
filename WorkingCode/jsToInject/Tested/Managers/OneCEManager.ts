class OneCEManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }

  WaitForNode(lookingFor: IGuid, targetDoc: Document, currentIteration: number, timeout: number) {
    this.Xyyz.debug.Log('looking for guid: ' + lookingFor.Value);
    var foundOnPage: HTMLElement = targetDoc.getElementById(lookingFor.Value);
    if (foundOnPage) {
      this.Xyyz.debug.Log('foundOnPage');

      this.__expandNode(foundOnPage);
    } else {
      if (currentIteration > 0) {
        this.Xyyz.debug.Log('not found on page...setting timeout: ' + timeout);
        var self = this;
        setTimeout(function () {
          self.WaitForNode(lookingFor, targetDoc, currentIteration--, timeout)
        }, timeout)
      }
    }
  }

  __expandNode(foundOnPage: HTMLElement): void {
    var currentSrc = foundOnPage.getAttribute('src');
    this.Xyyz.debug.Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(this.Xyyz.Const.Names.TreeMenuExpandedPng) < 0) {
      this.Xyyz.debug.Log('clicking it');
      foundOnPage.click();
    }
  }

  __collapseNode(element: HTMLElement): void {
    var currentSrc = element.getAttribute('src');
    this.Xyyz.debug.Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(this.Xyyz.Const.Names.TreeMenuExpandedPng) > -1) {
      this.Xyyz.debug.Log('clicking it');
      element.click();
    }
  }


  __collapseRootNode(targetDoc: Document) {
    var rootElem: HTMLElement = targetDoc.getElementById(this.Xyyz.Const.ElemId.SitecoreRootGlyphId);
    if (rootElem) {
      this.__collapseNode(rootElem);
    } else {

      this.Xyyz.debug.Error(this.__collapseRootNode.name, 'Root glyph not found ' + this.Xyyz.Const.ElemId.SitecoreRootGlyphId);
    }
  }

  RestoreCEState(storageData: IDataOneCE, targetDoc: Document): boolean {
    this.Xyyz.debug.FuncStartFunc(this.RestoreCEState);

    var toReturn: boolean = false;

    this.Xyyz.debug.Log('Node Count: ' + storageData.AllTreeNodeAr.length);
    this.__collapseRootNode(targetDoc);

    for (var idx = 0; idx < storageData.AllTreeNodeAr.length; idx++) {
      var lookingFor: IGuid = storageData.AllTreeNodeAr[idx].NodeId;//.replace(/\u0022/gi, '');

      //candidate = candidate.replace('[', '').replace(']', '');

      this.WaitForNode(lookingFor, targetDoc, 100, this.Xyyz.Const.TimeoutWaitForNodeToLoad);
    }
    this.Xyyz.debug.FuncEndName(this.RestoreCEState.name);
    return toReturn;
  }
  SaveStateOneContentEditor(id: IGuid, docElem: Document) {
    this.Xyyz.debug.FuncStartName('SaveOneContentEditor');
    this.Xyyz.debug.Log('SaveOneContentEditor');;
    this.Xyyz.debug.Log('docElem is null: ' + (docElem === null));;

    this.Xyyz.debug.Log('docElem is null: ' + (docElem === null));;
    var CeSnapShot: IDataOneCE = this.Xyyz.OneCEMan.MakeNewData(id);
    CeSnapShot.AllTreeNodeAr = this.Xyyz.OneTreeMan.GetOneLiveTreeData(CeSnapShot, docElem);

    this.Xyyz.OneWindowMan.DrawDebugDataPretty(null);
    this.Xyyz.OneWindowMan.PutCEDataToCurrentSnapShot(CeSnapShot);

    this.Xyyz.debug.FuncEndName('SaveOneContentEditor');
  }
  MakeNewData(id: IGuid): IDataOneCE {
    this.Xyyz.debug.FuncStartName('MakeNewData: ' + id);
    var toReturn: IDataOneCE = {
      Id: id,
      AllTreeNodeAr: []
    }
    this.Xyyz.debug.FuncEndName('MakeNewData: ' + id);
    return toReturn;
  }
  DebugDataOneNode(dataOneTreeNode: IDataOneTreeNode): string {
    this.Xyyz.debug.FuncStartName('DebugDataOneNode');
    var toReturn: string = dataOneTreeNode.NodeId + ' ' + dataOneTreeNode.NodeFriendly;
    this.Xyyz.debug.FuncEndName('DebugDataOneNode');
    return toReturn;
  }
  GetDebugDataOneCE(dataOneCe: IDataOneCE): string[] {
    this.Xyyz.debug.FuncStartName('GetDebugDataOneCE');
    var toReturn: string[] = [];
    toReturn.push('------ All Tree Nodes -----');

    for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
      this.Xyyz.debug.Log('idx: ' + idx);
      var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
      this.Xyyz.debug.Log("oneVal : " + oneVal);
      toReturn.push(oneVal);
    }

    this.Xyyz.debug.FuncEndName(this.GetDebugDataOneCE.name);
    return toReturn;
  }
}