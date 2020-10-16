import { ElementJacketMutationEvent_Subject } from "../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/ElementJacketMutationEvent_Subject";
import { IDocumentJacketMutationEvent_Payload } from "../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";
import { IElemJacketWatcherParameters } from "../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IElemJacketWatcherParameters";
import { ICommonCore } from "../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { _CommonBase } from "../../Shared/scripts/_CommonCoreBase";
import { GenericElemJacket } from "../Elements/GenericElemJacket";
import { FrameJacketAddRemoveEvent_Observer } from "../Events/NativeIFrameAddedEvent/FrameJacketAddRemoveEvent_Observer";
import { NativeAddRemoveEvent_Subject } from "../Events/NativeIFrameAddedEvent/FrameJacketAddRemoveEvent_Subject";
import { NativeAddRemoveEvent_Payload } from "../Events/NativeIFrameAddedEvent/IFrameJacketAddRemoveEvent_Payload";

export class ElementJacketWatcher extends _CommonBase {
  /*
   * Handles the native portion of watching a document for changes
  */
  private ElementJacket: GenericElemJacket; 
  private FrameJacketAddRemoveEvent_Subject: NativeAddRemoveEvent_Subject;
  private NativeIframeAddRemoveEvent_Observer: FrameJacketAddRemoveEvent_Observer;
  public ElemJacketMutationEvent_Subject: ElementJacketMutationEvent_Subject;
  private WatcherParams: IElemJacketWatcherParameters;

  constructor(commonCore: ICommonCore, elementJacket: GenericElemJacket, watcherParams: IElemJacketWatcherParameters) {
    super(commonCore);

    this.ErrorHand.ThrowIfNullOrUndefined(ElementJacketWatcher.name, [elementJacket]);

    this.ElementJacket = elementJacket;
    this.WatcherParams = watcherParams;

    this.InstantiateInstance();
  }

  private InstantiateInstance() {
    this.Logger.FuncStart(this.InstantiateInstance.name, ElementJacketWatcher.name);

    this.ElemJacketMutationEvent_Subject = new ElementJacketMutationEvent_Subject(this.CommonCore);
    this.FrameJacketAddRemoveEvent_Subject = new NativeAddRemoveEvent_Subject(this.CommonCore, this.ElementJacket, this.WatcherParams);
    this.NativeIframeAddRemoveEvent_Observer = new FrameJacketAddRemoveEvent_Observer(this.CommonCore, this.CallBackOnNativeIFrameAddRemoveEventAsync.bind(this));
    this.WireInstanceEvents();
    this.Logger.FuncEnd(this.InstantiateInstance.name, ElementJacketWatcher.name);
  }

  private WireInstanceEvents() {
    this.Logger.FuncStart(this.WireInstanceEvents.name, ElementJacketWatcher.name);
    this.FrameJacketAddRemoveEvent_Subject.RegisterObserver(this.NativeIframeAddRemoveEvent_Observer);
    this.Logger.FuncEnd(this.WireInstanceEvents.name, ElementJacketWatcher.name);
  }

  //------------------------------------------------------------

  private async CallBackOnNativeIFrameAddRemoveEventAsync(nativeIFrameAddRemoveEvent_Payload: NativeAddRemoveEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.CallBackOnNativeIFrameAddRemoveEventAsync.name);
    try {
      let payload: IDocumentJacketMutationEvent_Payload = {
        AddedGenericElemJacket: nativeIFrameAddRemoveEvent_Payload.AddedElementJacket,
        RemovedIFrameId: nativeIFrameAddRemoveEvent_Payload.RemovedIFrameId
      };

      this.ElemJacketMutationEvent_Subject.NotifyObserversAsync(payload);
    }
    catch (err) {
      this.ErrorHand.HandleFatalError(this.CallBackOnNativeIFrameAddRemoveEventAsync.name, err);
    }
    this.Logger.FuncEnd(this.CallBackOnNativeIFrameAddRemoveEventAsync.name);
  }
}