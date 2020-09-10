import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { IDataOneWindowStorage } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";

export class RecipeToggleFavorite extends __RecipeBase implements ICommandRecipes {
  constructor(commandData: ICommandHndlrDataForContent) {
    super(commandData);
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.TargetSnapShotId) {
        let result: IDataOneWindowStorage = this.AtticAgent.GetFromStorageById(this.TargetSnapShotId);

        if (result.Flavor === SnapShotFlavor.Favorite) {
          result.Flavor = SnapShotFlavor.Manual;
        } else {
          result.Flavor = SnapShotFlavor.Favorite;
        }
        this.AtticAgent.WriteStateToStorage(result);

        resolve();
      } else {
        reject('no targetId');
      }
    });
  }
}