import { IterationDrone } from '../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { Guid } from '../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerBase';
import { IOneTreeDrone } from '../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneStorageOneTreeState } from '../../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState';
import { IDataOneTreeNode } from '../../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { ContentConst } from '../../../../Shared/scripts/Interfaces/InjectConst';
import { OneTreeDrone } from '../../Drones/OneTreeDrone/OneTreeDrone';


export class NameContentTab {
  let
}



export class OneCEAgent {
  private OneTreeDrone: IOneTreeDrone;
  private ContextDoc: IDataOneDoc;
  private Logger: ILoggerAgent;

  constructor(associatedDoc: IDataOneDoc, logger: ILoggerAgent) {
    this.Logger = logger;

    this.Logger.FuncStart(this.constructor.name);

    this.Logger.IsNotNullOrUndefinedBool("associatedDoc", associatedDoc);

    this.ContextDoc = associatedDoc;

    this.OneTreeDrone = new OneTreeDrone(this.Logger, this.ContextDoc);

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
    } else {
      this.Logger.Log('Already expanded');
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
    this.Logger.FuncStart(this.WaitForAndRestoreOneNode.name, Guid.AsShort(dataOneDocTarget.DocId));

    var treeGlyphTargetId: string = ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid.WithoutDashes(nextNode.NodeId);

    this.Logger.Log('looking for: ' + treeGlyphTargetId + ' ' + nextNode.NodeFriendly + ' in ' + Guid.AsShort(dataOneDocTarget.DocId));
    this.Logger.Log('document not null ' + (dataOneDocTarget.ContentDoc != null));

    var iterHelper = new IterationDrone(this.Logger, this.WaitForAndRestoreOneNode.name);

    var foundOnPageTreeGlyph: HTMLElement = null;

    while (!foundOnPageTreeGlyph && iterHelper.DecrementAndKeepGoing()) {
      this.Logger.Log('looking for: *' + treeGlyphTargetId + '* ' + nextNode.NodeFriendly + ' in *' + Guid.AsShort(dataOneDocTarget.DocId) + '*');

      foundOnPageTreeGlyph = dataOneDocTarget.ContentDoc.getElementById(treeGlyphTargetId);

      if (foundOnPageTreeGlyph) {
        this.Logger.Log('Found it');
        if (nextNode.IsExpanded) {
          this.__expandNode(foundOnPageTreeGlyph);
        }

        this.Logger.LogVal('IsActive', nextNode.IsActive.toString());

        if (nextNode.IsActive) {
          var hotTreeNodeId = ContentConst.Const.Names.SC.TreeNodePrefix + Guid.WithoutDashes(nextNode.NodeId);
          var hotTreeNode = dataOneDocTarget.ContentDoc.getElementById(hotTreeNodeId);
          if (hotTreeNode) {
            this.__activateNode(hotTreeNode);
          } else {
            this.Logger.ErrorAndContinue(this.WaitForAndRestoreOneNode.name, 'hot tree node not found')
          }
        }
      } else {
        this.Logger.Log('not Found...waiting: ');
        await iterHelper.Wait();
      }
    }

    this.Logger.FuncEnd(this.WaitForAndRestoreOneNode.name, Guid.AsShort(dataOneDocTarget.DocId));
  }

  async WaitForAndRestoreManyAllNodes(storageData: IDataOneStorageOneTreeState, targetDoc: IDataOneDoc) {
    this.Logger.FuncStart(this.WaitForAndRestoreManyAllNodes.name, Guid.AsShort(targetDoc.DocId));

    let iterHelper: IterationDrone = new IterationDrone(this.Logger, this.WaitForAndRestoreManyAllNodes.name);

    while (storageData.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing()) {
      var nextNode: IDataOneTreeNode = storageData.AllTreeNodeAr.shift();

      await this.WaitForAndRestoreOneNode(nextNode, targetDoc);
    }

    this.Logger.FuncEnd(this.WaitForAndRestoreManyAllNodes.name);
  }

  SetCompactCss() {
    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.ContextDoc.DocId));

    //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.ContextDoc.DocId));
  }

  async RestoreCEStateAsync(dataToRestore: IDataOneStorageOneTreeState): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.RestoreCEStateAsync.name, Guid.AsShort(this.ContextDoc.DocId));

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

  GetTreeState(id: GuidData): Promise<IDataOneStorageOneTreeState> {
    return new Promise<IDataOneStorageOneTreeState>((resolve, reject) => {
      this.Logger.FuncStart(this.GetTreeState.name);

      var toReturnOneTreeState: IDataOneStorageOneTreeState = {
        Id: id,
        AllTreeNodeAr: this.OneTreeDrone.GetOneLiveTreeData(),
        ActiveNode: null
      }

      toReturnOneTreeState.ActiveNode = this.GetActiveNode(toReturnOneTreeState.AllTreeNodeAr);

      if (toReturnOneTreeState) {
        resolve(toReturnOneTreeState);
      } else {
        reject('todo why would this fail?');
      }

      this.Logger.FuncEnd(this.GetTreeState.name);
    });
  }
}