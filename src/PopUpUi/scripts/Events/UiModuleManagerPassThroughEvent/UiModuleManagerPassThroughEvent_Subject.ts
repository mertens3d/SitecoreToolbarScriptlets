import { HindeSiteEvent_Subject } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModuleManagerPassThroughEvent_Payload } from "./IUiModuleManagerPassThroughEvent_Payload";

export class UiModuleManagerPassThroughEvent_Subject extends HindeSiteEvent_Subject<IUiModuleManagerPassThroughEvent_Payload> {
  constructor(logger: ILoggerAgent) {
    super(logger, UiModuleManagerPassThroughEvent_Subject.name);
  }
}