import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { IHindeCore } from "../../../Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { _HindeCoreBase } from "../../../LoggableBase";

export class RollingLogIdDrone extends _HindeCoreBase{
  private SettingsAgent: ISettingsAgent;
  private maxKey: number = 5;
  private minKey: number = 1;

  constructor(settingsAgent: ISettingsAgent, hindeCore: IHindeCore) {
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