import { ICommandHndlrDataForContent } from "../../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { RecipeBase } from "../RecipeBase";

export class RecipeSaveState extends RecipeBase implements ICommandRecipes {
  constructor(commandData: ICommandHndlrDataForContent) {
    super(commandData);
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.CommandData.ScWinMan.GetWindowState(this.CommandData.TargetSnapShotFlavor)
        .then((windowState) => this.CommandData.AtticAgent.WriteToStorage(windowState))
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}