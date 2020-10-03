import { DefaultStateOfContentEditor } from '../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentEditor';
import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { InitReportContentEditorProxy } from '../../../../../Shared/scripts/Interfaces/Agents/InitResultContentEditorProxy';
import { IScStateFullProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IStateProxy';
import { IStateOfContentEditor } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor';
import { IStateOfContentTree } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree';
import { IStateOfScContentTreeNodeDeep } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { ContentEditorProxyMutationEvent_Subject } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Subject';
import { IContentEditorProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload';
import { ContentTreeProxyMutationEvent_Observer } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/ContentTreeProxyMutationEvent_Observer';
import { IContentTreeProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/TreeMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { _BaseScStateFullProxy } from '../../Desktop/DesktopProxy/FrameProxies/_StateProxy';
import { ScDocumentProxy } from "../../ScDocumentProxy";
import { ContentEditorPublishProxy } from './ContentEditorPublishProxy';
import { ContentTreeProxy } from "./ContentTreeProxy/ContentTreeProxy";

export class ContentEditorProxy extends _BaseScStateFullProxy<IStateOfContentEditor> implements IScStateFullProxy {
  private ContentTreeProxy: ContentTreeProxy;
  private TreeMutationEvent_Observer: ContentTreeProxyMutationEvent_Observer;
  public ContentEditorProxyMutationEvent_Subject: ContentEditorProxyMutationEvent_Subject;
  readonly AssociatedScDocumentProxy: ScDocumentProxy;
  readonly AssociatedHindsiteId: GuidData;
  initResultContentEditorProxy: InitReportContentEditorProxy;
  Friendly: string;
  private RecipeBasic: RecipeBasics;

  constructor(hindeCore: IHindeCore, associatedDoc: ScDocumentProxy, friendly: string)
  constructor(hindeCore: IHindeCore, associatedDoc: ScDocumentProxy, friendly: string)
  constructor(hindeCore: IHindeCore, associatedDoc: ScDocumentProxy | ScDocumentProxy, friendly: string) {
    super(hindeCore);
    this.Logger.CTORStart(ContentEditorProxy.name);
    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.AssociatedScDocumentProxy = associatedDoc;
    this.ValidateAssociatedDocContentEditor();
    this.Friendly = friendly
    this.Logger.CTOREnd(ContentEditorProxy.name);
  }

  async PublishItem(): Promise<void> {
    let publishProxy = new ContentEditorPublishProxy(this.HindeCore, this, this.AssociatedScDocumentProxy);
    await publishProxy.Execute();
  }

  async Instantiate(): Promise<void> {
    this.Logger.FuncStart(this.Instantiate.name, ContentEditorProxy.name);
    try {
      this.initResultContentEditorProxy = new InitReportContentEditorProxy();
      this.RecipeBasic = new RecipeBasics(this.HindeCore);
      await this.AssociatedScDocumentProxy.WaitForCompleteNAB_ScDocumentProxy(this.Friendly)// this.RecipeBasic.WaitForCompleteNAB_DataOneDoc(this.AssociatedScDocumentProxy, this.Friendly)
        .then(() => {
          this.ContentEditorProxyMutationEvent_Subject = new ContentEditorProxyMutationEvent_Subject(this.HindeCore);
          this.TreeMutationEvent_Observer = new ContentTreeProxyMutationEvent_Observer(this.HindeCore, this.CallBackOnContentEditorProxyTreeMutationEventAsync.bind(this));
        })
        .then(() => this.RecipeBasic.WaitForAndReturnFoundElem(this.AssociatedScDocumentProxy, ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeContainer))
        .then((treeContainer: HTMLElement) => this.ContentTreeProxy = new ContentTreeProxy(this.HindeCore, this.AssociatedScDocumentProxy, treeContainer))
        .then(() => this.ContentTreeProxy.Instantiate_TreeProxy())
        .then(() => this.initResultContentEditorProxy.ContentEditorProxyInitialized = true)
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.Instantiate.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Instantiate.name, err);
    }
    this.Logger.FuncEnd(this.Instantiate.name, ContentEditorProxy.name);
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, ContentEditorProxy.name);
    this.ContentTreeProxy.WireEvents_TreeProxy()
    this.ContentTreeProxy.TreeMutationEvent_Subject.RegisterObserver(this.TreeMutationEvent_Observer);
    this.Logger.FuncEnd(this.WireEvents.name, ContentEditorProxy.name);
  }

  GetState(): Promise<IStateOfContentEditor> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, ContentEditorProxy.name);

      let toReturnStateOfContentEditor: IStateOfContentEditor = new DefaultStateOfContentEditor();

      await this.ContentTreeProxy.GetStateOfContentTree()
        .then((stateOfContentTree: IStateOfContentTree) => toReturnStateOfContentEditor.StateOfContentTree = stateOfContentTree)
        .then(() => resolve(toReturnStateOfContentEditor))
        .catch((err) => reject(this.GetState.name + ' | ' + err));
      this.Logger.FuncEnd(this.GetState.name, ContentEditorProxy.name);
    });
  }

  async SetState(dataToRestore: IStateOfContentEditor): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, ContentEditorProxy.name + ' ' + Guid.AsShort(this.AssociatedScDocumentProxy.DocId));

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

      this.Logger.FuncEnd(this.SetState.name, ContentEditorProxy.name);
    });
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
  TriggerActiveNodeChangeEvent() {
    this.ErrorHand.ThrowIfNullOrUndefined(this.TriggerActiveNodeChangeEvent.name, this.ContentTreeProxy);
    this.ContentTreeProxy.TriggerActiveNodeChangeEvent();
  }

  ValidateAssociatedDocContentEditor() {
    if (!this.AssociatedScDocumentProxy) {
      this.ErrorHand.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, 'No doc provided');
    }

    this.AssociatedScDocumentProxy.Validate();
  }

  async WaitForCompleteNABContentEditor(): Promise<void> {
    this.Logger.FuncStart(this.WaitForCompleteNABContentEditor.name);
    try {
      let recipeBasics = new RecipeBasics(this.HindeCore);

      // recipeBasics.WaitForCompleteNAB_DataOneDoc(this.AssociatedScDocumentProxy, this.Friendly)
      await this.AssociatedScDocumentProxy.WaitForCompleteNAB_ScDocumentProxy(this.Friendly)
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
    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.AssociatedScDocumentProxy.DocId));

    //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);

    this.Logger.FuncStart(this.SetCompactCss.name, Guid.AsShort(this.AssociatedScDocumentProxy.DocId));
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