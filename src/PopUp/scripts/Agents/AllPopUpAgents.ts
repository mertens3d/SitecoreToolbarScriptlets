import { IAllPopUpAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllPopUpAgents";
import { ILoggerPopUpAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerPopupAgent";
import { LoggerAgentBase } from "../../../Shared/scripts/Agents/LoggerAgentBase";
export class AllPopUpAgents extends LoggerAgentBase implements IAllPopUpAgents {
  Logger: ILoggerPopUpAgent;
}