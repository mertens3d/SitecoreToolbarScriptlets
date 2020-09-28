import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IDTAreaProxyMutationEvent_Payload } from "./IDTAreaProxyMutationEvent_Payload";

export class DTAreaProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IDTAreaProxyMutationEvent_Payload> {
  constructor(logger: ILoggerAgent) {
    super(logger, DTAreaProxyMutationEvent_Subject.name);
  }
}