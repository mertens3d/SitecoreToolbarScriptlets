import { DocumentProxyMutationEvent_Subject } from "../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Subject";
import { IDocumentProxyMutationEvent_Payload } from "../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";
import { Guid } from "../Shared/scripts/Helpers/Guid";
import { GuidData } from "../Shared/scripts/Helpers/GuidData";
import { IHindeCore } from "../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _HindeCoreBase } from "../Shared/scripts/_HindeCoreBase";
import { DocumentJacket } from "./DocumentJacket";
import { FrameJacketAddRemoveEvent_Observer } from "./Events/NativeIFrameAddedEvent/FrameJacketAddRemoveEvent_Observer";
import { FrameJacketAddRemoveEvent_Subject } from "./Events/NativeIFrameAddedEvent/FrameJacketAddRemoveEvent_Subject";
import { IFrameJacketAddRemoveEvent_Payload } from "./Events/NativeIFrameAddedEvent/IFrameJacketAddRemoveEvent_Payload";

export class DocumentJacketWatcher extends _HindeCoreBase {
  private DocumentJacket: DocumentJacket; //work towards making this private
  private FrameJacketAddRemoveEvent_Subject: FrameJacketAddRemoveEvent_Subject;
  private NativeIframeAddRemoveEvent_Observer: FrameJacketAddRemoveEvent_Observer;
  public DocumentProxyMutationEvent_Subject: DocumentProxyMutationEvent_Subject;
  readonly DocId: GuidData = Guid.NewRandomGuid();

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket) {
    super(hindeCore);

    this.ErrorHand.ThrowIfNullOrUndefined(DocumentJacketWatcher.name, [documentJacket]);

    this.DocumentJacket = documentJacket;

    this.InstantiateInstance();
  }

  private InstantiateInstance() {
    this.Logger.FuncStart(this.InstantiateInstance.name, DocumentJacketWatcher.name);

    this.FrameJacketAddRemoveEvent_Subject = new FrameJacketAddRemoveEvent_Subject(this.HindeCore, this.DocumentJacket);

    this.NativeIframeAddRemoveEvent_Observer = new FrameJacketAddRemoveEvent_Observer(this.HindeCore, this.CallBackOnNativeIFrameAddRemoveEventAsync.bind(this));
    this.DocumentProxyMutationEvent_Subject = new DocumentProxyMutationEvent_Subject(this.Logger, this.ErrorHand, DocumentJacketWatcher.name);

    this.WireInstanceEvents();

    this.Logger.FuncEnd(this.InstantiateInstance.name, DocumentJacketWatcher.name);
  }

  private WireInstanceEvents() {
    this.Logger.FuncStart(this.WireInstanceEvents.name, DocumentJacketWatcher.name);
    this.FrameJacketAddRemoveEvent_Subject.RegisterObserver(this.NativeIframeAddRemoveEvent_Observer);

    this.Logger.FuncEnd(this.WireInstanceEvents.name, DocumentJacketWatcher.name);
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
}