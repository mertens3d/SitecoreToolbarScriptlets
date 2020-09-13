import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { HandlersExternalEvent } from "../Classes/HandlersExternal";
import { HandlersInternal } from "../Classes/HandlersInternal";
import { PopUpMessageManager } from "./MessageManager";
import { TabManager } from "./TabManager";
export class Handlers extends LoggableBase {
  External: HandlersExternalEvent;
  Internal: HandlersInternal;

  constructor(logger: ILoggerAgent, msgManager: PopUpMessageManager, settingsAgent: ISettingsAgent, tabMan: TabManager) {
    super(logger);

    this.External = new HandlersExternalEvent(logger, msgManager, settingsAgent, tabMan);
    this.Internal = new HandlersInternal(logger, tabMan);
  }
}