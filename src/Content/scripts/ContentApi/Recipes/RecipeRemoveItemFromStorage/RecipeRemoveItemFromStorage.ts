import { IToastAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { ICommandHandlerDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";

export class RecipeRemoveItemFromStorage extends __RecipeBase implements ICommandRecipes {
  private ToastAgent: IToastAgent;

  constructor(commandData: ICommandHandlerDataForContent, toastAgent: IToastAgent) {
    super(commandData);
    this.ToastAgent = toastAgent;
  }

  async Execute(): Promise<void> {
    try {
      this.AtticAgent.RemoveSnapshotFromStorageById(this.TargetSnapShotId);

      this.ToastAgent.RaiseToastNotification(this.ScWinMan.GetTopLevelDoc(), "Success");
    } catch (err) {
      this.Logger.ErrorAndThrow(this.Execute.name, err);
    }
  }
}