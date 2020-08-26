import { GuidHelper } from "./GuidHelper";
import { UtilityHelper } from "./UtilityHelper";
import { PromisesBasic } from "../Classes/PromiseGeneric";
import { FactoryHelper } from "./FactoryHelper";
import { UrlHelper } from "./UrlHelper";
import { IHelperAgent } from "../Interfaces/Agents/IHelperAgent";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerBase";
import { IPromiseRecipes } from "../Interfaces/IPromiseRecipes";
import { IPromisesBasic } from "../Interfaces/IPromiseHelper";
import { PromisesRecipes } from "../Classes/PromisesRecipes";

export class HelperAgent implements IHelperAgent {
  GuidHelper: GuidHelper;
  UtilityHelp: UtilityHelper;
  PromisesBasic: IPromisesBasic;
  PromisesRecipes: IPromiseRecipes;
  FactoryHelp: FactoryHelper;
  UrlHelp: UrlHelper;

  constructor(logger: ILoggerAgent) {
    logger.InstantiateStart(HelperAgent.name);
    this.Init(logger, this);
    logger.InstantiateEnd(HelperAgent.name);
  }

  Init(logger: ILoggerAgent, helperAgent: IHelperAgent): void {
    this.GuidHelper = new GuidHelper(logger, helperAgent);
    this.UtilityHelp = new UtilityHelper(logger, helperAgent);
    this.PromisesBasic = new PromisesBasic(logger, helperAgent);
    this.PromisesRecipes = new PromisesRecipes(logger, helperAgent);
    this.FactoryHelp = new FactoryHelper(logger, helperAgent);
    this.UrlHelp = new UrlHelper(logger, helperAgent);
  }
} 