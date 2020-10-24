import { DocumentJacket } from '../../../../../DOMJacket/scripts/Document/DocumentJacket';
import { IterationDrone } from '../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { _baseDefaultStateOfContentTreeBasedProxies } from '../../../../../Shared/scripts/Classes/Defaults/_baseDefaultStateOfContentTreeBasedProxies';
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from '../../../../../Shared/scripts/Helpers/GuidData';
import { IJacketOfType } from "../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from '../../../../../Shared/scripts/Interfaces/Agents/IAPICore';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { IScDocProxy } from '../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy';
import { IStateOfContentTree } from '../../../../../Shared/scripts/Interfaces/StateOf/IStateOfContentTree';
import { IStateOfContentTreeBasedProxies } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfContentTreeBasedProxies";
import { __ContentTreeBasedProxyMutationEvent__Subject } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Subject';
import { I_ContentTreeBasedProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload';
import { ContentTreeBasedProxyMutationEvent_Observer } from '../../Desktop/DesktopProxy/Events/ContentTreeProxyMutationEvent/ContentTreeProxyMutationEvent_Observer';
import { IContentTreeProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentTreeProxyMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { ScDocProxy } from '../../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy';
import { ContentTreeElemProxy } from "./ContentTreeProxy/ContentTreeProxy";

export abstract class _ContentTreeBasedDocProxy<T extends _baseDefaultStateOfContentTreeBasedProxies> extends ScDocProxy<T> implements IScDocProxy {
  protected ContentTreeProxy: ContentTreeElemProxy;
  protected DocumentJacket: DocumentJacket;
  protected TreeMutationEvent_Observer: ContentTreeBasedProxyMutationEvent_Observer;
  public __ContentTreeBasedProxyMutationEvent_Subject: __ContentTreeBasedProxyMutationEvent__Subject;
  public abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  readonly abstract ScProxyDisciminatorFriendly: string;
  readonly abstract TreeRootSelector: string;
  readonly AssociatedHindsiteId: GuidData;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);
    this.Logger.CTORStart(_ContentTreeBasedDocProxy.name);
    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.DocumentJacket = documentJacket;
    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.ValidateAssociatedDocContentEditor();

    this.Instantiate();
    this.Logger.CTOREnd(_ContentTreeBasedDocProxy.name);
  }

  private Instantiate() {
  }

  async __baseInstantiateAsyncMembers(): Promise<void> {

    this.Logger.FuncStart([this.ScProxyDisciminatorFriendly, this.__baseInstantiateAsyncMembers.name]);


    await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket(_ContentTreeBasedDocProxy.name)// this.RecipeBasic.WaitForCompleteNAB_DataOneDoc(this.AssociatedScDocumentProxy, this.Friendly)
      .then(() => this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeContainer))
      .then((treeContainer: IJacketOfType) => this.ContentTreeProxy = new ContentTreeElemProxy(this.ApiCore, this.DocumentJacket, treeContainer, this.TreeRootSelector))
      .then(() => this.ContentTreeProxy.InstantiateAsyncMembersSelf())
      .then(() => {
        this.__ContentTreeBasedProxyMutationEvent_Subject = new __ContentTreeBasedProxyMutationEvent__Subject(this.ApiCore);
        this.TreeMutationEvent_Observer = new ContentTreeBasedProxyMutationEvent_Observer(this.ApiCore, this.CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync.bind(this));
      })
      .then(() => { })
      .catch((err: any) => this.ErrorHand.HandleFatalError(this.__baseInstantiateAsyncMembers.name, err));

    this.Logger.FuncEnd([this.ScProxyDisciminatorFriendly, this.__baseInstantiateAsyncMembers.name]);
  }

  protected __baseWireEvents():void {
    this.ContentTreeProxy.WireEvents_TreeProxy();
    this.ContentTreeProxy.ContentTreeMutationEvent_Subject.RegisterObserver(this.TreeMutationEvent_Observer);
  }

  async __baseSetState(stateOfContentTreeBasedProxies: IStateOfContentTreeBasedProxies): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.SetStateSelf.name + ' ' + _ContentTreeBasedDocProxy.name, stateOfContentTreeBasedProxies);
      this.ErrorHand.ThrowIfNullOrUndefined(this.SetStateSelf.name + ' ' + _ContentTreeBasedDocProxy.name, stateOfContentTreeBasedProxies.ContentTree);
      this.__ContentTreeBasedProxyMutationEvent_Subject.DisableNotifications();

      await this.WaitForTimePeriod(1, this.SetStateSelf.name)
        .then(() => this.WaitForNoUiFrontOverlay(this.SetStateSelf.name))
        .then(() => this.ContentTreeProxy.SetStateSelf(stateOfContentTreeBasedProxies.ContentTree))
        .then(() => {
          this.__ContentTreeBasedProxyMutationEvent_Subject.EnableNotifications();
          resolve(true);
        })
        .catch((err: any) => {
          this.__ContentTreeBasedProxyMutationEvent_Subject.EnableNotifications();
          reject(this.SetStateSelf.name + " " + err);
        });
    });
  }

  WaitForNoUiFrontOverlay(friendly: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNoUiFrontOverlay.name, friendly);
      var iterationJr: IterationDrone = new IterationDrone(this.ApiCore, this.WaitForNoUiFrontOverlay.name, true);

      let overLayExists: boolean = true;

      let iframeElem: HTMLIFrameElement = <HTMLIFrameElement>document.getElementById('jqueryModalDialogsFrame');
      let iframeContentDoc: Document = iframeElem.contentDocument;
      let iframeContentDocBody: HTMLBodyElement = <HTMLBodyElement>iframeContentDoc.body;

      while (iterationJr.DecrementAndKeepGoing() && overLayExists) {
        await iterationJr.Wait();

        let foundElem: HTMLElement = iframeContentDocBody.querySelector(':scope > .ui-widget-overlay.ui-front');
        overLayExists = foundElem !== null;
      }

      if (iterationJr.IsExhausted) {
        this.Logger.Log(iterationJr.IsExhaustedMsg);
        reject(iterationJr.IsExhaustedMsg);
      } else {
        resolve();
      }
      this.Logger.FuncEnd(this.WaitForNoUiFrontOverlay.name, friendly);
    });
  }

  __BaseTriggerInboundEventsAsync(): void {
    this.ErrorHand.ThrowIfNullOrUndefined(this.__BaseTriggerInboundEventsAsync.name + ' ' + _ContentTreeBasedDocProxy.name, this.ContentTreeProxy);
    this.ContentTreeProxy.TriggerInboundEventAsync();
  }

  __baseGetState(): Promise<IStateOfContentTreeBasedProxies> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(_ContentTreeBasedDocProxy.name, this.__baseGetState.name);

      let toReturn: IStateOfContentTreeBasedProxies = {
        DisciminatorFriendly: ScProxyDisciminator[this.ScProxyDisciminator],
        Disciminator: this.ScProxyDisciminator,
        ContentTree: null,
        StateOfHostedProxies: null,
      }

      await this.ContentTreeProxy.GetStateOfSelf()
        .then((stateOfContentTree: IStateOfContentTree) => toReturn.ContentTree = stateOfContentTree)
        .then(() => resolve(toReturn))
        .catch((err: any) => reject(this.GetStateOfSelf.name + ' | ' + err));
      this.Logger.FuncEnd(_ContentTreeBasedDocProxy.name, this.__baseGetState.name);
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
      this.ErrorHand.HandleFatalError(this.ValidateAssociatedDocContentEditor.name, 'No doc provided');
    }

    this.DocumentJacket.Validate();
  }
}