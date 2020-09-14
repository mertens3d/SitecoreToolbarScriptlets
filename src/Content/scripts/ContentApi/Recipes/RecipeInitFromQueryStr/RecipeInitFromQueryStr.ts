import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { QueryStrKey } from "../../../../../Shared/scripts/Enums/QueryStrKey";
import { Guid } from "../../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScUrlAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { ScWindowRecipePartials } from "../../../Managers/ScWindowManager/ScWindowRecipePartials";
import { ContentEditorProxy } from "../../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../Proxies/Desktop/DesktopProxy/DesktopProxy";

export class RecipeInitFromQueryStr extends LoggableBase implements ICommandRecipes {
  private AtticAgent: IContentAtticAgent;
  private OneCeAgent: ContentEditorProxy;
  private OneDesktopMan: DesktopProxy;
  private RecipeBasics: RecipeBasics;
  private ScUrlAgent: IScUrlAgent;
  private ScWinRecipeParts: ScWindowRecipePartials;
  private TopLevelDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent, scUrlAgent: IScUrlAgent, atticAgent: IContentAtticAgent, topLevelDoc: IDataOneDoc, scWinRecipeParts: ScWindowRecipePartials, oneDesktopMan: DesktopProxy, contentEditorProxy: ContentEditorProxy) {
    super(logger);
    this.ScUrlAgent = scUrlAgent;
    this.RecipeBasics = new RecipeBasics(this.Logger);
    this.AtticAgent = atticAgent;
    this.TopLevelDoc = topLevelDoc;
    this.ScWinRecipeParts = scWinRecipeParts;
    this.OneDesktopMan = oneDesktopMan;
    this.OneCeAgent = contentEditorProxy;
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

              await this.RecipeBasics.WaitForPageReadyNative(this.TopLevelDoc)
                .then(() => this.ScWinRecipeParts.RestoreStateToTargetDoc(this.TopLevelDoc, dataOneWindowStorage, this.OneDesktopMan, this.OneCeAgent))
                .then(() => resolve())
                .catch((err) => reject(this.InitFromQueryString.name + ' | ' + err));
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