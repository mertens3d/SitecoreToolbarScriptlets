import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IInternalCommandPayload } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeSaveStateManual extends _ContentRecipeBase implements ICommandRecipes {
  constructor(logger: ILoggerAgent, commandData: IInternalCommandPayload) {
    super(logger, commandData);
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.CommandData.ScUiProxy.GetStateOfSitecoreWindow(SnapShotFlavor.Manual)
        .then((windowState: IDataStateOfSitecoreWindow) => {
          this.AtticAgent.WriteStateOfSitecoreToStorage(windowState);
          //todo - put back this.Logger.WarningAndContinue(this.Execute.name, 'empty ce ar - not writing to storage');
        })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}