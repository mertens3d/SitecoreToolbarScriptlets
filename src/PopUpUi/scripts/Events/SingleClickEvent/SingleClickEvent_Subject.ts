import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ISingleClickEvent_Payload } from "./ISingleClickEvent_Payload";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";

export class SingleClickEvent_Subject extends HindeSiteEvent_Subject<ISingleClickEvent_Payload> {
  ShowLogActions: boolean = true;
  constructor(hindeCore: IHindeCore, friendly: string) {
    super(hindeCore, friendly + ' ' + SingleClickEvent_Subject.name);
  }
}