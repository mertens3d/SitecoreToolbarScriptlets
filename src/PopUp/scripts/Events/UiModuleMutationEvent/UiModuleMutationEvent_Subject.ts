import { HindeSiteEvent_Subject } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModuleMutationEvent_Payload } from "./IUiModuleMutationEvent_Payload";

export class UiModuleMutationEvent_Subject extends HindeSiteEvent_Subject<IUiModuleMutationEvent_Payload> {
  constructor(logger: ILoggerAgent) {
    super(logger, UiModuleMutationEvent_Subject.name);
  }
}