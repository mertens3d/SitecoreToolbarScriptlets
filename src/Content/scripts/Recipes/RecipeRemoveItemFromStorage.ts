import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IInternalCommandPayload } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeRemoveItemFromStorage extends _ContentRecipeBase implements ICommandRecipes {

  constructor(logger: ILoggerAgent, commandData: IInternalCommandPayload) {
    super(logger, commandData);
  }

  async Execute(): Promise<void> {
    try {
      this.AtticAgent.RemoveSnapshotFromStorageById(this.TargetSnapShotId);

      //this.ToastAgent.RaiseToastNotification(this.scWinProxy.GetTopLevelDoc(), "Success");
    } catch (err) {
      this.Logger.ErrorAndThrow(this.Execute.name, err);
    }
  }
}