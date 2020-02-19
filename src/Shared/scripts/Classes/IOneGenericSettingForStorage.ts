import { SettingKey } from "../Enums/SettingKey";
export interface IOneGenericSettingForStorage {
  ValueAsObj: any;
  SettingKey: SettingKey;
  SettingKeyFriendly: string;
}