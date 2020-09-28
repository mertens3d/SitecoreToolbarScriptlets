import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDTFrameProxyMutationEvent_Payload } from "./IDTFrameProxyMutationEvent_Payload";

export class DTFrameProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDTFrameProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDTFrameProxyMutationEvent_Payload> {

  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, DTFrameProxyMutationEvent_Observer.name, callback);
  }

}