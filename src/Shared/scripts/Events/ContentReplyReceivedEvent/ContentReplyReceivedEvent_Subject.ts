import { ICommonCore } from "../../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { IControllerMessageReceivedEvent_Payload } from "./IDataContentReplyReceivedEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";

export class ContentReplyReceivedEvent_Subject extends HindeSiteEvent_Subject<IControllerMessageReceivedEvent_Payload>  {
  readonly TypeDiscriminator = TypeDiscriminator.ContentReplyReceivedEvent_Subject;
  ShowLogActions: boolean = true;
}