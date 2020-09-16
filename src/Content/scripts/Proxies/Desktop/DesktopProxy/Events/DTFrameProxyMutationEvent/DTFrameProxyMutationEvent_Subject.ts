import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { HindeSiteEvent_Subject } from "../_HindSiteEvent/HindeSiteEvent_Subject";
import { IDTFrameProxyMutationEvent_Payload } from "./IDTFrameProxyMutationEvent_Payload";

export class DTFrameProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IDTFrameProxyMutationEvent_Payload> {

  constructor(logger: ILoggerAgent) {
    super(logger, DTFrameProxyMutationEvent_Subject.name);
  }
}