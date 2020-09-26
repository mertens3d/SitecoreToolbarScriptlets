import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeToggleFavorite extends _ContentRecipeBase implements ICommandRecipes {
  constructor(logger: ILoggerAgent, commandData: ICommandParams, dependancies: ICommandDependancies) {
    super(logger, commandData, dependancies, RecipeToggleFavorite.name);
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.CommandParams.TargetSnapShotId) {
        let result: IDataStateOfSitecoreWindow = this.Dependancies.AtticAgent.GetFromStorageBySnapShotId(this.CommandParams.TargetSnapShotId);

        if (result.Meta.Flavor === SnapShotFlavor.Favorite) {
          result.Meta.Flavor = SnapShotFlavor.Manual;
        } else {
          result.Meta.Flavor = SnapShotFlavor.Favorite;
        }
        this.Dependancies.AtticAgent.WriteStateOfSitecoreToStorage(result);

        resolve();
      } else {
        reject('no targetId');
      }
    });
  }
}