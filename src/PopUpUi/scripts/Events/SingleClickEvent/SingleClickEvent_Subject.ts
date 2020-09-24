import { HindeSiteEvent_Subject } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ISingleClickEvent_Payload } from "./ISingleClickEvent_Payload";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";

export class SingleClickEvent_Subject extends HindeSiteEvent_Subject<ISingleClickEvent_Payload> {
  constructor(logger: ILoggerAgent, friendly: string) {
    super(logger, friendly + ' ' + SingleClickEvent_Subject.name);
  }
}