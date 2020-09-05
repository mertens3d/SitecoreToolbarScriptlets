import { PromisesRecipes } from "../Classes/PromisesRecipes";
import { IHelperAgent } from "../Interfaces/Agents/IHelperAgent";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerBase";
import { IPromiseRecipes } from "../Interfaces/IPromiseRecipes";
import { UtilityHelper } from "./UtilityHelper";

export class HelperAgent implements IHelperAgent {
  UtilityHelp: UtilityHelper;
  PromisesRecipes: IPromiseRecipes;


  constructor(logger: ILoggerAgent) {
    logger.InstantiateStart(HelperAgent.name);
    this.Init(logger, this);
    logger.InstantiateEnd(HelperAgent.name);
  }

  Init(logger: ILoggerAgent, helperAgent: IHelperAgent): void {
    this.UtilityHelp = new UtilityHelper(logger, helperAgent);

    this.PromisesRecipes = new PromisesRecipes(logger);
  

  }
} 