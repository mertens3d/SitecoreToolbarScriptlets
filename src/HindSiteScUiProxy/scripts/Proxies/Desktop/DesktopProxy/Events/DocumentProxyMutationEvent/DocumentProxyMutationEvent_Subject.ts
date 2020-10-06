import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IDocumentProxyMutationEvent_Payload } from "./IDocumentProxyMutationEvent_Payload";

export class DocumentProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IDocumentProxyMutationEvent_Payload> {
  ShowLogActions: boolean = true;
}
