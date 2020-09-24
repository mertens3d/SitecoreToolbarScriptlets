import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";

export class RecipeForceAutoSnapShot extends __RecipeBase implements ICommandRecipes {
    async Execute(): Promise<void> {
        try {
            this.AutoSnapShotAgent.AutoSaveSnapShot();
        }
        catch (err) {
            this.Logger.ErrorAndThrow(this.Execute.name, err);
        }
    }
}
