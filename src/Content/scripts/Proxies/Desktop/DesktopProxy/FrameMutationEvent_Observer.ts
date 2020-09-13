import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { DesktopStartBarProxy } from "../DesktopStartBarProxy/DesktopStartBarProxy";
import { IFrameProxyMutated_Payload } from "./Events/Subject_DesktopIframeProxyMutatedEvent/IFrameProxyMutatedEvent_Payload";
import { IGeneric_Observer } from "./Events/GenericEvent/IGeneric_Observer";

export class FrameMutationEvent_Observer extends LoggableBase implements IGeneric_Observer<IFrameProxyMutated_Payload> {
    private Owner: DesktopStartBarProxy;
    Friendly: string;

    constructor(logger: ILoggerAgent, owner: DesktopStartBarProxy) {
        super(logger);
        this.Owner = owner;
        this.Friendly = FrameMutationEvent_Observer.name;
    }

    UpdateAsync(conEditProxy: IFrameProxyMutated_Payload):void {
        this.Owner.OnContentEditorProxyAdded(conEditProxy);

        // (payload: IPayloadDesktop_DomChangedEvent) => { self.Observer_DesktopDomChangedEvent(payload) });
    }
}
