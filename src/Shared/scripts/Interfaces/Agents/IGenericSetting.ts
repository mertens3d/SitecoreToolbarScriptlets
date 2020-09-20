import { SettingFlavor } from "../../Enums/SettingFlavor";
import { SettingType } from "../../Enums/SettingType";
import { SettingKey } from "../../Enums/3xxx-SettingKey";
import { UiPresence } from "../../Enums/Enabled";

export interface IHindSiteSetting {
  SaveChange(checked: boolean);
  DataType: SettingType;
  DefaultValue: any;
  FriendlySetting: string;
  HasUi: UiPresence
  SettingFlavor: SettingFlavor;
  SettingKey: SettingKey;
  UiContainerSelector: any;
  ValueAsBool(): boolean;
  ValueAsInt(): number
  ValueAsObj: any;
}