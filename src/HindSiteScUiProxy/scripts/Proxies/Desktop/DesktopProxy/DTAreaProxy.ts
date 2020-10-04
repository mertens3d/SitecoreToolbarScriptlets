import { DefaultStateOfDTArea } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDTArea";
import { StaticHelpers } from "../../../../../Shared/scripts/Classes/StaticHelpers";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/scWindowType";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfDTFrame } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTProxy";
import { NativeIframeProxy } from "../../NativeScIframeProxy";
import { ScDocumentProxy } from "../../ScDocumentProxy";
import { DocumentProxyMutationEvent_Observer } from "./Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Observer";
import { DTAreaProxyMutationEvent_Subject } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Subject";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Observer } from "./Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer";
import { IDTFrameProxyMutationEvent_Payload } from "./Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { INativeIFrameAddRemoveEvent_Payload } from "./Events/NativeIFrameAddedEvent/INativeIFrameAddedEvent_Payload";
import { DTFrameProxy } from "./FrameProxies/DTFrameProxy";
import { _BaseStateFullProxy } from "./FrameProxies/_StateProxy";
import { ReadyStateNAB } from "../../../../../Shared/scripts/Enums/ReadyState";

export class DTAreaProxy extends _BaseStateFullProxy<IStateOfDTArea> implements IStateFullProxy<IStateOfDTArea>
{
  private AssociatedScDocumentProxy: ScDocumentProxy;
  private DTFrameProxyManyMutationEvent_Observer: DTFrameProxyMutationEvent_Observer;
  private FramesBucket: DTFrameProxy[] = [];
  private IncomingSetStateList: IStateOfDTFrame[] = [];
  private DocumentProxyMutationEvent_Observer: DocumentProxyMutationEvent_Observer;

  public DTAreaProxyMutationEvent_Subject: DTAreaProxyMutationEvent_Subject;

  constructor(hindeCore: IHindeCore, scDocumentProxy: ScDocumentProxy) {
    super(hindeCore);
    this.AssociatedScDocumentProxy = scDocumentProxy;
    this.ErrorHand.ThrowIfNullOrUndefined(DTAreaProxy.name, scDocumentProxy);
  }

  Instantiate(): void {
    this.Logger.FuncStart(this.Instantiate.name, DTAreaProxy.name);

    try {
      this.DTAreaProxyMutationEvent_Subject = new DTAreaProxyMutationEvent_Subject(this.HindeCore);//, this.OnDTAreaProxyMutationEvent.bind(this));
      this.DTFrameProxyManyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer(this.HindeCore, this.OnDTFProxyMutationEvent.bind(this));
      this.DocumentProxyMutationEvent_Observer = new DocumentProxyMutationEvent_Observer(this.HindeCore, this.CallBackOnDocumentProxyMutationEvent.bind(this));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Instantiate.name, err);
    }
    this.Logger.FuncEnd(this.Instantiate.name, DTAreaProxy.name);
  }

  public WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, DTAreaProxy.name);

    this.AssociatedScDocumentProxy.DocumentProxyMutationEvent_Subject.RegisterObserver(this.DocumentProxyMutationEvent_Observer);

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

      await Promise.all(promiseAr)
        .then((stateOfDTFrames: IStateOfDTFrame[]) => {
          stateOfDTFrames.forEach((stateOfDTFrame: IStateOfDTFrame, index: number) => {
            stateOfDTArea.StateOfDTFrames.push(stateOfDTFrame);
            if (stateOfDTFrame.ZIndex === 1) {
              stateOfDTArea.ActiveDTFrameIndex = index;
            }
          });
        })
        .then(() => resolve(stateOfDTArea))
        .catch((err) => reject(this.GetState.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetState.name, DTAreaProxy.name);
    });
  }

  async SetState(StateOfDTArea: IStateOfDTArea): Promise<number> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, DTAreaProxy.name);
      let contentEditorCountNeeded: number = 0;

      if (StateOfDTArea) {
        if (!StaticHelpers.IsNullOrUndefined([this.AssociatedScDocumentProxy])) {
          this.AddToIncomingSetStateList(StateOfDTArea);
          contentEditorCountNeeded = StateOfDTArea.StateOfDTFrames.length;
        } else {
          reject(this.SetState.name + ' bad data');
        }
      } else {
        reject(this.SetState.name + '  No state provided');
      }

      resolve(contentEditorCountNeeded);

      this.Logger.FuncEnd(this.SetState.name, DTAreaProxy.name);
    });
  }

  //---------------------------------------------------------------------------------------------

  private async CallBackOnDocumentProxyMutationEvent(payload: INativeIFrameAddRemoveEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.CallBackOnDocumentProxyMutationEvent.name);
    try {
      await this.HandleAddedIframes(payload.AddedNativeIFrameProxies)
        .then(() => this.HandleRemovedIframes(payload.RemovedIFrameIds))
        .then(() => {
        });
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.CallBackOnDocumentProxyMutationEvent.name, err);
    }

    this.Logger.FuncEnd(this.CallBackOnDocumentProxyMutationEvent.name);
  }

  private async HandleAddedIframes(addedNativeIFrameProxies: NativeIframeProxy[]) {
    this.Logger.FuncStart(this.HandleAddedIframes.name);
    if (addedNativeIFrameProxies.length > 0) {
      let promiseAr: Promise<ReadyStateNAB>[] = [];

      addedNativeIFrameProxies.forEach(async (scIframeProxy: NativeIframeProxy) => promiseAr.push(scIframeProxy.WaitForCompleteNABHtmlIframeElement(this.HandleAddedIframes.name)));

      await Promise.all(promiseAr);

      addedNativeIFrameProxies.forEach(async (scIframeProxy: NativeIframeProxy) => {
        let currentWindowType = scIframeProxy.GetScWindowType();

        this.Logger.LogVal('scWindowType', ScWindowType[currentWindowType]);

        if (currentWindowType === ScWindowType.ContentEditor) {
          //todo - this probably needs to be a Promise.all but we are only going to get one at a time

          await this.ProcessInboundNativeIFrameProxy(scIframeProxy)
            .then(() => this.Logger.Log(this.HandleAddedIframes.name + ' Complete'))
            .catch((err) => this.ErrorHand.ErrorAndThrow(this.HandleAddedIframes.name, err));
        }
      });
    }
    this.Logger.FuncEnd(this.HandleAddedIframes.name);
  }

  private async HandleRemovedIframes(removedIframeIds: string[]) {
    removedIframeIds.forEach((needleIframeId: string) => {
      let foundMatch: number = -1;
      this.FramesBucket.forEach((dtFrameProxy: DTFrameProxy, index: number) => {
        if (dtFrameProxy.NativeIFrameProxy.GetNativeIframeId() === needleIframeId) {
          foundMatch = index;
        }
      });

      if (foundMatch > -1) {
        this.FramesBucket.splice(foundMatch, 1);
      }
    });
  }

  private async ProcessInboundNativeIFrameProxy(nativeIframeProxy: NativeIframeProxy): Promise<void> {
    this.Logger.FuncStart(this.ProcessInboundNativeIFrameProxy.name, nativeIframeProxy.GetNativeIframeId());
    try {
      let dtFrameProxy: DTFrameProxy = null;

      await nativeIframeProxy.WaitForCompleteNABHtmlIframeElement(this.ProcessInboundNativeIFrameProxy.name)
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
      await dtFrameProxy.Instantiate()
        .then(() => { })
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.newFrameStep1_Instantiate.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.newFrameStep1_Instantiate.name, err);
    }
    this.Logger.FuncEnd(this.newFrameStep1_Instantiate.name);
  }

  private async NewFrameStep2_SetStateOfDTFrameIfQueued(dtFrameProxy: DTFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.NewFrameStep2_SetStateOfDTFrameIfQueued.name);
    let queuedState: IStateOfDTFrame = this.IncomingSetStateList.shift();
    if (queuedState) {
      await dtFrameProxy.SetState(queuedState);
    } else {
      this.Logger.Log('no queued states');
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
    dtframeProxy.ContentEditorProxy.TriggerActiveNodeChangeEvent();
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
    this.Logger.FuncStart(this.AddToIncomingSetStateList.name, stateOfFrame.StateOfDTFrames.length);
    stateOfFrame.StateOfDTFrames.forEach((stateOfDTFrame) => this.IncomingSetStateList.push(stateOfDTFrame));
    this.Logger.FuncEnd(this.AddToIncomingSetStateList.name);
  }

  async PublishTopFrame() {
    let dtFrameProxy: DTFrameProxy = this.GetTopFrame();
    if (dtFrameProxy) {
      await dtFrameProxy.ContentEditorProxy.PublishItem();
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