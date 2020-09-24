import { HindeSiteEvent_Subject } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISelectSnapUiMutationEvent_Payload } from "./ISelectSnapUiMutationEvent_Payload";

export class SelectSnapUiMutationEvent_Subject extends HindeSiteEvent_Subject<ISelectSnapUiMutationEvent_Payload> {
  constructor(logger: ILoggerAgent) {
    super(logger, SelectSnapUiMutationEvent_Subject.name);
  }
}