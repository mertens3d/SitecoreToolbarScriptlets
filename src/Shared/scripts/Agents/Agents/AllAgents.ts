import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IAllAgents } from "../../Interfaces/Agents/IAllAgents";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerBase";
import { IRepositoryAgent } from "../../Interfaces/Agents/IRepositoryAgent";
import { IHelperAgent } from "../../Interfaces/Agents/IHelperAgent";

export class AllAgents implements IAllAgents {
  SettingsAgent: ISettingsAgent;
  HelperAgent: IHelperAgent;
  Logger: ILoggerAgent;
  RepoAgent: IRepositoryAgent;
}