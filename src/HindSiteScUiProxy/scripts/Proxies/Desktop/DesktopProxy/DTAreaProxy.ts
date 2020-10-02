import { DefaultStateOfDTArea } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDTArea";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { InitReport_DTAreaProxy } from "../../../../../Shared/scripts/Interfaces/Agents/InitReport_DTAreaProxy";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTProxy";
import { IStateOfDTFrame } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";
import { FrameHelper } from "../../../Helpers/FrameHelper";
import { NativeIFrameAddedEvent_Observer } from "./Events/NativeIFrameAddedEvent/NativeIFrameAddedEvent_Observer";
import { INativeIFrameAddedEvent_Payload } from "./Events/NativeIFrameAddedEvent/INativeIFrameAddedEvent_Payload";
import { NativeIFrameAddedEvent_Subject } from "./Events/NativeIFrameAddedEvent/NativeIFrameAddedEvent_Subject";
import { DTAreaProxyMutationEvent_Observer } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer";
import { DTAreaProxyMutationEvent_Subject } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Subject";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Observer } from "./Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer";
import { IDTFrameProxyMutationEvent_Payload } from "./Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { DTFrameProxy } from "./FrameProxies/DTFrameProxy";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";
import { StaticHelpers } from "../../../../../Shared/scripts/Classes/StaticHelpers";
import { DesktopProxy } from "./DesktopProxy";

export class DTAreaProxy extends _HindeCoreBase {
  private FramesBucket: DTFrameProxy[] = [];
  private DTFrameProxyMutationEvent_Observer: DTFrameProxyMutationEvent_Observer;
  private IncomingSetStateList: IStateOfDTFrame[] = [];
  private AssociatedDoc: IDataOneDoc;
  private NativeIFrameAddedEvent_Subject: NativeIFrameAddedEvent_Subject;

  NativeIframeAddedEvent_Observer: DTAreaProxyMutationEvent_Observer;

  public DTAreaProxyMutationEvent_Subject: DTAreaProxyMutationEvent_Subject;
  InitReportForDTAreaProxy: InitReport_DTAreaProxy;
  private RecipeBasics: RecipeBasics;
  private ParentDesktopProxy: DesktopProxy;

  constructor(hindeCore: IHindeCore, associatedDoc: IDataOneDoc, parentDesktopProxy: DesktopProxy) {
    super(hindeCore);

    this.AssociatedDoc = associatedDoc;
    this.ParentDesktopProxy = parentDesktopProxy;
    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }

  async Instantiate_DTAreaProxy(): Promise<void> {
    this.Logger.FuncStart(this.Instantiate_DTAreaProxy.name);
    try {
      this.InitReportForDTAreaProxy = new InitReport_DTAreaProxy();
      this.NativeIFrameAddedEvent_Subject = new NativeIFrameAddedEvent_Subject(this.HindeCore, this.AssociatedDoc);
      this.DTAreaProxyMutationEvent_Subject = new DTAreaProxyMutationEvent_Subject(this.HindeCore);//, this.OnDTAreaProxyMutationEvent.bind(this));
      this.DTFrameProxyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer(this.HindeCore, this.OnDTFProxyMutationEvent.bind(this));
      this.NativeIframeAddedEvent_Observer = new NativeIFrameAddedEvent_Observer(this.HindeCore, this.CallBackOnNativeIFrameAddedEvent.bind(this));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Instantiate_DTAreaProxy.name, err);
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
          await dtFrameProxy.WaitForCompleteNABFrameProxyOrReject()
            .then(() => {
              let indexOf: number = dtFrameProxy.HTMLIframeElement.contentDocument.URL.indexOf(SharedConst.Const.UrlSuffix.SitecoreShellApplicationsContentEditor);
              this.Logger.LogVal('indexof', indexOf);
              if (indexOf > -1) {
                this.ProcessNewFrameProxy(dtFrameProxy);
              }
            })
            .then(() => this.Logger.Log(this.CallBackOnNativeIFrameAddedEvent.name + ' Complete'))
            .catch((err) => this.ErrorHand.ErrorAndThrow(this.CallBackOnNativeIFrameAddedEvent.name, err));
        })
      } else {
        this.ErrorHand.WarningAndContinue(this.CallBackOnNativeIFrameAddedEvent.name, 'Something in the payload did not match');
      }
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.CallBackOnNativeIFrameAddedEvent.name, err);
    }

    this.Logger.FuncEnd(this.CallBackOnNativeIFrameAddedEvent.name);
  }

  private async ProcessNewFrameProxy(dtFrameProxy: DTFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.ProcessNewFrameProxy.name, dtFrameProxy.Friendly);
    this.Logger.LogVal('iframe id', dtFrameProxy.HTMLIframeElement.id);
    try {
      await dtFrameProxy.WaitForCompleteNABFrameProxyOrReject()
        .then(() => this.newFrameStep1_Instantiate(dtFrameProxy))
        .then(() => this.NewFrameStep2_SetStateOfDTFrameIfQueued(dtFrameProxy))
        .then(() => this.NewFrameStep3_WireEvents(dtFrameProxy))
        .then(() => this.NewFrameStep4_NotifyObserversOfAreaProxyMutation(dtFrameProxy))
        .then(() => this.NewFrameStep5_AddToDTFrameProxyBucket(dtFrameProxy))
        .then(() => this.NewFrameStep6_TriggerEvents(dtFrameProxy))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.ProcessNewFrameProxy.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.ProcessNewFrameProxy.name, err);
    }
    this.Logger.FuncEnd(this.ProcessNewFrameProxy.name, dtFrameProxy.Friendly);
  }

  private async newFrameStep1_Instantiate(dtFrameProxy: DTFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.newFrameStep1_Instantiate.name);
    try {
      await dtFrameProxy.Instantiate_DTFrameProxy()
        .then(() => { })
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.newFrameStep1_Instantiate.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.newFrameStep1_Instantiate.name, err);
    }
    this.Logger.FuncEnd(this.newFrameStep1_Instantiate.name);
  }

  private NewFrameStep3_WireEvents(dtFrameProxy: DTFrameProxy) {
    this.Logger.FuncStart(this.NewFrameStep3_WireEvents.name);
    dtFrameProxy.DTFrameProxyMutationEvent_Subject.RegisterObserver(this.DTFrameProxyMutationEvent_Observer);
    dtFrameProxy.WireEvents_DTFrameProxy();
    this.Logger.FuncEnd(this.NewFrameStep3_WireEvents.name);
  }

  private async NewFrameStep2_SetStateOfDTFrameIfQueued(dtFrameProxy: DTFrameProxy): Promise<void> {
    this.Logger.FuncStart(this.NewFrameStep2_SetStateOfDTFrameIfQueued.name);
    let queuedState: IStateOfDTFrame = this.IncomingSetStateList.shift();
    if (queuedState) {
      await dtFrameProxy.SetStateOfDTFrame(queuedState);
      
    } else {
      this.Logger.Log('no queued states');
    }
    this.Logger.FuncEnd(this.NewFrameStep2_SetStateOfDTFrameIfQueued.name);
  }

  private NewFrameStep4_NotifyObserversOfAreaProxyMutation(dtFrameProxy: DTFrameProxy) {
    this.Logger.FuncStart(this.NewFrameStep4_NotifyObserversOfAreaProxyMutation.name);
    let payload: INativeIFrameAddedEvent_Payload = {
      AddedDTFrameProxies: [dtFrameProxy],
      MutatedElement: null,
      DTFrameProxyMutationEvent_Payload: null
    }

    this.DTAreaProxyMutationEvent_Subject.NotifyObserversAsync(payload);
    this.Logger.FuncEnd(this.NewFrameStep4_NotifyObserversOfAreaProxyMutation.name);
  }

  SetStateOfDTArea(StateOfDTArea: IStateOfDTArea): Promise<number> {
    return new Promise(async (resolve, reject) => {

      this.Logger.FuncStart(this.SetStateOfDTArea.name);
      let contentEditorCountNeeded: number = 0;

     

      if (StateOfDTArea) {
        if (!StaticHelpers.IsNullOrUndefined([this.AssociatedDoc])) {

          this.AddToIncomingSetStateList(StateOfDTArea);
          contentEditorCountNeeded = StateOfDTArea.StateOfDTFrames.length;

          

       
        } else {
          reject(this.SetStateOfDTArea.name + ' bad data');
        }
      } else {
        reject(this.SetStateOfDTArea.name + '  No state provided');
      }

      resolve(contentEditorCountNeeded);



      this.Logger.FuncEnd(this.SetStateOfDTArea.name);
    });
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
    }
    this.DTAreaProxyMutationEvent_Subject.NotifyObserversAsync(dTAreaProxyMutationEvent)

    this.Logger.FuncEnd(this.OnDTFProxyMutationEvent.name);
  }

  AddToIncomingSetStateList(stateOfFrame: IStateOfDTArea): void {
    this.Logger.FuncStart(this.AddToIncomingSetStateList.name);
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
    })
    return toReturn;
  }

  GetStateOfDTAreaProxy(): Promise<IStateOfDTArea> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfDTAreaProxy.name, this.FramesBucket.length.toString());
      let stateOfDTArea: IStateOfDTArea = new DefaultStateOfDTArea();
      let promiseAr: Promise<IStateOfDTFrame>[] = [];

      for (var idx = 0; idx < this.FramesBucket.length; idx++) {
        let dtframeProxy: DTFrameProxy = this.FramesBucket[idx];
        promiseAr.push(dtframeProxy.GetStateOfDTFrame());
      };

      await Promise.all(promiseAr)
        .then((stateOfDTFrames: IStateOfDTFrame[]) => {
          stateOfDTFrames.forEach((stateOfDTFrame: IStateOfDTFrame, index: number) => {
            stateOfDTArea.StateOfDTFrames.push(stateOfDTFrame);
            if (stateOfDTFrame.ZIndex === 1) {
              stateOfDTArea.ActiveDTFrameIndex = index;
            }
          })
        })
        .then(() => resolve(stateOfDTArea))
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
      this.ErrorHand.WarningAndContinue(this.BucketHasSameItem.name, 'Proxy already exists in bucket');
    }

    return toReturn;
  }
}