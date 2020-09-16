import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";
import { IDataStateOfSitecoreWindow } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";

export class RecipeSaveStateManual extends __RecipeBase implements ICommandRecipes {
  constructor(commandData: ICommandHndlrDataForContent) {
    super(commandData);
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.ScWinMan.GetStateOfSitecoreWindow(SnapShotFlavor.Manual)
        .then((windowState: IDataStateOfSitecoreWindow) => {
          
          this.AtticAgent.WriteStateOfSitecoreToStorage(windowState);
          //todo - put back this.Logger.WarningAndContinue(this.Execute.name, 'empty ce ar - not writing to storage');
        })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}