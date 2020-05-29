﻿import { ContentHub } from "../Managers/ContentHub";
import { PromiseHelper } from "../../../Shared/scripts/Classes/PromiseGeneric";
import { ContentManagerBase } from "../_first/_ContentManagerBase";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { CacheMode } from "../../../Shared/scripts/Enums/CacheMode";
import { IDataOneStorageCE } from "../../../Shared/scripts/Interfaces/IDataOneStorageCE";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IDataDtState } from "../../../Shared/scripts/Interfaces/IDataDtState";
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { ICurrStateContent } from "../../../Shared/scripts/Interfaces/ICurrState";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllAgents";

export class ContentFactories extends ContentManagerBase {
  constructor(hub: ContentHub, contentAgents: IAllAgents) {
    super(hub, contentAgents);
    this.AllAgents.Logger.FuncStart(PromiseHelper.name);
    this.AllAgents.Logger.FuncEnd(PromiseHelper.name);
  }
  UpdateContentState(contentState: ICurrStateContent) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.UpdateContentState.name);
      let promiseResult: PromiseResult = new PromiseResult(this.UpdateContentState.name, this.AllAgents.Logger);
      contentState.SnapShotsMany = await this.AtticMan().GetAllSnapShotsMany(CacheMode.OkToUseCache);
      contentState.ErrorStack = this.AllAgents.Logger.ErrorStack;

      this.AllAgents.Logger.LogAsJsonPretty('ContentState', contentState);

      await this.GetCurrentDtOrCeState()
        .then((result: IDataOneStorageCE) => {
          contentState.ActiveCe = result;
          promiseResult.MarkSuccessful();
        })
        .catch((err) => promiseResult.MarkFailed(err));

      this.AllAgents.Logger.FuncEnd(this.UpdateContentState.name);

      if (promiseResult.WasSuccessful()) {
        resolve(contentState);
      } else {
        reject(promiseResult.RejectReasons);
      }
    });
  }

  GetCurrentDtOrCeState() {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.GetCurrentDtOrCeState.name);

      let promiseResult: PromiseResult = new PromiseResult(this.GetCurrentDtOrCeState.name, this.AllAgents.Logger);

      let toReturnCeState: IDataOneStorageCE = null;
      let pageType: scWindowType = this.ScUiMan().GetCurrentPageType();

      if (pageType === scWindowType.Desktop) {
        var currState: IDataDtState;

        await this.OneScWinMan().OneDesktopMan.GetStateDesktop()
          .then((result: IDataDtState) => {
            toReturnCeState = result.ActiveCeState;
            promiseResult.MarkSuccessful();
          })
          .catch((ex) => promiseResult.MarkFailed(ex));
      }
      else if (pageType === scWindowType.ContentEditor) {
        toReturnCeState = null;

        await this.OneScWinMan().OneCEMan.GetStateCe(this.Helpers().GuidHelp.NewGuid())
          .then((result: IDataOneStorageCE) => {
            toReturnCeState = result;
            promiseResult.MarkSuccessful();
          })
          .catch((ex) => promiseResult.MarkFailed(ex));
      }
      else if (pageType === scWindowType.LoginPage
        || pageType === scWindowType.Launchpad
        || pageType === scWindowType.Edit
        || pageType === scWindowType.Preview
        || pageType === scWindowType.Normal


      ) {
        toReturnCeState = null;
        promiseResult.MarkSuccessful();
      } else {
        toReturnCeState = null;
        promiseResult.MarkFailed('not a known page type ' + StaticHelpers.WindowTypeAsString(pageType));
      }

      this.AllAgents.Logger.FuncEnd(this.GetCurrentDtOrCeState.name);

      if (promiseResult.WasSuccessful()) {
        resolve(toReturnCeState);
      } else {
        reject(promiseResult.RejectReasons);
      }
    });
  }

  async NewMsgFromContentShell() {
    this.AllAgents.Logger.FuncStart(this.NewMsgFromContentShell.name);
    var response = new MsgFromContent(MsgFlag.Unknown);
    //await this.UpdateContentState(response);
    //response.ContentState.LastReq = MsgFlag.Unknown;
    this.AllAgents.Logger.FuncEnd(this.NewMsgFromContentShell.name);
    return response;
  }
}