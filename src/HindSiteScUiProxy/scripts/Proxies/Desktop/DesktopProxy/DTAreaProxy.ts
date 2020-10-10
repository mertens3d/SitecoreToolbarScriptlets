import { DocumentJacket } from "../../../../../DOMJacket/DocumentJacket";
import { DocumentJacketWatcher } from "../../../../../DOMJacket/DocumentWatcher";
import { ElementFrameJacket } from "../../../../../DOMJacket/ElementFrameJacket";
import { DefaultStateOfDTArea } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDTArea";
import { StaticHelpers } from "../../../../../Shared/scripts/Classes/StaticHelpers";
import { StateFullProxyDisciminator } from "../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/50 - scWindowType";
import { IDTFramesNeeded } from "../../../../../Shared/scripts/Interfaces/Agents/IContentEditorCountsNeeded";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfDTFrame } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTProxy";
import { ContentEditorSFProxy } from "../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DocumentProxyMutationEvent_Observer } from "./Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Observer";
import { IDocumentProxyMutationEvent_Payload } from "./Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";
import { DTAreaProxyMutationEvent_Subject } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Subject";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Observer } from "./Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer";
import { IDTFrameProxyMutationEvent_Payload } from "./Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { DTFrameProxy } from "./FrameProxies/DTFrameProxy";
import { _BaseStateFullProxy } from "./FrameProxies/_StateProxy";
import { StateFullProxyResolver } from "../../ProxyResolver";

export class DTAreaProxy extends _BaseStateFullProxy<IStateOfDTArea> implements IStateFullProxy {
  public readonly StateFullProxyDisciminator = StateFullProxyDisciminator.DTArea;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.DTArea];
  private AssociatedScDocumentJacket: DocumentJacket;
  private DTFrameProxyManyMutationEvent_Observer: DTFrameProxyMutationEvent_Observer;
  private FramesBucket: DTFrameProxy[] = [];
  private IncomingSetStateList: IStateOfDTFrame[] = [];
  private DocumentProxyMutationEvent_Observer: DocumentProxyMutationEvent_Observer;

  public DTAreaProxyMutationEvent_Subject: DTAreaProxyMutationEvent_Subject;
  DocumentJacketWatcher: DocumentJacketWatcher;

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket) {
    super(hindeCore);
    this.AssociatedScDocumentJacket = documentJacket;
    this.ErrorHand.ThrowIfNullOrUndefined(DTAreaProxy.name, documentJacket);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart(this.InstantiateAsyncMembers.name, DTAreaProxy.name);

    try {
      this.DTAreaProxyMutationEvent_Subject = new DTAreaProxyMutationEvent_Subject(this.HindeCore);//, this.OnDTAreaProxyMutationEvent.bind(this));
      this.DTFrameProxyManyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer(this.HindeCore, this.OnDTFProxyMutationEvent.bind(this));
      this.DocumentProxyMutationEvent_Observer = new DocumentProxyMutationEvent_Observer(this.HindeCore, this.CallBackOnDocumentProxyMutationEvent.bind(this));
      this.DocumentJacketWatcher = new DocumentJacketWatcher(this.HindeCore, this.AssociatedScDocumentJacket);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err);
    }
    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, DTAreaProxy.name);
  }

  public WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, DTAreaProxy.name);

    this.DocumentJacketWatcher.DocumentProxyMutationEvent_Subject.RegisterObserver(this.DocumentProxyMutationEvent_Observer);

    this.Logger.FuncEnd(this.WireEvents.name, DTAreaProxy.name);
  }

  GetState(): Promise<IStateOfDTArea> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, DTAreaProxy.name + ' ' + this.FramesBucket.length.toString());
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
        .then(() => this.Logger.LogAsJsonPretty('DTAreaState', stateOfDTArea))
        .then(() => resolve(stateOfDTArea))
        .catch((err) => reject(this.GetState.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetState.name, DTAreaProxy.name);
    });
  }

  async SetState(StateOfDTArea: IStateOfDTArea): Promise<IDTFramesNeeded> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, DTAreaProxy.name);
      let dtFramesNeeded: IDTFramesNeeded = {
        DiscriminatorAr: []
      }

      if (StateOfDTArea) {
        if (!StaticHelpers.IsNullOrUndefined([this.AssociatedScDocumentJacket])) {
          this.AddToIncomingSetStateList(StateOfDTArea);

          StateOfDTArea.DTFrames.forEach((dtFrame: IStateOfDTFrame) => dtFramesNeeded.DiscriminatorAr.push(dtFrame.HostedFrame.Disciminator));
        } else {
          reject(this.SetState.name + ' bad data');
        }
      } else {
        reject(this.SetState.name + '  No state provided');
      }

      resolve(dtFramesNeeded);

      this.Logger.FuncEnd(this.SetState.name, DTAreaProxy.name);
    });
  }

  TriggerInboundEventsAsync(): void {
  }

  //---------------------------------------------------------------------------------------------

  private async CallBackOnDocumentProxyMutationEvent(documentProxyMutationEvent_Payload: IDocumentProxyMutationEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.CallBackOnDocumentProxyMutationEvent.name);
    this.Logger.LogAsJsonPretty('payload', documentProxyMutationEvent_Payload);
    try {
      await this.HandleAddedFrameJacket(documentProxyMutationEvent_Payload.AddedFrameJacket)
        .then(() => this.HandleRemovedIframe(documentProxyMutationEvent_Payload.RemovedIFrameId))
        .then(() => {
        });
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.CallBackOnDocumentProxyMutationEvent.name, err);
    }

    this.Logger.FuncEnd(this.CallBackOnDocumentProxyMutationEvent.name);
  }

  private async HandleAddedFrameJacket(frameJacket: ElementFrameJacket): Promise<void> {
    this.Logger.FuncStart(this.HandleAddedFrameJacket.name);

    if (frameJacket) {
      let dtFrameProxy: DTFrameProxy = null;

      await frameJacket.WaitForCompleteNABHtmlIframeElement(this.HandleAddedFrameJacket.name)
        .then(() => this.Logger.LogVal('URL', frameJacket.DocumentJacket.UrlJacket.GetOriginalURL()))
        .then(() => dtFrameProxy = new DTFrameProxy(this.HindeCore, frameJacket))
        .then(() => dtFrameProxy.InstantiateAsyncMembers())
        .then(() => dtFrameProxy.WireEvents())
        .then(() => {
          let currentWindowType = dtFrameProxy.GetScWindowType();

          let stateFullProxyFactory: StateFullProxyResolver = new StateFullProxyResolver(this.HindeCore);
          let recognizedWindowtypes: ScWindowType[] = stateFullProxyFactory.RecognizedWindowTypes();

          if (recognizedWindowtypes.indexOf(currentWindowType) < 0) {
            this.Logger.LogVal('scWindowType', ScWindowType[currentWindowType]);
            this.ErrorHand.ErrorAndThrow(this.HandleAddedFrameJacket.name, 'unrecognized window type: ' + ScWindowType[currentWindowType]);
          }
        })
        .then(() => this.ProcessInboundNativeIFrameProxy(frameJacket))
        .then(() => this.Logger.Log(this.HandleAddedFrameJacket.name + ' Complete'))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.HandleAddedFrameJacket.name, err));
    } else {
      this.Logger.Log('No FrameJacket - no action');
    }

    this.Logger.FuncEnd(this.HandleAddedFrameJacket.name);
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
      this.ErrorHand.ErrorAndThrow(this.HandleRemovedIframe.name, err);
    }
    this.Logger.FuncEnd(this.HandleRemovedIframe.name);
  }

  private async ProcessInboundNativeIFrameProxy(nativeIframeProxy: ElementFrameJacket): Promise<void> {
    this.Logger.FuncStart(this.ProcessInboundNativeIFrameProxy.name, nativeIframeProxy.GetNativeIframeId());
    try {
      let dtFrameProxy: DTFrameProxy = null;

      await nativeIframeProxy.WaitForCompleteNABHtmlIframeElement(this.ProcessInboundNativeIFrameProxy.name)
        .then(() => this.Logger.LogVal('url', nativeIframeProxy.GetUrlJacket().GetOriginalURL()))
        .then(() => dtFrameProxy = new DTFrameProxy(this.HindeCore, nativeIframeProxy))
        .then(() => this.newFrameStep1_Instantiate(dtFrameProxy))
        .then(() => this.NewFrameStep2_SetStateOfDTFrameIfQueued(dtFrameProxy))
        .then(() => this.NewFrameStep3_WireEvents(dtFrameProxy))
        .then(() => this.NewFrameStep4_NotifyObserversOfAreaProxyMutation(dtFrameProxy))
        .then(() => this.NewFrameStep5_AddToDTFrameProxyBucket(dtFrameProxy))
        .then(() => this.NewFrameStep6_TriggerEvents(dtFrameProxy))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.ProcessInboundNativeIFrameProxy.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.ProcessInboundNativeIFrameProxy.name, err);
    }
    this.Logger.FuncEnd(this.ProcessInboundNativeIFrameProxy.name, nativeIframeProxy.GetNativeIframeId());
  }

  private async newFrameStep1_Instantiate(dtFrameProxy: DTFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.newFrameStep1_Instantiate.name);
    try {
      await dtFrameProxy.InstantiateAsyncMembers()
        .then(() => { })
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.newFrameStep1_Instantiate.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.newFrameStep1_Instantiate.name, err);
    }
    this.Logger.FuncEnd(this.newFrameStep1_Instantiate.name);
  }

  private async NewFrameStep2_SetStateOfDTFrameIfQueued(dtFrameProxy: DTFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.NewFrameStep2_SetStateOfDTFrameIfQueued.name);

    this.Logger.LogVal('looking for discriminator: ', StateFullProxyDisciminator[dtFrameProxy.HostedStateFullProxy.StateFullProxyDisciminator]);
    let foundMatchingState: IStateOfDTFrame = null;
    let foundMatchingIndex: number = -1;

    this.IncomingSetStateList.forEach((stateOfDtFrame: IStateOfDTFrame, index: number) => {
      if (stateOfDtFrame.HostedFrame.Disciminator === dtFrameProxy.HostedStateFullProxy.StateFullProxyDisciminator) {
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
      if (dtFrameProxy.StateFullProxyDisciminator === StateFullProxyDisciminator.ContentEditor) {
        await (<ContentEditorSFProxy>dtFrameProxy.HostedStateFullProxy).PublishItem();
      }
    }
  }

  private GetTopFrame(): DTFrameProxy {
    let toReturn: DTFrameProxy = null;

    this.FramesBucket.forEach((dtframeProxy) => {
      if (dtframeProxy.GetZindexAsInt() == 1) {
        toReturn = dtframeProxy;
      }
    });
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
}