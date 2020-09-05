import { DefaultContentState } from "../../../../Shared/scripts/Classes/DefaultContentState";
import { RecipeBasics } from "../../../../Shared/scripts/Classes/PromiseGeneric";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { scWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IDataDesktopState } from "../../../../Shared/scripts/Interfaces/IDataDtState";
import { IDataOneStorageOneTreeState } from "../../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState";
import { SitecoreUiManager } from "../../Managers/SitecoreUiManager/SitecoreUiManager";

export class ContentStateManager {
  private AtticAgent: IContentAtticAgent;
  private Logger: ILoggerAgent;
  private ScWinMan: IScWindowManager;

  constructor(logger: ILoggerAgent, atticMan: IContentAtticAgent, scUiMan: SitecoreUiManager, oneScWinMan: IScWindowManager) {
    this.Logger = logger;

    this.Logger.FuncStart(RecipeBasics.name);

    this.AtticAgent = atticMan;
    this.ScWinMan = oneScWinMan;
    this.Logger.FuncEnd(RecipeBasics.name);
  }

  PopulateContentState(): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.PopulateContentState.name);

      let toReturn: IContentState = new DefaultContentState();

      await this.AtticAgent.GetAllSnapShotsMany()
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

      let pageType: scWindowType = this.ScWinMan.GetCurrentPageType();

      if (pageType === scWindowType.Desktop) {
        await this.ScWinMan.OneDesktopMan.GetStateDesktop()
          .then((result: IDataDesktopState) => resolve(result.ActiveCeState))
          .catch((err) => reject(err));
      }
      else if (pageType === scWindowType.ContentEditor) {
        await this.ScWinMan.OneCEAgent.GetTreeState(Guid.NewRandomGuid())
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