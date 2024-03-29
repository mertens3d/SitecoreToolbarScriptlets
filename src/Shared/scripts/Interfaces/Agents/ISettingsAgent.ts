﻿import { HindSiteSettingsBucket } from "../../Agents/SettingsAgent/HindSiteSettingsBucket";
import { HindSiteSettingWrapper } from "../../Agents/SettingsAgent/HindSiteSettingWrapper";
import { SettingKey } from "../../Enums/30 - SettingKey";
import { SettingFlavor } from "../../Enums/SettingFlavor";
import { IOneGenericSettingForStorage } from "../IOneGenericSettingForStorage";
import { IHindSiteSetting } from "./IGenericSetting";

export interface ISettingsAgent {
  BooleanSettingChanged(SettingKey: SettingKey, checked: boolean);
  GetByKey(EnableLogging: SettingKey): IHindSiteSetting;
  GetSettingsByFlavor(arg0: SettingFlavor[]): HindSiteSettingWrapper[];
  HindSiteSettingsBucket: HindSiteSettingsBucket;
  Init_SettingsAgent(): void;
  NumberSettingChanged(SettingKey: SettingKey, value: number);
  ReadGenericSettingsFromStorage(): IOneGenericSettingForStorage[];
  SetByKey(settingKey: SettingKey, value: any): any;
  UpdateSettingsFromPopUpMsg(CurrentContentPrefs: IHindSiteSetting[]);
}