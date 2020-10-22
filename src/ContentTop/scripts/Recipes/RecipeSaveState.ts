﻿import { ScRibbonCommand } from "../../../Shared/scripts/Enums/eScRibbonCommand";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IApiCallPayload } from "../../../Shared/scripts/Interfaces/IApiCallPayload";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { IScUiReturnPayload } from "../../../Shared/scripts/Interfaces/StateOf/IScUiReturnPayload";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeSaveStateManual extends _ContentRecipeBase implements ICommandRecipes {
  constructor(hindeCore: IHindeCore, commandData: ICommandParams, dependancies: ICommandDependancies) {
    super(hindeCore, commandData, dependancies, RecipeSaveStateManual.name);
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {

      let payload: IApiCallPayload = {
        DataOneWindowStorage: null,
        ScRibbonCommand: ScRibbonCommand.Unknown,
        SnapShotFlavor: SnapShotFlavor.Manual,
        SnapShotOfStateScUiApi: null,
        
      }

      await this.Dependancies.ScUiProxy.GetStateOfScUiProxy(payload)
        .then((scUiReturnPayload: IScUiReturnPayload) => {
          this.Dependancies.AtticAgent.WriteStateOfSitecoreToStorage(scUiReturnPayload.StateOfScUi);
          //todo - put back this.ErrorHand.WarningAndContinue(this.Execute.name, 'empty ce ar - not writing to storage');
        })
        .then(() => resolve())
        .catch((err: any) => reject(err));
    });
  }
}