import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Classes/IDataPayloadSnapShot';

export class OneCEManager extends ContentManagerBase {
  constructor(xyyz: ContentHub) {
    super(xyyz);
  }

  WaitForNode(needleId: IGuid, targetDoc: IDataOneDoc, currentIteration: number, timeout: number, callbackOnComplete: Function) {
    this.debug().FuncStart(this.WaitForNode.name, 'looking for guid: iter: ' + currentIteration + ' ' + needleId.AsString + ' on ' + targetDoc.DocId.AsShort);
    currentIteration--;

    var foundOnPage: HTMLElement = targetDoc.Document.getElementById(needleId.AsString);

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

  private __activateNode(hotTreeNode: HTMLElement): void {
    this.debug().FuncStart(this.__activateNode.name);
    //var currentSrc = hotTreeNode.getAttribute('src');
    //this.debug().Log('currentSrc' + currentSrc);

    //if (currentSrc.indexOf(this.Const().Names.TreeMenuExpandedPng) < 0) {
    this.debug().Log('clicking it');
    hotTreeNode.click();
    //}
    this.debug().FuncEnd(this.__activateNode.name);
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

  async WaitForAndRestoreOneNode(nextNode: IDataOneTreeNode, dataOneDocTarget: IDataOneDoc) {
    this.debug().FuncStart(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.DocId.AsShort);

    var treeGlyphTargetId: string = this.Const().Names.SC.TreeGlyphPrefix + nextNode.NodeId.AsString;

    this.debug().Log('looking for: ' + treeGlyphTargetId + ' ' + nextNode.NodeFriendly + ' in ' + dataOneDocTarget.DocId.AsShort);
    this.debug().Log('document not null ' + (dataOneDocTarget.Document != null));

    var iterHelper = new IterationHelper(this.debug(), this.WaitForAndRestoreOneNode.name);

    var foundOnPageTreeGlyph: HTMLElement = null;

    while (!foundOnPageTreeGlyph && iterHelper.DecrementAndKeepGoing()) {
      this.debug().Log('looking for: *' + treeGlyphTargetId + '* ' + nextNode.NodeFriendly + ' in *' + dataOneDocTarget.DocId.AsShort + '*');

      foundOnPageTreeGlyph = dataOneDocTarget.Document.getElementById(treeGlyphTargetId);

      if (foundOnPageTreeGlyph) {
        //this.debug().Log('Found it: ');
        if (nextNode.IsExpanded) {
          this.__expandNode(foundOnPageTreeGlyph);
        }
        if (nextNode.IsActive) {
          var hotTreeNodeId = this.Const().Names.SC.TreeNodePrefix + nextNode.NodeId.AsString;
          var hotTreeNode = dataOneDocTarget.Document.getElementById(hotTreeNodeId);
          if (hotTreeNode) {
            this.__activateNode(hotTreeNode);
          }
        }
      } else {
        this.debug().Log('not Found...waiting: ');
        await iterHelper.Wait();
      }
    }

    this.debug().FuncEnd(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.DocId.AsShort);
  }

  async WaitForAndRestoreManyAllNodes(storageData: IDataOneStorageCE, dataOneDocTarget: IDataOneDoc) {
    this.debug().FuncStart(this.WaitForAndRestoreManyAllNodes.name, dataOneDocTarget.DocId.AsShort);

    let iterHelper: IterationHelper = new IterationHelper(this.debug(), this.WaitForAndRestoreManyAllNodes.name);

    while (storageData.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing()) {
      var nextNode: IDataOneTreeNode = storageData.AllTreeNodeAr.shift();

      await this.WaitForAndRestoreOneNode(nextNode, dataOneDocTarget);
    }

    this.debug().FuncEnd(this.WaitForAndRestoreManyAllNodes.name);
  }

  async RestoreCEStateAsync(dataToRestore: IDataOneStorageCE, dataOneDocTarget: IDataOneDoc): Promise<Boolean> {
    this.debug().FuncStart(this.RestoreCEStateAsync.name, dataOneDocTarget.DocId.AsShort);

    var toReturn: boolean = false;

    this.debug().Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);

    await this.WaitForAndRestoreManyAllNodes(dataToRestore, dataOneDocTarget);

    this.debug().FuncEnd(this.RestoreCEStateAsync.name);
    return toReturn;
  }

  SaveStateOneContentEditor(id: IGuid, dataOneDoc: IDataOneDoc, snapShotSettings: IDataPayloadSnapShot) {
    this.debug().FuncStart('SaveOneContentEditor');
    this.debug().Log('SaveOneContentEditor');;
    this.debug().Log('docElem is null: ' + (dataOneDoc === null));;

    var CeSnapShot: IDataOneStorageCE = this.ContentHub.OneCEMan.MakeNewData(id);
    CeSnapShot.AllTreeNodeAr = this.ContentHub.OneTreeMan.GetOneLiveTreeData(dataOneDoc);

 

    this.ContentHub.OneWindowMan.PutCEDataToCurrentSnapShot(CeSnapShot, snapShotSettings);

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
 
  
}