import { SettingFlavor } from "../../Enums/SettingFlavor";
import { SettingType } from "../../Enums/SettingType";
import { SettingKey } from "../../Enums/3xxx-SettingKey";
import { UiEnableState } from "../../Enums/Enabled";
import { UiPresence } from "../../Enums/UiPresence";
import { ModuleKey } from "../../Enums/ModuleKey";

export interface IHindSiteSetting {
  DataType: SettingType;
  DefaultValue: any;
  EnabledState: UiEnableState;
  FriendlySetting: string;
  HasUi: UiPresence
  ModuleType: ModuleKey;
  SettingFlavor: SettingFlavor;
  SettingKey: SettingKey;
  UiContainerSelector: any;
  ValueAsBool(): boolean;
  ValueAsInt(): number
  ValueAsObj: any;
}