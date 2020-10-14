import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeChangeNickName extends _ContentRecipeBase implements ICommandRecipes {
  constructor(hindeCore: IHindeCore, commandParams: ICommandParams, dependancies: ICommandDependancies) {
    super(hindeCore, commandParams, dependancies, RecipeChangeNickName.name);

    if (StaticHelpers.IsNullOrUndefined([this.CommandParams.NewNickname, this.CommandParams.TargetSnapShotId, this.Dependancies.AtticAgent])) {
      this.ErrorHand.HandleFatalError(RecipeChangeNickName.name, 'Null check');
    }
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.UpdateNickname()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  private UpdateNickname() {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.UpdateNickname.name);

      if (this.CommandParams.TargetSnapShotId) {
        if (this.CommandParams.NewNickname) {
          var storageMatch: IStateOfScUi;

          storageMatch = this.Dependancies.AtticAgent.GetFromStorageBySnapShotId(this.CommandParams.TargetSnapShotId)

          if (storageMatch) {
            if ((storageMatch.Meta.Flavor === SnapShotFlavor.Autosave
              ||
              (storageMatch.Meta.Flavor === SnapShotFlavor.Unknown))) {
              storageMatch.Meta.Flavor = SnapShotFlavor.Manual;
            }
            storageMatch.Friendly.NickName = this.CommandParams.NewNickname;// this.CommandData.PayloadData.SnapShotSettings.SnapShotNewNickname;
          } else {
            reject(this.UpdateNickname.name + ' - No storage match');
          }

          this.Dependancies.AtticAgent.WriteStateOfSitecoreToStorage(storageMatch);
          resolve();
        } else {
          reject(this.UpdateNickname.name + ' - something was missing');
        }
      } else {
        reject(this.UpdateNickname.name + ' no payload or id');
      }

      this.Logger.FuncEnd(this.UpdateNickname.name);
    });
  }
}