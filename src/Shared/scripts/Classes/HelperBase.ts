import { ILoggerAgent } from "../Interfaces/Agents/ILoggerBase";
import { IHelperAgent } from "../Interfaces/Agents/IHelperAgent";

export class HelperBase {
  protected Logger: ILoggerAgent;
  protected HelperAgent: IHelperAgent;

  constructor(logger: ILoggerAgent, helperAgent: IHelperAgent) {
    this.Logger = logger;
    this.HelperAgent = helperAgent;
  }
}