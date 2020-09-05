import { SnapShotFlavor } from "../../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { ICommandHndlrDataForContent } from "../../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { IDataOneWindowStorage } from "../../../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { RecipeBase } from "../RecipeBase";

export class RecipeToggleFavorite extends RecipeBase implements ICommandRecipes {

  constructor(commandData: ICommandHndlrDataForContent) {
    super(commandData);
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.CommandData.TargetSnapShotId) {
        await this.CommandData.AtticAgent.GetFromStorageById(this.CommandData.TargetSnapShotId)
          .then((result: IDataOneWindowStorage) => {
            if (result.Flavor === SnapShotFlavor.Favorite) {
              result.Flavor = SnapShotFlavor.Manual;
            } else {
              result.Flavor = SnapShotFlavor.Favorite;
            }
            this.CommandData.AtticAgent.WriteToStorage(result);
          })
          .then(() => resolve())
          .catch((err) => reject(err));
      } else {
        reject('no targetId');
      }
    });
  }
}