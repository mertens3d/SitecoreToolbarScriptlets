import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IDocumentProxyMutationEvent_Payload } from "./IDocumentProxyMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class DocumentProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IDocumentProxyMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.DocumentProxyMutationEvent_Subject;
  ShowLogActions: boolean = true;
}
