import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { HindeSiteEvent_Subject } from "../_HindSiteEvent/HindeSiteEvent_Subject";
import { IFrameProxyMutationEvent_Payload } from "./IFrameProxyMutationEvent_Payload";

export class FrameProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IFrameProxyMutationEvent_Payload> {

  constructor(logger: ILoggerAgent) {
    super(logger, FrameProxyMutationEvent_Subject.name);
  }
}