import { HindSiteEvent_Observer } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { HindsiteEventHandler_Type } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISelectSnapUiMutationEvent_Payload } from "./ISelectSnapUiMutationEvent_Payload";

export class SelectSnapUiMutationEvent_ObserverWithCallback extends HindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> {
  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type = null) {
    super(logger, SelectSnapUiMutationEvent_ObserverWithCallback.name, callback);
  }
}
