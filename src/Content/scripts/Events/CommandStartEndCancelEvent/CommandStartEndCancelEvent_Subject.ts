import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ICommandStartEndCancelEvent_Payload } from "./ICommandStartEndCancelEvent_Payload";

export class CommandStartEndCancelEvent_Subject extends HindeSiteEvent_Subject<ICommandStartEndCancelEvent_Payload> {

  constructor(logger: ILoggerAgent, friendly: string) {
    super(logger, friendly + ' ' + CommandStartEndCancelEvent_Subject.name);
  }
}