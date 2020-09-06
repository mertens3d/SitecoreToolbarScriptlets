import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";

export class RecipeSaveState extends __RecipeBase implements ICommandRecipes {
  constructor(commandData: ICommandHndlrDataForContent) {
    super(commandData);
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.ScWinMan.GetScWindowStateB(this.TargetSnapShotFlavor)
        .then((windowState) => this.AtticAgent.WriteToStorage(windowState))
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
  

  
}