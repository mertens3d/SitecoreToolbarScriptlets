import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IAllHelperAgents } from "../../Interfaces/Agents/IAllHelperAgents";
import { IAllAgents } from "../../Interfaces/Agents/IAllAgents";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerBase";
import { IRepositoryAgent } from "../../Interfaces/Agents/IRepositoryAgent";

export class AllAgents implements IAllAgents {
  SettingsAgent: ISettingsAgent;
  HelperAgents: IAllHelperAgents;
  Logger: ILoggerAgent;
  RepoAgent: IRepositoryAgent;
}