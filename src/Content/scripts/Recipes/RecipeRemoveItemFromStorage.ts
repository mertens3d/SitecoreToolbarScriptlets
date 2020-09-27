﻿import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeRemoveItemFromStorage extends _ContentRecipeBase implements ICommandRecipes {

  constructor(logger: ILoggerAgent, commandData: ICommandParams, dependancies: ICommandDependancies) {
    super(logger, commandData, dependancies, RecipeRemoveItemFromStorage.name);
  }

  async Execute(): Promise<void> {
    try {
      this.Dependancies.AtticAgent.RemoveSnapshotFromStorageById(this.CommandParams.TargetSnapShotId);

      //this.ToastAgent.RaiseToastNotification(this.scWinProxy.GetTopLevelDoc(), "Success");
    } catch (err) {
      this.Logger.ErrorAndThrow(this.Execute.name, err);
    }
  }
}