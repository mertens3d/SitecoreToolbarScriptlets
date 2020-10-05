import { DocumentJacket } from "../../DOMJacket/DocumentJacket";
import { ScUrlAgent } from "../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { StateFullProxyDisciminator } from "../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { ReadyStateNAB } from "../../Shared/scripts/Enums/ReadyState";
import { Guid } from "../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../Shared/scripts/Helpers/GuidData";
import { IHindeCore } from "../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IScVerSpec } from "../../Shared/scripts/Interfaces/IScVerSpec";
import { _HindeCoreBase } from "../../Shared/scripts/LoggableBase";
import { DocumentProxyMutationEvent_Subject } from "../scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Subject";
import { IDocumentProxyMutationEvent_Payload } from "../scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";
import { IFrameJacketAddRemoveEvent_Payload } from "../../DOMJacket/Events/NativeIFrameAddedEvent/INativeIFrameAddedEvent_Payload";
import { NativeIFrameAddRemoveEvent_Observer } from "../../DOMJacket/Events/NativeIFrameAddedEvent/NativeIFrameAddedEvent_Observer";
import { FrameJacketAddRemoveEvent_Subject } from "../../DOMJacket/Events/NativeIFrameAddedEvent/NativeIFrameAddedEvent_Subject";

export class ScDocumentFacade extends _HindeCoreBase {
  
  Nickname: string;
  private NativeIframeAddRemoveEvent_Observer: NativeIFrameAddRemoveEvent_Observer;
  private FrameJacketAddRemoveEvent_Subject: FrameJacketAddRemoveEvent_Subject;
  public DocumentJacket: DocumentJacket; //work towards making this private
  public DocumentProxyMutationEvent_Subject: DocumentProxyMutationEvent_Subject;
  public readonly ScUrlAgent: ScUrlAgent;
  readonly DocId: GuidData = Guid.NewRandomGuid();

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket) {
    super(hindeCore);

    this.ErrorHand.ThrowIfNullOrUndefined(ScDocumentFacade.name, [documentJacket]);

    this.DocumentJacket = documentJacket;
    this.ScUrlAgent = new ScUrlAgent(this.HindeCore, this.DocumentJacket.UrlJacket);

    this.InstantiateInstance();
  }

  private InstantiateInstance() {
    this.Logger.FuncStart(this.InstantiateInstance.name, ScDocumentFacade.name);

    this.FrameJacketAddRemoveEvent_Subject = new FrameJacketAddRemoveEvent_Subject(this.HindeCore, this.DocumentJacket);

    this.NativeIframeAddRemoveEvent_Observer = new NativeIFrameAddRemoveEvent_Observer(this.HindeCore, this.CallBackOnNativeIFrameAddRemoveEventAsync.bind(this));
    this.DocumentProxyMutationEvent_Subject = new DocumentProxyMutationEvent_Subject(this.Logger, this.ErrorHand, ScDocumentFacade.name);

    this.WireInstanceEvents();

    this.Logger.FuncEnd(this.InstantiateInstance.name, ScDocumentFacade.name);
  }

  private WireInstanceEvents() {
    this.Logger.FuncStart(this.WireInstanceEvents.name, ScDocumentFacade.name);
    this.FrameJacketAddRemoveEvent_Subject.RegisterObserver(this.NativeIframeAddRemoveEvent_Observer);

    this.Logger.FuncEnd(this.WireInstanceEvents.name, ScDocumentFacade.name);
  }

  async SetState(): Promise<void> {
  }

  GetState(): Promise<null> {
    throw new Error("Method not implemented.");
  }

  TriggerInboundEventsAsync(): void {
  }

  //------------------------------------------------------------

  private async CallBackOnNativeIFrameAddRemoveEventAsync(nativeIFrameAddRemoveEvent_Payload: IFrameJacketAddRemoveEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.CallBackOnNativeIFrameAddRemoveEventAsync.name);
    try {
      let payload: IDocumentProxyMutationEvent_Payload = {
        AddedFrameJacket: nativeIFrameAddRemoveEvent_Payload.AddedFrameJacket,
        RemovedIFrameId: nativeIFrameAddRemoveEvent_Payload.RemovedIFrameId
      };

      this.DocumentProxyMutationEvent_Subject.NotifyObserversAsync(payload);
    }
    catch (err) {
      this.ErrorHand.ErrorAndThrow(this.CallBackOnNativeIFrameAddRemoveEventAsync.name, err);
    }
    this.Logger.FuncEnd(this.CallBackOnNativeIFrameAddRemoveEventAsync.name);
  }

  GetElementById(elementId: string) {
    return this.DocumentJacket.getElementById(elementId);
  }

  //GetScWindowType(): ScWindowType {
  //  this.ErrorHand.ThrowIfNullOrUndefined(this.GetScWindowType.name, this.DocumentJacket);
  //  return this.DocumentJacket.GetScWindowType();
  //}
  querySelector(selector: string) {
    return this.DocumentJacket.querySelector(selector);
  }

  async RaceWaitAndClick(scVerSpec: IScVerSpec): Promise<void> {
    return this.DocumentJacket.RaceWaitAndClick(scVerSpec);
  }

  WaitForThenClick(selectorAr: string[]): Promise<void>{
    return this.DocumentJacket.WaitForThenClick(selectorAr)
  }


  Validate() {
    if (!this.DocumentJacket) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, 'No content doc');
    }
    this.DocumentJacket.Validate();
  }

  async WaitForCompleteNAB_ScDocumentProxy(friendly: string): Promise<ReadyStateNAB> {
    //try {
    return this.DocumentJacket.WaitForCompleteNAB_NativeDocument(friendly);

    //} catch (err) {
    //  this.ErrorHand.ErrorAndThrow(this.WaitForCompleteNAB_ScDocumentProxy.name, err);
    //}
  }
}