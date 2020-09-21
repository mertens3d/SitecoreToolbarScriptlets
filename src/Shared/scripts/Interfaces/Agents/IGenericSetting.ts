import { SettingFlavor } from "../../Enums/SettingFlavor";
import { SettingType } from "../../Enums/SettingType";
import { SettingKey } from "../../Enums/3xxx-SettingKey";
import { UiPresence, UiEnableState } from "../../Enums/Enabled";

export interface IHindSiteSettingForNumbers extends IHindSiteSetting {
  Min: number,
  Max: number,
}
export interface IHindSiteSetting {
  DataType: SettingType;
  DefaultValue: any;
  EnabledState: UiEnableState;
  FriendlySetting: string;
  HasUi: UiPresence
  SettingFlavor: SettingFlavor;
  SettingKey: SettingKey;
  UiContainerSelector: any;
  ValueAsBool(): boolean;
  ValueAsInt(): number
  ValueAsObj: any;
}