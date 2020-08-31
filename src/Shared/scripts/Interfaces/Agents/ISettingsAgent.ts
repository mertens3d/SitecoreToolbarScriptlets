import { SettingKey } from "../../Enums/3xxx-SettingKey";
import { IOneGenericSetting } from "./IOneGenericSetting";
import { IOneGenericSettingForStorage } from "../../Classes/IOneGenericSettingForStorage";

export interface ISettingsAgent {
  SetByKey(settingKey: SettingKey, value: any): any;
  SettingsAr: IOneGenericSetting[];
  SettingChanged(SettingKey: SettingKey, checked: boolean);
  GetOnlyContentPrefs(): IOneGenericSetting[];
  ValueAsInteger(autoSaveSetting: IOneGenericSetting);
  ValueAsBool(setting: IOneGenericSetting): boolean;
  SetContentSettings(CurrentContentPrefs: IOneGenericSetting[]);
  GetByKey(AutoSaveIntervalMin: SettingKey): IOneGenericSetting;
  InitSettingsAgent(allSettings: IOneGenericSetting[]): Promise< void>;
  ReadGenericSettings(): Promise<IOneGenericSettingForStorage[]>;
}