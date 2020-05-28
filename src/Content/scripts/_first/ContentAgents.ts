import { ILoggerAgentBase } from "../../../Shared/scripts/Interfaces/Agents/IContentLogger";
import { IAllConentAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllConentAgents';
import { IAllHelperAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllHelperAgents";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";

export class ContentAgents implements IAllConentAgents {
    SettingsAgent: ISettingsAgent;
    HelperAgents: IAllHelperAgents;
    Logger: ILoggerAgentBase;
}
