import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { ContentAtticManager } from "../../ContentAtticManager/ContentAtticManager";
import { RecipeBase } from "./RecipeBase";
import { IDataOneWindowStorage } from "../../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";

export class RecipeChangeNickName extends RecipeBase implements ICommandRecipes {
  private AtticMan: ContentAtticManager;

  constructor(commandData: ICommandHndlrDataForContent, atticMan: ContentAtticManager) {
    super(commandData);
    this.AtticMan = atticMan;
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

      if (this.CommandData.PayloadData.IdOfSelect) {
        if (this.CommandData.PayloadData.SnapShotSettings && this.CommandData.PayloadData.SnapShotSettings.SnapShotNewNickname) {
          var storageMatch: IDataOneWindowStorage;

          await this.AtticMan.GetFromStorageById(this.CommandData.PayloadData.IdOfSelect)
            .then((result: IDataOneWindowStorage) => storageMatch = result)

            .then(() => {
              if (storageMatch) {
                if ((storageMatch.Flavor === SnapShotFlavor.Autosave
                  ||
                  (storageMatch.Flavor === SnapShotFlavor.Unknown))) {
                  storageMatch.Flavor = SnapShotFlavor.Manual;
                }

                storageMatch.NickName = this.CommandData.PayloadData.SnapShotSettings.SnapShotNewNickname;
                this.AtticMan.WriteToStorage(storageMatch);
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
        this.Logger.LogAsJsonPretty(this.UpdateNickname.name, this.CommandData.PayloadData);
        reject(this.UpdateNickname.name + ' no payload or id');
      }
    });
  }
}