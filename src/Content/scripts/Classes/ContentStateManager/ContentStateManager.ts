import { DefaultContentState } from "../../../../Shared/scripts/Classes/DefaultContentState";
import { PromisesBasic } from "../../../../Shared/scripts/Classes/PromiseGeneric";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { scWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IDataDesktopState } from "../../../../Shared/scripts/Interfaces/IDataDtState";
import { IDataOneStorageOneTreeState } from "../../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState";
import { ContentAtticManager } from "../../Managers/ContentAtticManager/ContentAtticManager";
import { ContentHub } from "../../Managers/ContentHub/ContentHub";
import { ContentManagerBase } from "../../_first/_ContentManagerBase";

export class ContentStateManager extends ContentManagerBase {
  private AtticMan: ContentAtticManager;

  constructor(hub: ContentHub, contentAgents: IAllAgents, atticMan: ContentAtticManager) {
    super(hub, contentAgents);
    this.AllAgents.Logger.FuncStart(PromisesBasic.name);

    this.AtticMan = atticMan;
    this.AllAgents.Logger.FuncEnd(PromisesBasic.name);
  }

  PopulateContentState(): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.PopulateContentState.name);

      let toReturn: IContentState = new DefaultContentState();

      await this.AtticMan.GetAllSnapShotsMany()
        .then((result) => toReturn.SnapShotsMany = result)
        .then(() => toReturn.ErrorStack = this.AllAgents.Logger.ErrorStack)
        .then(() => this.GetCurrentDtOrCeState())
        .then((result: IDataOneStorageOneTreeState) => {
          toReturn.ActiveCe = result;
          resolve(toReturn);
        })
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.PopulateContentState.name);
    });
  }

  GetCurrentDtOrCeState() {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.GetCurrentDtOrCeState.name);

      let pageType: scWindowType = this.ScUiMan().GetCurrentPageType();

      if (pageType === scWindowType.Desktop) {
        await this.OneScWinMan().OneDesktopMan.GetStateDesktop()
          .then((result: IDataDesktopState) => resolve(result.ActiveCeState))
          .catch((err) => reject(err));
      }
      else if (pageType === scWindowType.ContentEditor) {
        await this.OneScWinMan().OneCEAgent.GetTreeState(Guid.NewRandomGuid())
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

      this.AllAgents.Logger.FuncEnd(this.GetCurrentDtOrCeState.name);
    });
  }
}