import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IUiModuleManagerPassThroughEvent_Payload } from "./IUiModuleManagerPassThroughEvent_Payload";
import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class UiModuleManagerPassThroughEvent_Subject extends HindeSiteEvent_Subject<IUiModuleManagerPassThroughEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.UiModuleManagerPassThroughEvent_Subject;
  readonly Friendly_Subject = UiModuleManagerPassThroughEvent_Subject.name;
  ShowLogActions: boolean = true;
}