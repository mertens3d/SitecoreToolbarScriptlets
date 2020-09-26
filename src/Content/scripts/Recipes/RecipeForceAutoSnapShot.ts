import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ApiRecipeBase } from "../../../HindSiteScUiProxy/scripts/ContentApi/Recipes/__RecipeBase/_ApiRecipeBase";
import { _ContentRecipeBase } from "./_ContentRecipeBase";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IInternalCommandPayload } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";

export class RecipeForceAutoSnapShot extends _ContentRecipeBase implements ICommandRecipes {

  constructor(logger: ILoggerAgent, commandData: IInternalCommandPayload) {
    super(logger, commandData);
  }

    async Execute(): Promise<void> {
      try {
        this.CommandData.AutoSnapShotAgent.AutoSaveSnapShot();
        }
        catch (err) {
            this.Logger.ErrorAndThrow(this.Execute.name, err);
        }
    }
}
