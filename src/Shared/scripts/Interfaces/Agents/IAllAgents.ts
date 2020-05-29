import { IAllHelperAgents } from "./IAllHelperAgents";
import { ISettingsAgent } from "./ISettingsAgent";
import { ILoggerAgent } from "./ILoggerBase";
import { IRepositoryAgent } from "./IRepositoryAgent";
export interface IAllAgents {
  RepoAgent: IRepositoryAgent;
  Logger: ILoggerAgent;
  SettingsAgent: ISettingsAgent;
}