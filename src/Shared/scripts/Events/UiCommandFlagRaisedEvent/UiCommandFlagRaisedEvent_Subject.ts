import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ICommonCore } from "../../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { IUiCommandFlagRaisedEvent_Payload } from "./IUiCommandFlagRaisedEvent_Payload";
import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";

export class UiCommandFlagRaisedEvent_Subject extends HindeSiteEvent_Subject<IUiCommandFlagRaisedEvent_Payload> {
  readonly Friendly_Subject = UiCommandFlagRaisedEvent_Subject.name;
  readonly TypeDiscriminator = TypeDiscriminator.UiCommandFlagRaisedEvent_Subject;
  protected ShowLogActions: boolean = true;

  constructor(commonCore: ICommonCore) {
    super(commonCore);
  }
}