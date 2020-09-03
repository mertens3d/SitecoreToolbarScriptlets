import { RecipeBase } from "./RecipeBase";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";

export class RecipeRemoveItemFromStorage extends RecipeBase implements ICommandRecipes {
  constructor(commandData: ICommandHndlrDataForContent) {
    super(commandData)
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.CommandData.ContentHub.AtticMan.RemoveOneFromStorage(this.CommandData.PayloadData.IdOfSelect)
        .then(() => {
          this.CommandData.ContentMessageBroker.AllAgents.ToastAgent.PopUpToastNotification(this.CommandData.ContentHub.SitecoreUiMan.TopLevelDoc(), "Success");
          resolve();
        })
        .catch((err) => reject(err));
    });
  }
}