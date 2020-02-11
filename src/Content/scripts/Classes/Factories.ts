import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/IDataOneDoc";
import { ContentHub } from "../Managers/ContentHub";
import { PromiseHelper } from "../../../Shared/scripts/Classes/PromiseGeneric";
import { ContentManagerBase } from "../_first/_ContentManagerBase";
import { IDataOneIframe } from "../../../Shared/scripts/Interfaces/IDataOneIframe";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { CacheMode } from "../../../Shared/scripts/Enums/CacheMode";

export class Factories extends ContentManagerBase{
 

  constructor(contentHub: ContentHub) {
    contentHub.debug.FuncStart(PromiseHelper.name);
    super(contentHub);
    contentHub.debug.FuncEnd(PromiseHelper.name);
  }

  async UpdateContentState(response: MsgFromContent) {
    response.ContentState.SnapShotsMany = await this.AtticMan().GetAllSnapShotsMany(CacheMode.OkToUseCache);
    //response.ContentState.WindowType = await this.ScUiMan().GetCurrentPageType();
    //response.ContentState.Url = this.PageMan().TopLevelWindow().DataDocSelf.Document.location.href;
    response.ContentState.ErrorStack = this.debug().ErrorStack;
    this.debug().DebugObjState(response.ContentState);
  }

  async NewMsgFromContent() {
    var response = new MsgFromContent(MsgFlag.Unknown);
    await this.UpdateContentState(response);
    response.ContentState.LastReq = MsgFlag.Unknown;
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
