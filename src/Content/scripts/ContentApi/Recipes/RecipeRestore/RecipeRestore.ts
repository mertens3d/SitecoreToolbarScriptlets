import { IContentEditorProxy, IDesktopProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy";
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScUrlAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { LoggableBase } from "../../../../../Shared/scripts/LoggableBase";
import { ScWindowRecipePartials } from "../../../Managers/ScWindowManager/ScWindowRecipePartials";
import { ICommandHandlerDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { __RecipeBase } from "../__RecipeBase/__RecipeBase";

export class RecipeSetStateOfSitecoreWindow extends __RecipeBase implements ICommandRecipes {
  TargetSnapShotId: GuidData;
  private OneCeAgent: IContentEditorProxy;
  private OneDesktopMan: IDesktopProxy;
  private ScWinRecipeParts: ScWindowRecipePartials;
  private TopLevelDoc: IDataOneDoc;

  constructor(commandData: ICommandHandlerDataForContent) {
    super(commandData);
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
              await this.ScWinRecipeParts.RestoreStateToTargetDoc(null, null) //todo put back this.CommandData)
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