import { SettingFlavor } from "../../Enums/SettingFlavor";
import { SettingType } from "../../Enums/SettingType";
import { SettingKey } from "../../Enums/3xxx-SettingKey";

export interface IOneGenericSetting {
  DataType: SettingType;
  DefaultValue: any;
  Friendly: string;
  HasUi: boolean
  SettingFlavor: SettingFlavor;
  SettingKey: SettingKey;
  UiSelector: any;
  ValueAsBool(): boolean;
  ValueAsInt(): number
  ValueAsObj: any;
}