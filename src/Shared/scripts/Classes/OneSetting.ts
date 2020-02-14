import { SettingKey } from "../Enums/SettingKey";
import { SettingType } from "../Enums/SettingType";
import { SettingFlavor } from "../Enums/SettingFlavor";

export interface IOneGenericSetting {
  DataType: SettingType,
  ValueAsObj: any,
  SettingKey: SettingKey,
  SettingFlavor: SettingFlavor,
  UiSelector: string,
  DefaultValue: any;
}