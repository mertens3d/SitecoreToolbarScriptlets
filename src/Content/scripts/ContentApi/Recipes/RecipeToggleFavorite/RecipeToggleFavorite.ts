import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { ICommandHandlerDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { IDataStateOfSitecoreWindow } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";

export class RecipeToggleFavorite extends __RecipeBase implements ICommandRecipes {
  constructor(commandData: ICommandHandlerDataForContent) {
    super(commandData);
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.TargetSnapShotId) {
        let result: IDataStateOfSitecoreWindow = this.AtticAgent.GetFromStorageBySnapShotId(this.TargetSnapShotId);

        if (result.Meta.Flavor === SnapShotFlavor.Favorite) {
          result.Meta.Flavor = SnapShotFlavor.Manual;
        } else {
          result.Meta.Flavor = SnapShotFlavor.Favorite;
        }
        this.AtticAgent.WriteStateOfSitecoreToStorage(result);

        resolve();
      } else {
        reject('no targetId');
      }
    });
  }
}