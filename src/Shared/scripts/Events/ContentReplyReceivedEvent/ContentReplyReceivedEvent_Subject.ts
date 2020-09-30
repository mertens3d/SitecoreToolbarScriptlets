import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IControllerMessageReceivedEvent_Payload } from "./IDataContentReplyReceivedEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class ContentReplyReceivedEvent_Subject extends HindeSiteEvent_Subject<IControllerMessageReceivedEvent_Payload>  {
  constructor(logger: ILoggerAgent) {
    super(logger, ContentReplyReceivedEvent_Subject.name);
  }
}