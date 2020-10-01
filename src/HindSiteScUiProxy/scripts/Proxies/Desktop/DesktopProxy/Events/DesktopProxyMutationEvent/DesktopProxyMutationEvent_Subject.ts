import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IDesktopProxyMutationEvent_Payload } from "./IDesktopProxyMutationEvent_Payload";

export class DesktopProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IDesktopProxyMutationEvent_Payload> {
    constructor(logger: ILoggerAgent) {
        super(logger, DesktopProxyMutationEvent_Subject.name);
    }
}
