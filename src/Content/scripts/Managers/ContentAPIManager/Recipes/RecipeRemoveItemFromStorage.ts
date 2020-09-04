import { RecipeBase } from "./RecipeBase";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ContentAtticManager } from "../../ContentAtticManager/ContentAtticManager";

export class RecipeRemoveItemFromStorage extends RecipeBase implements ICommandRecipes {
 private AtticMan: ContentAtticManager;

  constructor(commandData: ICommandHndlrDataForContent, atticMan: ContentAtticManager) {
    super(commandData);
    this.AtticMan = atticMan;
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.AtticMan.RemoveOneFromStorage(this.CommandData.PayloadData.IdOfSelect)
        .then(() => {
          this.CommandData.ContentMessageBroker.AllAgents.ToastAgent.PopUpToastNotification(this.CommandData.ContentHub.SitecoreUiMan.TopLevelDoc(), "Success");
          resolve();
        })
        .catch((err) => reject(err));
    });
  }
}