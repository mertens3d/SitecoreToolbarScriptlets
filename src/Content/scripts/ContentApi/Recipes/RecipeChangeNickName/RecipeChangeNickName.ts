import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataStateOfSitecoreWindow } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { LoggableBase } from "../../../Managers/LoggableBase";

export class RecipeChangeNickName extends LoggableBase implements ICommandRecipes {
  private NewNickname: string;
  private TargetSnapShotId: GuidData;
  AtticAgent: IContentAtticAgent;

  constructor(logger: ILoggerAgent, newNickName: string, targetSnapShotId: GuidData, atticAgent: IContentAtticAgent) {
    super(logger);
    this.NewNickname = newNickName;
    this.TargetSnapShotId = targetSnapShotId;
    this.AtticAgent = atticAgent;
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.UpdateNickname()
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

          storageMatch = this.AtticAgent.GetFromStorageById(this.TargetSnapShotId)

          if (storageMatch) {
            if ((storageMatch.Flavor === SnapShotFlavor.Autosave
              ||
              (storageMatch.Flavor === SnapShotFlavor.Unknown))) {
              storageMatch.Flavor = SnapShotFlavor.Manual;
            }
            storageMatch.NickName = this.NewNickname;// this.CommandData.PayloadData.SnapShotSettings.SnapShotNewNickname;
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