import { IAccordianManager } from "../../../Interfaces/Agents/IAccordianManager";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { AccordianDrone } from "./AccordianDrone";

export class AccordianManager implements IAccordianManager {
  private SettingsAgent: ISettingsAgent;
  private Logger: ILoggerAgent;
  private AllAccordians: AccordianDrone[] = [];

  constructor(loggerAgent: ILoggerAgent, settingsAgent: ISettingsAgent) {
    this.Logger = loggerAgent;
    this.SettingsAgent = settingsAgent;
  }

  async RestoreAccordionState(oneSetting: IOneGenericSetting): Promise<void> {

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

  }

  AddAccordianDrone(oneSetting: IOneGenericSetting, uiElem: HTMLElement) {
    //this.Logger.FuncStart(this.AddAccordianDrone.name, oneSetting.UiSelector);
    let newAccordianDrone = new AccordianDrone(this.Logger, this.SettingsAgent, uiElem, oneSetting);
    this.AllAccordians.push(newAccordianDrone);
    //this.Logger.FuncEnd(this.AddAccordianDrone.name);
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