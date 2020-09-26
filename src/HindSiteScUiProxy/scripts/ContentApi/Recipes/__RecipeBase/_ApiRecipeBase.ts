import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IRecipeBasics } from "../../../../../Shared/scripts/Interfaces/IPromiseHelper";

export abstract class _ApiRecipeBase {
  protected Logger: ILoggerAgent;
  protected RecipeBasics: IRecipeBasics;
  protected scWinProxy: IScWindowProxy;
  protected TargetSnapShotFlavor: SnapShotFlavor;
  protected TargetDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent,  scWinProxy: IScWindowProxy,) {
    this.Logger = logger;
    this.RecipeBasics = new RecipeBasics(this.Logger);
    this.scWinProxy = scWinProxy;
    this.TargetDoc = null; //todo
  }
}