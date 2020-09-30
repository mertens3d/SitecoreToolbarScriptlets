import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IControllerMessageReceivedEvent_Payload } from "./IDataContentReplyReceivedEvent_Payload";
import { HindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { HindsiteEventHandler_Type } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { IHindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";

export class ContentReplyReceivedEvent_Observer extends HindSiteEvent_Observer<IControllerMessageReceivedEvent_Payload> implements IHindSiteEvent_Observer<IControllerMessageReceivedEvent_Payload> {
  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, ContentReplyReceivedEvent_Observer.name, callback);
  }
}