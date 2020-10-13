import { DocumentJacketMutationEvent_Subject } from "../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Subject";
import { IDocumentJacketMutationEvent_Payload } from "../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";
import { ICommonCore } from "../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { _CommonBase } from "../../Shared/scripts/_CommonCoreBase";
import { FrameJacketAddRemoveEvent_Observer } from "../Events/NativeIFrameAddedEvent/FrameJacketAddRemoveEvent_Observer";
import { FrameJacketAddRemoveEvent_Subject } from "../Events/NativeIFrameAddedEvent/FrameJacketAddRemoveEvent_Subject";
import { IFrameJacketAddRemoveEvent_Payload } from "../Events/NativeIFrameAddedEvent/IFrameJacketAddRemoveEvent_Payload";
import { DocumentJacket } from "./DocumentJacket";

export class DocumentJacket_Watcher extends _CommonBase {
  /*
   * Handles the native portion of watching a document for changes
  */
  private DocumentJacket: DocumentJacket; //work towards making this private
  private FrameJacketAddRemoveEvent_Subject: FrameJacketAddRemoveEvent_Subject;
  private NativeIframeAddRemoveEvent_Observer: FrameJacketAddRemoveEvent_Observer;
  private DocumentJacketMutationEvent_Subject: DocumentJacketMutationEvent_Subject;

  constructor(commonCore: ICommonCore, documentJacket: DocumentJacket, documentJacketMutationEvent_Subject: DocumentJacketMutationEvent_Subject) {
    super(commonCore);

    this.ErrorHand.ThrowIfNullOrUndefined(DocumentJacket_Watcher.name, [documentJacket]);

    this.DocumentJacketMutationEvent_Subject = documentJacketMutationEvent_Subject;
    this.DocumentJacket = documentJacket;

    this.InstantiateInstance();
  }

  private InstantiateInstance() {
    this.Logger.FuncStart(this.InstantiateInstance.name, DocumentJacket_Watcher.name);
    this.FrameJacketAddRemoveEvent_Subject = new FrameJacketAddRemoveEvent_Subject(this.CommonCore, this.DocumentJacket);
    this.NativeIframeAddRemoveEvent_Observer = new FrameJacketAddRemoveEvent_Observer(this.CommonCore, this.CallBackOnNativeIFrameAddRemoveEventAsync.bind(this));
    this.WireInstanceEvents();
    this.Logger.FuncEnd(this.InstantiateInstance.name, DocumentJacket_Watcher.name);
  }

  private WireInstanceEvents() {
    this.Logger.FuncStart(this.WireInstanceEvents.name, DocumentJacket_Watcher.name);
    this.FrameJacketAddRemoveEvent_Subject.RegisterObserver(this.NativeIframeAddRemoveEvent_Observer);
    this.Logger.FuncEnd(this.WireInstanceEvents.name, DocumentJacket_Watcher.name);
  }

  //------------------------------------------------------------

  private async CallBackOnNativeIFrameAddRemoveEventAsync(nativeIFrameAddRemoveEvent_Payload: IFrameJacketAddRemoveEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.CallBackOnNativeIFrameAddRemoveEventAsync.name);
    try {
      let payload: IDocumentJacketMutationEvent_Payload = {
        AddedFrameJacket: nativeIFrameAddRemoveEvent_Payload.AddedFrameJacket,
        RemovedIFrameId: nativeIFrameAddRemoveEvent_Payload.RemovedIFrameId
      };

      this.DocumentJacketMutationEvent_Subject.NotifyObserversAsync(payload);
    }
    catch (err) {
      this.ErrorHand.ErrorAndThrow(this.CallBackOnNativeIFrameAddRemoveEventAsync.name, err);
    }
    this.Logger.FuncEnd(this.CallBackOnNativeIFrameAddRemoveEventAsync.name);
  }
}