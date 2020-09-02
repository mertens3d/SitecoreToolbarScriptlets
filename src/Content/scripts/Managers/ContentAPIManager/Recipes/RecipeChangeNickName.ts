import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { ContentAtticManager } from "../../ContentAtticManager/ContentAtticManager";
import { RecipeBase } from "./RecipeBase";

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
        var storageMatch;

        await this.AtticMan.GetFromStorageById(this.CommandData.PayloadData.IdOfSelect)
          .then((result) => storageMatch = result);

        if (storageMatch && this.CommandData.PayloadData.SnapShotSettings && this.CommandData.PayloadData.SnapShotSettings.SnapShotNewNickname) {
          storageMatch.NickName = this.CommandData.PayloadData.SnapShotSettings.SnapShotNewNickname;
          this.AtticMan.WriteToStorage(storageMatch);
          resolve();
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