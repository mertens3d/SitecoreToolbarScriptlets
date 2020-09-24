import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IContentAtticAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IDataStateOfSitecoreWindow } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ICommandHandlerDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";
import { StaticHelpers } from "../../../../../Shared/scripts/Classes/StaticHelpers";

export class RecipeChangeNickName extends __RecipeBase implements ICommandRecipes {
  private NewNickname: string;
  AtticAgent: IContentAtticAgent;

  constructor(commandData: ICommandHandlerDataForContent) {
    super(commandData);
    this.NewNickname = commandData.NewNickName;
    this.TargetSnapShotId = commandData.TargetSnapShotId;
    this.AtticAgent = commandData.AtticAgent;

    if (StaticHelpers.IsNullOrUndefined([this.NewNickname, this.TargetSnapShotId, this.AtticAgent])) {
      this.Logger.ErrorAndThrow(RecipeChangeNickName.name, 'Null check');
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

      if (this.TargetSnapShotId) {
        if (this.NewNickname) {
          var storageMatch: IDataStateOfSitecoreWindow;

          storageMatch = this.AtticAgent.GetFromStorageBySnapShotId(this.TargetSnapShotId)

          if (storageMatch) {
            if ((storageMatch.Meta.Flavor === SnapShotFlavor.Autosave
              ||
              (storageMatch.Meta.Flavor === SnapShotFlavor.Unknown))) {
              storageMatch.Meta.Flavor = SnapShotFlavor.Manual;
            }
            storageMatch.Friendly.NickName = this.NewNickname;// this.CommandData.PayloadData.SnapShotSettings.SnapShotNewNickname;
          } else {
            reject(this.UpdateNickname.name + ' - No storage match');
          }

          this.AtticAgent.WriteStateOfSitecoreToStorage(storageMatch);
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