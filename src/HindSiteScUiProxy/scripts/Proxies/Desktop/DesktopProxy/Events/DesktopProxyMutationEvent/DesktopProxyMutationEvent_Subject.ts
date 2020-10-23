import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IDesktopProxyMutationEvent_Payload } from "./IDesktopProxyMutationEvent_Payload";

export class DesktopProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IDesktopProxyMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.DesktopProxyMutationEvent_Subject;
 protected ShowLogActions: boolean = true;
}
