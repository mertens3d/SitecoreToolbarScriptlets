import { PromisesBasic } from "../Classes/PromiseGeneric";
import { PromisesRecipes } from "../Classes/PromisesRecipes";
import { IHelperAgent } from "../Interfaces/Agents/IHelperAgent";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerBase";
import { IPromisesBasic } from "../Interfaces/IPromiseHelper";
import { IPromiseRecipes } from "../Interfaces/IPromiseRecipes";
import { FactoryHelper } from "./FactoryHelper";
import { UtilityHelper } from "./UtilityHelper";

export class HelperAgent implements IHelperAgent {
  UtilityHelp: UtilityHelper;
  PromisesBasic: IPromisesBasic;
  PromisesRecipes: IPromiseRecipes;
  FactoryHelp: FactoryHelper;


  constructor(logger: ILoggerAgent) {
    logger.InstantiateStart(HelperAgent.name);
    this.Init(logger, this);
    logger.InstantiateEnd(HelperAgent.name);
  }

  Init(logger: ILoggerAgent, helperAgent: IHelperAgent): void {
    this.UtilityHelp = new UtilityHelper(logger, helperAgent);
    this.PromisesBasic = new PromisesBasic(logger, helperAgent);
    this.PromisesRecipes = new PromisesRecipes(logger, helperAgent);
    this.FactoryHelp = new FactoryHelper(logger, helperAgent);

  }
} 