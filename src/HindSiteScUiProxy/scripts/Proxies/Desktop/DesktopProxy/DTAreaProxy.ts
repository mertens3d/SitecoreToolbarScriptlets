import { DefaultStateOfDTAreaProxy } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { InitReport_DTAreaProxy } from "../../../../../Shared/scripts/Interfaces/Agents/InitReport_DTAreaProxy";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IStateOfDTAreaProxy } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTProxy";
import { IStateOfDTFrameProxy } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { LoggableBase } from "../../../../../Shared/scripts/LoggableBase";
import { FrameHelper } from "../../../Helpers/FrameHelper";
import { NativeIFrameAddedEvent_Observer } from "./Events/DesktopProxyMutationEvent/NativeIFrameAddedEvent_Observer";
import { INativeIFrameAddedEvent_Payload } from "./Events/DesktopProxyMutationEvent/INativeIFrameAddedEvent_Payload";
import { NativeIFrameAddedEvent_Subject } from "./Events/DesktopProxyMutationEvent/NativeIFrameAddedEvent_Subject";
import { DTAreaProxyMutationEvent_Observer } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer";
import { DTAreaProxyMutationEvent_Subject } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Subject";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Observer } from "./Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer";
import { IDTFrameProxyMutationEvent_Payload } from "./Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { DTFrameProxy } from "./FrameProxies/DTFrameProxy";

export class DTAreaProxy extends LoggableBase {
  private FramesBucket: DTFrameProxy[] = [];
  private DTFrameProxyMutationEvent_Observer: DTFrameProxyMutationEvent_Observer;
  private IncomingSetStateList: IStateOfDTFrameProxy[] = [];
  private AssociatedDoc: IDataOneDoc;
  private NativeIFrameAddedEvent_Subject: NativeIFrameAddedEvent_Subject;

  NativeIframeAddedEvent_Observer: DTAreaProxyMutationEvent_Observer;

  public DTAreaProxyMutationEvent_Subject: DTAreaProxyMutationEvent_Subject;
  InitReportForDTAreaProxy: InitReport_DTAreaProxy;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc) {
    super(logger);

    this.AssociatedDoc = associatedDoc;
  }

  async Instantiate_DTAreaProxy(): Promise<void> {
    this.Logger.FuncStart(this.Instantiate_DTAreaProxy.name);
    try {
      this.InitReportForDTAreaProxy = new InitReport_DTAreaProxy();
      this.NativeIFrameAddedEvent_Subject = new NativeIFrameAddedEvent_Subject(this.Logger, this.AssociatedDoc);
      this.DTAreaProxyMutationEvent_Subject = new DTAreaProxyMutationEvent_Subject(this.Logger);//, this.OnDTAreaProxyMutationEvent.bind(this));
      this.DTFrameProxyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer(this.Logger, this.OnDTFProxyMutationEvent.bind(this));
      this.NativeIframeAddedEvent_Observer = new NativeIFrameAddedEvent_Observer(this.Logger, this.CallBackOnNativeIFrameAddedEvent.bind(this));
    } catch (err) {
      this.Logger.ErrorAndThrow(this.Instantiate_DTAreaProxy.name, err);
    }
    this.Logger.FuncEnd(this.Instantiate_DTAreaProxy.name);
  }

  public WireEvents_DTAreaProxy() {
    this.Logger.FuncStart(this.WireEvents_DTAreaProxy.name);

    this.NativeIFrameAddedEvent_Subject.RegisterObserver(this.NativeIframeAddedEvent_Observer);

    this.Logger.FuncEnd(this.WireEvents_DTAreaProxy.name);
  }

  private async CallBackOnNativeIFrameAddedEvent(payload: INativeIFrameAddedEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.CallBackOnNativeIFrameAddedEvent.name);
    try {
      if (payload && payload.AddedDTFrameProxies.length > 0) {
        payload.AddedDTFrameProxies.forEach(async (dtFrameProxy: DTFrameProxy) => {
          await this.ProcessNewFrameProxy(dtFrameProxy);
        })
      } else {
        this.Logger.WarningAndContinue(this.CallBackOnNativeIFrameAddedEvent.name, 'Something in the payload did not match');
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.CallBackOnNativeIFrameAddedEvent.name, err);
    }

    this.Logger.FuncEnd(this.CallBackOnNativeIFrameAddedEvent.name);
  }

  private async ProcessNewFrameProxy(dtFrameProxy: DTFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.ProcessNewFrameProxy.name, dtFrameProxy.Friendly);
    this.Logger.LogVal('iframe id', dtFrameProxy.HTMLIframeElement.id);
    try {
      await dtFrameProxy.WaitForCompleteNABFrameProxyOrReject()
        .then(() => this.newFrameStep1_Instantiate(dtFrameProxy))
        .then(() => this.NewFrameStep2_SetStateIfQueued(dtFrameProxy))
        .then(() => this.NewFrameStep3_WireEvents(dtFrameProxy))
        .then(() => this.NewFrameStep4_NotifyObservers(dtFrameProxy))
        .then(() => this.NewFrameStep5_AddToDTFrameProxyBucket(dtFrameProxy))
        .catch((err) => this.Logger.ErrorAndThrow(this.ProcessNewFrameProxy.name, err));
    } catch (err) {
      this.Logger.ErrorAndThrow(this.ProcessNewFrameProxy.name, err);
    }
    this.Logger.FuncEnd(this.ProcessNewFrameProxy.name, dtFrameProxy.Friendly);
  }

  private async newFrameStep1_Instantiate(dtFrameProxy: DTFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.newFrameStep1_Instantiate.name);
    try {
      await dtFrameProxy.Instantiate_DTFrameProxy()
        .then(() => { })
        .catch((err) => this.Logger.ErrorAndThrow(this.newFrameStep1_Instantiate.name, err));
    } catch (err) {
      this.Logger.ErrorAndThrow(this.newFrameStep1_Instantiate.name, err);
    }
    this.Logger.FuncEnd(this.newFrameStep1_Instantiate.name);
  }

  private NewFrameStep3_WireEvents(dtFrameProxy: DTFrameProxy) {
    this.Logger.FuncStart(this.NewFrameStep3_WireEvents.name);
    dtFrameProxy.DTFrameProxyMutationEvent_Subject.RegisterObserver(this.DTFrameProxyMutationEvent_Observer);
    dtFrameProxy.WireEvents_DTFrameProxy();
    this.Logger.FuncEnd(this.NewFrameStep3_WireEvents.name);
  }

  private NewFrameStep2_SetStateIfQueued(dtFrameProxy: DTFrameProxy) {
    this.Logger.FuncStart(this.NewFrameStep2_SetStateIfQueued.name);
    let queuedState: IStateOfDTFrameProxy = this.IncomingSetStateList.shift();
    if (queuedState) {
      dtFrameProxy.SetStateOfDTFrame(queuedState)
    } else {
      this.Logger.Log('no queued states');
    }
    this.Logger.FuncEnd(this.NewFrameStep2_SetStateIfQueued.name);
  }

  private NewFrameStep4_NotifyObservers(dtFrameProxy: DTFrameProxy) {
    this.Logger.FuncStart(this.NewFrameStep4_NotifyObservers.name);
    let payload: INativeIFrameAddedEvent_Payload = {
      AddedDTFrameProxies: [dtFrameProxy],
      MutatedElement: null,
      DTFrameProxyMutationEvent_Payload: null
    }
    this.DTAreaProxyMutationEvent_Subject.NotifyObservers(payload);
    this.Logger.FuncEnd(this.NewFrameStep4_NotifyObservers.name);
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
  ////    this.Logger.ErrorAndThrow(this.PopulateFrameBucketWithExistingFrames.name, err);
  ////  }
  ////}

  OnDTAreaProxyMutationEvent(payload: IDTAreaProxyMutationEvent_Payload) {
  }

  OnDTFProxyMutationEvent(payload: IDTFrameProxyMutationEvent_Payload) {
  }

  AddToIncomingSetStateList(stateOfFrame: IStateOfDTAreaProxy): void {
    this.Logger.FuncStart(this.AddToIncomingSetStateList.name);
    stateOfFrame.StateOfDTFrameProxies.forEach((stateOfDTFrame) => this.IncomingSetStateList.push(stateOfDTFrame));
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
    })
    return toReturn;
  }

  GetStateOfDTAreaProxy(): Promise<IStateOfDTAreaProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfDTAreaProxy.name, this.FramesBucket.length.toString());
      let toReturn: IStateOfDTAreaProxy = new DefaultStateOfDTAreaProxy();

      let promiseAr: Promise<IStateOfDTFrameProxy>[] = [];

      for (var idx = 0; idx < this.FramesBucket.length; idx++) {
        let dtframeProxy: DTFrameProxy = this.FramesBucket[idx];

        promiseAr.push(dtframeProxy.GetStateOfDTFrameProxy());
        //.then((stateOfDTFrameProxy: IStateOfDTFrameProxy) => toReturn.StateOfDTFrameProxies.push(stateOfDTFrameProxy))
      };

      await Promise.all(promiseAr)
        .then((results: IStateOfDTFrameProxy[]) => {
          results.forEach((stateOfDTFrameProxy: IStateOfDTFrameProxy, index: number) => {
            toReturn.StateOfDTFrameProxies.push(stateOfDTFrameProxy);
            if (stateOfDTFrameProxy.ZIndex === 1) {
              toReturn.IndexOfActiveDTFrameProxy = index;
            }
          })
        })
        .then(() => resolve(toReturn))
        .catch((err) => reject(this.GetStateOfDTAreaProxy.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetStateOfDTAreaProxy.name);
    });
  }

  private BucketHasSameItem(dtFrameBucketItem: DTFrameProxy): boolean {
    let toReturn: boolean = true;

    //todo - I think we'll need to check against the iframe id
    if (this.FramesBucket.indexOf(dtFrameBucketItem) < 0) {
      toReturn = false;
    } else {
      toReturn = true;
      this.Logger.WarningAndContinue(this.BucketHasSameItem.name, 'Proxy already exists in bucket');
    }

    return toReturn;
  }
}