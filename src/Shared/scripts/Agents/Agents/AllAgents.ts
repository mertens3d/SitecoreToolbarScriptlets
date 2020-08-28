import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IAllAgents } from "../../Interfaces/Agents/IAllAgents";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerBase";
import { IRepositoryAgent } from "../../Interfaces/Agents/IRepositoryAgent";
import { IHelperAgent } from "../../Interfaces/Agents/IHelperAgent";
import { IToastAgent } from "../../Interfaces/Agents/IToastAgent";

export class AllAgents implements IAllAgents {
  SettingsAgent: ISettingsAgent;
  HelperAgent: IHelperAgent;
  Logger: ILoggerAgent;
  RepoAgent: IRepositoryAgent;
  ToastAgent: IToastAgent;
}