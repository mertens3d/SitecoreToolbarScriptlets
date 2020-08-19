import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { IAccordianManager } from "../../../Interfaces/Agents/IAccordianManager";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";
import { AccordianDrone } from "./AccordianDrone";
import { PopUpHub } from "../../../../../PopUp/scripts/Managers/PopUpHub";

export class AccordianManager implements IAccordianManager {
  private SettingsAgent: ISettingsAgent;
  private Logger: ILoggerAgent;
  private AllAccordians: AccordianDrone[] = [];

  constructor(loggerAgent: ILoggerAgent, settingsAgent: ISettingsAgent) {
    this.Logger = loggerAgent;
    this.SettingsAgent = settingsAgent;
  }

  async RestoreAccordionState(oneSetting: IOneGenericSetting): Promise<void> {
    this.Logger.FuncStart(this.RestoreAccordionState.name);

    if (oneSetting) {
      let foundAccordian: AccordianDrone = this.GetAccordianByKey(oneSetting);

      if (foundAccordian ) {
        foundAccordian.RestoreAccordionState(oneSetting);
      } else {
        this.Logger.Log('No accordion found for ' + oneSetting.Friendly);
      }
    } else {
      this.Logger.Log('No setting provided ');
    }

    this.Logger.FuncEnd(this.RestoreAccordionState.name);
  }

  AddAccordianDrone(popHub: PopUpHub, oneSetting: IOneGenericSetting, uiElem: HTMLElement) {
    let newAccordianDrone = new AccordianDrone(this.Logger, this.SettingsAgent, uiElem, oneSetting);
    this.AllAccordians.push(newAccordianDrone);
  }

  GetAccordianByKey(oneSetting: IOneGenericSetting): AccordianDrone {
    let toReturn: AccordianDrone = null;

    for (var idx = 0; idx < this.AllAccordians.length; idx++) {
      let candidate: AccordianDrone = this.AllAccordians[idx];
      if (candidate.AssociatedSetting.SettingKey === oneSetting.SettingKey) {
        toReturn = candidate;
        break;
      }
    }

    return toReturn;
  }
}