import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Classes/IDataPayloadSnapShot';
import { OneTreeManager } from './OneTreeManager';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';

export class OneCEManager extends ContentManagerBase {
  OneTreeMan: OneTreeManager;
  AssociatedDoc: IDataOneDoc;

  constructor(hub: ContentHub, associatedDoc: IDataOneDoc) {
    super(hub);
    this.AssociatedDoc = associatedDoc;
    this.OneTreeMan = new OneTreeManager(hub, this.AssociatedDoc);
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
    this.Log().FuncStart(this.__activateNode.name);
    //var currentSrc = hotTreeNode.getAttribute('src');
    //this.debug().Log('currentSrc' + currentSrc);

    //if (currentSrc.indexOf(InjectConst.ContConst.Names.TreeMenuExpandedPng) < 0) {
    this.Log().Log('clicking it');
    hotTreeNode.click();
    //}
    this.Log().FuncEnd(this.__activateNode.name);
  }
  private __expandNode(foundOnPage: HTMLElement): void {
    this.Log().FuncStart(this.__expandNode.name);
    var currentSrc = foundOnPage.getAttribute('src');
    this.Log().Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) < 0) {
      this.Log().Log('clicking it');
      foundOnPage.click();
    }
    this.Log().FuncEnd(this.__expandNode.name);
  }

  private __collapseNode(element: HTMLElement): void {
    var currentSrc = element.getAttribute('src');
    this.Log().Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) > -1) {
      this.Log().Log('clicking it');
      element.click();
    }
  }

  private __collapseRootNode(targetCEDoc: IDataOneDoc) {
    var rootElem: HTMLElement = targetCEDoc.Document.getElementById(ContentConst.Const.ElemId.sc.SitecoreRootGlyphId);
    if (rootElem) {
      this.__collapseNode(rootElem);
    } else {
      this.Log().Error(this.__collapseRootNode.name, 'Root glyph not found ' + ContentConst.Const.ElemId.sc.SitecoreRootGlyphId);
    }
  }

  async WaitForAndRestoreOneNode(nextNode: IDataOneTreeNode, dataOneDocTarget: IDataOneDoc) {
    this.Log().FuncStart(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.DocId.AsShort);

    var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + nextNode.NodeId.AsString;

    this.Log().Log('looking for: ' + treeGlyphTargetId + ' ' + nextNode.NodeFriendly + ' in ' + dataOneDocTarget.DocId.AsShort);
    this.Log().Log('document not null ' + (dataOneDocTarget.Document != null));

    var iterHelper = new IterationHelper(this.Helpers(), this.WaitForAndRestoreOneNode.name);

    var foundOnPageTreeGlyph: HTMLElement = null;

    while (!foundOnPageTreeGlyph && iterHelper.DecrementAndKeepGoing()) {
      this.Log().Log('looking for: *' + treeGlyphTargetId + '* ' + nextNode.NodeFriendly + ' in *' + dataOneDocTarget.DocId.AsShort + '*');

      foundOnPageTreeGlyph = dataOneDocTarget.Document.getElementById(treeGlyphTargetId);

      if (foundOnPageTreeGlyph) {
        //this.debug().Log('Found it: ');
        if (nextNode.IsExpanded) {
          this.__expandNode(foundOnPageTreeGlyph);
        }
        if (nextNode.IsActive) {
          var hotTreeNodeId = ContentConst.Const.Names.SC.TreeNodePrefix + nextNode.NodeId.AsString;
          var hotTreeNode = dataOneDocTarget.Document.getElementById(hotTreeNodeId);
          if (hotTreeNode) {
            this.__activateNode(hotTreeNode);
          }
        }
      } else {
        this.Log().Log('not Found...waiting: ');
        await iterHelper.Wait();
      }
    }

    this.Log().FuncEnd(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.DocId.AsShort);
  }

  async WaitForAndRestoreManyAllNodes(storageData: IDataOneStorageCE, dataOneDocTarget: IDataOneDoc) {
    this.Log().FuncStart(this.WaitForAndRestoreManyAllNodes.name, dataOneDocTarget.DocId.AsShort);

    let iterHelper: IterationHelper = new IterationHelper(this.Helpers(), this.WaitForAndRestoreManyAllNodes.name);

    while (storageData.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing()) {
      var nextNode: IDataOneTreeNode = storageData.AllTreeNodeAr.shift();

      await this.WaitForAndRestoreOneNode(nextNode, dataOneDocTarget);
    }

    this.Log().FuncEnd(this.WaitForAndRestoreManyAllNodes.name);
  }

  async RestoreCEStateAsync(dataToRestore: IDataOneStorageCE, dataOneDocTarget: IDataOneDoc): Promise<Boolean> {
    this.Log().FuncStart(this.RestoreCEStateAsync.name, dataOneDocTarget.DocId.AsShort);

    var toReturn: boolean = false;

    this.Log().Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);

    await this.WaitForAndRestoreManyAllNodes(dataToRestore, dataOneDocTarget);

    this.Log().FuncEnd(this.RestoreCEStateAsync.name);
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
      this.Log().Error(this.GetActiveNode.name, 'No tree data provided');
    }

    return toReturn;
  }

  GetStateCe(id: IGuid): IDataOneStorageCE {
    this.Log().FuncStart(this.GetStateCe.name);

    var toReturnCEData: IDataOneStorageCE = {
      Id: id,
      AllTreeNodeAr: this.OneTreeMan.GetOneLiveTreeData(),
      ActiveNode: null
    }

    toReturnCEData.ActiveNode = this.GetActiveNode(toReturnCEData.AllTreeNodeAr);



    this.Log().FuncEnd(this.GetStateCe.name);
    return toReturnCEData;
  }

}