import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeSaveStateManual extends _ContentRecipeBase implements ICommandRecipes {
  constructor(hindeCore: IHindeCore, commandData: ICommandParams, dependancies: ICommandDependancies) {
    super(hindeCore, commandData, dependancies, RecipeSaveStateManual.name);
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.Dependancies.ScUiProxy.GetStateOfScUiProxyWindow(SnapShotFlavor.Manual)
        .then((windowState: IStateOfScUi) => {
          this.Dependancies.AtticAgent.WriteStateOfSitecoreToStorage(windowState);
          //todo - put back this.ErrorHand.WarningAndContinue(this.Execute.name, 'empty ce ar - not writing to storage');
        })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}