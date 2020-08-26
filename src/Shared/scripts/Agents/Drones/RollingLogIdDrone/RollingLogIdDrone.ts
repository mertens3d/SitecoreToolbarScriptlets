import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";

export class RollingLogIdDrone {
  private SettingsAgent: ISettingsAgent;
  private maxKey: number = 5;
  private minKey: number = 1;
  constructor(settingsAgent: ISettingsAgent) {
    this.SettingsAgent = settingsAgent;
  }

  GetNextLogId(): string {
    let nextKeyInt: number = this.minKey;
    let nextKeyToReturn: string;

    var result: number = this.GetLastUsedLogId().ValueAsInt();

    nextKeyInt = result + 1;
    if (nextKeyInt > this.maxKey) {
      nextKeyInt = this.minKey;
    }

    this.SettingsAgent.SetByKey(SettingKey.LastUsedLogToStorageKey, nextKeyInt.toString())

    nextKeyToReturn = nextKeyInt.toString();

    return nextKeyToReturn;
  }

  private GetLastUsedLogId(): IOneGenericSetting {
    let toReturn: number = 0;

    var lastUsedLogIdSetting: IOneGenericSetting = this.SettingsAgent.GetByKey(SettingKey.LastUsedLogToStorageKey);

    return lastUsedLogIdSetting;
  }
}