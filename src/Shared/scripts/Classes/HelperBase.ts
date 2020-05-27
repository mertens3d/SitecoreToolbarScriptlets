import { GuidHelper } from "../Helpers/GuidHelper";
import { HelperHub } from "../Helpers/Helpers";
import { ILoggerAgentBase } from "../Interfaces/Agents/ILoggerBase";
export class HelperBase {
  protected LoggerAgentBase: ILoggerAgentBase;
  HelperHub: HelperHub;

  constructor(helperHub: HelperHub) {
    this.HelperHub = helperHub;
    this.LoggerAgentBase = helperHub.Log;
  }

  GuidHelp(): GuidHelper { return this.HelperHub.GuidHelp; }
}