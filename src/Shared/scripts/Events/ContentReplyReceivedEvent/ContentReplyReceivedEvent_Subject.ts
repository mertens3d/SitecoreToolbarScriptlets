import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IControllerMessageReceivedEvent_Payload } from "./IDataContentReplyReceivedEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class ContentReplyReceivedEvent_Subject extends HindeSiteEvent_Subject<IControllerMessageReceivedEvent_Payload>  {
  ShowLogActions: boolean = true;
  constructor(hindeCore: IHindeCore) {
    super(hindeCore, ContentReplyReceivedEvent_Subject.name);
  }
}