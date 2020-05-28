import { IAllHelperAgents } from "./IAllHelperAgents";
import { ISettingsAgent } from "./ISettingsAgent";
import { ILoggerAgent } from "./ILoggerBase";
export interface IAllAgents {
    HelperAgents: IAllHelperAgents;
    Logger: ILoggerAgent;
    SettingsAgent: ISettingsAgent;
}
