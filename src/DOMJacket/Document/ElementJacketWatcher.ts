import { ElementJacketMutationEvent_Subject } from "../Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Subject";
import { IElementJacketMutationEvent_Payload } from "../Events/ElementJacketMutationEvent/IElementJacketMutationEvent_Payload";
import { IElemJacketWatcherParameters } from "../Events/ElementJacketMutationEvent/IElemJacketWatcherParameters";
import { ICommonCore } from "../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { _CommonBase } from "../../Shared/scripts/_CommonCoreBase";
import { GenericElemJacket } from "../Elements/GenericElemJacket";
import { NativeAddRemoveEvent_Observer } from "../Events/NativeIFrameAddedEvent/NativeAddRemoveEvent_Observer";
import { NativeAddRemoveEvent_Subject } from "../Events/NativeIFrameAddedEvent/NativeAddRemoveEvent_Subject";
import { INativeAddRemoveEvent_Payload } from "../Events/NativeIFrameAddedEvent/INativeAddRemoveEvent_Payload";


export class ElementJacketWatcher extends _CommonBase {
    /*
     * Handles the native portion of watching an element for changes
    */
    private ElementJacket: GenericElemJacket;
    private NativeAddRemoveEvent_Subject: NativeAddRemoveEvent_Subject;
    private NativeAddRemoveEvent_Observer: NativeAddRemoveEvent_Observer;
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
        this.NativeAddRemoveEvent_Subject = new NativeAddRemoveEvent_Subject(this.CommonCore, this.ElementJacket, this.WatcherParams);
        this.NativeAddRemoveEvent_Observer = new NativeAddRemoveEvent_Observer(this.CommonCore, this.CallBackOnNativeAddRemoveEventAsync.bind(this));
        this.WireInstanceEvents();
        this.Logger.FuncEnd(this.InstantiateInstance.name, ElementJacketWatcher.name);
    }

    private WireInstanceEvents() {
      this.Logger.FuncStart([ElementJacketWatcher.name,this.WireInstanceEvents.name]);
        this.NativeAddRemoveEvent_Subject.RegisterObserver(this.NativeAddRemoveEvent_Observer);
      this.Logger.FuncEnd([ElementJacketWatcher.name, this.WireInstanceEvents.name]);
    }

    //------------------------------------------------------------
  private async CallBackOnNativeAddRemoveEventAsync(nativeIFrameAddRemoveEvent_Payload: INativeAddRemoveEvent_Payload): Promise<void> {
    this.Logger.FuncStart([ElementJacketWatcher.name, this.CallBackOnNativeAddRemoveEventAsync.name], 'On Behalf of: ' + nativeIFrameAddRemoveEvent_Payload.OnBehalfOfFriendly);
        try {
            let payload: IElementJacketMutationEvent_Payload = {
                AddedGenericElemJacket: nativeIFrameAddRemoveEvent_Payload.AddedElementJacket,
                RemovedIFrameId: nativeIFrameAddRemoveEvent_Payload.RemovedIFrameId
            };

            this.ElemJacketMutationEvent_Subject.NotifyObserversAsync(payload);
        }
        catch (err) {
            this.ErrorHand.HandleFatalError(this.CallBackOnNativeAddRemoveEventAsync.name, err);
        }
    this.Logger.FuncEnd([ElementJacketWatcher.name, this.CallBackOnNativeAddRemoveEventAsync.name], 'On Behalf of: ' + nativeIFrameAddRemoveEvent_Payload.OnBehalfOfFriendly);
    }
}
