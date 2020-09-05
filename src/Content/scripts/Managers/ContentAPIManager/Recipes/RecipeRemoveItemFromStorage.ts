import { RecipeBase } from "./RecipeBase";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ContentAtticManager } from "../../ContentAtticManager/ContentAtticManager";
import { IToastAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IToastAgent";

export class RecipeRemoveItemFromStorage extends RecipeBase implements ICommandRecipes {
  private AtticMan: ContentAtticManager;
  private ToastAgent: IToastAgent;

  constructor(commandData: ICommandHndlrDataForContent, atticMan: ContentAtticManager, toastAgent: IToastAgent) {
    super(commandData);
    this.AtticMan = atticMan;
    this.ToastAgent = toastAgent;
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.AtticMan.RemoveOneFromStorage(this.CommandData.PayloadData.IdOfSelect)
        .then(() => {
          this.ToastAgent.PopUpToastNotification(this.CommandData.TopLevelDoc, "Success");
          resolve();
        })
        .catch((err) => reject(err));
    });
  }
}