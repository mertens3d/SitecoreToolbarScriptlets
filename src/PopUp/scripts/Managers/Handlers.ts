import { HandlersExternal } from "../Classes/HandlersExternal";
import { HandlersInternal } from "../Classes/HandlersInternal";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { PopUpMessageManager } from "./MessageManager";
import { UiManager } from "./UiManager/UiManager";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { TabManager } from "./TabManager";
export class Handlers {
  External: HandlersExternal;
  Internal: HandlersInternal;

  constructor(logger: ILoggerAgent, msgManager: PopUpMessageManager,  settingsAgent: ISettingsAgent, tabMan: TabManager) {

    this.External = new HandlersExternal(logger, msgManager, settingsAgent, tabMan);
    this.Internal = new HandlersInternal(logger, tabMan);
  }
}