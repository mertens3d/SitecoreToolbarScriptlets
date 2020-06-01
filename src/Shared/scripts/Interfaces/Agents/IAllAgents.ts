import { ISettingsAgent } from "./ISettingsAgent";
import { ILoggerAgent } from "./ILoggerBase";
import { IRepositoryAgent } from "./IRepositoryAgent";
import { IHelperAgent } from "./IHelperAgent";
export interface IAllAgents {
  HelperAgent: IHelperAgent;
  RepoAgent: IRepositoryAgent;
  Logger: ILoggerAgent;
  SettingsAgent: ISettingsAgent;

}