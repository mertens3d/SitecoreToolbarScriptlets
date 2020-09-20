import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { SettingType } from "../../../Enums/SettingType";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { UiEnableState, UiPresence } from "../../../Enums/Enabled";
import { ModuleKey } from "../../../Enums/ModuleKey";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { LoggableBase } from "../../../../../Content/scripts/Managers/LoggableBase";
import { StaticHelpers } from "../../../Classes/StaticHelpers";
export class HindSiteSetting extends LoggableBase implements IHindSiteSetting {
  Enabled: UiEnableState;
  DataType: SettingType;
  DefaultValue: any;
  FriendlySetting: string;
  SettingFlavor: SettingFlavor;
  SettingKey: SettingKey;
  UiContainerSelector: string;
  ValueAsObj: any;
  HasUi: UiPresence;
  ModuleType: ModuleKey;
  private SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, settingKey: SettingKey, dataType: SettingType, uiContainerSelector: string, defaultValue: any, settingFlavor: SettingFlavor, friendly: string, enabled: UiEnableState, hasUi: UiPresence, moduleType: ModuleKey, settingsAgent: ISettingsAgent) {
    super(logger);

    if (StaticHelpers.IsNullOrUndefined(settingsAgent)) {
      this.Logger.ErrorAndThrow(HindSiteSetting.name, 'No settings agent');
    }

    this.SettingKey = settingKey;
    this.DataType = dataType;
    this.ValueAsObj = defaultValue;
    this.UiContainerSelector = uiContainerSelector;
    this.DefaultValue = defaultValue;
    this.SettingFlavor = settingFlavor;
    this.FriendlySetting = friendly;
    this.HasUi = UiPresence.Unknown;
    this.Enabled = enabled;
    this.ModuleType = moduleType;
    this.SettingsAgent = settingsAgent;
  }

  SaveChange(checked: boolean) {
    if (this.SettingsAgent) {
      this.SettingsAgent.BooleanSettingChanged(this.SettingKey, checked);
    } else {
      this.Logger.ErrorAndThrow(this.SaveChange.name, 'No ISettingsAgent');
    }
  }

  ValueAsInt(): number {
    var toReturn: number = Number.MIN_SAFE_INTEGER;
    if (this.ValueAsObj !== undefined && this.ValueAsObj !== null) {
      toReturn = parseInt(this.ValueAsObj.toString());
    }

    return toReturn;
  }

  ValueAsBool(): boolean {
    let toReturn: boolean = this.DefaultValue;

    if (this.ValueAsObj !== undefined && this.ValueAsObj !== null) {
      toReturn = <boolean>this.ValueAsObj;
    } else {
      toReturn = this.DefaultValue;
    }

    return toReturn;
  }
  //  i am passing the setting in the message so the method doesn't come along
  //i either need a helper method or need to reconstruct the instances on the content side
}