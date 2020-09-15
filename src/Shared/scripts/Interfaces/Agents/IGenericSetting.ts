﻿import { SettingFlavor } from "../../Enums/SettingFlavor";
import { SettingType } from "../../Enums/SettingType";
import { SettingKey } from "../../Enums/3xxx-SettingKey";

export interface IGenericSetting {
  DataType: SettingType;
  DefaultValue: any;
  FriendlySetting: string;
  HasUi: boolean
  SettingFlavor: SettingFlavor;
  SettingKey: SettingKey;
  UiSelector: any;
  ValueAsBool(): boolean;
  ValueAsInt(): number
  ValueAsObj: any;
}