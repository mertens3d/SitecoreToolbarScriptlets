import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataStateOfSitecoreWindow } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { ScWindowRecipePartials } from "../../../Managers/ScWindowManager/ScWindowRecipePartials";
import { ContentEditorProxy } from "../../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../Proxies/Desktop/DesktopProxy/DesktopProxy";

export class RecipeSetStateOfSitecoreWindow extends LoggableBase implements ICommandRecipes {
  private OneCeAgent: ContentEditorProxy;
  private OneDesktopMan: DesktopProxy;
  private ScWinRecipeParts: ScWindowRecipePartials;
  private TopLevelDoc: IDataOneDoc;
  DataOneWindowStorage: IDataStateOfSitecoreWindow;

  constructor(logger: ILoggerAgent, topLevelDoc: IDataOneDoc, scWinRecipeParts: ScWindowRecipePartials, oneDesktopMan: DesktopProxy, oneCEAgent: ContentEditorProxy, dataOneWindowStorage: IDataStateOfSitecoreWindow) {
    super(logger);
    this.TopLevelDoc = topLevelDoc;
    this.ScWinRecipeParts = scWinRecipeParts;
    this.OneDesktopMan = oneDesktopMan;
    this.OneCeAgent = oneCEAgent;
    this.DataOneWindowStorage = dataOneWindowStorage;
  }

  async Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.Execute.name);
      try {
        if (this.DataOneWindowStorage) {
          var targetDoc: IDataOneDoc = this.TopLevelDoc;

          if (targetDoc) {
            await this.ScWinRecipeParts.RestoreStateToTargetDoc(targetDoc, this.DataOneWindowStorage, this.OneDesktopMan, this.OneCeAgent)
              .then(() => resolve())
              .catch((err) => reject(err))
          }
          else {
            reject(this.Execute.name + ' no target window');
          }
        }
      } catch (err) {
        reject(err)
      }

      this.Logger.FuncEnd(this.Execute.name);
    });
  }
}