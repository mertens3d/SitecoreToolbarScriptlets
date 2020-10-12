import { DocumentJacket } from '../../../../../DOMJacket/DocumentJacket';
import { ElementJacket } from '../../../../../DOMJacket/ElementJacket';
import { _baseDefaultStateOfContentTreeBasedProxies } from '../../../../../Shared/scripts/Classes/Defaults/_baseDefaultStateOfContentTreeBasedProxies';
import { RecipeBasics } from '../../../RecipeBasics';
import { StateFullProxyDisciminator } from '../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from '../../../../../Shared/scripts/Helpers/GuidData';
import { IAPICore } from '../../../../../Shared/scripts/Interfaces/Agents/IAPICore';
import { IStateFullProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IStateProxy';
import { IStateOfContentTree } from '../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree';
import { IStateOfContentTreeBasedProxies } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTreeBasedProxies";
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { __ContentTreeBasedProxyMutationEvent__Subject } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Subject';
import { I_ContentTreeBasedProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload';
import { ContentTreeBasedProxyMutationEvent_Observer } from '../../Desktop/DesktopProxy/Events/ContentTreeProxyMutationEvent/ContentTreeProxyMutationEvent_Observer';
import { IContentTreeProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentTreeProxyMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { _BaseStateFullProxy } from '../../Desktop/DesktopProxy/FrameProxies/_StateProxy';
import { ContentTreeProxy } from "./ContentTreeProxy/ContentTreeProxy";

export abstract class _ContentTreeBasedProxy<T extends _baseDefaultStateOfContentTreeBasedProxies> extends _BaseStateFullProxy<T> implements IStateFullProxy {
  protected ContentTreeProxy: ContentTreeProxy;
  protected DocumentJacket: DocumentJacket;
  protected RecipeBasic: RecipeBasics;
  protected TreeMutationEvent_Observer: ContentTreeBasedProxyMutationEvent_Observer;
  public __ContentTreeBasedProxyMutationEvent_Subject: __ContentTreeBasedProxyMutationEvent__Subject;
  public abstract readonly  StateFullProxyDisciminator: StateFullProxyDisciminator;
  readonly abstract  StateFullProxyDisciminatorFriendly: string;
  readonly abstract TreeRootSelector: string;
  readonly AssociatedHindsiteId: GuidData;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.Logger.CTORStart(_ContentTreeBasedProxy.name);
    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.DocumentJacket = documentJacket;
    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.ValidateAssociatedDocContentEditor();

    this.Instantiate();
    this.Logger.CTOREnd(_ContentTreeBasedProxy.name);
  }

  private Instantiate() {
    this.RecipeBasic = new RecipeBasics(this.ApiCore);
  }

  async __baseInstantiateAsyncMembers(): Promise<void> {
    await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket(this.Friendly)// this.RecipeBasic.WaitForCompleteNAB_DataOneDoc(this.AssociatedScDocumentProxy, this.Friendly)
      .then(() => this.DocumentJacket.WaitForElem(ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeContainer))
      .then((treeContainer: ElementJacket) => this.ContentTreeProxy = new ContentTreeProxy(this.ApiCore, this.DocumentJacket, treeContainer, this.TreeRootSelector))
      .then(() => this.ContentTreeProxy.Instantiate_TreeProxyAsyncElem())
      .then(() => {
        this.__ContentTreeBasedProxyMutationEvent_Subject = new __ContentTreeBasedProxyMutationEvent__Subject(this.ApiCore);
        this.TreeMutationEvent_Observer = new ContentTreeBasedProxyMutationEvent_Observer(this.ApiCore, this.CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync.bind(this));
      })
      .then(() => { })
      .catch((err) => this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err));
  }
  protected __baseWireEvents() {
    this.ContentTreeProxy.WireEvents_TreeProxy();
    this.ContentTreeProxy.ContentTreeMutationEvent_Subject.RegisterObserver(this.TreeMutationEvent_Observer);
  }

  async __baseSetState(stateOfContentTreeBasedProxies: IStateOfContentTreeBasedProxies): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.SetState.name + ' ' + _ContentTreeBasedProxy.name, stateOfContentTreeBasedProxies);
      this.ErrorHand.ThrowIfNullOrUndefined(this.SetState.name + ' ' + _ContentTreeBasedProxy.name, stateOfContentTreeBasedProxies.ContentTree);
      this.__ContentTreeBasedProxyMutationEvent_Subject.DisableNotifications();

      await this.RecipeBasic.WaitForTimePeriod(1, this.SetState.name)
        .then(() => this.RecipeBasic.WaitForNoUiFrontOverlay(this.SetState.name))
        .then(() => this.ContentTreeProxy.SetStateOfContentTree(stateOfContentTreeBasedProxies.ContentTree.ContentTreeNodeDeep))
        .then(() => {
          this.__ContentTreeBasedProxyMutationEvent_Subject.EnableNotifications();
          resolve(true);
        })
        .catch((err) => {
          this.__ContentTreeBasedProxyMutationEvent_Subject.EnableNotifications();
          reject(this.SetState.name + " " + err);
        });
    });
  }

  __BaseTriggerInboundEventsAsync(): void {
    this.ErrorHand.ThrowIfNullOrUndefined(this.TriggerInboundEventsAsync.name + ' ' + _ContentTreeBasedProxy.name, this.ContentTreeProxy);
    this.ContentTreeProxy.TriggerActiveNodeChangeEvent();
  }

  __baseGetState(): Promise<IStateOfContentTreeBasedProxies> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(_ContentTreeBasedProxy.name, this.__baseGetState.name);

      let toReturn: IStateOfContentTreeBasedProxies = {
        Disciminator : this.StateFullProxyDisciminator,
        DisciminatorFriendly : StateFullProxyDisciminator[this.StateFullProxyDisciminator],
        ContentTree : null
      }


      await this.ContentTreeProxy.GetStateOfContentTree()
        .then((stateOfContentTree: IStateOfContentTree) => toReturn.ContentTree = stateOfContentTree)
        .then(() => resolve(toReturn))
        .catch((err) => reject(this.GetState.name + ' | ' + err));
      this.Logger.FuncEnd(_ContentTreeBasedProxy.name, this.__baseGetState.name);
    });
  }

  CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync(treeMutationEvent_Payload: IContentTreeProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync.name);
    this.TaskMonitor.AsyncTaskStarted(this.CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync.name);
    let _contentEditorProxyMutationEvent_Payload: I_ContentTreeBasedProxyMutationEvent_Payload = {
      TreeMutationEvent_Payload: treeMutationEvent_Payload,
    }

    if (this.__ContentTreeBasedProxyMutationEvent_Subject) {
      this.__ContentTreeBasedProxyMutationEvent_Subject.NotifyObserversAsync(_contentEditorProxyMutationEvent_Payload);
    }
    this.TaskMonitor.AsyncTaskCompleted(this.CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync.name);
    this.Logger.FuncEnd(this.CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync.name);
  }

  private ValidateAssociatedDocContentEditor() {
    if (!this.DocumentJacket) {
      this.ErrorHand.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, 'No doc provided');
    }

    this.DocumentJacket.Validate();
  }
}