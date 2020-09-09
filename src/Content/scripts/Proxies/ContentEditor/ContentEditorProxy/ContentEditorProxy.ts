import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentEditorTreeProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataOneStorageOneTreeState } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { IDataOneTreeNode } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode';
import { SharedConst } from '../../../../../Shared/scripts/SharedConst';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { ContentEditorTreeProxy } from "../ContentEditorTreeProxy/ContentEditorTreeProxy";

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

    this.AssociatedTreeProxy = new ContentEditorTreeProxy(this.Logger, this.AssociatedDoc, this.SettingsAgent, this.ParentIframeId);

    this.ValidateDoc();

    this.Logger.InstantiateEnd(ContentEditorProxy.name);
  }

  ValidateDoc() {
    this.Logger.FuncStart(this.ValidateDoc.name);
    if (!this.AssociatedDoc) {
      this.Logger.ErrorAndThrow(this.ValidateDoc.name, 'No doc provided');
    }

    else if (!this.AssociatedDoc.ContentDoc) {
      this.Logger.ErrorAndThrow(this.ValidateDoc.name, 'No content doc');
    }

    else if (!this.AssociatedDoc.ContentDoc.URL) {
      this.Logger.ErrorAndThrow(this.ValidateDoc.name, 'No URL');
    }
    else if (this.AssociatedDoc.ContentDoc.URL === SharedConst.Const.UrlSuffix.AboutBlank) {
      this.Logger.ErrorAndThrow(this.ValidateDoc.name, SharedConst.Const.UrlSuffix.AboutBlank + ' not allowed');
    }

    this.Logger.LogVal('URL', this.AssociatedDoc.ContentDoc.URL);
    this.Logger.FuncEnd(this.ValidateDoc.name);
  }

  async WaitForReadyAssociatedDocandInit(): Promise<void> {
    this.Logger.FuncStart(this.WaitForReadyAssociatedDocandInit.name);
    try {
      let recipeBasics = new RecipeBasics(this.Logger);

      await recipeBasics.WaitForPageReadyNative(this.AssociatedDoc)

        .catch((err) => this.Logger.ErrorAndThrow(this.WaitForReadyAssociatedDocandInit.name, err));
    } catch (e) {
    }

    this.Logger.FuncEnd(this.WaitForReadyAssociatedDocandInit.name);
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

  async SetTreeState(oneTreeState: IDataOneStorageOneTreeState): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetTreeState.name);

      if (oneTreeState) {
        await this.RestoreCEStateAsync(oneTreeState)
          .then(() => resolve())
          .catch((err) => {
            this.Logger.LogAsJsonPretty('oneTreeState', oneTreeState);
            this.Logger.ErrorAndThrow(this.SetTreeState.name, 'bad data');
            reject((this.SetTreeState.name + " " + err))
          })
      }
      this.Logger.FuncEnd(this.SetTreeState.name);
    });
  }

  SetCompactCss() {
    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.AssociatedDoc.DocId));

    //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.AssociatedDoc.DocId));
  }

  async RestoreCEStateAsync(dataToRestore: IDataOneStorageOneTreeState): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.RestoreCEStateAsync.name, Guid.AsShort(this.AssociatedDoc.DocId));

      this.Logger.Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);

      await this.AssociatedTreeProxy.WaitForAndRestoreManyAllNodes(dataToRestore, this.AssociatedDoc)
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

  GetTreeState(): Promise<IDataOneStorageOneTreeState> {
    return new Promise<IDataOneStorageOneTreeState>((resolve, reject) => {
      this.Logger.FuncStart(this.GetTreeState.name);

      var toReturnOneTreeState: IDataOneStorageOneTreeState = {
        Id: this.AssociatedId,
        AllTreeNodeAr: this.AssociatedTreeProxy.GetOneLiveTreeData(),
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