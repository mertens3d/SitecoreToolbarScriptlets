import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ISelectSnapUiMutationEvent_Payload } from "./ISelectSnapUiMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class SelectSnapUiMutationEvent_Subject extends HindeSiteEvent_Subject<ISelectSnapUiMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.SelectSnapUiMutationEvent_Subject;
 protected ShowLogActions: boolean = true;
}