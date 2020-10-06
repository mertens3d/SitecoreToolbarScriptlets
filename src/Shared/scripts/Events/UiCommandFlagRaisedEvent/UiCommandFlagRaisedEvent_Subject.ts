import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IUiCommandFlagRaisedEvent_Payload } from "./IUiCommandFlagRaisedEvent_Payload";

export class UiCommandFlagRaisedEvent_Subject extends HindeSiteEvent_Subject<IUiCommandFlagRaisedEvent_Payload> {
  ShowLogActions: boolean = true;
  constructor(hindeCore: IHindeCore) {
    super(hindeCore, UiCommandFlagRaisedEvent_Subject.name);
  }
}