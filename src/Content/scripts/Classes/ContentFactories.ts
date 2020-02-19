import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/IDataOneDoc";
import { ContentHub } from "../Managers/ContentHub";
import { PromiseHelper } from "../../../Shared/scripts/Classes/PromiseGeneric";
import { ContentManagerBase } from "../_first/_ContentManagerBase";
import { IDataOneIframe } from "../../../Shared/scripts/Interfaces/IDataOneIframe";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { CacheMode } from "../../../Shared/scripts/Enums/CacheMode";
import { IDataOneStorageCE } from "../../../Shared/scripts/Interfaces/IDataOneStorageCE";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IDataDtState } from "../../../Shared/scripts/Interfaces/IDataDtState";
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";

export class ContentFactories extends ContentManagerBase {
  constructor(contentHub: ContentHub) {
    contentHub.Logger.FuncStart(PromiseHelper.name);
    super(contentHub);
    contentHub.Logger.FuncEnd(PromiseHelper.name);
  }
  async UpdateContentState(response: MsgFromContent) {
    this.Log().FuncStart(this.UpdateContentState.name);
    response.ContentState.SnapShotsMany = await this.AtticMan().GetAllSnapShotsMany(CacheMode.OkToUseCache);
    response.ContentState.ErrorStack = this.Log().ErrorStack;
    this.Log().DebugObjState(response.ContentState);
    await this.GetCurrentDtOrCeState()
      .then((result: IDataOneStorageCE) => response.ContentState.ActiveCe = result)
      .catch((ex) => this.Log().Error(this.UpdateContentState.name, ex.toString()));

    this.Log().FuncEnd(this.UpdateContentState.name);
  }

  GetCurrentDtOrCeState() {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.GetCurrentDtOrCeState.name);

      let promiseResult: PromiseResult = new PromiseResult(this.GetCurrentDtOrCeState.name, this.Log());

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
      else if (pageType == scWindowType.ContentEditor) {
      } else {
        toReturnCeState = null;
      }
      this.Log().FuncEnd(this.GetCurrentDtOrCeState.name);

      if (promiseResult.WasSuccessful()) {
        resolve(toReturnCeState);
      } else {
        reject(promiseResult.RejectMessage);
      }
    });
  }

  async NewMsgFromContentShell() {
    this.Log().FuncStart(this.NewMsgFromContentShell.name);
    var response = new MsgFromContent(MsgFlag.Unknown);
    //await this.UpdateContentState(response);
    //response.ContentState.LastReq = MsgFlag.Unknown;
    this.Log().FuncEnd(this.NewMsgFromContentShell.name);
    return response;
  }
  DateOneIframeFactory(iframeElem: HTMLIFrameElement, parentDocument: IDataOneDoc, nickname: string): IDataOneIframe {
    var toReturn: IDataOneIframe = {
      Index: -1,
      IframeElem: iframeElem,
      Id: this.Helpers().GuidHelp.NewGuid(),
      Zindex: iframeElem.style.zIndex ? parseInt(iframeElem.style.zIndex) : -1,
      Nickname: nickname,
      ContentDoc: this.Helpers().FactoryHelp.DataOneContentDocFactoryFromIframe(iframeElem, parentDocument, nickname),
    };
    return toReturn;
  }
}