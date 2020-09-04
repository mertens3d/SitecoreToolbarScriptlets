import { SettingKey } from "../Enums/3xxx-SettingKey";

export interface IOneGenericSettingForStorage {
  ValueAsObj: any;
  SettingKey: SettingKey;
  SettingKeyFriendly: string;
}