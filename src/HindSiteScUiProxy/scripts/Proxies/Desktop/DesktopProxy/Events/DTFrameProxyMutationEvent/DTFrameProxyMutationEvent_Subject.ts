import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDTFrameProxyMutationEvent_Payload } from "./IDTFrameProxyMutationEvent_Payload";
import { _HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class DTFrameProxyMutationEvent_Subject extends _HindeSiteEvent_Subject<IDTFrameProxyMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.DTFrameProxyMutationEvent_Subject;
  readonly Friendly_Subject = DTFrameProxyMutationEvent_Subject.name;
 protected ShowLogActions: boolean = true;
}