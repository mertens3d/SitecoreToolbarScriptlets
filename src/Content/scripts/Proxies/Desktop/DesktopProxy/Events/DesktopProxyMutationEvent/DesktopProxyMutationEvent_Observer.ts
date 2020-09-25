import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDesktopProxyMutationEvent_Payload } from "./IDesktopProxyMutationEvent_Payload";

export class DesktopProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDesktopProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDesktopProxyMutationEvent_Payload>  {

  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, DesktopProxyMutationEvent_Observer.name, callback);
  }

}