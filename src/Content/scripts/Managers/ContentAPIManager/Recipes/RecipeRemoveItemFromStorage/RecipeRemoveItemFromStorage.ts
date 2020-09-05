import { IToastAgent } from "../../../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { ICommandHndlrDataForContent } from "../../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { RecipeBase } from "../RecipeBase";


export class RecipeRemoveItemFromStorage extends RecipeBase implements ICommandRecipes {
  private ToastAgent: IToastAgent;

  constructor(commandData: ICommandHndlrDataForContent,  toastAgent: IToastAgent) {
    super(commandData);
    this.ToastAgent = toastAgent;
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.CommandData.AtticAgent.RemoveSnapshotFromStorageById(this.CommandData.TargetSnapShotId)
        .then(() => {
          this.ToastAgent.PopUpToastNotification(this.CommandData.TopLevelDoc, "Success");
          resolve();
        })
        .catch((err) => reject(err));
    });
  }
}