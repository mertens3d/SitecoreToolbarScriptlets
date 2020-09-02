import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { ContentAtticManager } from "../../ContentAtticManager/ContentAtticManager";
import { RecipeBase } from "./RecipeBase";
import { IDataOneWindowStorage } from "../../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";

export class RecipeToggleFavorite extends RecipeBase implements ICommandRecipes {
  private AtticMan: ContentAtticManager;

  constructor(commandData: ICommandHndlrDataForContent, atticMan: ContentAtticManager) {
    super(commandData);
    this.AtticMan = atticMan;
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.CommandData.PayloadData.IdOfSelect) {
        await this.AtticMan.GetFromStorageById(this.CommandData.PayloadData.IdOfSelect)
          .then((result: IDataOneWindowStorage) => {
            if (result.Flavor === SnapShotFlavor.Favorite) {
              result.Flavor = SnapShotFlavor.Manual;
            } else {
              result.Flavor = SnapShotFlavor.Favorite;
            }
            this.AtticMan.WriteToStorage(result);
          })
          .then(() => resolve())
          .catch((err) => reject(err));
      } else {
        reject('no targetId');
      }
    });
  }
}