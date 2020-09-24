﻿import { HindeSiteEvent_Subject } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiCommandFlagRaisedEvent_Payload } from "./IUiCommandFlagRaisedEvent_Payload";

export class UiCommandFlagRaisedEvent_Subject extends HindeSiteEvent_Subject<IUiCommandFlagRaisedEvent_Payload> {
  constructor(logger: ILoggerAgent) {
    super(logger, UiCommandFlagRaisedEvent_Subject.name);
  }
}