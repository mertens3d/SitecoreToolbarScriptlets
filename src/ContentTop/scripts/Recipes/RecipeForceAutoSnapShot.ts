import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ICommandData } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";

export class RecipeForceAutoSnapShot extends _ContentRecipeBase implements ICommandRecipes {

  constructor(hindeCore: IHindeCore, commandParams: ICommandData, dependancies: ICommandDependancies) {
    super(hindeCore, commandParams, dependancies, RecipeForceAutoSnapShot.name);
  }

    async Execute(): Promise<void> {
      try {
        this.Dependancies.SolicitorForAutoSnapShot.AutoSaveSnapShot();
        }
        catch (err: any) {
            this.ErrorHand.HandleFatalError(this.Execute.name, err);
        }
    }
}
