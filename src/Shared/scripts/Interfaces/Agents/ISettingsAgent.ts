import { SettingKey } from "../../Enums/SettingKey";
import { IOneGenericSetting } from "./IOneGenericSetting";

export interface ISettingsAgent {
  SetByKey: any;
  SettingsAr: IOneGenericSetting[];
  SettingChanged(SettingKey: SettingKey, checked: boolean);
  GetOnlyContentPrefs(): IOneGenericSetting[];
  ValueAsInteger(autoSaveSetting: IOneGenericSetting);
  ValueAsBool(setting: IOneGenericSetting): boolean;
  SetContentSettings(CurrentContentPrefs: IOneGenericSetting[]);
  GetByKey(AutoSaveIntervalMin: SettingKey): IOneGenericSetting;
  Init(allSettings: IOneGenericSetting[]): void;
}