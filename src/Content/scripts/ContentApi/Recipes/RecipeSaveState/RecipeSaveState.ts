import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";
import { IDataOneWindowStorage } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";

export class RecipeSaveState extends __RecipeBase implements ICommandRecipes {
  constructor(commandData: ICommandHndlrDataForContent) {
    super(commandData);
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.ScWinMan.GetStateForStorage(this.TargetSnapShotFlavor)
        .then((windowState: IDataOneWindowStorage) => {
          if (windowState.AllCEAr.length > 0) {
            this.AtticAgent.WriteStateToStorage(windowState);
          } else {
            this.Logger.WarningAndContinue(this.Execute.name, 'empty ce ar - not writting to storage');
          }
        }

        )
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}