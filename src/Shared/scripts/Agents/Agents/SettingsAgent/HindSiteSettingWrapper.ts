import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { LoggableBase } from "../../../../../Content/scripts/Managers/LoggableBase";
import { StaticHelpers } from "../../../Classes/StaticHelpers";
import { HindSiteSetting } from "./HindSiteSetting";

export class HindSiteSettingWrapper extends LoggableBase {
  HindSiteSetting: IHindSiteSetting;
  private SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, hindSiteSetting: HindSiteSetting) {
    super(logger);
    this.SettingsAgent = settingsAgent;

    this.HindSiteSetting = hindSiteSetting;

    if (StaticHelpers.IsNullOrUndefined(settingsAgent)) {
      this.Logger.ErrorAndThrow(HindSiteSetting.name, 'No settings agent');
    }
  }
  SaveChangeNumber(value: number) {
    if (this.SettingsAgent) {
      this.SettingsAgent.NumberSettingChanged(this.HindSiteSetting.SettingKey, value);
    }
    else {
      this.Logger.ErrorAndThrow(this.SaveChangeBoolean.name, 'No ISettingsAgent');
    }
  }
  SaveChangeBoolean(checked: boolean) {
    if (this.SettingsAgent) {
      this.SettingsAgent.BooleanSettingChanged(this.HindSiteSetting.SettingKey, checked);
    }
    else {
      this.Logger.ErrorAndThrow(this.SaveChangeBoolean.name, 'No ISettingsAgent');
    }
  }
}