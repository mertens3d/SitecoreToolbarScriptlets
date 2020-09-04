﻿import { SettingKey } from "../../Enums/3xxx-SettingKey";
import { IGenericSetting } from "./IGenericSetting";
import { IOneGenericSettingForStorage } from "../../Classes/IOneGenericSettingForStorage";
import { SettingFlavor } from "../../Enums/SettingFlavor";

export interface ISettingsAgent {
  GetAllSettings():IGenericSetting[];
  GetByKey(AutoSaveIntervalMin: SettingKey): IGenericSetting;
  GetSettingsByFlavor(targetFlavor: SettingFlavor[]): IGenericSetting[];
  InitSettingsAgent(allSettings: IGenericSetting[]): void;
  LogAllSettings();
  ReadGenericSettingsFromStorage(): IOneGenericSettingForStorage[];
  SetByKey(settingKey: SettingKey, value: any): any;
  SetContentSettings(CurrentContentPrefs: IGenericSetting[]);
  SettingChanged(SettingKey: SettingKey, checked: boolean);
  UpdateSettings(CurrentContentPrefs: IGenericSetting[]);
  NumberSettingChanged(SettingKey: SettingKey, checked: number);
}