import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { SettingType } from "../../../../Shared/scripts/Enums/SettingType";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { AccordianModule } from "../AccordianModule/AccordianModule";
import { HindSiteSettingCheckBoxModule } from "./HindSiteSettingCheckBoxModule";
import { HindSiteSettingNumberModule } from "./HindSiteSettingNumberModule";

export class SettingsBasedModules extends LoggableBase {
  private SettingsAgent: ISettingsAgent;
  CheckBoxModules: IUiModule[];
  AccordianModules: IUiModule[];
  NumberModules: HindSiteSettingNumberModule[];

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent) {
    super(logger)
    this.SettingsAgent = settingsAgent;

    this.CheckBoxModules = this.BuildCheckBoxSettingModules();
    this.NumberModules = this.BuildNumberSettingModules();
    this.AccordianModules = this.BuildAccordianModules();
  }

  BuildAccordianModules() { //oneSetting: IHindSiteSetting, uiElem: HTMLElement
    let toReturn: AccordianModule[] = [];
    this.SettingsAgent.HindSiteSettings().forEach((hindSiteSetting: IHindSiteSetting) => {
      if (hindSiteSetting.DataType === SettingType.Accordion) {
        let newAccordianDrone = new AccordianModule(this.Logger, this.SettingsAgent, hindSiteSetting);

        toReturn.push(newAccordianDrone);
      }
    });

    return toReturn;
  }

  BuildCheckBoxSettingModules(): HindSiteSettingCheckBoxModule[] {
    let toReturn: HindSiteSettingCheckBoxModule[] = [];

    this.SettingsAgent.HindSiteSettings().forEach((hindSiteSetting: IHindSiteSetting) => {
      if (hindSiteSetting.DataType === SettingType.BoolCheckBox) {
        let hindSiteCheckboxSetting: HindSiteSettingCheckBoxModule = new HindSiteSettingCheckBoxModule(this.Logger, this.SettingsAgent, hindSiteSetting)

        toReturn.push(hindSiteCheckboxSetting);
      }
    });

    return toReturn;
  }

  BuildNumberSettingModules(): HindSiteSettingNumberModule[] {
    let toReturn: HindSiteSettingNumberModule[] = [];

    this.SettingsAgent.HindSiteSettings().forEach((hindSiteSetting: IHindSiteSetting) => {
      if (hindSiteSetting.DataType === SettingType.Number) {
        let hindSiteCheckboxSetting: HindSiteSettingNumberModule = new HindSiteSettingNumberModule(this.Logger, this.SettingsAgent, hindSiteSetting)

        toReturn.push(hindSiteCheckboxSetting);
      }
    });

    return toReturn;
  }
}