import { HindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISelectSnapUiMutationEvent_Payload } from "./ISelectSnapUiMutationEvent_Payload";
import { HindsiteEventHandler_Type } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";

export class SelectSnapUiMutationEvent_ObserverWithCallback extends HindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> {
  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type = null) {
    super(logger, SelectSnapUiMutationEvent_ObserverWithCallback.name, callback);
  }
}
