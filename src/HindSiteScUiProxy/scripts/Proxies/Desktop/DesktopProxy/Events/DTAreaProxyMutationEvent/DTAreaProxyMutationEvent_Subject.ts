import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IDTAreaProxyMutationEvent_Payload } from "./IDTAreaProxyMutationEvent_Payload";

export class DTAreaProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IDTAreaProxyMutationEvent_Payload> {
  ShowLogActions: boolean = true;
  constructor(hindeCore: IHindeCore) {
    super(hindeCore, DTAreaProxyMutationEvent_Subject.name);
  }
}