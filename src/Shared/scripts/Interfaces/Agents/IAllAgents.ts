import { ISettingsAgent } from "./ISettingsAgent";
import { ILoggerAgent } from "./ILoggerBase";
import { IRepositoryAgent } from "./IRepositoryAgent";
import { IHelperAgent } from "./IHelperAgent";
import { IToastAgent } from "./IToastAgent";
import { QueryStrAgent } from "../../Agents/Agents/QueryStringAgent/QueryStrAgent";
export interface IAllAgents {
  HelperAgent: IHelperAgent;
  Logger: ILoggerAgent;
  QueryStrAgent: QueryStrAgent;
  //RepoAgent: IRepositoryAgent;
  SettingsAgent: ISettingsAgent;
  ToastAgent: IToastAgent;
}