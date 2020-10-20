import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeRemoveItemFromStorage extends _ContentRecipeBase implements ICommandRecipes {

  constructor(hindeCore: IHindeCore, commandData: ICommandParams, dependancies: ICommandDependancies) {
    super(hindeCore, commandData, dependancies, RecipeRemoveItemFromStorage.name);
  }

  async Execute(): Promise<void> {
    try {
      this.Dependancies.AtticAgent.RemoveSnapshotFromStorageById(this.CommandParams.TargetSnapShotId);

      //this.ToastAgent.RaiseToastNotification(this.scWinProxy.GetTopLevelDoc(), "Success");
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.Execute.name, err);
    }
  }
}