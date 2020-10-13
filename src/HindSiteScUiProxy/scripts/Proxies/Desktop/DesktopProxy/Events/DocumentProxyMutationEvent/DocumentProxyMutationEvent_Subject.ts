import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IDocumentJacketMutationEvent_Payload } from "./IDocumentProxyMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";


export class DocumentJacketMutationEvent_Subject extends HindeSiteEvent_Subject<IDocumentJacketMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.DocumentJacketMutationEvent_Subject;
  ShowLogActions: boolean = true;
}
