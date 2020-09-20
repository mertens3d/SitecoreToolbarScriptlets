import { SettingKey } from "../../Enums/3xxx-SettingKey";
import { SettingFlavor } from "../../Enums/SettingFlavor";
import { IOneGenericSettingForStorage } from "../IOneGenericSettingForStorage";
import { IHindSiteSetting } from "./IGenericSetting";


export interface ISettingsAgent {
  BooleanSettingChanged(SettingKey: SettingKey, checked: boolean);
  HindSiteSettings(): IHindSiteSetting[];
  GetByKey(settingKey: SettingKey): IHindSiteSetting;
  GetSettingsByFlavor(targetFlavor: SettingFlavor[]): IHindSiteSetting[];
  Init_SettingsAgent(allSettings: IHindSiteSetting[]): void;
  LogAllSettings();
  NumberSettingChanged(SettingKey: SettingKey, checked: number);
  ReadGenericSettingsFromStorage(): IOneGenericSettingForStorage[];
  SetByKey(settingKey: SettingKey, value: any): any;
  UpdateSettingsFromPopUpMsg(CurrentContentPrefs: IHindSiteSetting[]);
}