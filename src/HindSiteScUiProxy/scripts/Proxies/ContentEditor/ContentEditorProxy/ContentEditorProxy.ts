import { DefaultStateOfContentEditor } from '../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentEditor';
import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { InitReportContentEditorProxy } from '../../../../../Shared/scripts/Interfaces/Agents/InitResultContentEditorProxy';
import { IContentTreeProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IOneTreeDrone';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IStateOfContentEditorProxy } from '../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor';
import { IStateOfScContentTreeNodeProxy } from '../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../../../../../Shared/scripts/LoggableBase';
import { SharedConst } from '../../../../../Shared/scripts/SharedConst';
import { ContentEditorProxyMutationEvent_Subject } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Subject';
import { IContentEditorProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload';
import { ITreeProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/ITreeMutationEvent_Payload';
import { TreeMutationEvent_Observer } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Observer';
import { ContentEditorPublishProxy } from './ContentEditorPublishProxy';
import { ContentTreeProxy } from "./ContentEditorTreeProxy/ContentEditorTreeProxy";
import { DefaultStateOfContentEditorTreeProxy } from '../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfTree';

export class ContentEditorProxy extends LoggableBase {
  private ContentEditorTreeProxy: IContentTreeProxy;
  private TreeMutationEvent_Observer: TreeMutationEvent_Observer;
  public ContentEditorProxyMutationEvent_Subject: ContentEditorProxyMutationEvent_Subject;
  readonly AssociatedDoc: IDataOneDoc;
  readonly AssociatedHindsiteId: GuidData;
  initResultContentEditorProxy: InitReportContentEditorProxy;
  Friendly: string;
  private RecipeBasic: RecipeBasics;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc, friendly: string) {
    super(logger);
    this.Logger.CTORStart(ContentEditorProxy.name);
    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.AssociatedDoc = associatedDoc;
    this.ValidateAssociatedDocContentEditor();
    this.Friendly = friendly
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
      this.RecipeBasic = new RecipeBasics(this.Logger);
      await this.RecipeBasic.WaitForCompleteNABDataOneDoc(this.AssociatedDoc, this.Friendly)
        .then(() => {
          this.ContentEditorProxyMutationEvent_Subject = new ContentEditorProxyMutationEvent_Subject(this.Logger);
          this.TreeMutationEvent_Observer = new TreeMutationEvent_Observer(this.Logger, this.CallBackOnContentEditorProxyTreeMutationEvent.bind(this));
        })
        .then(() => this.RecipeBasic.WaitForAndReturnFoundElem(this.AssociatedDoc, ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeContainer))
        .then((treeContainer: HTMLElement) => this.ContentEditorTreeProxy = new ContentTreeProxy(this.Logger, this.AssociatedDoc, treeContainer))
        .then(() => this.ContentEditorTreeProxy.Instantiate_TreeProxy())
        .then(() => this.initResultContentEditorProxy.ContentEditorProxyInitialized = true)
        .catch((err) => this.Logger.ErrorAndThrow(this.Instantiate_ContentEditorProxy.name, err));
    } catch (err) {
      this.Logger.ErrorAndThrow(this.Instantiate_ContentEditorProxy.name, err);
    }
    this.Logger.FuncEnd(this.Instantiate_ContentEditorProxy.name);
  }

  WireEvents_ContentEditorProxy() {
    this.Logger.FuncStart(this.WireEvents_ContentEditorProxy.name);
    this.ContentEditorTreeProxy.WireEvents_TreeProxy()
    this.ContentEditorTreeProxy.TreeMutationEvent_Subject.RegisterObserver(this.TreeMutationEvent_Observer);
    this.Logger.FuncEnd(this.WireEvents_ContentEditorProxy.name);
  }

  CallBackOnContentEditorProxyTreeMutationEvent(treeMutationEvent_Payload: ITreeProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallBackOnContentEditorProxyTreeMutationEvent.name);
    let contentEditorProxyMutationEvent_Payload: IContentEditorProxyMutationEvent_Payload = {
      TreeMutationEvent_Payload: treeMutationEvent_Payload,
    }

    if (this.ContentEditorProxyMutationEvent_Subject) {
      this.ContentEditorProxyMutationEvent_Subject.NotifyObservers(contentEditorProxyMutationEvent_Payload);
    }
    this.Logger.FuncEnd(this.CallBackOnContentEditorProxyTreeMutationEvent.name);
  }

  GetStateOfContentEditorProxy(): Promise<IStateOfContentEditorProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfContentEditorProxy.name);

      let toReturnStateOfContentEditor: IStateOfContentEditorProxy = new DefaultStateOfContentEditor();

      await this.ContentEditorTreeProxy.GetStateOfContentEditorTreeProxy()
        .then((stateOfContentEditorTreeProxy: DefaultStateOfContentEditorTreeProxy) => toReturnStateOfContentEditor.StateOfContentEditorTreeProxy = stateOfContentEditorTreeProxy)
        .then(() => resolve(toReturnStateOfContentEditor))
        .catch((err) => reject(this.GetStateOfContentEditorProxy.name + ' | ' + err));
      this.Logger.FuncEnd(this.GetStateOfContentEditorProxy.name);
    });
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

  async WaitForCompleteNABContentEditor(): Promise<void> {
    this.Logger.FuncStart(this.WaitForCompleteNABContentEditor.name);
    try {
      let recipeBasics = new RecipeBasics(this.Logger);

      await recipeBasics.WaitForCompleteNABDataOneDoc(this.AssociatedDoc, this.Friendly)

        .catch((err) => this.Logger.ErrorAndThrow(this.WaitForCompleteNABContentEditor.name, err));
    } catch (e) {
    }

    this.Logger.FuncEnd(this.WaitForCompleteNABContentEditor.name);
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

  async SetStateOfContentEditorAsync(dataToRestore: IStateOfContentEditorProxy): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateOfContentEditorAsync.name, Guid.AsShort(this.AssociatedDoc.DocId));

      this.ContentEditorProxyMutationEvent_Subject.DisableNotifications();

      //this.Logger.Log('Node Count in storage data: ' + dataToRestore.StateOfContentEditorTreeProxy.StateOfTreeNodes.length);

      await this.ContentEditorTreeProxy.SetStateOfTree(dataToRestore.StateOfContentEditorTreeProxy)
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

  GetActiveNode(allTreeNodeAr: IStateOfScContentTreeNodeProxy[]) {
    this.Logger.FuncStart(this.GetActiveNode.name);
    let toReturn: IStateOfScContentTreeNodeProxy = null;
    if (allTreeNodeAr) {
      for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
        let candidate: IStateOfScContentTreeNodeProxy = allTreeNodeAr[idx];
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