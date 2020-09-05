import { DefaultContentState } from "../../../../Shared/scripts/Classes/DefaultContentState";
import { RecipeBasics } from "../../../../Shared/scripts/Classes/PromiseGeneric";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { scWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IDataDesktopState } from "../../../../Shared/scripts/Interfaces/IDataDtState";
import { IDataOneStorageOneTreeState } from "../../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState";
import { ContentAtticManager } from "../../Managers/ContentAtticManager/ContentAtticManager";
import { OneScWindowManager } from "../../Managers/OneScWindowManager";
import { SitecoreUiManager } from "../../Managers/SitecoreUiManager/SitecoreUiManager";

export class ContentStateManager {
  private AtticMan: ContentAtticManager;
  private Logger: ILoggerAgent;
  private ScUiMan: SitecoreUiManager;
  private OneScWinMan: OneScWindowManager;

  constructor(logger: ILoggerAgent, atticMan: ContentAtticManager, scUiMan: SitecoreUiManager, oneScWinMan: OneScWindowManager) {
    this.Logger = logger;

    this.Logger.FuncStart(RecipeBasics.name);

    this.AtticMan = atticMan;
    this.ScUiMan = scUiMan;
    this.OneScWinMan = oneScWinMan;
    this.Logger.FuncEnd(RecipeBasics.name);
  }

  PopulateContentState(): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.PopulateContentState.name);

      let toReturn: IContentState = new DefaultContentState();

      await this.AtticMan.GetAllSnapShotsMany()
        .then((result) => toReturn.SnapShotsMany = result)
        .then(() => toReturn.ErrorStack = this.Logger.ErrorStack)
        .then(() => this.GetCurrentDtOrCeState())
        .then((result: IDataOneStorageOneTreeState) => {
          toReturn.ActiveCe = result;
          resolve(toReturn);
        })
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.PopulateContentState.name);
    });
  }

  GetCurrentDtOrCeState() {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetCurrentDtOrCeState.name);

      let pageType: scWindowType = this.ScUiMan.GetCurrentPageType();

      if (pageType === scWindowType.Desktop) {
        await this.OneScWinMan.OneDesktopMan.GetStateDesktop()
          .then((result: IDataDesktopState) => resolve(result.ActiveCeState))
          .catch((err) => reject(err));
      }
      else if (pageType === scWindowType.ContentEditor) {
        await this.OneScWinMan.OneCEAgent.GetTreeState(Guid.NewRandomGuid())
          .then((result: IDataOneStorageOneTreeState) => resolve(result))
          .catch((err) => reject(err));
      }
      else if (pageType === scWindowType.LoginPage
        || pageType === scWindowType.Launchpad
        || pageType === scWindowType.Edit
        || pageType === scWindowType.Preview
        || pageType === scWindowType.Normal) {
        resolve(null);
      }
      else {
        reject('unknown page type ' + StaticHelpers.WindowTypeAsString(pageType));
      }

      this.Logger.FuncEnd(this.GetCurrentDtOrCeState.name);
    });
  }
}