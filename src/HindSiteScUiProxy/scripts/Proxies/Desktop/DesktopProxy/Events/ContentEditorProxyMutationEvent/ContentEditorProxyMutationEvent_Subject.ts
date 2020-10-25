import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { _HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { I_ContentTreeBasedProxyMutationEvent_Payload } from "./IContentEditorProxyMutationEvent_Payload";

export class __ContentTreeBasedProxyMutationEvent__Subject extends _HindeSiteEvent_Subject<I_ContentTreeBasedProxyMutationEvent_Payload>  {
  readonly TypeDiscriminator = TypeDiscriminator.__ContentTreeBasedProxyMutationEvent__Subject;
  readonly Friendly_Subject = __ContentTreeBasedProxyMutationEvent__Subject.name;
 protected ShowLogActions: boolean = true;
}