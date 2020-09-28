import { DefaultStateOfContentEditor } from '../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentEditor';
import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { InitReportContentEditorProxy } from '../../../../../Shared/scripts/Interfaces/Agents/InitResultContentEditorProxy';
import { IContentEditorTreeProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataStateOfContentEditor } from '../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor';
import { IDataStateOfScContentTreeNode } from '../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../../../../../Shared/scripts/LoggableBase';
import { SharedConst } from '../../../../../Shared/scripts/SharedConst';
import { ContentEditorProxyMutationEvent_Subject } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Subject';
import { IContentEditorProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload';
import { ITreeMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/ITreeMutationEvent_Payload';
import { TreeMutationEvent_Observer } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Observer';
import { ContentEditorPublishProxy } from './ContentEditorPublishProxy';
import { TreeProxy } from "./ContentEditorTreeProxy/ContentEditorTreeProxy";

export class ContentEditorProxy extends LoggableBase {
  private ChildTreeProxy: IContentEditorTreeProxy;
  private TreeMutationEvent_Observer: TreeMutationEvent_Observer;
  public ContentEditorProxyMutationEvent_Subject: ContentEditorProxyMutationEvent_Subject;
  readonly AssociatedDoc: IDataOneDoc;
  readonly AssociatedHindsiteId: GuidData;
  initResultContentEditorProxy: InitReportContentEditorProxy;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc) {
    super(logger);
    this.Logger.CTORStart(ContentEditorProxy.name);
    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.AssociatedDoc = associatedDoc;
    this.ValidateAssociatedDocContentEditor();
    this.Logger.CTOREnd(ContentEditorProxy.name);
  }

  async PublishItem(): Promise<void> {
    let publishProxy = new ContentEditorPublishProxy(this.Logger, this, this.AssociatedDoc);
    await publishProxy.Execute();
  }

  async Instantiate_ContentEditorProxy(): Promise<void> {
    this.Logger.FuncStart(this.Instantiate_ContentEditorProxy.name);
    try {
      this.initResultContentEditorProxy = new InitReportContentEditorProxy();
      let recipeBasic = new RecipeBasics(this.Logger);
      await recipeBasic.WaitForReadyNABDocument(this.AssociatedDoc)
        .then(() => {
          this.ContentEditorProxyMutationEvent_Subject = new ContentEditorProxyMutationEvent_Subject(this.Logger);
          this.TreeMutationEvent_Observer = new TreeMutationEvent_Observer(this.Logger, this.CallBackOnContentEditorProxyTreeMutationEvent.bind(this));
        })
        .then(() => this.ChildTreeProxy = new TreeProxy(this.Logger, this.AssociatedDoc, this.GetTreeContainer()))
        .then(() => this.ChildTreeProxy.Instantiate_TreeProxy())
        .then(() => this.initResultContentEditorProxy.ContentEditorProxyInitialized = true)
        .catch((err) => this.Logger.ErrorAndThrow(this.Instantiate_ContentEditorProxy.name, err));
    } catch (err) {
      this.Logger.ErrorAndThrow(this.Instantiate_ContentEditorProxy.name, err);
    }
    this.Logger.FuncEnd(this.Instantiate_ContentEditorProxy.name);
  }

  WireEvents_ContentEditorProxy() {
    this.Logger.FuncStart(this.WireEvents_ContentEditorProxy.name);
    this.ChildTreeProxy.TreeMutationEvent_Subject.RegisterObserver(this.TreeMutationEvent_Observer);
    this.Logger.FuncEnd(this.WireEvents_ContentEditorProxy.name);
  }

  GetTreeContainer(): HTMLElement {
    return this.AssociatedDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeContainer)
  }

  CallBackOnContentEditorProxyTreeMutationEvent(treeMutationEvent_Payload: ITreeMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallBackOnContentEditorProxyTreeMutationEvent.name);
    let contentEditorProxyMutationEvent_Payload: IContentEditorProxyMutationEvent_Payload = {
      TreeMutationEvent_Payload: treeMutationEvent_Payload,
    }

    if (this.ContentEditorProxyMutationEvent_Subject) {
      this.ContentEditorProxyMutationEvent_Subject.NotifyObservers(contentEditorProxyMutationEvent_Payload);
    }
    this.Logger.FuncEnd(this.CallBackOnContentEditorProxyTreeMutationEvent.name);
  }

  GetStateOfContentEditor(): IDataStateOfContentEditor {
    {
      let toReturnStateOfContentEditor: IDataStateOfContentEditor = new DefaultStateOfContentEditor();
      toReturnStateOfContentEditor.StateOfTree = this.ChildTreeProxy.GetStateOfTree();
      return toReturnStateOfContentEditor;
    }
  }

  ValidateAssociatedDocContentEditor() {
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
  }

  async WaitForReadyContentEditor(): Promise<void> {
    this.Logger.FuncStart(this.WaitForReadyContentEditor.name);
    try {
      let recipeBasics = new RecipeBasics(this.Logger);

      await recipeBasics.WaitForReadyNABDocument(this.AssociatedDoc)

        .catch((err) => this.Logger.ErrorAndThrow(this.WaitForReadyContentEditor.name, err));
    } catch (e) {
    }

    this.Logger.FuncEnd(this.WaitForReadyContentEditor.name);
  }

  //RegisterObserverForTreeMutation(treeMutationEvent_Observer: TreeMutationEvent_Observer) {
  //  this.Logger.FuncStart(this.RegisterObserverForTreeMutation.name);
  //  if (this.ChildTreeProxy) {
  //    treeMutationEvent_Observer.SetAssociatedContentEditorProxy(this);
  //    this.ChildTreeProxy.TreeMutationEvent_Subject.RegisterObserver(treeMutationEvent_Observer);
  //  } else {
  //    this.Logger.WarningAndContinue(this.RegisterObserverForTreeMutation.name, 'no associated tree proxy');
  //  }
  //  this.Logger.FuncEnd(this.RegisterObserverForTreeMutation.name);
  //}

  SetCompactCss() {
    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.AssociatedDoc.DocId));

    //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.AssociatedDoc.DocId));
  }

  async SetStateOfContentEditorAsync(dataToRestore: IDataStateOfContentEditor): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateOfContentEditorAsync.name, Guid.AsShort(this.AssociatedDoc.DocId));

      this.ContentEditorProxyMutationEvent_Subject.DisableNotifications();

      this.Logger.Log('Node Count in storage data: ' + dataToRestore.StateOfTree.StateOfTreeNodes.length);

      await this.ChildTreeProxy.SetStateOfTree(dataToRestore.StateOfTree)
        .then(() => {
          this.ContentEditorProxyMutationEvent_Subject.EnableNotifications();
          resolve(true);
        })
        .catch((err) => {
          this.ContentEditorProxyMutationEvent_Subject.EnableNotifications();
          reject(this.SetStateOfContentEditorAsync.name + " " + err);
        });

      this.Logger.FuncEnd(this.SetStateOfContentEditorAsync.name);
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