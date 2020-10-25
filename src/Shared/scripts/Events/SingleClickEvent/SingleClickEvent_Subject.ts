import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { _HindeSiteEvent_Subject } from "../_HindSiteEvent/HindeSiteEvent_Subject";
import { ISingleClickEvent_Payload } from "./ISingleClickEvent_Payload";

export class SingleClickEvent_Subject extends _HindeSiteEvent_Subject<ISingleClickEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.SingleClickEvent_Subject;
 protected ShowLogActions: boolean = true;
}