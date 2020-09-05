import { SnapShotFlavor } from "../../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { ICommandHndlrDataForContent } from "../../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { IDataOneWindowStorage } from "../../../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { RecipeBase } from "../RecipeBase";

export class RecipeChangeNickName extends RecipeBase implements ICommandRecipes {

  constructor(commandData: ICommandHndlrDataForContent) {
    super(commandData);
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

      if (this.CommandData.TargetSnapShotId) {
        if (this.CommandData.TargetNickName) {
          var storageMatch: IDataOneWindowStorage;

          await this.CommandData.AtticAgent.GetFromStorageById(this.CommandData.TargetSnapShotId)
            .then((result: IDataOneWindowStorage) => storageMatch = result)

            .then(() => {
              if (storageMatch) {
                if ((storageMatch.Flavor === SnapShotFlavor.Autosave
                  ||
                  (storageMatch.Flavor === SnapShotFlavor.Unknown))) {
                  storageMatch.Flavor = SnapShotFlavor.Manual;
                }

                storageMatch.NickName = this.CommandData.TargetNickName;// this.CommandData.PayloadData.SnapShotSettings.SnapShotNewNickname;
                this.CommandData.AtticAgent.WriteToStorage(storageMatch);
              } else {
                reject(this.UpdateNickname.name + ' - No storage match');
              }
            })
            .then(() => resolve())
            .catch((err) => reject(err));

        } else {
          reject(this.UpdateNickname.name + ' - something was missing');
        }
      } else {
        this.Logger.LogAsJsonPretty(this.UpdateNickname.name, this.CommandData);
        reject(this.UpdateNickname.name + ' no payload or id');
      }
    });
  }
}