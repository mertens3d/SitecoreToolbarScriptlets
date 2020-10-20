import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";

export class RecipeForceAutoSnapShot extends _ContentRecipeBase implements ICommandRecipes {

  constructor(hindeCore: IHindeCore, commandParams: ICommandParams, dependancies: ICommandDependancies) {
    super(hindeCore, commandParams, dependancies, RecipeForceAutoSnapShot.name);
  }

    async Execute(): Promise<void> {
      try {
        this.Dependancies.AutoSnapShotAgent.AutoSaveSnapShot();
        }
        catch (err) {
            this.ErrorHand.HandleFatalError(this.Execute.name, err);
        }
    }
}
