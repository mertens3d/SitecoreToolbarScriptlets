﻿import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { HandlersExternalEvent } from "../Classes/HandlersExternal";
import { HandlersInternal } from "../Classes/HandlersInternal";
//import { PopUpMessageManager } from "./MessageManager";
import { BrowserTabAgent } from "./TabManager";
import { PopUpMessagesBrokerAgent } from "../Agents/PopUpMessagesBrokerAgent";
export class Handlers extends LoggableBase {
  External: HandlersExternalEvent;
  Internal: HandlersInternal;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, browserTabAgent: BrowserTabAgent, popUpMessagesBroker: PopUpMessagesBrokerAgent) {
    super(logger);

    this.External = new HandlersExternalEvent(logger, settingsAgent, browserTabAgent, popUpMessagesBroker);
    this.Internal = new HandlersInternal(logger, browserTabAgent);
  }
}