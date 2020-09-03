import { SettingKey } from "../../Enums/3xxx-SettingKey";
import { IGenericSetting } from "./IGenericSetting";
import { IOneGenericSettingForStorage } from "../../Classes/IOneGenericSettingForStorage";

export interface ISettingsAgent {
  GetAllSettings():IGenericSetting[];
  GetByKey(AutoSaveIntervalMin: SettingKey): IGenericSetting;
  GetOnlyContentPrefs(): IGenericSetting[];
  InitSettingsAgent(allSettings: IGenericSetting[]): void;
  LogAllSettings();
  ReadGenericSettingsFromStorage(): IOneGenericSettingForStorage[];
  SetByKey(settingKey: SettingKey, value: any): any;
  SetContentSettings(CurrentContentPrefs: IGenericSetting[]);
  SettingChanged(SettingKey: SettingKey, checked: boolean);
  ValueAsInteger(autoSaveSetting: IGenericSetting);
}