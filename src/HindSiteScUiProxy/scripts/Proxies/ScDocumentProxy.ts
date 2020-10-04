import { ScUrlAgent } from "../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { ReadyStateNAB } from "../../../Shared/scripts/Enums/ReadyState";
import { ScWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { DocumentProxyMutationEvent_Subject } from "./Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Subject";
import { IDocumentProxyMutationEvent_Payload } from "./Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";
import { INativeIFrameAddRemoveEvent_Payload } from "./Desktop/DesktopProxy/Events/NativeIFrameAddedEvent/INativeIFrameAddedEvent_Payload";
import { NativeIFrameAddRemoveEvent_Observer } from "./Desktop/DesktopProxy/Events/NativeIFrameAddedEvent/NativeIFrameAddedEvent_Observer";
import { _BaseNativeDocumentProxy } from "./_BaseNativeDocumentProxy";
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { NativeIFrameAddRemoveEvent_Subject } from "./Desktop/DesktopProxy/Events/NativeIFrameAddedEvent/NativeIFrameAddedEvent_Subject";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";

export class ScDocumentProxy extends _BaseNativeDocumentProxy<null> implements IStateFullProxy<null> {
  Nickname: string;
  private NativeIframeAddRemoveEvent_Observer: NativeIFrameAddRemoveEvent_Observer;
  readonly DocId: GuidData = Guid.NewRandomGuid();

  public ScUrlAgent: ScUrlAgent;
  public DocumentProxyMutationEvent_Subject: DocumentProxyMutationEvent_Subject;
  private NativeIFrameAddRemoveEvent_Subject: NativeIFrameAddRemoveEvent_Subject;

  constructor(hindeCore: IHindeCore, document: Document) {
    super(hindeCore, document);
  }

  protected Instantiate_BaseNativeDocumentProxy() {
    this.Logger.FuncStart(this.Instantiate_BaseNativeDocumentProxy.name, _BaseNativeDocumentProxy.name);

    this.NativeIFrameAddRemoveEvent_Subject = new NativeIFrameAddRemoveEvent_Subject(this.HindeCore, this.NativeDocument);

    this.Logger.FuncEnd(this.Instantiate_BaseNativeDocumentProxy.name, _BaseNativeDocumentProxy.name);
  }

  Instantiate() {
    this.Logger.FuncStart(this.Instantiate.name, ScDocumentProxy.name);
    this.Instantiate_BaseNativeDocumentProxy();

    this.ScUrlAgent = new ScUrlAgent(this.HindeCore, this.NativeDocument.URL);
    this.ScUrlAgent.Init_ScUrlAgent();

    this.NativeIframeAddRemoveEvent_Observer = new NativeIFrameAddRemoveEvent_Observer(this.HindeCore, this.CallBackOnNativeIFrameAddRemoveEventAsync.bind(this));
    this.DocumentProxyMutationEvent_Subject = new DocumentProxyMutationEvent_Subject(this.Logger, this.ErrorHand, ScDocumentProxy.name);

    this.Logger.FuncEnd(this.Instantiate.name, ScDocumentProxy.name);
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, ScDocumentProxy.name);
    this.NativeIFrameAddRemoveEvent_Subject.RegisterObserver(this.NativeIframeAddRemoveEvent_Observer);

    this.Logger.FuncEnd(this.WireEvents.name, ScDocumentProxy.name);
  }

  SetState() {
  }

  GetState(): Promise<null> {
    throw new Error("Method not implemented.");
  }
  //------------------------------------------------------------

  private async CallBackOnNativeIFrameAddRemoveEventAsync(nativeIFrameAddRemoveEvent_Payload: INativeIFrameAddRemoveEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.CallBackOnNativeIFrameAddRemoveEventAsync.name);
    try {
      let payload: IDocumentProxyMutationEvent_Payload = {
        AddedNativeIFrameProxies: nativeIFrameAddRemoveEvent_Payload.AddedNativeIFrameProxies,
        RemovedIFrameIds: nativeIFrameAddRemoveEvent_Payload.RemovedIFrameIds
      }

      this.DocumentProxyMutationEvent_Subject.NotifyObserversAsync(payload);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.CallBackOnNativeIFrameAddRemoveEventAsync.name, err);
    }
    this.Logger.FuncEnd(this.CallBackOnNativeIFrameAddRemoveEventAsync.name);
  }

  GetScWindowType(): ScWindowType {
    this.ErrorHand.ThrowIfNullOrUndefined(this.GetScWindowType.name + ' ' + ScDocumentProxy.name, this.ScUrlAgent)
    return this.ScUrlAgent.GetScWindowType();
  }

  async WaitForCompleteNAB_ScDocumentProxy(friendly: string): Promise<ReadyStateNAB> {
    //try {
    return this.WaitForCompleteNAB_NativeDocument(friendly);

    //} catch (err) {
    //  this.ErrorHand.ErrorAndThrow(this.WaitForCompleteNAB_ScDocumentProxy.name, err);
    //}
  }

  Validate() {
    if (!this.NativeDocument) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, 'No content doc');
    }
    else if (!this.NativeDocument.URL) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, 'No URL');
    }
    else if (this.NativeDocument.URL === SharedConst.Const.UrlSuffix.AboutBlank) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, SharedConst.Const.UrlSuffix.AboutBlank + ' not allowed');
    }
  }
}