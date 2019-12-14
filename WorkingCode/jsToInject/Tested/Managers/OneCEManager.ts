﻿class OneCEManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }

  WaitForNode(needleId: IGuid, targetDoc: IDataOneDoc, currentIteration: number, timeout: number, callbackOnComplete: Function) {
    this.debug().FuncStart(this.WaitForNode.name, 'looking for guid: iter: ' + currentIteration + ' ' + needleId.asString + ' on ' + this.GuidMan().ShortGuid(targetDoc.XyyzId));
    currentIteration--;

    var foundOnPage: HTMLElement = targetDoc.Document.getElementById(needleId.asString);

    if (foundOnPage) {
      this.debug().Log('foundOnPage. Triggering callback on complete');

      this.__expandNode(foundOnPage);

      callbackOnComplete(foundOnPage);
    } else {
      if (currentIteration > 0) {
        this.debug().Log('not found on page...setting timeout: ' + timeout);
        var self = this;
        setTimeout(function () {
          currentIteration = currentIteration - 1;
          self.WaitForNode(needleId, targetDoc, currentIteration, timeout, callbackOnComplete)
        }, timeout)
      } else {
        this.debug().Log('Not Found. Triggering callback on complete');
        callbackOnComplete(null);
      }
    }
    this.debug().FuncEnd(this.WaitForNode.name);
  }

  private __expandNode(foundOnPage: HTMLElement): void {
    this.debug().FuncStart(this.__expandNode.name);
    var currentSrc = foundOnPage.getAttribute('src');
    this.debug().Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(this.Const().Names.TreeMenuExpandedPng) < 0) {
      this.debug().Log('clicking it');
      foundOnPage.click();
    }
    this.debug().FuncEnd(this.__expandNode.name);
  }

  private __collapseNode(element: HTMLElement): void {
    var currentSrc = element.getAttribute('src');
    this.debug().Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(this.Const().Names.TreeMenuExpandedPng) > -1) {
      this.debug().Log('clicking it');
      element.click();
    }
  }

  private __collapseRootNode(targetCEDoc: IDataOneDoc) {
    var rootElem: HTMLElement = targetCEDoc.Document.getElementById(this.Const().ElemId.sc.SitecoreRootGlyphId);
    if (rootElem) {
      this.__collapseNode(rootElem);
    } else {
      this.debug().Error(this.__collapseRootNode.name, 'Root glyph not found ' + this.Const().ElemId.sc.SitecoreRootGlyphId);
    }
  }

  async RestoreOneNodeAtATimeRecursive(storageData: IDataOneStorageCE, dataOneDocTarget: IDataOneDoc, iterHelper: IterationHelper = null) {
    this.debug().FuncStart(this.RestoreOneNodeAtATimeRecursive.name, dataOneDocTarget.XyyzId.asShort);

    if (!iterHelper) {
      iterHelper = new IterationHelper(this.Xyyz, 500, 4, this.RestoreOneNodeAtATimeRecursive.name);
    }

    while (storageData.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing()) {
      var nextNode = storageData.AllTreeNodeAr.shift();
      this.debug().Log('looking for: ' + nextNode.NodeId.asString + ' ' + nextNode.NodeFriendly + ' in ' + dataOneDocTarget.XyyzId.asShort);
      this.debug().Log('document not null ' + (dataOneDocTarget.Document != null));

      //var lookingFor: IGuid = nextNode.NodeId;
      //var self = this;

      //var callbackOnNodeSearchComplete: Function = function () {
      //  self.RestoreOneNodeAtATimeRecursive(storageData, dataOneDocTarget, iterHelper, callBackOnNoNodesLeft);
      //}

      var iterHelperTiny = new IterationHelper(this.Xyyz, 2, 1000, 'small');

      var foundOnPage: HTMLElement = null;

      while (!foundOnPage && iterHelperTiny.DecrementAndKeepGoing()) {
        this.debug().Log('looking for: *' + nextNode.NodeId.asString + '* ' + nextNode.NodeFriendly + ' in *' + dataOneDocTarget.XyyzId.asShort + '*');

        foundOnPage = dataOneDocTarget.Document.getElementById(nextNode.NodeId.asString);

        if (foundOnPage) {
          this.debug().Log('Found it: ');
          this.__expandNode(foundOnPage);
        } else {
          this.debug().Log('not Found...waiting: ');
          //dataOneDocTarget.Document.body.innerHTML = '<div>dog1111111111111111111</div>';
          await iterHelperTiny.WaitAndThenB();
        }
      }

      //this.WaitForNode(lookingFor,
      //  dataOneDocTarget,
      //  this.Const().Iterations.MaxIterationLookingForNode,
      //  this.Const().Timeouts.TimeoutWaitForNodeToLoad,
      //  callbackOnNodeSearchComplete);
    }

    //callBackOnNoNodesLeft();

    this.debug().FuncEnd(this.RestoreOneNodeAtATimeRecursive.name);
  }

  RestoreCEState(dataToRestore: IDataOneStorageCE, dataOneDocTarget: IDataOneDoc): Boolean {
    this.debug().FuncStart(this.RestoreCEState.name, dataOneDocTarget.XyyzId.asShort);

    var toReturn: boolean = false;

    this.debug().Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);
    //this.__collapseRootNode(dataOneDocTarget);

    const maxIteration: number = this.Const().Iterations.MaxIterationLookingForNode
    const timeout: number = this.Const().Timeouts.TimeoutWaitForNodeToLoad

    this.RestoreOneNodeAtATimeRecursive(dataToRestore, dataOneDocTarget);

    //for (var idx = 0; idx < storageData.AllTreeNodeAr.length; idx++) {
    //  var lookingFor: IGuid = storageData.AllTreeNodeAr[idx].NodeId;

    //  this.WaitForNode(lookingFor, dataOneDocTarget, maxIteration, timeout);
    //}
    this.debug().FuncEnd(this.RestoreCEState.name);
    return toReturn;
  }
  SaveStateOneContentEditor(id: IGuid, dataOneDoc: IDataOneDoc) {
    this.debug().FuncStart('SaveOneContentEditor');
    this.debug().Log('SaveOneContentEditor');;
    this.debug().Log('docElem is null: ' + (dataOneDoc === null));;

    var CeSnapShot: IDataOneStorageCE = this.Xyyz.OneCEMan.MakeNewData(id);
    CeSnapShot.AllTreeNodeAr = this.Xyyz.OneTreeMan.GetOneLiveTreeData(CeSnapShot, dataOneDoc);

    this.AtticMan().DrawDebugDataPretty(null);
    this.Xyyz.OneWindowMan.PutCEDataToCurrentSnapShot(CeSnapShot);

    this.debug().FuncEnd('SaveOneContentEditor');
  }
  MakeNewData(id: IGuid): IDataOneStorageCE {
    this.debug().FuncStart('MakeNewData: ' + id);
    var toReturn: IDataOneStorageCE = {
      Id: id,
      AllTreeNodeAr: []
    }
    this.debug().FuncEnd('MakeNewData: ' + id);
    return toReturn;
  }
  DebugDataOneNode(dataOneTreeNode: IDataOneTreeNode): string {
    this.debug().FuncStart(this.DebugDataOneNode.name);
    var toReturn: string = dataOneTreeNode.NodeId.asString + ' ' + dataOneTreeNode.NodeFriendly;
    this.debug().FuncEnd(this.DebugDataOneNode.name);
    return toReturn;
  }
  GetDebugDataOneCE(dataOneCe: IDataOneStorageCE): string[] {
    this.debug().FuncStart('GetDebugDataOneCE');
    var toReturn: string[] = [];
    toReturn.push('------ All Tree Nodes -----');

    for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
      this.debug().Log('idx: ' + idx);
      var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
      this.debug().Log("oneVal : " + oneVal);
      toReturn.push(oneVal);
    }

    this.debug().FuncEnd(this.GetDebugDataOneCE.name);
    return toReturn;
  }
}