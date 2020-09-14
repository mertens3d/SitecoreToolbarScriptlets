import { DefaultStateOfContentEditor } from '../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentEditor';
import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentEditorTreeProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { ISettingsAgent, InitResultsScWindowManager, InitResultContentEditorProxy } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataStateOfContentEditor } from '../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor';
import { IDataStateOfScContentTreeNode } from '../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { SharedConst } from '../../../../../Shared/scripts/SharedConst';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { IContentEditorProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Payload';
import { ContentEditorProxyMutationEvent_Subject } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Subject';
import { ITreeMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/ITreeMutationEvent_Payload';
import { TreeMutationEvent_Observer } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Observer';
import { TreeProxy } from "../ContentEditorTreeProxy/ContentEditorTreeProxy";

export class ContentEditorProxy extends LoggableBase {
  private ChildTreeProxy: IContentEditorTreeProxy;
  private TreeMutationEvent_Observer: TreeMutationEvent_Observer;
  public ContentEditorProxyMutationEvent_Subject: ContentEditorProxyMutationEvent_Subject;
  readonly AssociatedDoc: IDataOneDoc;
  readonly AssociatedHindsiteId: GuidData;

  constructor(associatedDoc: IDataOneDoc, logger: ILoggerAgent) {
    super(logger);

    this.Logger.InstantiateStart(ContentEditorProxy.name);

    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.AssociatedDoc = associatedDoc;

    this.ValidateAssociatedDocContentEditor();

    this.Logger.InstantiateEnd(ContentEditorProxy.name);
  }

  OnReadyInitContentEditorProxy(): Promise<InitResultContentEditorProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.OnReadyInitContentEditorProxy.name);

      let initResultContentEditorProxy = new InitResultContentEditorProxy();
      let recipeBasic = new RecipeBasics(this.Logger);
      await recipeBasic.WaitForPageReadyNative(this.AssociatedDoc)
        .then(() => {
          this.ChildTreeProxy = new TreeProxy(this.Logger, this.AssociatedDoc, this.GetTreeContainer());

          initResultContentEditorProxy.InitResultTreeProxy = this.ChildTreeProxy.OnReadyInitTreeProxy();

          this.ContentEditorProxyMutationEvent_Subject = new ContentEditorProxyMutationEvent_Subject(this.Logger);

          this.TreeMutationEvent_Observer = new TreeMutationEvent_Observer(this.Logger, this);

          if (this.ChildTreeProxy) {
            this.ChildTreeProxy.TreeMutationEvent_Subject.RegisterObserver(this.TreeMutationEvent_Observer);
          } else {
            this.Logger.ErrorAndThrow(this.OnReadyInitContentEditorProxy.name, 'no child tree found');
          }

          initResultContentEditorProxy.ContentEditorProxyInitialized = true;
        })
        .then(() => resolve(initResultContentEditorProxy))
        .catch((err) => reject(this.OnReadyInitContentEditorProxy.name + ' | ' + err));

      this.Logger.FuncEnd(this.OnReadyInitContentEditorProxy.name);
    });
  }

  GetTreeContainer(): HTMLElement {
    return this.AssociatedDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeContainer)
  }

  ContentEditorProxyOnTreeMutationEvent(payload: ITreeMutationEvent_Payload) {
    let contentEditorProxyMutationEvent_Payload: IContentEditorProxyMutationEvent_Payload = {
      AddedIframes: [],
      MutatedElement: null,
      TreeMutation: payload,
      ContentEditorProxy:this
    }
    if (this.ContentEditorProxyMutationEvent_Subject) {
      this.ContentEditorProxyMutationEvent_Subject.NotifyObservers(contentEditorProxyMutationEvent_Payload);
    }
  }

  GetStateOfContentEditor(): IDataStateOfContentEditor {
    {
      let toReturnStateOfContentEditor: IDataStateOfContentEditor = new DefaultStateOfContentEditor();
      toReturnStateOfContentEditor.StateOfTree = this.ChildTreeProxy.GetStateOfTree();
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
      let recipeBasics = new RecipeBasics(this.Logger);

      await recipeBasics.WaitForPageReadyNative(this.AssociatedDoc)

        .catch((err) => this.Logger.ErrorAndThrow(this.WaitForReadyContentEditor.name, err));
    } catch (e) {
    }

    this.Logger.FuncEnd(this.WaitForReadyContentEditor.name);
  }

  RegisterObserverForTreeMutation(treeMutationEvent_Observer: TreeMutationEvent_Observer) {
    this.Logger.FuncStart(this.RegisterObserverForTreeMutation.name);
    if (this.ChildTreeProxy) {
      treeMutationEvent_Observer.SetAssociatedContentEditorProxy(this);
      this.ChildTreeProxy.TreeMutationEvent_Subject.RegisterObserver(treeMutationEvent_Observer);
    } else {
      this.Logger.WarningAndContinue(this.RegisterObserverForTreeMutation.name, 'no associated tree proxy');
    }
    this.Logger.FuncEnd(this.RegisterObserverForTreeMutation.name);
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

      await this.ChildTreeProxy.SetStateOfTree(dataToRestore.StateOfTree)
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

    this.Logger.FuncEnd(this.GetActiveNode.name, toReturn.FriendlyTreeNode);
    return toReturn;
  }
}