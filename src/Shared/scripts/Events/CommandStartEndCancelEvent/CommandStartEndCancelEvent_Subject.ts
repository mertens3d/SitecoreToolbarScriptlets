import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { _HindeSiteEvent_Subject } from "../_HindSiteEvent/HindeSiteEvent_Subject";
import { ICommandStartEndCancelEvent_Payload } from "./ICommandStartEndCancelEvent_Payload";

export class CommandStartEndCancelEvent_Subject extends _HindeSiteEvent_Subject<ICommandStartEndCancelEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.CommandStartEndCancelEvent_Subject;
 protected ShowLogActions: boolean = true;
}