import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { IGeneric_Observer } from "./Events/GenericEvent/IGeneric_Observer";
import { IDomChangedEvent_Payload } from "./Events/DomChangedEvent/IDomChangedEvent_Payload";
import { DesktopProxy } from "./DesktopProxy";

export class DesktopDomChangedEvent_Observer extends LoggableBase implements IGeneric_Observer<IDomChangedEvent_Payload> {
    private Owner: DesktopProxy;
    Friendly: string;

    constructor(logger: ILoggerAgent, owner: DesktopProxy) {
        super(logger);
        this.Owner = owner;
        this.Friendly = DesktopDomChangedEvent_Observer.name;
    }

    Update(payload: IDomChangedEvent_Payload) {
        //this.Owner.
        this.Logger.WarningAndContinue(DesktopDomChangedEvent_Observer.name, 'Not implemented');
    }
}
