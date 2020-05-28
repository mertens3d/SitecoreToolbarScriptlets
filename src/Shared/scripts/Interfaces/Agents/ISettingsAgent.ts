import { SettingKey } from "../../Enums/SettingKey";
import { IOneGenericSetting } from "./IOneGenericSetting";

export interface ISettingsAgent {
  GetByKey(AutoSaveIntervalMin: SettingKey, CurrentContentPrefs: any[]): IOneGenericSetting;
}