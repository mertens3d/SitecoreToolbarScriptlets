import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { OneTreeManager } from './OneTreeManager';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { IAllConentAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllConentAgents';

export class OneCEManager extends ContentManagerBase {
  OneTreeMan: OneTreeManager;
  AssociatedDoc: IDataOneDoc;
    

  constructor(hub: ContentHub, associatedDoc: IDataOneDoc, allContentAgents: IAllConentAgents) {
    super(hub, allContentAgents);
    this.AssociatedDoc = associatedDoc;
    this.OneTreeMan = new OneTreeManager(hub, this.AssociatedDoc, allContentAgents);
  }

  //WaitForNode(needleId: IGuid, targetDoc: IDataOneDoc, currentIteration: number, timeout: number, callbackOnComplete: Function) {
  //  this.debug().FuncStart(this.WaitForNode.name, 'looking for guid: iter: ' + currentIteration + ' ' + needleId.AsString + ' on ' + targetDoc.DocId.AsShort);
  //  currentIteration--;

  //  var foundOnPage: HTMLElement = targetDoc.Document.getElementById(needleId.AsString);

  //  if (foundOnPage) {
  //    this.debug().Log('foundOnPage. Triggering callback on complete');

  //    this.__expandNode(foundOnPage);

  //    callbackOnComplete(foundOnPage);
  //  } else {
  //    if (currentIteration > 0) {
  //      this.debug().Log('not found on page...setting timeout: ' + timeout);
  //      var self = this;
  //      setTimeout(function () {
  //        currentIteration = currentIteration - 1;
  //        self.WaitForNode(needleId, targetDoc, currentIteration, timeout, callbackOnComplete)
  //      }, timeout)
  //    } else {
  //      this.debug().Log('Not Found. Triggering callback on complete');
  //      callbackOnComplete(null);
  //    }
  //  }
  //  this.debug().FuncEnd(this.WaitForNode.name);
  //}

  private __activateNode(hotTreeNode: HTMLElement): void {
    this.ContentAgents.Logger.FuncStart(this.__activateNode.name);
    //var currentSrc = hotTreeNode.getAttribute('src');
    //this.debug().Log('currentSrc' + currentSrc);

    //if (currentSrc.indexOf(InjectConst.ContConst.Names.TreeMenuExpandedPng) < 0) {
    this.ContentAgents.Logger.Log('clicking it');
    hotTreeNode.click();
    //}
    this.ContentAgents.Logger.FuncEnd(this.__activateNode.name);
  }
  private __expandNode(foundOnPage: HTMLElement): void {
    this.ContentAgents.Logger.FuncStart(this.__expandNode.name);
    var currentSrc = foundOnPage.getAttribute('src');
    this.ContentAgents.Logger.Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) < 0) {
      this.ContentAgents.Logger.Log('clicking it');
      foundOnPage.click();
    }
    this.ContentAgents.Logger.FuncEnd(this.__expandNode.name);
  }

  private __collapseNode(element: HTMLElement): void {
    var currentSrc = element.getAttribute('src');
    this.ContentAgents.Logger.Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) > -1) {
      this.ContentAgents.Logger.Log('clicking it');
      element.click();
    }
  }

  private __collapseRootNode(targetCEDoc: IDataOneDoc) {
    var rootElem: HTMLElement = targetCEDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.SitecoreRootGlyphId);
    if (rootElem) {
      this.__collapseNode(rootElem);
    } else {
      this.ContentAgents.Logger.Error(this.__collapseRootNode.name, 'Root glyph not found ' + ContentConst.Const.ElemId.sc.SitecoreRootGlyphId);
    }
  }

  async WaitForAndRestoreOneNode(nextNode: IDataOneTreeNode, dataOneDocTarget: IDataOneDoc) {
    this.ContentAgents.Logger.FuncStart(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.DocId.AsShort);

    var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + nextNode.NodeId.AsString;

    this.ContentAgents.Logger.Log('looking for: ' + treeGlyphTargetId + ' ' + nextNode.NodeFriendly + ' in ' + dataOneDocTarget.DocId.AsShort);
    this.ContentAgents.Logger.Log('document not null ' + (dataOneDocTarget.ContentDoc != null));

    var iterHelper = new IterationHelper(this.Helpers(), this.WaitForAndRestoreOneNode.name, this.ContentAgents.HelperAgents);

    var foundOnPageTreeGlyph: HTMLElement = null;

    while (!foundOnPageTreeGlyph && iterHelper.DecrementAndKeepGoing()) {
      this.ContentAgents.Logger.Log('looking for: *' + treeGlyphTargetId + '* ' + nextNode.NodeFriendly + ' in *' + dataOneDocTarget.DocId.AsShort + '*');

      foundOnPageTreeGlyph = dataOneDocTarget.ContentDoc.getElementById(treeGlyphTargetId);

      if (foundOnPageTreeGlyph) {
        //this.debug().Log('Found it: ');
        if (nextNode.IsExpanded) {
          this.__expandNode(foundOnPageTreeGlyph);
        }
        if (nextNode.IsActive) {
          var hotTreeNodeId = ContentConst.Const.Names.SC.TreeNodePrefix + nextNode.NodeId.AsString;
          var hotTreeNode = dataOneDocTarget.ContentDoc.getElementById(hotTreeNodeId);
          if (hotTreeNode) {
            this.__activateNode(hotTreeNode);
          }
        }
      } else {
        this.ContentAgents.Logger.Log('not Found...waiting: ');
        await iterHelper.Wait();
      }
    }

    this.ContentAgents.Logger.FuncEnd(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.DocId.AsShort);
  }

  async WaitForAndRestoreManyAllNodes(storageData: IDataOneStorageCE, dataOneDocTarget: IDataOneDoc) {
    this.ContentAgents.Logger.FuncStart(this.WaitForAndRestoreManyAllNodes.name, dataOneDocTarget.DocId.AsShort);

    let iterHelper: IterationHelper = new IterationHelper(this.Helpers(), this.WaitForAndRestoreManyAllNodes.name, this.ContentAgents.HelperAgents);

    while (storageData.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing()) {
      var nextNode: IDataOneTreeNode = storageData.AllTreeNodeAr.shift();

      await this.WaitForAndRestoreOneNode(nextNode, dataOneDocTarget);
    }

    this.ContentAgents.Logger.FuncEnd(this.WaitForAndRestoreManyAllNodes.name);
  }

  async RestoreCEStateAsync(dataToRestore: IDataOneStorageCE, dataOneDocTarget: IDataOneDoc): Promise<Boolean> {
    this.ContentAgents.Logger.FuncStart(this.RestoreCEStateAsync.name, dataOneDocTarget.DocId.AsShort);

    var toReturn: boolean = false;

    this.ContentAgents.Logger.Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);

    await this.WaitForAndRestoreManyAllNodes(dataToRestore, dataOneDocTarget);

    this.ContentAgents.Logger.FuncEnd(this.RestoreCEStateAsync.name);
    return toReturn;
  }

  GetActiveNode(allTreeNodeAr: IDataOneTreeNode[]) {
    let toReturn: IDataOneTreeNode = null;
    if (allTreeNodeAr) {
      for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
        let candidate: IDataOneTreeNode = allTreeNodeAr[idx];
        if (candidate.IsActive) {
          toReturn = candidate;
          break;
        }
      }
    } else {
      this.ContentAgents.Logger.Error(this.GetActiveNode.name, 'No tree data provided');
    }

    return toReturn;
  }

  GetStateCe(id: IGuid) {
    return new Promise((resolve, reject) => {
      this.ContentAgents.Logger.FuncStart(this.GetStateCe.name);
      let result: PromiseResult = new PromiseResult(this.GetStateCe.name, this.ContentAgents.Logger);

      var toReturnCEData: IDataOneStorageCE = {
        Id: id,
        AllTreeNodeAr: this.OneTreeMan.GetOneLiveTreeData(),
        ActiveNode: null
      }

      toReturnCEData.ActiveNode = this.GetActiveNode(toReturnCEData.AllTreeNodeAr);

      if (toReturnCEData) {
        result.MarkSuccessful()
      } else {
        result.MarkFailed('todo why would this fail?');
      }

      this.ContentAgents.Logger.FuncEnd(this.GetStateCe.name);

      if (result.WasSuccessful()) {
        resolve(toReturnCEData)
      } else {
        reject(result.RejectReasons);
      }

    });
  }
}