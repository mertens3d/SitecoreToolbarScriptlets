import { IAccordianManager } from "../../../../Shared/scripts/Interfaces/Agents/IAccordianManager";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { AccordianModule } from "./AccordianModule";

export class AccordianModulesManager implements IAccordianManager {
  private SettingsAgent: ISettingsAgent;
  private Logger: ILoggerAgent;
  private AllAccordians: AccordianModule[] = [];

  constructor(loggerAgent: ILoggerAgent, settingsAgent: ISettingsAgent) {
    this.Logger = loggerAgent;
    this.SettingsAgent = settingsAgent;
  }

  async RestoreAccordionState(oneSetting: IHindSiteSetting): Promise<void> {
    if (oneSetting) {
      let foundAccordian: AccordianModule = this.GetAccordianByKey(oneSetting);

      if (foundAccordian) {
        foundAccordian.DroneRestoreAccordionState(oneSetting);
      } else {
        this.Logger.Log('No accordion found for ' + oneSetting.FriendlySetting);
      }
    } else {
      this.Logger.Log('No setting provided ');
    }
  }

  AddAccordianDrone(oneSetting: IHindSiteSetting, uiElem: HTMLElement) {
    let newAccordianDrone = new AccordianModule(this.Logger, this.SettingsAgent, uiElem, oneSetting);
    this.AllAccordians.push(newAccordianDrone);
  }

  GetAccordianByKey(oneSetting: IHindSiteSetting): AccordianModule {
    let toReturn: AccordianModule = null;

    for (var idx = 0; idx < this.AllAccordians.length; idx++) {
      let candidate: AccordianModule = this.AllAccordians[idx];
      if (candidate.AssociatedSetting.SettingKey === oneSetting.SettingKey) {
        toReturn = candidate;
        break;
      }
    }

    return toReturn;
  }
}