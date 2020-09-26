import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { InternalCommandPayload } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeToggleFavorite extends _ContentRecipeBase implements ICommandRecipes {
  constructor(logger: ILoggerAgent,  commandData: InternalCommandPayload) {
    super(logger, commandData);
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