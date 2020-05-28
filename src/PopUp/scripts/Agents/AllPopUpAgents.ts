import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IAllHelperAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllHelperAgents";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerBase";

export class AllAgents implements IAllAgents {
  SettingsAgent: ISettingsAgent;
  HelperAgents: IAllHelperAgents;
  Logger: ILoggerAgent;
}