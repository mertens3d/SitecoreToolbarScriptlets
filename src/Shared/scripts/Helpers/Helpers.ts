import { GuidHelper } from "./GuidHelper";
import { UtilityHelper } from "./UtilityHelper";
import { PromiseHelper } from "../Classes/PromiseGeneric";
import { FactoryHelper } from "./FactoryHelper";
import { UrlHelper } from "./UrlHelper";
import { IHelperAgent } from "../Interfaces/Agents/IHelperAgent";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerBase";

export class HelperAgent implements IHelperAgent {
  GuidHelper: GuidHelper;
  UtilityHelp: UtilityHelper;
  PromiseHelper: PromiseHelper;
  FactoryHelp: FactoryHelper;
  UrlHelp: UrlHelper;

  constructor(logger: ILoggerAgent) {
    logger.FuncStart(HelperAgent.name);
    this.Init(logger, this);
    logger.FuncEnd(HelperAgent.name);
  }

  Init(logger: ILoggerAgent, helperAgent: IHelperAgent): void {
    this.GuidHelper = new GuidHelper(logger, helperAgent);
    this.UtilityHelp = new UtilityHelper(logger, helperAgent);
    this.PromiseHelper = new PromiseHelper(logger, helperAgent);
    this.FactoryHelp = new FactoryHelper(logger, helperAgent);
    this.UrlHelp = new UrlHelper(logger, helperAgent);
  }
} 