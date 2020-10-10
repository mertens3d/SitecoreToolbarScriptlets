import { SettingKey } from "../../../Enums/30 - SettingKey";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { ICommonCore } from "../../../Interfaces/Agents/ICommonCore";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { _CommonBase } from "../../../_CommonCoreBase";

export class RollingLogIdDrone extends _CommonBase{
  private SettingsAgent: ISettingsAgent;
  private maxKey: number = 5;
  private minKey: number = 1;

  constructor(settingsAgent: ISettingsAgent, hindeCore: ICommonCore) {
    super(hindeCore);
    this.Logger.CTORStart(RollingLogIdDrone.name);
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

  private GetLastUsedLogId(): IHindSiteSetting {
    var lastUsedLogIdSetting: IHindSiteSetting = this.SettingsAgent.GetByKey(SettingKey.LastUsedLogToStorageKey);
    return lastUsedLogIdSetting;
  }
}