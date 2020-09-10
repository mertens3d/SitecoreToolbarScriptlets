import { IToastAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";

export class RecipeRemoveItemFromStorage extends __RecipeBase implements ICommandRecipes {
  private ToastAgent: IToastAgent;

  constructor(commandData: ICommandHndlrDataForContent, toastAgent: IToastAgent) {
    super(commandData);
    this.ToastAgent = toastAgent;
  }

  async Execute():Promise<void> {
    try {
      this.AtticAgent.RemoveSnapshotFromStorageById(this.TargetSnapShotId);

      this.ToastAgent.PopUpToastNotification(this.ScWinMan.GetTopLevelDoc(), "Success");
    } catch (err) {

      this.Logger.ErrorAndThrow(this.Execute.name, err);

    }
  }
}