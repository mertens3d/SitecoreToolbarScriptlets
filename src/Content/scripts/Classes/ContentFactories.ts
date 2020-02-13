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

export class ContentFactories extends ContentManagerBase {
  constructor(contentHub: ContentHub) {
    contentHub.debug.FuncStart(PromiseHelper.name);
    super(contentHub);
    contentHub.debug.FuncEnd(PromiseHelper.name);
  }
  async UpdateContentState(response: MsgFromContent) {
    this.debug().FuncStart(this.UpdateContentState.name);
    response.ContentState.SnapShotsMany = await this.AtticMan().GetAllSnapShotsMany(CacheMode.OkToUseCache);
    response.ContentState.ErrorStack = this.debug().ErrorStack;
    this.debug().DebugObjState(response.ContentState);
    response.ContentState.ActiveCe = this.GetCurrentCeState();
    this.debug().FuncEnd(this.UpdateContentState.name);
  }

  GetCurrentCeState() {
    this.debug().FuncStart(this.GetCurrentCeState.name);
    let toReturnCeState: IDataOneStorageCE = null;
    let pageType: scWindowType = this.ScUiMan().GetCurrentPageType();

    if (pageType === scWindowType.Desktop) {
      var currState = this.OneScWinMan().OneDesktopMan.GetStateDesktop();
      if (currState) {
        toReturnCeState = currState.ActiveCeMan.GetStateCe(this.Helpers().GuidHelp.EmptyGuid());
      } else {
        this.debug().Error(this.GetCurrentCeState.name, 'No current state returned');
      }
    }
    else if (pageType == scWindowType.ContentEditor) {
    } else {
      toReturnCeState = null;
    }
    this.debug().FuncEnd(this.GetCurrentCeState.name);
    return toReturnCeState;
  }
  async NewMsgFromContentShell() {
    this.debug().FuncStart(this.NewMsgFromContentShell.name);
    var response = new MsgFromContent(MsgFlag.Unknown);
    //await this.UpdateContentState(response);
    //response.ContentState.LastReq = MsgFlag.Unknown;
    this.debug().FuncEnd(this.NewMsgFromContentShell.name);
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