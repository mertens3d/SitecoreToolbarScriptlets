import { ScWindowRecipePartials } from "../../../HindSiteScUiProxy/scripts/Managers/ScWindowManager/ScWindowRecipePartials";
import { RecipeBasics } from "../../../Shared/scripts/Classes/RecipeBasics";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScUrlAgent } from "../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IInternalCommandPayload } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";

export class RecipeInitFromQueryStr extends _ContentRecipeBase implements ICommandRecipes {
  private RecipeBasics: RecipeBasics;
  private ScUrlAgent: IScUrlAgent;
  private ScWinRecipeParts: ScWindowRecipePartials;
  private TopLevelDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent, commandData: IInternalCommandPayload) {
    super(logger, commandData);
    this.RecipeBasics = new RecipeBasics(this.Logger);
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.InitFromQueryString()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  private async InitFromQueryString(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.InitFromQueryString.name);
      if (this.ScUrlAgent.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
        let qsValue: string = (this.ScUrlAgent.GetQueryStringValueByKey(QueryStrKey.hsTargetSs));

        if (Guid.IsValidGuidStr(qsValue)) {
          let targetGuid: GuidData = Guid.ParseGuid(qsValue, false);

          if (targetGuid && targetGuid !== GuidData.GetEmptyGuid()) {
            this.Logger.LogVal("targetGuid", targetGuid.Raw);
            var dataOneWindowStorage;

            if (this.TopLevelDoc) {
              dataOneWindowStorage = this.AtticAgent.GetFromStorageBySnapShotId(targetGuid);

              this.CommandData.ScUiProxy.SetStateOfSitecoreWindowAsync(this.CommandData.ApiPayload, dataOneWindowStorage);
            }
            else {
              reject(this.InitFromQueryString.name + ' no targetDoc');
            }
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

      this.Logger.FuncEnd(this.InitFromQueryString.name);
    });
  }
}