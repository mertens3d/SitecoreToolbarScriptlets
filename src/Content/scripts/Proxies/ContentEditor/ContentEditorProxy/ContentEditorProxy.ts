import { DefaultStateOfContentEditor } from '../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentEditor';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { IContentEditorTreeProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataStateOfContentEditor } from '../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor';
import { IDataStateOfScContentTreeNode } from '../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode';
import { IGeneric_Observer } from "../../Desktop/DesktopProxy/Events/GenericEvent/IGeneric_Observer";
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { ITreeMutatedEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentEditorTreeMutatedEvent/IPayload_ContentEditorTreeMutatedEvent';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { SharedConst } from '../../../../../Shared/scripts/SharedConst';
import { TreeProxy } from "../ContentEditorTreeProxy/ContentEditorTreeProxy";

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

    this.AssociatedTreeProxy = new TreeProxy(this.Logger, this.AssociatedDoc, this.SettingsAgent, this.ParentIframeId);

    this.Logger.InstantiateEnd(ContentEditorProxy.name);
  }

  GetStateOfContentEditor(): IDataStateOfContentEditor {
    {
      let toReturnStateOfContentEditor: IDataStateOfContentEditor = new DefaultStateOfContentEditor();
      toReturnStateOfContentEditor.StateOfTree = this.AssociatedTreeProxy.GetStateOfTree();
      return toReturnStateOfContentEditor;
    }
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

  RegisterObserver(observer: IGeneric_Observer<ITreeMutatedEvent_Payload>) {
    this.Logger.FuncStart(this.RegisterObserver.name);
    if (this.AssociatedTreeProxy) {
      this.AssociatedTreeProxy.RegisterObserver(observer);
    } else {
      this.Logger.WarningAndContinue(this.RegisterObserver.name, 'no associated tree proxy');
    }
    this.Logger.FuncEnd(this.RegisterObserver.name);
  }

  //async SetStateTree(oneTreeState: IDataStateOfTree): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.SetStateTree.name);

  //    if (oneTreeState) {
  //      await this.AssociatedTreeProxy.SetStateOfTree(oneTreeState)
  //        .then(() => resolve())
  //        .catch((err) => {
  //          this.Logger.LogAsJsonPretty('oneTreeState', oneTreeState);
  //          reject((this.SetStateTree.name + " " + err))
  //        })
  //    }
  //    this.Logger.FuncEnd(this.SetStateTree.name);
  //  });
  //}

  SetCompactCss() {
    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.AssociatedDoc.DocId));

    //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.AssociatedDoc.DocId));
  }

  async SetStateOfContentEditor(dataToRestore: IDataStateOfContentEditor): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateOfContentEditor.name, Guid.AsShort(this.AssociatedDoc.DocId));

      this.Logger.Log('Node Count in storage data: ' + dataToRestore.StateOfTree.StateOfTreeNodes.length);

      await this.AssociatedTreeProxy.SetStateOfTree(dataToRestore.StateOfTree)
        .then(() => resolve(true))
        .catch((err) => reject(this.SetStateOfContentEditor.name + " " + err));

      this.Logger.FuncEnd(this.SetStateOfContentEditor.name);
    });
  }

  GetActiveNode(allTreeNodeAr: IDataStateOfScContentTreeNode[]) {
    this.Logger.FuncStart(this.GetActiveNode.name);
    let toReturn: IDataStateOfScContentTreeNode = null;
    if (allTreeNodeAr) {
      for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
        let candidate: IDataStateOfScContentTreeNode = allTreeNodeAr[idx];
        if (candidate.IsActive) {
          toReturn = candidate;
          break;
        }
      }
    } else {
      this.Logger.ErrorAndThrow(this.GetActiveNode.name, 'No tree data provided');
    }

    this.Logger.FuncEnd(this.GetActiveNode.name, toReturn.Friendly);
    return toReturn;
  }
}