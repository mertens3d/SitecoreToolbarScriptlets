import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeInitFromQueryStr extends _ContentRecipeBase implements ICommandRecipes {

  constructor(logger: ILoggerAgent, commandData: ICommandParams, dependancies: ICommandDependancies) {
    super(logger, commandData, dependancies, RecipeInitFromQueryStr.name);
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.PvtInitFromQueryString()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  private async PvtInitFromQueryString(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.PvtInitFromQueryString.name);
      if (this.Dependancies.ScUrlAgent.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
        let qsValue: string = (this.Dependancies.ScUrlAgent.GetQueryStringValueByKey(QueryStrKey.hsTargetSs));

        if (Guid.IsValidGuidStr(qsValue)) {
          let targetGuid: GuidData = Guid.ParseGuid(qsValue, false);

          if (targetGuid && targetGuid !== Guid.GetEmptyGuid()) {
            this.Logger.LogVal("targetGuid", targetGuid.Raw);
            var dataOneWindowStorage;

            dataOneWindowStorage = this.Dependancies.AtticAgent.GetFromStorageBySnapShotId(targetGuid);
            this.Dependancies.ScUiProxy.SetStateOfSitecoreWindowAsync(this.CommandParams.ApiPayload, dataOneWindowStorage);

          } else {
            reject('Either no snapshot provided or an illegal one was found');
          }
        } else {
          this.Logger.Log('guid is not a valid guid');
        }
      } else {
        this.Logger.Log('Does not have qs target');
        resolve();
      }

      this.Logger.FuncEnd(this.PvtInitFromQueryString.name);
    });
  }
}