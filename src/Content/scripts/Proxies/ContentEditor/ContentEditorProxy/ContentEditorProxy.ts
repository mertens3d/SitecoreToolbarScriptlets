﻿import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentEditorTreeProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataOneStorageOneTreeState } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { SharedConst } from '../../../../../Shared/scripts/SharedConst';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { ContentEditorTreeProxy } from "../ContentEditorTreeProxy/ContentEditorTreeProxy";
import { IDataOneTreeNode } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode';

export class ContentEditorProxy extends LoggableBase {
  AssociatedTreeProxy: IContentEditorTreeProxy;
  readonly AssociatedDoc: IDataOneDoc;
  readonly AssociatedId: GuidData;
  private SettingsAgent: ISettingsAgent;
  private ParentIframeId: string = '';

  constructor(associatedDoc: IDataOneDoc, logger: ILoggerAgent, settingsAgent: ISettingsAgent, parentIframeId: string) {
    super(logger);

    this.Logger.InstantiateStart(ContentEditorProxy.name);

    this.SettingsAgent = settingsAgent;
    this.AssociatedId = Guid.NewRandomGuid();
    this.AssociatedDoc = associatedDoc;
    this.ParentIframeId = parentIframeId;


    this.ValidateAssociatedDocContentEditor();

    this.AssociatedTreeProxy = new ContentEditorTreeProxy(this.Logger, this.AssociatedDoc, this.SettingsAgent, this.ParentIframeId);

    this.Logger.InstantiateEnd(ContentEditorProxy.name);
  }

  ValidateAssociatedDocContentEditor() {
    this.Logger.FuncStart(this.ValidateAssociatedDocContentEditor.name);
    if (!this.AssociatedDoc) {
      this.Logger.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, 'No doc provided');
    }

    else if (!this.AssociatedDoc.ContentDoc) {
      this.Logger.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, 'No content doc');
    }

    else if (!this.AssociatedDoc.ContentDoc.URL) {
      this.Logger.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, 'No URL');
    }
    else if (this.AssociatedDoc.ContentDoc.URL === SharedConst.Const.UrlSuffix.AboutBlank) {
      this.Logger.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, SharedConst.Const.UrlSuffix.AboutBlank + ' not allowed');
    }

    this.Logger.LogVal('URL', this.AssociatedDoc.ContentDoc.URL);
    this.Logger.FuncEnd(this.ValidateAssociatedDocContentEditor.name);
  }

  async WaitForReadyContentEditor(): Promise<void> {
    this.Logger.FuncStart(this.WaitForReadyContentEditor.name);
    try {
      let recipeBasics = new RecipeBasics(this.Logger, this.SettingsAgent);

      await recipeBasics.WaitForPageReadyNative(this.AssociatedDoc)

        .catch((err) => this.Logger.ErrorAndThrow(this.WaitForReadyContentEditor.name, err));
    } catch (e) {
    }

    this.Logger.FuncEnd(this.WaitForReadyContentEditor.name);
  }

  AddListenerToActiveNodeChange(callback: Function) {
    this.Logger.FuncStart(this.AddListenerToActiveNodeChange.name);
    if (this.AssociatedTreeProxy) {
      this.AssociatedTreeProxy.AddListenerToTreeMutationEvent(callback);
    } else {
      this.Logger.WarningAndContinue(this.AddListenerToActiveNodeChange.name, 'no associated tree proxy');
    }
    this.Logger.FuncEnd(this.AddListenerToActiveNodeChange.name);
  }

  async SetStateTree(oneTreeState: IDataOneStorageOneTreeState): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateTree.name);

      if (oneTreeState) {
        await this.SetStateDesktopIframeProxy(oneTreeState)
          .then(() => resolve())
          .catch((err) => {
            this.Logger.LogAsJsonPretty('oneTreeState', oneTreeState);
            reject((this.SetStateTree.name + " " + err))
          })
      }
      this.Logger.FuncEnd(this.SetStateTree.name);
    });
  }

  SetCompactCss() {
    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.AssociatedDoc.DocId));

    //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.AssociatedDoc.DocId));
  }

  async SetStateDesktopIframeProxy(dataToRestore: IDataOneStorageOneTreeState): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateDesktopIframeProxy.name, Guid.AsShort(this.AssociatedDoc.DocId));

      this.Logger.Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);

      await this.AssociatedTreeProxy.WaitForAndRestoreManyAllNodes(dataToRestore, this.AssociatedDoc)
        .then(() => resolve(true))
        .catch((err) => reject(this.SetStateDesktopIframeProxy.name + " " + err));

      this.Logger.FuncEnd(this.SetStateDesktopIframeProxy.name);
    });
  }

  GetActiveNode(allTreeNodeAr: IDataOneTreeNode[]) {
    this.Logger.FuncStart(this.GetActiveNode.name);
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

    this.Logger.FuncEnd(this.GetActiveNode.name, toReturn.NodeFriendly);
    return toReturn;
  }

  GetStateTree(): IDataOneStorageOneTreeState {
    this.Logger.FuncStart(this.GetStateTree.name);

    var toReturnOneTreeState: IDataOneStorageOneTreeState = {
      Id: this.AssociatedId,
      AllTreeNodeAr: this.AssociatedTreeProxy.GetOneLiveTreeData(),
      ActiveNode: null
    }

    toReturnOneTreeState.ActiveNode = this.GetActiveNode(toReturnOneTreeState.AllTreeNodeAr);

    if (toReturnOneTreeState) {
      this.Logger.LogVal('Tree State node count', toReturnOneTreeState.AllTreeNodeAr.length);
    }

    this.Logger.FuncEnd(this.GetStateTree.name);
    return toReturnOneTreeState;
  }
}