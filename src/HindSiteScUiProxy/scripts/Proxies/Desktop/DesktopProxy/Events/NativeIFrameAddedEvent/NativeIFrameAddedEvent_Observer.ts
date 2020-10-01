import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { INativeIFrameAddedEvent_Payload } from "./INativeIFrameAddedEvent_Payload";

export class NativeIFrameAddedEvent_Observer extends HindSiteEvent_Observer<INativeIFrameAddedEvent_Payload> implements IHindSiteEvent_Observer<INativeIFrameAddedEvent_Payload>  {

  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, NativeIFrameAddedEvent_Observer.name, callback);
  }
}