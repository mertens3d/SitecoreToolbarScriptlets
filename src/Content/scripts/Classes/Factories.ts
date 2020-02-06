import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/IDataOneDoc";
import { ContentHub } from "../Managers/ContentHub";
import { PromiseGeneric } from "../Promises/PromiseGeneric";
import { ContentManagerBase } from "../_first/_ContentManagerBase";
import { IDataOneIframe } from "../../../Shared/scripts/Interfaces/IDataOneIframe";
import { GuidHelper } from "../../../Shared/scripts/Classes/GuidHelper";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";

export class Factories extends ContentManagerBase{
 
  GuidHelper: GuidHelper;

  constructor(contentHub: ContentHub) {
    contentHub.debug.FuncStart(PromiseGeneric.name);
    super(contentHub);
    this.GuidHelper = new GuidHelper(contentHub.debug);
    contentHub.debug.FuncEnd(PromiseGeneric.name);
  }

  async UpdateContentState(response: MsgFromContent) {
    response.State.SnapShotsMany = await this.AtticMan().GetAllSnapShotsMany();
    response.State.WindowType = await this.PageDataMan().GetCurrentPageType();
    response.State.Url = this.PageDataMan().TopLevelWindow().DataDocSelf.Document.location.href;
    response.State.ErrorStack = this.debug().ErrorStack;
    this.debug().DebugObjState(response.State);
  }

  async NewMsgFromContent() {
    var response = new MsgFromContent(MsgFlag.Unknown);
    await this.UpdateContentState(response);
    response.State.LastReq = MsgFlag.Unknown;
    return response;
  }
  DateOneIframeFactory(iframeElem: HTMLIFrameElement, parentDocument: IDataOneDoc, nickname: string): IDataOneIframe {
    var toReturn: IDataOneIframe = {
      Index: -1,
      IframeElem: iframeElem,
      Id: this.GuidHelper.NewGuid(),
      Zindex: iframeElem.style.zIndex ? parseInt(iframeElem.style.zIndex) : -1,
      Nickname: nickname,
      ContentDoc: this.DataOneContentDocFactoryFromIframe(iframeElem, parentDocument, nickname),
    };

    return toReturn;
  }


  DataOneContentDocFactoryFromIframe(IframeElem: HTMLIFrameElement, parentDocument: IDataOneDoc, nickname: string): IDataOneDoc {
    var toReturn: IDataOneDoc = {
      ParentDoc: parentDocument,
      Document: IframeElem.contentDocument,
      HasParentDesktop: false,
      DocId: this.GuidHelper.NewGuid(),
      IsCEDoc: false,
      ParentDesktop: null,
      Nickname: nickname + ' - content doc'
    }
    return toReturn;
  }
}
