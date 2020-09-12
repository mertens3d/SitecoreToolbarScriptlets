import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScUrlAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { IToastAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { ContentEditorProxy } from "../../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { ScWindowRecipePartials } from "../../../Managers/ScWindowManager/ScWindowRecipePartials";
import { DesktopProxy } from "../../../Proxies/Desktop/DesktopProxy/DesktopProxy";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";

export class RecipeSetStateOfSitecoreWindow extends LoggableBase implements ICommandRecipes {
  TargetSnapShotId: GuidData;
  private AtticAgent: IContentAtticAgent;
  private OneCeAgent: ContentEditorProxy;
  private OneDesktopMan: DesktopProxy;
  private ScWinRecipeParts: ScWindowRecipePartials;
  private TopLevelDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent, scUrlAgent: IScUrlAgent, atticAgent: IContentAtticAgent, topLevelDoc: IDataOneDoc, scWinRecipeParts: ScWindowRecipePartials, oneDesktopMan: DesktopProxy, toastAgent: IToastAgent, oneCEAgent: ContentEditorProxy, targetSnapShotId: GuidData, settingsAgent: ISettingsAgent) {
    super(logger);
    this.AtticAgent = atticAgent;
    this.TopLevelDoc = topLevelDoc;
    this.ScWinRecipeParts = scWinRecipeParts;
    this.OneDesktopMan = oneDesktopMan;
    this.OneCeAgent = oneCEAgent;
    this.TargetSnapShotId = targetSnapShotId;
  }

  async Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.Execute.name);
      try {
        if (this.TargetSnapShotId) {
          this.Logger.LogVal("IdOfSelect", this.TargetSnapShotId);
          var dataOneWindowStorage;

          dataOneWindowStorage = this.AtticAgent.GetFromStorageBySnapShotId(this.TargetSnapShotId);

          if (dataOneWindowStorage) {
            var targetDoc: IDataOneDoc = this.TopLevelDoc;

            if (targetDoc) {
              await this.ScWinRecipeParts.RestoreStateToTargetDoc(targetDoc, dataOneWindowStorage, this.OneDesktopMan, this.OneCeAgent)
                .then(() => resolve())
                .catch((err) => reject(err))
            }
            else {
              reject(this.Execute.name + ' no target window');
            }
          }
        } else {
          reject(this.Execute.name + ' No IdOfSelect');
        }
      } catch (err) {
        reject(err)
      }

      this.Logger.FuncEnd(this.Execute.name);
    });
  }
}