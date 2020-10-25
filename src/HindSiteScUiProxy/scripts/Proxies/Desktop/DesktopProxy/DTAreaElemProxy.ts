import { FrameJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { ElementJacketMutationEvent_Observer } from "../../../../../DOMJacket/scripts/Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Observer";
import { ElementJacketMutationEvent_Subject } from "../../../../../DOMJacket/scripts/Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Subject";
import { IElementJacketMutationEvent_Payload } from "../../../../../DOMJacket/scripts/Events/ElementJacketMutationEvent/IElementJacketMutationEvent_Payload";
import { DefaultStateOfDTArea } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDTArea";
import { StaticHelpers } from "../../../../../Shared/scripts/Classes/StaticHelpers";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/50 - scWindowType";
import { APICommandFlag } from "../../../../../Shared/scripts/Enums/APICommand";
import { IElemJacketWatcherParameters } from "../../../../../Shared/scripts/IElemJacketWatcherParameters";
import { IJacketOfType } from "../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy";
import { IScElemProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullElemProxy";
import { IScFrameProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { IStateOfGenericFrame } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDTFrame";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDTProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";
import { DTAreaValidProxies } from "../../../Collections/DTAreaValidProxies";
import { ContentEditorDocProxy } from "../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ScDocProxyResolver } from "../../ScDocProxyResolver";
import { DTAreaProxyMutationEvent_Subject } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Subject";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Observer } from "./Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer";
import { IDTFrameProxyMutationEvent_Payload } from "./Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { GenericFrameProxy } from "./FrameProxies/GenericFrameProxy";
import { _BaseElemProxy } from "./FrameProxies/_BaseElemProxy";

export class DTAreaElemProxy extends _BaseElemProxy<IStateOfDTArea> implements IScElemProxy {
  public readonly ScProxyDisciminator = ScProxyDisciminator.DTArea;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.DTArea];
  private DTFrameProxyManyMutationEvent_Observer: DTFrameProxyMutationEvent_Observer;
  private IncomingSetStateList: IStateOfGenericFrame[] = [];
  private DocumentProxyMutationEvent_Observer: ElementJacketMutationEvent_Observer;

  public DTAreaProxyMutationEvent_Subject: DTAreaProxyMutationEvent_Subject;
  private JqueryModalDialogsFrameProxy: IScFrameProxy;
  ElemJacketMutationEvent_Subject: ElementJacketMutationEvent_Subject;
  //JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;
  //DocumentJacketWatcher: DocumentJacket_Watcher;
  constructor(apiCore: IAPICore, jqueryModalDialogsFrameProxy: IScFrameProxy, containerElemJacket: IJacketOfType) {
    super(apiCore, containerElemJacket);

    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;
    this.ErrorHand.ThrowIfNullOrUndefined(DTAreaElemProxy.name, [containerElemJacket, this.JqueryModalDialogsFrameProxy]);
  }

  protected async InstantiateAwaitElementsSelf(): Promise<void> {
    this.Logger.FuncStart([DTAreaElemProxy.name, this.InstantiateAwaitElementsSelf.name]);

    try {
      this.DTAreaProxyMutationEvent_Subject = new DTAreaProxyMutationEvent_Subject(this.ApiCore);
      this.DTFrameProxyManyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer(this.ApiCore, this.OnDTFProxyMutationEvent.bind(this));
      this.DocumentProxyMutationEvent_Observer = new ElementJacketMutationEvent_Observer(this.ApiCore, this.CallBackOnElementMutationEvent.bind(this));

      //this.AddJqueryProxy();
      //this.DocumentJacketWatcher = new DocumentJacket_Watcher(this.ApiCore, this.AssociatedScDocumentJacket);
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateAwaitElementsSelf.name, err);
    }
    this.Logger.FuncEnd([DTAreaElemProxy.name, this.InstantiateAwaitElementsSelf.name]);
  }

  public WireEventsSelf(): void {
    this.Logger.FuncStart([DTAreaElemProxy.name, this.WireEventsSelf.name]);

    //mutationObserver.observe(this.WatcherParams.ContainerJacket.NativeElement, { attributes: false, subtree: false, childList: true });
    let watcherParams: IElemJacketWatcherParameters = {
      OwnerFriendly: DTAreaElemProxy.name,
      Attributes: false,
      ChildList: true,
      Subtree: false,
      TagFilter: ['IFRAME']
    };

    //this.ContainerElemJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.Desktop.Id)
    //  .then((elemJacket: FrameElemJacket) => desktopElemJacket = elemJacket)
    this.ContainerElemJacket.AddWatcher(watcherParams)
      .then((elemJacketWatcher: ElementJacketMutationEvent_Subject) => this.ElemJacketMutationEvent_Subject = elemJacketWatcher)
      //.then(() =>  this.AssociatedScDocumentJacket.DocumentJacketMutationEvent_Subject.RegisterObserver(this.DocumentProxyMutationEvent_Observer);)
      .then(() => this.ElemJacketMutationEvent_Subject.RegisterObserver(this.DocumentProxyMutationEvent_Observer))
      .catch((err: any) => this.ErrorHand.HandleFatalError([DTAreaElemProxy.name, this.WireEventsSelf.name], err));

    this.Logger.FuncEnd([DTAreaElemProxy.name, this.WireEventsSelf.name]);
  }

  GetStateOfSelf(): Promise<IStateOfDTArea> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([DTAreaElemProxy.name, this.GetStateOfSelf.name]);
      let stateOfDTArea: IStateOfDTArea = new DefaultStateOfDTArea();
      let promiseAr: Promise<IStateOfGenericFrame>[] = [];

      //for (let idx = 0; idx < this.HostedProxies.length; idx++) {
      //  let dtframeProxy: DTFrameProxy<IStateOf_> = this.HostedProxies[idx];
      //  promiseAr.push(dtframeProxy.GetStateSelf());
      //}

      // todo - being done by base await this.GetStateOfHosted()
      //  .then((states: IStateOf_[]) => stateOfDTArea.Children = states)
      //  .catch((err: any) => reject(this.GetStateOfSelf.name + ' | ' + err));

      resolve(stateOfDTArea);

      //this.Logger.LogImportant('Count ' + promiseAr.length);
      //await Promise.all(promiseAr)
      //  .then((stateOfDTFrames: IStateOfDTFrame[]) => {
      //    stateOfDTFrames.forEach((stateOfDTFrame: IStateOfDTFrame, index: number) => {
      //      stateOfDTArea.DTFrames.push(stateOfDTFrame);
      //      if (stateOfDTFrame.ZIndex === 1) {
      //        stateOfDTArea.ActiveFrameIndex = index;
      //      }
      //    });
      //  })
      //  .then(() => this.Logger.LogAsJsonPretty('DTAreaState', stateOfDTArea))
      //  .then(() => resolve(stateOfDTArea))
      //  .catch((err: any) => reject(this.GetStateOfSelf.name + ' | ' + err));

      this.Logger.FuncEnd([DTAreaElemProxy.name, this.GetStateOfSelf.name]);
    });
  }

  GetProxiesToSpawn(proxyStates: IStateOf_[]): ScProxyDisciminator[] {
    this.Logger.FuncStart(this.GetProxiesToSpawn.name, DTAreaElemProxy.name);
    //let dtFramesNeeded: IDTFramesNeeded = {
    //  DiscriminatorAr: []
    //};
    let toReturn: ScProxyDisciminator[] = [];

    if (proxyStates) {
      if (!StaticHelpers.IsNullOrUndefined([this.ContainerElemJacket])) {
        proxyStates.forEach((stateOf: IStateOf_) => {
          if (DTAreaValidProxies.Values.indexOf(stateOf.Disciminator) > -1) {
           //todo - put back? this.AddToIncomingSetStateList(stateOf);
          } else {
            this.ErrorHand.WarningAndContinue(this.GetProxiesToSpawn.name, 'invalid discriminator ' + ScProxyDisciminator[stateOf.Disciminator]);
          }

          stateOf.Children.forEach((hostedProxy: IStateOf_) =>
            toReturn.push(hostedProxy.Disciminator)
          )
        });
      } else {
        this.ErrorHand.HandleFatalError(this.GetProxiesToSpawn.name, ' bad data');
      }
    } else {
      this.ErrorHand.HandleFatalError(this.GetProxiesToSpawn.name, '  No state provided');
    }

    this.Logger.FuncEnd(this.GetProxiesToSpawn.name, DTAreaElemProxy.name);
    return toReturn;
  }

  TriggerEventsForInboundSelf(): void {
  }

  //---------------------------------------------------------------------------------------------
  private async CallBackOnElementMutationEvent(elementJacketMutationEvent_Payload: IElementJacketMutationEvent_Payload): Promise<void> {
    this.Logger.FuncStart([DTAreaElemProxy.name, this.CallBackOnElementMutationEvent.name]);
    try {
      if (elementJacketMutationEvent_Payload.AddedGenericElemJacket && elementJacketMutationEvent_Payload.AddedGenericElemJacket.NodeTagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
        await this.HandleAddedJacketOfType(<FrameJacket>elementJacketMutationEvent_Payload.AddedGenericElemJacket)
          .then(() => this.HandleRemovedIframe(elementJacketMutationEvent_Payload.RemovedIFrameId))
          .then(() => { })
          .catch((err: any) => this.ErrorHand.HandleFatalError(this.CallBackOnElementMutationEvent.name, err));
      }
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.CallBackOnElementMutationEvent.name, err);
    }

    this.Logger.FuncEnd([DTAreaElemProxy.name, this.CallBackOnElementMutationEvent.name]);
  }

  private async HandleAddedJacketOfType(genericElemJacket: IJacketOfType): Promise<void> {
    this.Logger.FuncStart([DTAreaElemProxy.name, this.HandleAddedJacketOfType.name]);

    if (genericElemJacket) {
      if (genericElemJacket.NodeTagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
        this.HandleAddedFrameJacket(genericElemJacket);
      }
    } else {
      this.Logger.Log('Not a FrameJacket - no action');
    }

    this.Logger.FuncEnd([DTAreaElemProxy.name, this.HandleAddedJacketOfType.name]);
  }

  private async HandleAddedFrameJacket(genericElemJacket: IJacketOfType): Promise<void> {
    this.Logger.FuncStart(this.HandleAddedFrameJacket.name);

    let newScFrameProxy: IScFrameProxy = null;
    let frameElemJacket: FrameJacket = null;

    await FrameJacket.FactoryFrameElemJackets(this.CommonCore, [genericElemJacket])
      .then((frameElemjackets: FrameJacket[]) => frameElemJacket = frameElemjackets[0])
      //.then(() => frameElemJacket.WaitForCompleteNABFrameElement(this.HandleAddedJacketOfType.name))
      //.then(() => this.Logger.LogVal('URL', frameElemJacket.DocumentJacket.UrlJacket.GetOriginalURL()))
      .then(() => GenericFrameProxy.ScFrameProxyFactory(this.ApiCore, frameElemJacket, this.JqueryModalDialogsFrameProxy))
      .then((scFrameProxy: IScFrameProxy) => newScFrameProxy = scFrameProxy)
      //.then(() => newScFrameProxy.InstantiateChildrenSelf())
      //.then(() => newScFrameProxy.WireEventsSelf())
      .then(() => {
        let currentWindowType = newScFrameProxy.GetScWindowType();

        let stateFullProxyFactory: ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);
        let recognizedWindowtypes: ScWindowType[] = stateFullProxyFactory.ScWindowTypes();

        if (recognizedWindowtypes.indexOf(currentWindowType) < 0) {
          this.Logger.LogVal('scWindowType', ScWindowType[currentWindowType]);
          this.ErrorHand.HandleFatalError(this.HandleAddedJacketOfType.name, 'unrecognized window type aaa: ' + ScWindowType[currentWindowType]);
        }
      })
      .then(() => this.ProcessNewScFrameProxy(newScFrameProxy)) //todo - why pass the frameElemJacket instead of the dtProxy?
      .then(() => this.Logger.Log(this.HandleAddedJacketOfType.name + ' Complete'))
      .catch((err: any) => this.ErrorHand.HandleFatalError(this.HandleAddedJacketOfType.name, err));

    this.Logger.FuncEnd(this.HandleAddedFrameJacket.name);
  }

  private async HandleRemovedIframe(needleIframeId: string): Promise<void> {
    this.Logger.FuncStart([DTAreaElemProxy.name, this.HandleRemovedIframe.name], 'HandleRemovedIframe: ' + needleIframeId);
    try {
      this.Logger.LogVal('Bucket size before', this.HostedProxies.length);

      if (needleIframeId && needleIframeId.length > 0) {
        let foundMatch: number = -1;

        this.HostedProxies.forEach((hostedProxy: IBaseScProxy, index: number) => {
          let frameProxy: IScFrameProxy = <IScFrameProxy> hostedProxy;

          if (frameProxy && frameProxy.GetNativeFrameId() === needleIframeId) {
            foundMatch = index;
          }
        });

        if (foundMatch > -1) {
          this.Logger.Log('match found');
          this.HostedProxies.splice(foundMatch, 1);
        } else {
          this.ErrorHand.WarningAndContinue(this.HandleRemovedIframe.name, 'No match found for frame to be removed: ' + needleIframeId);
        }
      } else {
        this.Logger.Log("No needle id, no action");
      }

      this.Logger.LogVal('Bucket size after', this.HostedProxies.length);
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.HandleRemovedIframe.name, err);
    }
    this.Logger.FuncEnd([DTAreaElemProxy.name, this.HandleRemovedIframe.name]);
  }

  private async ProcessNewScFrameProxy(scFrameProxy: IScFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.ProcessNewScFrameProxy.name);
    try {
      await this.newFrameStep1_Instantiate(scFrameProxy)
        .then(() => this.NewFrameStep5_AddToHostedProxies(scFrameProxy))
        .then(() => this.NewFrameStep2_SetStateOfDTFrameIfQueued(scFrameProxy))
        .then(() => this.NewFrameStep3_WireEventsForArea(scFrameProxy))
        .then(() => this.NewFrameStep4_NotifyObserversOfAreaProxyMutation(scFrameProxy))
        .then(() => this.NewFrameStep6_TriggerEvents(scFrameProxy))
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.ProcessNewScFrameProxy.name, err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.ProcessNewScFrameProxy.name, err);
    }
    this.Logger.FuncEnd(this.ProcessNewScFrameProxy.name);
  }

  private async newFrameStep1_Instantiate(scFrameProxy: IScFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.newFrameStep1_Instantiate.name);
    //try {
    //  await scFrameProxy.InstantiateChildrenSelf()
    //    .then(() => { })
    //    .catch((err: any) => this.ErrorHand.HandleFatalError(this.newFrameStep1_Instantiate.name, err));
    //} catch (err: any) {
    //  this.ErrorHand.HandleFatalError(this.newFrameStep1_Instantiate.name, err);
    //}
    this.Logger.FuncEnd(this.newFrameStep1_Instantiate.name);
  }

  private GetQueuedStateForDiscriminator(needleScProxyDiscriminator: ScProxyDisciminator): IStateOf_ {
    let foundMatchingState: IStateOf_ = null;
    let foundMatchingIndex: number = -1;

    this.IncomingSetStateList.forEach((stateOf: IStateOf_, index: number) => {
      //stateOf.StateOfHostedProxies.forEach((stateOfHostedProxy: IStateOf_) => {
      if (stateOf.Disciminator === needleScProxyDiscriminator) {
        foundMatchingState = stateOf;
        foundMatchingIndex = index;
      }
      //})
    });

    if (foundMatchingIndex > -1) {
      this.IncomingSetStateList.splice(foundMatchingIndex, 1);
    }
    else {
      //it may just be a manually opened frame
      //this.ErrorHand.ErrorAndThrow(this.NewFrameStep2_SetStateOfDTFrameIfQueued.name, 'mismatch on incoming states vs open proxies');
    }

    return foundMatchingState;
  }

  private async NewFrameStep2_SetStateOfDTFrameIfQueued(scFrameProxy: IScFrameProxy): Promise<any> {
    this.Logger.FuncStart(this.NewFrameStep2_SetStateOfDTFrameIfQueued.name);

    this.Logger.LogVal('looking for discriminator: ', ScProxyDisciminator[scFrameProxy.ScProxyDisciminator]);

    let foundStateOf: IStateOf_ = this.GetQueuedStateForDiscriminator(scFrameProxy.ScProxyDisciminator);

    if (foundStateOf) {
      await scFrameProxy.SetState(foundStateOf)
        .catch((err) => this.ErrorHand.HandleFatalError([DTAreaElemProxy.name, this.NewFrameStep2_SetStateOfDTFrameIfQueued.name], err));
    } else {
      this.Logger.Log('no queued states');
    }

    this.Logger.FuncEnd(this.NewFrameStep2_SetStateOfDTFrameIfQueued.name);
  }

  private NewFrameStep3_WireEventsForArea(scFrameproxy: IScFrameProxy) {
    this.Logger.FuncStart(this.NewFrameStep3_WireEventsForArea.name);
    if (scFrameproxy.DTFrameProxyMutationEvent_Subject) {
      scFrameproxy.DTFrameProxyMutationEvent_Subject.RegisterObserver(this.DTFrameProxyManyMutationEvent_Observer);

    } else {
      this.ErrorHand.HandleFatalError([DTAreaElemProxy.name, this.NewFrameStep3_WireEventsForArea.name], 'Null ProxyMutationEvent_Subject');
    }
    //dtFrameProxy.WireEventsSelf();

    this.Logger.FuncEnd(this.NewFrameStep3_WireEventsForArea.name);
  }

  private NewFrameStep4_NotifyObserversOfAreaProxyMutation(AddedDTFrameProxy: IScFrameProxy) {
    this.Logger.FuncStart(this.NewFrameStep4_NotifyObserversOfAreaProxyMutation.name);
    let payload: IDTAreaProxyMutationEvent_Payload = {
      AddedDTFrameProxies: [AddedDTFrameProxy],
      RemovedDTFrameProxies: [],
      DTFrameProxyMutationEvent_Payload: null,
    };

    this.DTAreaProxyMutationEvent_Subject.NotifyObserversAsync(payload);
    this.Logger.FuncEnd(this.NewFrameStep4_NotifyObserversOfAreaProxyMutation.name);
  }

  private NewFrameStep5_AddToHostedProxies(scFrameProxy: IScFrameProxy): boolean {
    this.Logger.FuncStart(this.NewFrameStep5_AddToHostedProxies.name, 'count before: ' + this.HostedProxies.length);
    let toReturn: boolean = false;
    if (!this.HostedHasSameFrameProxy(scFrameProxy)) {
      this.HostedProxies.push(scFrameProxy);
      toReturn = true;
    }
    this.Logger.FuncEnd(this.NewFrameStep5_AddToHostedProxies.name, 'count after: ' + this.HostedProxies.length);
    return (toReturn);
  }

  private NewFrameStep6_TriggerEvents(scFrameProxy: IScFrameProxy): void {
    this.Logger.FuncStart(this.NewFrameStep6_TriggerEvents.name);
    scFrameProxy.TriggerEventsForInbound();
    this.Logger.FuncEnd(this.NewFrameStep6_TriggerEvents.name);
  }

  ////async PopulateFrameBucketWithExistingFrames(): Promise<void> {
  ////  try {
  ////    await this.FrameHelper.GetIFramesAsBaseFrameProxies(this.AssociatedDoc)
  ////      .then((frameProxies: DTFrameProxy[]) => {
  ////        frameProxies.forEach(async (frameProxy: _BaseFrameProxy) => {
  ////          this.ProcessNewFrameProxy(<DTFrameProxy>frameProxy);
  ////        });
  ////      });
  ////  }
  ////  catch (err: any) {
  ////    this.ErrorHand.ErrorAndThrow(this.PopulateFrameBucketWithExistingFrames.name, err);
  ////  }
  ////}
  //OnDTAreaProxyMutationEvent(payload: IDTAreaProxyMutationEvent_Payload) {
  //  this.Logger.FuncStart(this.OnDTAreaProxyMutationEvent.name);
  //  let
  //  this.Logger.FuncEnd(this.OnDTAreaProxyMutationEvent.name);
  //}
  OnDTFProxyMutationEvent(dTFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnDTFProxyMutationEvent.name);
    let dTAreaProxyMutationEvent: IDTAreaProxyMutationEvent_Payload = {
      DTFrameProxyMutationEvent_Payload: dTFrameProxyMutationEvent_Payload,
      AddedDTFrameProxies: [],
      RemovedDTFrameProxies: []
    };
    this.DTAreaProxyMutationEvent_Subject.NotifyObserversAsync(dTAreaProxyMutationEvent);

    this.Logger.FuncEnd(this.OnDTFProxyMutationEvent.name);
  }

  AddToIncomingSetStateList(stateOfFrame: IStateOfDTArea): void {
    this.Logger.FuncStart(this.AddToIncomingSetStateList.name, stateOfFrame.Children.length);
    stateOfFrame.Children.forEach((stateOfDTFrame: IStateOfGenericFrame) => this.IncomingSetStateList.push(stateOfDTFrame));
    this.Logger.FuncEnd(this.AddToIncomingSetStateList.name);
  }

  async PublishTopFrame() {
    let dtFrameProxy: IScFrameProxy = this.GetTopFrame();
    if (dtFrameProxy) {
      //todo - put back? //if (dtFrameProxy.StateFullProxyDisciminator === StateFullProxyDisciminator.ContentEditor) {
      //await (<ContentEditorDocProxy>dtFrameProxy.HostedStateFullProxy).PublishItem();
      //}
    }
  }

  private GetTopFrame(): IScFrameProxy {
    let toReturn: IScFrameProxy = null;
    let maxZFound: number = -1;

    this.HostedProxies.forEach((baseScProxy: IBaseScProxy) => {
      if (baseScProxy instanceof GenericFrameProxy) {
        let cadidateVal: number = baseScProxy.GetZindexAsInt();
        if (cadidateVal > maxZFound) {
          maxZFound = cadidateVal;
          toReturn = baseScProxy;
        }
      }
      //if (dtframeProxy.GetZindexAsInt() == 1) {
      //  toReturn = dtframeProxy;
      //}
    });

    this.Logger.LogVal(this.GetTopFrame.name, toReturn.GetZindexAsInt().toString());
    return toReturn;
  }

  private HostedHasSameFrameProxy(scFrameProxy: IScFrameProxy): boolean {
    let toReturn: boolean = true;

    //todo - I think we'll need to check against the iframe id
    if (this.HostedProxies.indexOf(scFrameProxy) < 0) {
      toReturn = false;
    } else {
      toReturn = true;
      this.ErrorHand.WarningAndContinue(this.HostedHasSameFrameProxy.name, 'Proxy already exists in bucket');
    }

    return toReturn;
  }

  TriggerCERibbonCommand(ribbonCommand: APICommandFlag) {
    let topFrameProxy: IScFrameProxy = this.GetTopFrame();

    //let ceRibbon: ScRibbonProxy = this.GetHostedByDisciminator(ScProxyDisciminator.ContentEditor);
    //let topProxy: IBaseScProxy = this.GetTopFrame();
    //if (topProxy) {
    //}

    if (topFrameProxy.HostedProxies[0].ScProxyDisciminator === ScProxyDisciminator.ContentEditor) {
      let contentEditorProxy: ContentEditorDocProxy = <ContentEditorDocProxy>(topFrameProxy.HostedProxies[0]);
      if (contentEditorProxy) {
        contentEditorProxy.TriggerCERibbonCommand(ribbonCommand);
      }
    }
  }
}