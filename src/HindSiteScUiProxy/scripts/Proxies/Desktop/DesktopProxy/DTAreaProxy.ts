import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../../DOMJacket/Elements/FrameElemJacket";
import { GenericElemJacket } from "../../../../../DOMJacket/Elements/GenericElemJacket";
import { DefaultStateOfDTArea } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDTArea";
import { StaticHelpers } from "../../../../../Shared/scripts/Classes/StaticHelpers";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/50 - scWindowType";
import { ScRibbonCommand } from "../../../../../Shared/scripts/Enums/eScRibbonCommand";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDTFramesNeeded } from "../../../../../Shared/scripts/Interfaces/Agents/IContentEditorCountsNeeded";
import { IStateFullElemProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDTProxy";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";
import { ContentEditorProxy } from "../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ScDocProxyResolver } from "../../ScDocProxyResolver";
import { DocumentJacketMutationEvent_Observer } from "./Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Observer";
import { ElementJacketMutationEvent_Subject } from "./Events/DocumentProxyMutationEvent/ElementJacketMutationEvent_Subject";
import { IDocumentJacketMutationEvent_Payload } from "./Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";
import { IElemJacketWatcherParameters } from "./Events/DocumentProxyMutationEvent/IElemJacketWatcherParameters";
import { DTAreaProxyMutationEvent_Subject } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Subject";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Observer } from "./Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer";
import { IDTFrameProxyMutationEvent_Payload } from "./Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { DTFrameProxy } from "./FrameProxies/DTFrameProxy";
import { _BaseStateFullDocProxy } from "./FrameProxies/_BaseStateFullDocProxy";
import { JqueryModalDialogsFrameProxy } from "../../StateLessDocProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";
import { _BaseStateFullElemProxy } from "./FrameProxies/_BaseStateFullElemProxy";
import { IStateOfDTFrame } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDTFrame";

export class DTAreaElemProxy extends _BaseStateFullElemProxy<IStateOfDTArea> implements IStateFullElemProxy {
  public readonly ScProxyDisciminator = ScProxyDisciminator.DTAreaElemProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.DTAreaElemProxy];
  private DTFrameProxyManyMutationEvent_Observer: DTFrameProxyMutationEvent_Observer;
  private FramesBucket: DTFrameProxy[] = [];
  private IncomingSetStateList: IStateOfDTFrame[] = [];
  private DocumentProxyMutationEvent_Observer: DocumentJacketMutationEvent_Observer;

  public DTAreaProxyMutationEvent_Subject: DTAreaProxyMutationEvent_Subject;
  private JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;
  ElemJacketMutationEvent_Subject: ElementJacketMutationEvent_Subject;
  //JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  //DocumentJacketWatcher: DocumentJacket_Watcher;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore, documentJacket);

    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;
    this.ErrorHand.ThrowIfNullOrUndefined(DTAreaElemProxy.name, documentJacket);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart(this.InstantiateAsyncMembers.name, DTAreaElemProxy.name);

    try {
      this.DTAreaProxyMutationEvent_Subject = new DTAreaProxyMutationEvent_Subject(this.ApiCore);//, this.OnDTAreaProxyMutationEvent.bind(this));
      this.DTFrameProxyManyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer(this.ApiCore, this.OnDTFProxyMutationEvent.bind(this));
      this.DocumentProxyMutationEvent_Observer = new DocumentJacketMutationEvent_Observer(this.ApiCore, this.CallBackOnDocumentProxyMutationEvent.bind(this));

      //this.AddJqueryProxy();

      //this.DocumentJacketWatcher = new DocumentJacket_Watcher(this.ApiCore, this.AssociatedScDocumentJacket);
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
    }
    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, DTAreaElemProxy.name);
  }

  public WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, DTAreaElemProxy.name);

    //mutationObserver.observe(this.WatcherParams.ContainerJacket.NativeElement, { attributes: false, subtree: false, childList: true });
    let watcherParams: IElemJacketWatcherParameters = {
      Friendly: DTAreaElemProxy.name,
      Attributes: false,
      ChildList: true,
      Subtree: false,
      TagFilter: ['IFRAME']
    }

    let desktopElemJacket: FrameElemJacket;
    this.HostDocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.Desktop.Id)
      .then((elemJacket: FrameElemJacket) => desktopElemJacket = elemJacket)
      .then(() => desktopElemJacket.AddWatcher(watcherParams))
      .then((elemJacketWatcher: ElementJacketMutationEvent_Subject) => this.ElemJacketMutationEvent_Subject = elemJacketWatcher)
      //.then(() =>  this.AssociatedScDocumentJacket.DocumentJacketMutationEvent_Subject.RegisterObserver(this.DocumentProxyMutationEvent_Observer);)
      .then(() => this.ElemJacketMutationEvent_Subject.RegisterObserver(this.DocumentProxyMutationEvent_Observer))
      .catch((err) => this.ErrorHand.HandleFatalError([DTAreaElemProxy.name, this.WireEvents.name], err));

    this.Logger.FuncEnd(this.WireEvents.name, DTAreaElemProxy.name);
  }

  GetState(): Promise<IStateOfDTArea> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, DTAreaElemProxy.name + ' ' + this.FramesBucket.length.toString());
      let stateOfDTArea: IStateOfDTArea = new DefaultStateOfDTArea();
      let promiseAr: Promise<IStateOfDTFrame>[] = [];

      for (let idx = 0; idx < this.FramesBucket.length; idx++) {
        let dtframeProxy: DTFrameProxy = this.FramesBucket[idx];
        promiseAr.push(dtframeProxy.GetState());
      }

      this.Logger.LogImportant('Count ' + promiseAr.length);
      await Promise.all(promiseAr)
        .then((stateOfDTFrames: IStateOfDTFrame[]) => {
          stateOfDTFrames.forEach((stateOfDTFrame: IStateOfDTFrame, index: number) => {
            stateOfDTArea.DTFrames.push(stateOfDTFrame);
            if (stateOfDTFrame.ZIndex === 1) {
              stateOfDTArea.ActiveFrameIndex = index;
            }
          });
        })
        //.then(() => this.Logger.LogAsJsonPretty('DTAreaState', stateOfDTArea))
        .then(() => resolve(stateOfDTArea))
        .catch((err) => reject(this.GetState.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetState.name, DTAreaElemProxy.name);
    });
  }

  async SetState(StateOfDTArea: IStateOfDTArea): Promise<IDTFramesNeeded> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, DTAreaElemProxy.name);
      let dtFramesNeeded: IDTFramesNeeded = {
        DiscriminatorAr: []
      }

      if (StateOfDTArea) {
        if (!StaticHelpers.IsNullOrUndefined([this.HostDocumentJacket])) {
          this.AddToIncomingSetStateList(StateOfDTArea);

          StateOfDTArea.DTFrames.forEach((dtFrame: IStateOfDTFrame) => dtFramesNeeded.DiscriminatorAr.push(dtFrame.HostedFrame.Disciminator));
        } else {
          reject(this.SetState.name + ' bad data');
        }
      } else {
        reject(this.SetState.name + '  No state provided');
      }

      resolve(dtFramesNeeded);

      this.Logger.FuncEnd(this.SetState.name, DTAreaElemProxy.name);
    });
  }

  TriggerInboundEventsAsync(): void {
  }

  //---------------------------------------------------------------------------------------------

  private async CallBackOnDocumentProxyMutationEvent(documentProxyMutationEvent_Payload: IDocumentJacketMutationEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.CallBackOnDocumentProxyMutationEvent.name);
    this.Logger.LogAsJsonPretty('payload', documentProxyMutationEvent_Payload);
    try {
      if (documentProxyMutationEvent_Payload.AddedGenericElemJacket.NodeTagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
        await this.HandleAddedGenericElemJacket(<FrameElemJacket>documentProxyMutationEvent_Payload.AddedGenericElemJacket)
          .then(() => this.HandleRemovedIframe(documentProxyMutationEvent_Payload.RemovedIFrameId))
          .then(() => { })
          .catch((err) => this.ErrorHand.HandleFatalError(this.CallBackOnDocumentProxyMutationEvent.name, err));
      }
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.CallBackOnDocumentProxyMutationEvent.name, err);
    }

    this.Logger.FuncEnd(this.CallBackOnDocumentProxyMutationEvent.name);
  }

  //private async AddJqueryProxy(): Promise<void> {
  //  let frameJacket: ElementFrameJacket = null;
  //  let dtFrameProxy: DTFrameProxy = null;

  //  this.JqueryModalDialogsFrameProxy = new JqueryModalDialogsFrameProxy(this.ApiCore, this.AssociatedScDocumentJacket);

  //  //await this.JqueryModalDialogsFrameProxy.InstantiateAsyncMembers()

  //  await this.AssociatedScDocumentJacket.WaitForFirstHostedFrame("[id=jqueryModalDialogsFrame]")
  //    .then((elemJacket: ElementFrameJacket) => frameJacket = elemJacket)
  //    .then(() => frameJacket.WaitForCompleteNABHtmlIframeElement(this.AddJqueryProxy.name))
  //    .then(() => this.Logger.LogVal('URL', frameJacket.DocumentJacket.UrlJacket.GetOriginalURL()))
  //    .then(() => dtFrameProxy = new DTFrameProxy(this.ApiCore, frameJacket, null))
  //    .then(() => dtFrameProxy.InstantiateAsyncMembers())
  //    .then(() => dtFrameProxy.WireEvents())
  //    .then(() => {
  //      let currentWindowType = dtFrameProxy.GetScWindowType();

  //      let stateFullProxyResolver: StateFullProxyResolver = new StateFullProxyResolver(this.ApiCore);
  //      let recognizedWindowtypes: ScWindowType[] = stateFullProxyResolver.RecognizedWindowTypes();

  //      if (recognizedWindowtypes.indexOf(currentWindowType) < 0) {
  //        this.Logger.LogVal('scWindowType', ScWindowType[currentWindowType]);
  //        this.ErrorHand.HandleFatalError(this.AddJqueryProxy.name, 'unrecognized window type: ' + ScWindowType[currentWindowType]);
  //      }

  //      this.JqueryModalDialogsProxy = <JqueryModalDialogsDocProxy>dtFrameProxy.HostedStateFullProxy;

  //    })
  //    .then(() => this.Logger.Log(this.HandleAddedFrameJacket.name + ' Complete'))
  //    .catch((err) => this.ErrorHand.HandleFatalError(this.AddJqueryProxy.name, err));
  //}

  private async HandleAddedGenericElemJacket(genericElemJacket: GenericElemJacket): Promise<void> {
    this.Logger.FuncStart([DTAreaElemProxy.name,  this.HandleAddedGenericElemJacket.name]);

    if (genericElemJacket) {
      if (genericElemJacket.NodeTagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
      }
    } else {
      this.Logger.Log('Not a FrameJacket - no action');
    }

    this.Logger.FuncEnd([DTAreaElemProxy.name, this.HandleAddedGenericElemJacket.name]);
  }

  private async HandleAddedFrameElemJacket(genericElemJacket: GenericElemJacket): Promise<void> {
    this.Logger.FuncStart(this.HandleAddedFrameElemJacket.name);

    let dtFrameProxy: DTFrameProxy = null;
    let frameElemJacket: FrameElemJacket = null;

    await FrameElemJacket.FactoryFrameElemJackets(this.CommonCore, [genericElemJacket])
      .then((frameElemjackets: FrameElemJacket[]) => frameElemJacket = frameElemjackets[0])
      .then(() => frameElemJacket.WaitForCompleteNABHtmlIframeElement(this.HandleAddedGenericElemJacket.name))
      .then(() => this.Logger.LogVal('URL', frameElemJacket.DocumentJacket.UrlJacket.GetOriginalURL()))
      .then(() => dtFrameProxy = new DTFrameProxy(this.ApiCore, frameElemJacket, this.JqueryModalDialogsFrameProxy))
      .then(() => dtFrameProxy.InstantiateAsyncMembers())
      .then(() => dtFrameProxy.WireEvents())
      .then(() => {
        let currentWindowType = dtFrameProxy.GetScWindowType();

        let stateFullProxyFactory: ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);
        let recognizedWindowtypes: ScWindowType[] = stateFullProxyFactory.StateFullScWindowTypes();

        if (recognizedWindowtypes.indexOf(currentWindowType) < 0) {
          this.Logger.LogVal('scWindowType', ScWindowType[currentWindowType]);
          this.ErrorHand.HandleFatalError(this.HandleAddedGenericElemJacket.name, 'unrecognized window type aaa: ' + ScWindowType[currentWindowType]);
        }
      })
      .then(() => this.ProcessInboundNativeIFrameProxy(frameElemJacket)) //todo - why pass the frameElemJacket instead of the dtProxy?
      .then(() => this.Logger.Log(this.HandleAddedGenericElemJacket.name + ' Complete'))
      .catch((err) => this.ErrorHand.HandleFatalError(this.HandleAddedGenericElemJacket.name, err));

    this.Logger.FuncEnd(this.HandleAddedFrameElemJacket.name);
  }

  private async HandleRemovedIframe(needleIframeId: string): Promise<void> {
    this.Logger.FuncStart(this.HandleRemovedIframe.name, 'HandleRemovedIframe: ' + needleIframeId);
    try {
      this.Logger.LogVal('Bucket size before', this.FramesBucket.length);

      if (needleIframeId && needleIframeId.length > 0) {
        let foundMatch: number = -1;

        this.FramesBucket.forEach((dtFrameProxy: DTFrameProxy, index: number) => {
          if (dtFrameProxy.GetNativeFrameId() === needleIframeId) {
            foundMatch = index;
          }
        });

        if (foundMatch > -1) {
          this.Logger.Log('match found');
          this.FramesBucket.splice(foundMatch, 1);
        } else {
          this.ErrorHand.WarningAndContinue(this.HandleRemovedIframe.name, 'No match found for frame to be removed: ' + needleIframeId);
        }
      } else {
        this.Logger.Log("No needle id, no action");
      }

      this.Logger.LogVal('Bucket size after', this.FramesBucket.length);
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.HandleRemovedIframe.name, err);
    }
    this.Logger.FuncEnd(this.HandleRemovedIframe.name);
  }

  private async ProcessInboundNativeIFrameProxy(nativeIframeProxy: FrameElemJacket): Promise<void> {
    this.Logger.FuncStart(this.ProcessInboundNativeIFrameProxy.name, nativeIframeProxy.GetNativeIframeId());
    try {
      let dtFrameProxy: DTFrameProxy = null;

      await nativeIframeProxy.WaitForCompleteNABHtmlIframeElement(this.ProcessInboundNativeIFrameProxy.name)
        .then(() => this.Logger.LogVal('url', nativeIframeProxy.GetUrlJacket().GetOriginalURL()))
        .then(() => dtFrameProxy = new DTFrameProxy(this.ApiCore, nativeIframeProxy, this.JqueryModalDialogsFrameProxy))
        .then(() => this.newFrameStep1_Instantiate(dtFrameProxy))
        .then(() => this.NewFrameStep2_SetStateOfDTFrameIfQueued(dtFrameProxy))
        .then(() => this.NewFrameStep3_WireEvents(dtFrameProxy))
        .then(() => this.NewFrameStep4_NotifyObserversOfAreaProxyMutation(dtFrameProxy))
        .then(() => this.NewFrameStep5_AddToDTFrameProxyBucket(dtFrameProxy))
        .then(() => this.NewFrameStep6_TriggerEvents(dtFrameProxy))
        .catch((err) => this.ErrorHand.HandleFatalError(this.ProcessInboundNativeIFrameProxy.name, err));
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.ProcessInboundNativeIFrameProxy.name, err);
    }
    this.Logger.FuncEnd(this.ProcessInboundNativeIFrameProxy.name, nativeIframeProxy.GetNativeIframeId());
  }

  private async newFrameStep1_Instantiate(dtFrameProxy: DTFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.newFrameStep1_Instantiate.name);
    try {
      await dtFrameProxy.InstantiateAsyncMembers()
        .then(() => { })
        .catch((err) => this.ErrorHand.HandleFatalError(this.newFrameStep1_Instantiate.name, err));
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.newFrameStep1_Instantiate.name, err);
    }
    this.Logger.FuncEnd(this.newFrameStep1_Instantiate.name);
  }

  private async NewFrameStep2_SetStateOfDTFrameIfQueued(dtFrameProxy: DTFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.NewFrameStep2_SetStateOfDTFrameIfQueued.name);

    this.Logger.LogVal('looking for discriminator: ', ScProxyDisciminator[dtFrameProxy.HostedStateFullProxy.ScProxyDisciminator]);
    let foundMatchingState: IStateOfDTFrame = null;
    let foundMatchingIndex: number = -1;

    this.IncomingSetStateList.forEach((stateOfDtFrame: IStateOfDTFrame, index: number) => {
      if (stateOfDtFrame.HostedFrame.Disciminator === dtFrameProxy.HostedStateFullProxy.ScProxyDisciminator) {
        foundMatchingState = stateOfDtFrame;
        foundMatchingIndex = index;
      }
    });

    if (foundMatchingIndex > -1) {
      this.IncomingSetStateList.splice(foundMatchingIndex, 1);
      if (foundMatchingState) {
        await dtFrameProxy.SetState(foundMatchingState);
      } else {
        this.Logger.Log('no queued states');
      }
    } else {
      //it may just be a manually opened frame
      //this.ErrorHand.ErrorAndThrow(this.NewFrameStep2_SetStateOfDTFrameIfQueued.name, 'mismatch on incoming states vs open proxies');
    }

    this.Logger.FuncEnd(this.NewFrameStep2_SetStateOfDTFrameIfQueued.name);
  }

  private NewFrameStep3_WireEvents(dtFrameProxy: DTFrameProxy) {
    this.Logger.FuncStart(this.NewFrameStep3_WireEvents.name);
    dtFrameProxy.DTFrameProxyMutationEvent_Subject.RegisterObserver(this.DTFrameProxyManyMutationEvent_Observer);
    dtFrameProxy.WireEvents();

    this.Logger.FuncEnd(this.NewFrameStep3_WireEvents.name);
  }

  private NewFrameStep4_NotifyObserversOfAreaProxyMutation(AddedDTFrameProxy: DTFrameProxy) {
    this.Logger.FuncStart(this.NewFrameStep4_NotifyObserversOfAreaProxyMutation.name);
    let payload: IDTAreaProxyMutationEvent_Payload = {
      AddedDTFrameProxies: [AddedDTFrameProxy],
      RemovedDTFrameProxies: [],
      DTFrameProxyMutationEvent_Payload: null, //to do...why do we need this? Maybe for the tree mutation
    };

    this.DTAreaProxyMutationEvent_Subject.NotifyObserversAsync(payload);
    this.Logger.FuncEnd(this.NewFrameStep4_NotifyObserversOfAreaProxyMutation.name);
  }

  private NewFrameStep5_AddToDTFrameProxyBucket(dtframeProxy: DTFrameProxy): boolean {
    this.Logger.FuncStart(this.NewFrameStep5_AddToDTFrameProxyBucket.name);
    let toReturn: boolean = false;
    if (!this.BucketHasSameItem(dtframeProxy)) {
      this.FramesBucket.push(dtframeProxy);
      toReturn = true;
    }
    this.Logger.FuncEnd(this.NewFrameStep5_AddToDTFrameProxyBucket.name);
    return (toReturn);
  }
  private NewFrameStep6_TriggerEvents(dtframeProxy: DTFrameProxy): void {
    this.Logger.FuncStart(this.NewFrameStep6_TriggerEvents.name);
    dtframeProxy.TriggerEventsForInbound();
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
  ////  catch (err) {
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
    this.Logger.FuncStart(this.AddToIncomingSetStateList.name, stateOfFrame.DTFrames.length);
    stateOfFrame.DTFrames.forEach((stateOfDTFrame) => this.IncomingSetStateList.push(stateOfDTFrame));
    this.Logger.FuncEnd(this.AddToIncomingSetStateList.name);
  }

  async PublishTopFrame() {
    let dtFrameProxy: DTFrameProxy = this.GetTopFrame();
    if (dtFrameProxy) {
      //todo - put back? //if (dtFrameProxy.StateFullProxyDisciminator === StateFullProxyDisciminator.ContentEditor) {
      await (<ContentEditorProxy>dtFrameProxy.HostedStateFullProxy).PublishItem();
      //}
    }
  }

  private GetTopFrame(): DTFrameProxy {
    let toReturn: DTFrameProxy = null;
    let maxZFound: number = -1;

    this.FramesBucket.forEach((dtframeProxy) => {
      let cadidateVal: number = dtframeProxy.GetZindexAsInt();
      if (cadidateVal > maxZFound) {
        maxZFound = cadidateVal;
        toReturn = dtframeProxy;
      }
      //if (dtframeProxy.GetZindexAsInt() == 1) {
      //  toReturn = dtframeProxy;
      //}
    });

    this.Logger.LogVal(this.GetTopFrame.name, toReturn.GetZindexAsInt().toString());
    return toReturn;
  }

  private BucketHasSameItem(dtFrameBucketItem: DTFrameProxy): boolean {
    let toReturn: boolean = true;

    //todo - I think we'll need to check against the iframe id
    if (this.FramesBucket.indexOf(dtFrameBucketItem) < 0) {
      toReturn = false;
    } else {
      toReturn = true;
      this.ErrorHand.WarningAndContinue(this.BucketHasSameItem.name, 'Proxy already exists in bucket');
    }

    return toReturn;
  }

  TriggerCERibbonCommand(ribbonCommand: ScRibbonCommand) {
    let topFrameProxy: DTFrameProxy = this.GetTopFrame();
    if (topFrameProxy.HostedStateFullProxy.ScProxyDisciminator === ScProxyDisciminator.ContentEditor) {
      let contentEditorProxy: ContentEditorProxy = <ContentEditorProxy>topFrameProxy.HostedStateFullProxy;
      if (contentEditorProxy) {
        contentEditorProxy.TriggerCERibbonCommand(ribbonCommand);
      }
    }
  }
}