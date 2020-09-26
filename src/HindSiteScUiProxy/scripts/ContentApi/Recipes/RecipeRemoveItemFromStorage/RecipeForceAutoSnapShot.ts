import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ApiRecipeBase } from "../__RecipeBase/__RecipeBase";

export class RecipeForceAutoSnapShot extends _ApiRecipeBase implements ICommandRecipes {
    async Execute(): Promise<void> {
        try {
            this.AutoSnapShotAgent.AutoSaveSnapShot();
        }
        catch (err) {
            this.Logger.ErrorAndThrow(this.Execute.name, err);
        }
    }
}
