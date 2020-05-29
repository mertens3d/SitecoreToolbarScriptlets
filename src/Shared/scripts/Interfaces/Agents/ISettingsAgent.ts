import { SettingKey } from "../../Enums/SettingKey";
import { IOneGenericSetting } from "./IOneGenericSetting";

export interface ISettingsAgent {
  ValueAsInteger(autoSaveSetting: IOneGenericSetting);
  ValueAsBool(setting: IOneGenericSetting): boolean;
  SetContentSettings(CurrentContentPrefs: IOneGenericSetting[]);
  GetByKey(AutoSaveIntervalMin: SettingKey): IOneGenericSetting;
}