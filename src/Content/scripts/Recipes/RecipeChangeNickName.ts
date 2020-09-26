import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { InternalCommandPayload } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeChangeNickName extends _ContentRecipeBase implements ICommandRecipes {
  private NewNickname: string;
  AtticAgent: IContentAtticAgent;
    

  constructor(logger: ILoggerAgent,commandData: InternalCommandPayload) {
    super(logger, commandData);
    this.NewNickname = commandData.NewNickName;
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