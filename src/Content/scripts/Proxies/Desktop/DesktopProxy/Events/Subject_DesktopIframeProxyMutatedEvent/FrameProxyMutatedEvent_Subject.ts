import { GenericEvent_Subject } from "../GenericEvent/GenericEvent_Subject";
import { IFrameProxyMutated_Payload } from "./IFrameProxyMutatedEvent_Payload";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";

export class DesktopIframeProxyMutatedEvent_Subject extends GenericEvent_Subject<IFrameProxyMutated_Payload> {

  constructor(logger: ILoggerAgent) {
    super(logger, DesktopIframeProxyMutatedEvent_Subject.name);
  }
}