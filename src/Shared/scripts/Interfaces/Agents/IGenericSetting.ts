import { SettingFlavor } from "../../Enums/SettingFlavor";
import { SettingType } from "../../Enums/SettingType";
import { SettingKey } from "../../Enums/3xxx-SettingKey";

export interface IHindSiteSetting {
  DataType: SettingType;
  DefaultValue: any;
  FriendlySetting: string;
  HasUi: boolean
  SettingFlavor: SettingFlavor;
  SettingKey: SettingKey;
  UiContainerSelector: any;
  ValueAsBool(): boolean;
  ValueAsInt(): number
  ValueAsObj: any;
}