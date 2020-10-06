import { DocumentJacket } from '../../../../../DOMJacket/DocumentJacket';
import { DefaultStateOfContentEditor } from '../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentEditor';
import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { StateFullProxyDisciminator } from '../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { InitReportContentEditorProxy } from '../../../../../Shared/scripts/Interfaces/Agents/InitResultContentEditorProxy';
import { IStateFullProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IStateProxy';
import { IStateOfContentEditor } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor';
import { IStateOfContentTree } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree';
import { IStateOfScContentTreeNodeDeep } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { ContentEditorProxyMutationEvent_Subject } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Subject';
import { IContentEditorProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload';
import { ContentTreeProxyMutationEvent_Observer } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/ContentTreeProxyMutationEvent_Observer';
import { IContentTreeProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { _BaseStateFullProxy } from '../../Desktop/DesktopProxy/FrameProxies/_StateProxy';
import { ContentEditorPublishProxy } from './ContentEditorPublishProxy';
import { ContentTreeProxy } from "./ContentTreeProxy/ContentTreeProxy";
import { ElementJacket } from "../../../../../DOMJacket/ElementJacket";

export class ContentEditorSFProxy extends _BaseStateFullProxy<IStateOfContentEditor> implements IStateFullProxy {
  public StateFullProxyDisciminator = StateFullProxyDisciminator.ContentEditor;
  private ContentTreeProxy: ContentTreeProxy;
  private TreeMutationEvent_Observer: ContentTreeProxyMutationEvent_Observer;
  public ContentEditorProxyMutationEvent_Subject: ContentEditorProxyMutationEvent_Subject;
  readonly AssociatedHindsiteId: GuidData;
  initResultContentEditorProxy: InitReportContentEditorProxy;
  Friendly: string;
  private RecipeBasic: RecipeBasics;
  private DocumentJacket: DocumentJacket;

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket, friendly: string) {
    super(hindeCore);
    this.Logger.CTORStart(ContentEditorSFProxy.name);
    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.DocumentJacket = documentJacket;
    this.ValidateAssociatedDocContentEditor();
    this.Friendly = friendly

    this.Logger.CTOREnd(ContentEditorSFProxy.name);
  }

  async PublishItem(): Promise<void> {
    let publishProxy = new ContentEditorPublishProxy(this.HindeCore, this, this.DocumentJacket);
    await publishProxy.Execute();
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart(this.InstantiateAsyncMembers.name, ContentEditorSFProxy.name);
    try {
      this.initResultContentEditorProxy = new InitReportContentEditorProxy();
      this.RecipeBasic = new RecipeBasics(this.HindeCore);
      await this.DocumentJacket.WaitForCompleteNAB_NativeDocument(this.Friendly)// this.RecipeBasic.WaitForCompleteNAB_DataOneDoc(this.AssociatedScDocumentProxy, this.Friendly)
        .then(() => {
          this.ContentEditorProxyMutationEvent_Subject = new ContentEditorProxyMutationEvent_Subject(this.HindeCore);
          this.TreeMutationEvent_Observer = new ContentTreeProxyMutationEvent_Observer(this.HindeCore, this.CallBackOnContentEditorProxyTreeMutationEventAsync.bind(this));
        })
        .then(() => this.DocumentJacket.WaitForAndReturnFoundElemJacketFromDoc(ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeContainer))
        .then((treeContainer: ElementJacket) => this.ContentTreeProxy = new ContentTreeProxy(this.HindeCore, this.DocumentJacket, treeContainer))
        .then(() => this.ContentTreeProxy.Instantiate_TreeProxy())
        .then(() => this.initResultContentEditorProxy.ContentEditorProxyInitialized = true)
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err);
    }
    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, ContentEditorSFProxy.name);
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, ContentEditorSFProxy.name);
    this.ContentTreeProxy.WireEvents_TreeProxy()
    this.ContentTreeProxy.TreeMutationEvent_Subject.RegisterObserver(this.TreeMutationEvent_Observer);
    this.Logger.FuncEnd(this.WireEvents.name, ContentEditorSFProxy.name);
  }

  GetState(): Promise<IStateOfContentEditor> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, ContentEditorSFProxy.name);

      let toReturnStateOfContentEditor: IStateOfContentEditor = new DefaultStateOfContentEditor();

      await this.ContentTreeProxy.GetStateOfContentTree()
        .then((stateOfContentTree: IStateOfContentTree) => toReturnStateOfContentEditor.StateOfContentTree = stateOfContentTree)
        .then(() => resolve(toReturnStateOfContentEditor))
        .catch((err) => reject(this.GetState.name + ' | ' + err));
      this.Logger.FuncEnd(this.GetState.name, ContentEditorSFProxy.name);
    });
  }

  async SetState(dataToRestore: IStateOfContentEditor): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, ContentEditorSFProxy.name + ' ' + Guid.AsShort(this.DocumentJacket.DocId));

      this.ErrorHand.ThrowIfNullOrUndefined(this.SetState.name + ' ' + ContentEditorSFProxy.name, dataToRestore);
      this.ErrorHand.ThrowIfNullOrUndefined(this.SetState.name + ' ' + ContentEditorSFProxy.name, dataToRestore.StateOfContentTree);
      this.ContentEditorProxyMutationEvent_Subject.DisableNotifications();

      //this.Logger.Log('Node Count in storage data: ' + dataToRestore.StateOfContentEditorTreeProxy.StateOfTreeNodes.length);

      await this.RecipeBasic.WaitForTimePeriod(1000, this.SetState.name)
        .then(() => this.RecipeBasic.WaitForNoUiFrontOverlay(this.SetState.name))
        .then(() => this.ContentTreeProxy.SetStateOfContentTree(dataToRestore.StateOfContentTree.StateOfScContentTreeNodeDeep))
        .then(() => {
          this.ContentEditorProxyMutationEvent_Subject.EnableNotifications();
          resolve(true);
        })
        .catch((err) => {
          this.ContentEditorProxyMutationEvent_Subject.EnableNotifications();
          reject(this.SetState.name + " " + err);
        });

      this.Logger.FuncEnd(this.SetState.name, ContentEditorSFProxy.name);
    });
  }

  TriggerInboundEventsAsync(): void {
    this.ErrorHand.ThrowIfNullOrUndefined(this.TriggerInboundEventsAsync.name + ' ' + ContentEditorSFProxy.name, this.ContentTreeProxy);
    this.ContentTreeProxy.TriggerActiveNodeChangeEvent();
  }

  //----------------------------------------------------------------------

  CallBackOnContentEditorProxyTreeMutationEventAsync(treeMutationEvent_Payload: IContentTreeProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallBackOnContentEditorProxyTreeMutationEventAsync.name);
    this.TaskMonitor.AsyncTaskStarted(this.CallBackOnContentEditorProxyTreeMutationEventAsync.name);
    let contentEditorProxyMutationEvent_Payload: IContentEditorProxyMutationEvent_Payload = {
      TreeMutationEvent_Payload: treeMutationEvent_Payload,
    }

    if (this.ContentEditorProxyMutationEvent_Subject) {
      this.ContentEditorProxyMutationEvent_Subject.NotifyObserversAsync(contentEditorProxyMutationEvent_Payload);
    }
    this.TaskMonitor.AsyncTaskCompleted(this.CallBackOnContentEditorProxyTreeMutationEventAsync.name);
    this.Logger.FuncEnd(this.CallBackOnContentEditorProxyTreeMutationEventAsync.name);
  }

  ValidateAssociatedDocContentEditor() {
    if (!this.DocumentJacket) {
      this.ErrorHand.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, 'No doc provided');
    }

    this.DocumentJacket.Validate();
  }

  async WaitForCompleteNABContentEditor(): Promise<void> {
    this.Logger.FuncStart(this.WaitForCompleteNABContentEditor.name);
    try {
      let recipeBasics = new RecipeBasics(this.HindeCore);

      // recipeBasics.WaitForCompleteNAB_DataOneDoc(this.AssociatedScDocumentProxy, this.Friendly)
      await this.DocumentJacket.WaitForCompleteNAB_NativeDocument(this.Friendly)
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.WaitForCompleteNABContentEditor.name, err));
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
  //    this.ErrorHand.WarningAndContinue(this.RegisterObserverForTreeMutation.name, 'no associated tree proxy');
  //  }
  //  this.Logger.FuncEnd(this.RegisterObserverForTreeMutation.name);
  //}

  SetCompactCss() {
    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.DocumentJacket.DocId));

    //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.DocumentJacket.DocId));
  }

  GetActiveNode(allTreeNodeAr: IStateOfScContentTreeNodeDeep[]) {
    this.Logger.FuncStart(this.GetActiveNode.name);
    let toReturn: IStateOfScContentTreeNodeDeep = null;
    if (allTreeNodeAr) {
      for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
        let candidate: IStateOfScContentTreeNodeDeep = allTreeNodeAr[idx];
        if (candidate.IsActive) {
          toReturn = candidate;
          break;
        }
      }
    } else {
      this.ErrorHand.ErrorAndThrow(this.GetActiveNode.name, 'No tree data provided');
    }

    this.Logger.FuncEnd(this.GetActiveNode.name, toReturn.Friendly);
    return toReturn;
  }
}