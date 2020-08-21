import { IterationDrone } from '../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { IDataOneStorageOneTreeState } from '../../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IGuid } from '../../../../Shared/scripts/Interfaces/IGuid';
import { IDataOneTreeNode } from '../../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { OneTreeDrone } from '../../Drones/OneTreeDrone/OneTreeDrone';
import { ContentConst } from '../../../../Shared/scripts/Interfaces/InjectConst';
import { PromiseResult } from '../../../../Shared/scripts/Classes/PromiseResult';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerBase';
import { IHelperAgent } from '../../../../Shared/scripts/Interfaces/Agents/IHelperAgent';
import { IOneTreeDrone } from '../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';

export class OneCEAgent {

  private OneTreeDrone: IOneTreeDrone;
  private ContextDoc: IDataOneDoc;
  private Logger: ILoggerAgent;
  private HelperAgent: IHelperAgent;

  constructor(associatedDoc: IDataOneDoc, logger: ILoggerAgent, helperAgent: IHelperAgent) {
    this.Logger = logger;
    this.HelperAgent = helperAgent;

    this.Logger.FuncStart(this.constructor.name);

    this.Logger.IsNotNullOrUndefinedBool("helperAgent", helperAgent);
    this.Logger.IsNotNullOrUndefinedBool("associatedDoc", associatedDoc);

    this.ContextDoc = associatedDoc;

    this.OneTreeDrone = new OneTreeDrone(this.Logger, this.HelperAgent, this.ContextDoc);

    this.Logger.FuncEnd(this.constructor.name);
  }

  private __activateNode(hotTreeNode: HTMLElement): void {
    this.Logger.FuncStart(this.__activateNode.name);

    this.Logger.Log('clicking it');
    hotTreeNode.click();

    this.Logger.FuncEnd(this.__activateNode.name);
  }
  private __expandNode(foundOnPage: HTMLElement): void {
    this.Logger.FuncStart(this.__expandNode.name);
    var currentSrc = foundOnPage.getAttribute('src');
    this.Logger.Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) < 0) {
      this.Logger.Log('clicking it');
      foundOnPage.click();
    }
    this.Logger.FuncEnd(this.__expandNode.name);
  }

  private __collapseNode(element: HTMLElement): void {
    var currentSrc = element.getAttribute('src');
    this.Logger.Log('currentSrc' + currentSrc);
    if (currentSrc.indexOf(ContentConst.Const.Names.TreeMenuExpandedPng) > -1) {
      this.Logger.Log('clicking it');
      element.click();
    }
  }

  private __collapseRootNode(targetCEDoc: IDataOneDoc) {
    var rootElem: HTMLElement = targetCEDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.SitecoreRootGlyphId);
    if (rootElem) {
      this.__collapseNode(rootElem);
    } else {
      this.Logger.ErrorAndThrow(this.__collapseRootNode.name, 'Root glyph not found ' + ContentConst.Const.ElemId.sc.SitecoreRootGlyphId);
    }
  }

  async WaitForAndRestoreOneNode(nextNode: IDataOneTreeNode, dataOneDocTarget: IDataOneDoc) {
    this.Logger.FuncStart(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.DocId.AsShort);

    var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + nextNode.NodeId.AsString;

    this.Logger.Log('looking for: ' + treeGlyphTargetId + ' ' + nextNode.NodeFriendly + ' in ' + dataOneDocTarget.DocId.AsShort);
    this.Logger.Log('document not null ' + (dataOneDocTarget.ContentDoc != null));

    var iterHelper = new IterationDrone(this.Logger, this.WaitForAndRestoreOneNode.name);

    var foundOnPageTreeGlyph: HTMLElement = null;

    while (!foundOnPageTreeGlyph && iterHelper.DecrementAndKeepGoing()) {
      this.Logger.Log('looking for: *' + treeGlyphTargetId + '* ' + nextNode.NodeFriendly + ' in *' + dataOneDocTarget.DocId.AsShort + '*');

      foundOnPageTreeGlyph = dataOneDocTarget.ContentDoc.getElementById(treeGlyphTargetId);

      if (foundOnPageTreeGlyph) {
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
        this.Logger.Log('not Found...waiting: ');
        await iterHelper.Wait();
      }
    }

    this.Logger.FuncEnd(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.DocId.AsShort);
  }

  async WaitForAndRestoreManyAllNodes(storageData: IDataOneStorageOneTreeState, targetDoc: IDataOneDoc) {
    this.Logger.FuncStart(this.WaitForAndRestoreManyAllNodes.name, targetDoc.DocId.AsShort);

    let iterHelper: IterationDrone = new IterationDrone(this.Logger, this.WaitForAndRestoreManyAllNodes.name);

    while (storageData.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing()) {
      var nextNode: IDataOneTreeNode = storageData.AllTreeNodeAr.shift();

      await this.WaitForAndRestoreOneNode(nextNode, targetDoc);
    }

    this.Logger.FuncEnd(this.WaitForAndRestoreManyAllNodes.name);
  }

  SetCompactCss() {
    this.Logger.FuncStart(this.SetCompactCss.name, this.ContextDoc.DocId.AsShort);

  //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, this.ContextDoc.DocId.AsShort);
  }

  async RestoreCEStateAsync(dataToRestore: IDataOneStorageOneTreeState): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.RestoreCEStateAsync.name, this.ContextDoc.DocId.AsShort);

      var toReturn: boolean = false;

      this.Logger.Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);

      await this.WaitForAndRestoreManyAllNodes(dataToRestore, this.ContextDoc)
        .then(() => resolve(true))
        .catch((err) => reject(this.RestoreCEStateAsync.name + " " + err));

      this.Logger.FuncEnd(this.RestoreCEStateAsync.name);
    });
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
      this.Logger.ErrorAndThrow(this.GetActiveNode.name, 'No tree data provided');
    }

    return toReturn;
  }

  GetTreeState(id: IGuid) {
    return new Promise<IDataOneStorageOneTreeState>((resolve, reject) => {
      this.Logger.FuncStart(this.GetTreeState.name);
      let result: PromiseResult = new PromiseResult(this.GetTreeState.name, this.Logger);

      var toReturnOneTreeState: IDataOneStorageOneTreeState = {
        Id: id,
        AllTreeNodeAr: this.OneTreeDrone.GetOneLiveTreeData(),
        ActiveNode: null
      }

      toReturnOneTreeState.ActiveNode = this.GetActiveNode(toReturnOneTreeState.AllTreeNodeAr);

      if (toReturnOneTreeState) {
        result.MarkSuccessful()
      } else {
        result.MarkFailed('todo why would this fail?');
      }

      this.Logger.FuncEnd(this.GetTreeState.name);

      if (result.WasSuccessful()) {
        resolve(toReturnOneTreeState)
      } else {
        reject(result.RejectReasons);
      }
    });
  }
}