import { IterationDrone } from '../../../Shared/scripts/Agents/Drones/IterationDrone';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { OneTreeDrone } from '../Drones/OneTreeDrone';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerBase';
import { IHelperAgent } from '../../../Shared/scripts/Interfaces/Agents/IHelperAgent';

export class OneCEAgent {
  private OneTreeDrone: OneTreeDrone;
  private ContextDoc: IDataOneDoc;
  private Logger: ILoggerAgent;
  private HelperAgent: IHelperAgent;

  constructor(associatedDoc: IDataOneDoc, logger: ILoggerAgent, helperAgent: IHelperAgent) {
    this.Logger = logger;
    this.HelperAgent = helperAgent;

    this.Logger.FuncStart(this.constructor.name);
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
      this.Logger.Error(this.__collapseRootNode.name, 'Root glyph not found ' + ContentConst.Const.ElemId.sc.SitecoreRootGlyphId);
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

  async WaitForAndRestoreManyAllNodes(storageData: IDataOneStorageCE, targetDoc: IDataOneDoc) {
    this.Logger.FuncStart(this.WaitForAndRestoreManyAllNodes.name, targetDoc.DocId.AsShort);

    let iterHelper: IterationDrone = new IterationDrone(this.Logger, this.WaitForAndRestoreManyAllNodes.name);

    while (storageData.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing()) {
      var nextNode: IDataOneTreeNode = storageData.AllTreeNodeAr.shift();

      await this.WaitForAndRestoreOneNode(nextNode, targetDoc);
    }

    this.Logger.FuncEnd(this.WaitForAndRestoreManyAllNodes.name);
  }

  async RestoreCEStateAsync(dataToRestore: IDataOneStorageCE, dataOneDocTarget: IDataOneDoc): Promise<Boolean> {
    this.Logger.FuncStart(this.RestoreCEStateAsync.name, dataOneDocTarget.DocId.AsShort);

    var toReturn: boolean = false;

    this.Logger.Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);

    await this.WaitForAndRestoreManyAllNodes(dataToRestore, dataOneDocTarget);

    this.Logger.FuncEnd(this.RestoreCEStateAsync.name);
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
      this.Logger.Error(this.GetActiveNode.name, 'No tree data provided');
    }

    return toReturn;
  }

  GetStateCe(id: IGuid) {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetStateCe.name);
      let result: PromiseResult = new PromiseResult(this.GetStateCe.name, this.Logger);

      var toReturnCEData: IDataOneStorageCE = {
        Id: id,
        AllTreeNodeAr: this.OneTreeDrone.GetOneLiveTreeData(),
        ActiveNode: null
      }

      toReturnCEData.ActiveNode = this.GetActiveNode(toReturnCEData.AllTreeNodeAr);

      if (toReturnCEData) {
        result.MarkSuccessful()
      } else {
        result.MarkFailed('todo why would this fail?');
      }

      this.Logger.FuncEnd(this.GetStateCe.name);

      if (result.WasSuccessful()) {
        resolve(toReturnCEData)
      } else {
        reject(result.RejectReasons);
      }
    });
  }
}