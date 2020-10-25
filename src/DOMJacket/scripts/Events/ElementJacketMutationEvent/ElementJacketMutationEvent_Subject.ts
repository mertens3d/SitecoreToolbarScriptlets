import { _HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IElementJacketMutationEvent_Payload } from "./IElementJacketMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class ElementJacketMutationEvent_Subject extends _HindeSiteEvent_Subject<IElementJacketMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.ElementJacketMutationEvent_Subject;
 protected ShowLogActions: boolean = true;
}