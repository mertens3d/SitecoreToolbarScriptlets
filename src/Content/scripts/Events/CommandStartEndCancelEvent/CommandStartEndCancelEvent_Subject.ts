import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ICommandStartEndCancelEvent_Payload } from "./ICommandStartEndCancelEvent_Payload";

export class CommandStartEndCancelEvent_Subject extends HindeSiteEvent_Subject<ICommandStartEndCancelEvent_Payload> {
  ShowLogActions: boolean = true;

  constructor(hindeCore: IHindeCore, friendly: string) {
    super(hindeCore, friendly + ' ' + CommandStartEndCancelEvent_Subject.name);
  }
}