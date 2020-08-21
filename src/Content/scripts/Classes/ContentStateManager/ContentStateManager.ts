import { PromisesBasic } from "../../../../Shared/scripts/Classes/PromiseGeneric";
import { PromiseResult } from "../../../../Shared/scripts/Classes/PromiseResult";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { CacheMode } from "../../../../Shared/scripts/Enums/CacheMode";
import { scWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { ICurrStateContent } from "../../../../Shared/scripts/Interfaces/ICurrState";
import { IDataDesktopState } from "../../../../Shared/scripts/Interfaces/IDataDtState";
import { IDataOneStorageOneTreeState } from "../../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState";
import { ContentHub } from "../../Managers/ContentHub/ContentHub";
import { ContentManagerBase } from "../../_first/_ContentManagerBase";

export class ContentStateManager extends ContentManagerBase {
  constructor(hub: ContentHub, contentAgents: IAllAgents) {
    super(hub, contentAgents);
    this.AllAgents.Logger.FuncStart(PromisesBasic.name);
    this.AllAgents.Logger.FuncEnd(PromisesBasic.name);
  }

  PopulateContentState(): Promise<ICurrStateContent> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.PopulateContentState.name);

      //contentState: ICurrStateContent = new contents

      let toReturn: ICurrStateContent = {
        SnapShotsMany: {
          CurrentSnapShots: [],
          FavoriteCount: 0,
          SnapShotsAutoCount: 0,
          PlainCount: 0,
          Birthday: new Date(1970),
        },
        LastReq: MsgFlag.Unknown,
        ErrorStack: [],
        LastReqSuccessful: false,
        LastReqFailReason: '',
        ActiveCe: null
      };

      //let promiseResult: PromiseResult = new PromiseResult(this.UpdateContentState.name, this.AllAgents.Logger);
      //this.AllAgents.Logger.MarkerC();
      toReturn.SnapShotsMany = await this.AtticMan().GetAllSnapShotsMany(CacheMode.OkToUseCache);
      toReturn.ErrorStack = this.AllAgents.Logger.ErrorStack;

      //this.AllAgents.Logger.LogAsJsonPretty('ContentState', contentState);
      //this.AllAgents.Logger.MarkerA();
      await this.GetCurrentDtOrCeState()
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

      let promiseResult: PromiseResult = new PromiseResult(this.GetCurrentDtOrCeState.name, this.AllAgents.Logger);

      let toReturnOneTreeState: IDataOneStorageOneTreeState = null;
      let pageType: scWindowType = this.ScUiMan().GetCurrentPageType();

      if (pageType === scWindowType.Desktop) {
        var currState: IDataDesktopState;

        await this.OneScWinMan().OneDesktopMan.GetStateDesktop()
          .then((result: IDataDesktopState) => {
            toReturnOneTreeState = result.ActiveCeState;
            promiseResult.MarkSuccessful();
          })
          .catch((ex) => promiseResult.MarkFailed(ex));
      }
      else if (pageType === scWindowType.ContentEditor) {
        toReturnOneTreeState = null;

        await this.OneScWinMan().OneCEAgent.GetTreeState(this.AllAgents.HelperAgent.GuidHelper.NewGuid())
          .then((result: IDataOneStorageOneTreeState) => {
            toReturnOneTreeState = result;
            promiseResult.MarkSuccessful();
          })
          .catch((ex) => promiseResult.MarkFailed(ex));
      }
      else if (pageType === scWindowType.LoginPage
        || pageType === scWindowType.Launchpad
        || pageType === scWindowType.Edit
        || pageType === scWindowType.Preview
        || pageType === scWindowType.Normal) {
        toReturnOneTreeState = null;
        promiseResult.MarkSuccessful();
      }
      else {
        toReturnOneTreeState = null;
        promiseResult.MarkFailed('not a known page type ' + StaticHelpers.WindowTypeAsString(pageType));
      }

      this.AllAgents.Logger.FuncEnd(this.GetCurrentDtOrCeState.name);

      if (promiseResult.WasSuccessful()) {
        resolve(toReturnOneTreeState);
      }
      else {
        reject(promiseResult.RejectReasons);
      }
    });
  }
}