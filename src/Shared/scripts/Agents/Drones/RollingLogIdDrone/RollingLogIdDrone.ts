import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { IGenericSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { LoggerAgent } from "../../Agents/LoggerAgent/LoggerAgent";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";

export class RollingLogIdDrone {
  private SettingsAgent: ISettingsAgent;
  private maxKey: number = 5;
  private minKey: number = 1;
  private Logger: ILoggerAgent;

  constructor(settingsAgent: ISettingsAgent, loggerAgent: ILoggerAgent) {
    this.Logger = loggerAgent;

    this.Logger.InstantiateStart(RollingLogIdDrone.name);
    this.SettingsAgent = settingsAgent;

    this.Logger.FuncEnd(RollingLogIdDrone.name);
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

  private GetLastUsedLogId(): IGenericSetting {

    var lastUsedLogIdSetting: IGenericSetting = this.SettingsAgent.GetByKey(SettingKey.LastUsedLogToStorageKey);

    return lastUsedLogIdSetting;
  }
}