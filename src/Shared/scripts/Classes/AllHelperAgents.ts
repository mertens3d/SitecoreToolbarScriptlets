import { ILoggerAgent } from "../Interfaces/Agents/ILoggerBase";
import { IAllHelperAgents } from "../Interfaces/Agents/IAllHelperAgents";
import { ISettingsAgent } from "../Interfaces/Agents/ISettingsAgent";
export class AllHelperAgents implements IAllHelperAgents {
  LoggerAgent: ILoggerAgent;
  SettingsAgent: ISettingsAgent;

  constructor(loggerAgent: ILoggerAgent, settingsAgent: ISettingsAgent) {
    this.LoggerAgent = loggerAgent;
    this.SettingsAgent = settingsAgent;
  }
}