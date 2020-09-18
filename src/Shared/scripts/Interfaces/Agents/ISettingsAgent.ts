import { SettingKey } from "../../Enums/3xxx-SettingKey";
import { IGenericSetting } from "./IGenericSetting";
import { IOneGenericSettingForStorage } from "../IOneGenericSettingForStorage";
import { SettingFlavor } from "../../Enums/SettingFlavor";
import { InitResultsDTFrameProxy } from "./InitResultsDTFrameProxy";


export interface ISettingsAgent {
  CheckBoxSettingChanged(SettingKey: SettingKey, checked: boolean);
  GetAllSettings(): IGenericSetting[];
  GetByKey(settingKey: SettingKey): IGenericSetting;
  GetSettingsByFlavor(targetFlavor: SettingFlavor[]): IGenericSetting[];
  InitSettingsAgent(allSettings: IGenericSetting[]): void;
  LogAllSettings();
  NumberSettingChanged(SettingKey: SettingKey, checked: number);
  ReadGenericSettingsFromStorage(): IOneGenericSettingForStorage[];
  SetByKey(settingKey: SettingKey, value: any): any;
  UpdateSettingsFromPopUpMsg(CurrentContentPrefs: IGenericSetting[]);
}