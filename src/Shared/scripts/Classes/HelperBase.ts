import { GuidHelper } from "../Helpers/GuidHelper";
import { HelperHub } from "../Helpers/Helpers";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerBase";
import { IAllHelperAgents } from "../Interfaces/Agents/IAllHelperAgents";
export class HelperBase {
  protected LoggerAgentBase: ILoggerAgent;
  HelperHub: HelperHub;
  AllHelperAgents: IAllHelperAgents;

  constructor(helperHub: HelperHub, helperAgents: IAllHelperAgents) {
    this.HelperHub = helperHub;
    this.AllHelperAgents = helperAgents;
  
  }

  GuidHelp(): GuidHelper { return this.HelperHub.GuidHelp; }
}