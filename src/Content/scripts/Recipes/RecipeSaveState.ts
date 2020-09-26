import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeSaveStateManual extends _ContentRecipeBase implements ICommandRecipes {
  constructor(logger: ILoggerAgent, commandData: ICommandParams, dependancies: ICommandDependancies) {
    super(logger, commandData, dependancies, RecipeSaveStateManual.name);
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.Dependancies.ScUiProxy.GetStateOfSitecoreWindow(SnapShotFlavor.Manual)
        .then((windowState: IDataStateOfSitecoreWindow) => {
          this.Dependancies.AtticAgent.WriteStateOfSitecoreToStorage(windowState);
          //todo - put back this.Logger.WarningAndContinue(this.Execute.name, 'empty ce ar - not writing to storage');
        })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}