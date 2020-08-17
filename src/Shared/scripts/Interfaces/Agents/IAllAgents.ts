import { ISettingsAgent } from "./ISettingsAgent";
import { ILoggerAgent } from "./ILoggerBase";
import { IRepositoryAgent } from "./IRepositoryAgent";
import { IHelperAgent } from "./IHelperAgent";
export interface IAllAgents {
  QueryStrAgent: import("C:/projects/SitecoreToolbarScriptlets/src/Shared/scripts/Agents/Agents/QueryStringAgent/QueryStrAgent").QueryStrAgent;
  HelperAgent: IHelperAgent;
  RepoAgent: IRepositoryAgent;
  Logger: ILoggerAgent;
  SettingsAgent: ISettingsAgent;

}