import { ScUrlAgent } from "../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { ScWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { NativeDocumentProxy } from "./NativeDocumentProxy";
import { ReadyStateNAB } from "../../../Shared/scripts/Enums/ReadyState";
import { DocumentProxyMutationEvent_Subject } from "./Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Subject";
import { NativeIFrameAddRemoveEvent_Observer } from "./Desktop/DesktopProxy/Events/NativeIFrameAddedEvent/NativeIFrameAddedEvent_Observer";
import { INativeIFrameAddRemoveEvent_Payload } from "./Desktop/DesktopProxy/Events/NativeIFrameAddedEvent/INativeIFrameAddedEvent_Payload";
import { NativeIframeProxy } from "./NativeScIframeProxy";
import { IDocumentProxyMutationEvent_Payload } from "./Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";

export class ScDocumentProxy extends NativeDocumentProxy {
  Nickname: string;
  private NativeIframeAddRemoveEvent_Observer: NativeIFrameAddRemoveEvent_Observer;

  public ScUrlAgent: ScUrlAgent;
  public DocumentProxyMutationEvent_Subject: DocumentProxyMutationEvent_Subject;

  constructor(hindeCore: IHindeCore, nativeDocument: Document) {
    super(hindeCore, nativeDocument);
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