import { DocumentJacket } from '../../../../../DOMJacket/DocumentJacket';
import { ElementJacket } from '../../../../../DOMJacket/ElementJacket';
import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { StateFullProxyDisciminator } from '../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator';
import { Guid } from '../../../../../Shared/scripts/Helpers/Guid';
import { GuidData } from '../../../../../Shared/scripts/Helpers/GuidData';
import { IHindeCore } from '../../../../../Shared/scripts/Interfaces/Agents/IHindeCore';
import { IStateFullProxy } from '../../../../../Shared/scripts/Interfaces/Agents/IStateProxy';
import { IStateOfContentTreeBasedProxies } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTreeBasedProxies";
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { __ContentTreeBasedProxyMutationEvent__Subject } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Subject';
import { IContentEditorProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload';
import { __ContentTreeBasedProxyMutationEvent_Observer } from '../../Desktop/DesktopProxy/Events/ContentTreeProxyMutationEvent/ContentTreeProxyMutationEvent_Observer';
import { IContentTreeProxyMutationEvent_Payload } from '../../Desktop/DesktopProxy/Events/ContentTreeProxyMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { _BaseStateFullProxy } from '../../Desktop/DesktopProxy/FrameProxies/_StateProxy';
import { ContentTreeProxy } from "./ContentTreeProxy/ContentTreeProxy";

export abstract class _ContentTreeBasedProxy<T> extends _BaseStateFullProxy<T> implements IStateFullProxy {
  protected ContentTreeProxy: ContentTreeProxy;
  public readonly abstract StateFullProxyDisciminator: StateFullProxyDisciminator;
  protected TreeMutationEvent_Observer: __ContentTreeBasedProxyMutationEvent_Observer;
  public Friendly: string;
  protected RecipeBasic: RecipeBasics;
  protected DocumentJacket: DocumentJacket;
  readonly AssociatedHindsiteId: GuidData;
  public __ContentTreeBasedProxyMutationEvent_Subject: __ContentTreeBasedProxyMutationEvent__Subject;
  readonly abstract TreeRootSelector: string;

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket, friendly: string) {
    super(hindeCore);
    this.Logger.CTORStart(_ContentTreeBasedProxy.name);
    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.DocumentJacket = documentJacket;

    this.Friendly = friendly
    this.AssociatedHindsiteId = Guid.NewRandomGuid();
    this.ValidateAssociatedDocContentEditor();
    this.Friendly = friendly

    this.Instantiate();
    this.Logger.CTOREnd(_ContentTreeBasedProxy.name);
  }

  private Instantiate() {
    this.RecipeBasic = new RecipeBasics(this.HindeCore);
  }

  async __baseInstantiateAsyncMembers(): Promise<void> {
    await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket(this.Friendly)// this.RecipeBasic.WaitForCompleteNAB_DataOneDoc(this.AssociatedScDocumentProxy, this.Friendly)
      .then(() => this.DocumentJacket.WaitForAndReturnFoundElemJacketFromDoc(ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeContainer))
      .then((treeContainer: ElementJacket) => this.ContentTreeProxy = new ContentTreeProxy(this.HindeCore, this.DocumentJacket, treeContainer, this.TreeRootSelector))
      .then(() => this.ContentTreeProxy.Instantiate_TreeProxy())
      .then(() => {
        this.__ContentTreeBasedProxyMutationEvent_Subject = new __ContentTreeBasedProxyMutationEvent__Subject(this.HindeCore);
        this.TreeMutationEvent_Observer = new __ContentTreeBasedProxyMutationEvent_Observer(this.HindeCore, this.CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync.bind(this));
      })
      .then(() => { })
      .catch((err) => this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err));
  }
  protected __baseWireEvents() {
    this.ContentTreeProxy.TreeMutationEvent_Subject.RegisterObserver(this.TreeMutationEvent_Observer);
  }

  async __baseSetState(stateOfContentTreeBasedProxies: IStateOfContentTreeBasedProxies): Promise<Boolean> {
    return new Promise<boolean>(async (resolve, reject) => {


      this.ErrorHand.ThrowIfNullOrUndefined(this.SetState.name + ' ' + _ContentTreeBasedProxy.name, stateOfContentTreeBasedProxies);
      this.ErrorHand.ThrowIfNullOrUndefined(this.SetState.name + ' ' + _ContentTreeBasedProxy.name, stateOfContentTreeBasedProxies.StateOfContentTree);
      this.__ContentTreeBasedProxyMutationEvent_Subject.DisableNotifications();


     await this.RecipeBasic.WaitForTimePeriod(1, this.SetState.name)
        .then(() => this.RecipeBasic.WaitForNoUiFrontOverlay(this.SetState.name))
        .then(() => this.ContentTreeProxy.SetStateOfContentTree(stateOfContentTreeBasedProxies.StateOfContentTree.StateOfScContentTreeNodeDeep))
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

  CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync(treeMutationEvent_Payload: IContentTreeProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync.name);
    this.TaskMonitor.AsyncTaskStarted(this.CallBackOn__ContentTreeBasedProxyTreeMutationEventAsync.name);
    let contentEditorProxyMutationEvent_Payload: IContentEditorProxyMutationEvent_Payload = {
      TreeMutationEvent_Payload: treeMutationEvent_Payload,
    }

    if (this.__ContentTreeBasedProxyMutationEvent_Subject) {
      this.__ContentTreeBasedProxyMutationEvent_Subject.NotifyObserversAsync(contentEditorProxyMutationEvent_Payload);
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