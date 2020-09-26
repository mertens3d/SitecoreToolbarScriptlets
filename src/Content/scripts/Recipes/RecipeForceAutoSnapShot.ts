import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ApiRecipeBase } from "../../../HindSiteScUiProxy/scripts/ContentApi/Recipes/__RecipeBase/_ApiRecipeBase";
import { _ContentRecipeBase } from "./_ContentRecipeBase";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";

export class RecipeForceAutoSnapShot extends _ContentRecipeBase implements ICommandRecipes {

  constructor(logger: ILoggerAgent, commandParams: ICommandParams, dependancies: ICommandDependancies) {
    super(logger, commandParams, dependancies, RecipeForceAutoSnapShot.name);
  }

    async Execute(): Promise<void> {
      try {
        this.Dependancies.AutoSnapShotAgent.AutoSaveSnapShot();
        }
        catch (err) {
            this.Logger.ErrorAndThrow(this.Execute.name, err);
        }
    }
}
