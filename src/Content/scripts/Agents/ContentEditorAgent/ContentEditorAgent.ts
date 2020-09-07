import { Guid } from '../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentEditorTreeProxy } from '../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { ISettingsAgent } from '../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataOneStorageOneTreeState } from '../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { IDataOneTreeNode } from '../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode';
import { LoggableBase } from '../../Managers/LoggableBase';
import { ContentEditorTreeProxy } from "../../Proxies/ContentEditor/ContentEditorTreeProxy/ContentEditorTreeProxy";

export class ContentEditorAgent extends LoggableBase {
  private AssociatedTree: IContentEditorTreeProxy;
  readonly AssociatedDoc: IDataOneDoc;
  readonly AssociatedId: GuidData;
  private SettingsAgent: ISettingsAgent;

  constructor(associatedDoc: IDataOneDoc, logger: ILoggerAgent, settingsAgent: ISettingsAgent) {
    super(logger);

    this.Logger.InstantiateStart(ContentEditorAgent.name);

    this.SettingsAgent = settingsAgent;
    this.Logger.IsNotNullOrUndefinedBool("associatedDoc", associatedDoc);

    this.AssociatedDoc = associatedDoc;
    this.AssociatedId = Guid.NewRandomGuid();
    this.AssociatedTree = new ContentEditorTreeProxy(this.Logger, this.AssociatedDoc, this.SettingsAgent);

    this.Logger.InstantiateEnd(ContentEditorAgent.name);
  }

  AddListenerToActiveNodeChange(callback: Function) {
    if (this.AssociatedTree) {
      this.AssociatedTree.AddListenerToMutationEvent(callback);
    }
  }

  async RestoreDataToOneIframeWorker(oneTreeState: IDataOneStorageOneTreeState): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RestoreDataToOneIframeWorker.name);

      if (oneTreeState) {
        await this.RestoreCEStateAsync(oneTreeState)
          .then(() => resolve())
          .catch((err) => {
            this.Logger.LogAsJsonPretty('oneTreeState', oneTreeState);
            this.Logger.ErrorAndThrow(this.RestoreDataToOneIframeWorker.name, 'bad data');
            reject((this.RestoreDataToOneIframeWorker.name + " " + err))
          })
      }
      this.Logger.FuncEnd(this.RestoreDataToOneIframeWorker.name);
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

      var toReturn: boolean = false;

      this.Logger.Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);

      await this.AssociatedTree.WaitForAndRestoreManyAllNodes(dataToRestore, this.AssociatedDoc)
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
        AllTreeNodeAr: this.AssociatedTree.GetOneLiveTreeData(),
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