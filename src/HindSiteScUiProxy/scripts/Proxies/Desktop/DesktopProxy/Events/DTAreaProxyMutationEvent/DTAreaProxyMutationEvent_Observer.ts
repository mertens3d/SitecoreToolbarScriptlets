import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDTAreaProxyMutationEvent_Payload } from "./IDTAreaProxyMutationEvent_Payload";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";

export class DTAreaProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDTAreaProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDTAreaProxyMutationEvent_Payload> {

    constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
      super(logger, DTAreaProxyMutationEvent_Observer.name, callback);
    }

}
