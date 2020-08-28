import { IHelperAgent } from "./IHelperAgent";
import { ILoggerAgent } from "./ILoggerBase";
import { ISettingsAgent } from "./ISettingsAgent";
import { IToastAgent } from "./IToastAgent";
export interface IAllAgents {
  HelperAgent: IHelperAgent;
  Logger: ILoggerAgent;
  SettingsAgent: ISettingsAgent;
  ToastAgent: IToastAgent;
}