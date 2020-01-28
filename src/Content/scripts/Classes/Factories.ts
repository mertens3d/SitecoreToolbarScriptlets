import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/IDataOneDoc";
import { IGuid } from "../../../Shared/scripts/Interfaces/IGuid";
import { ContentHub } from "../Managers/ContentHub";
import { PromiseGeneric } from "../Promises/PromiseGeneric";
import { ContentManagerBase } from "../_first/_ContentManagerBase";
import { IDataOneIframe } from "../../../Shared/scripts/Interfaces/IDataOneIframe";
import { GuidHelper } from "../../../Shared/scripts/Classes/GuidHelper";

export class Factories extends ContentManagerBase{
    GuidHelper: GuidHelper;
  constructor(xyyz: ContentHub) {
    xyyz.debug.FuncStart(PromiseGeneric.name);
    super(xyyz);
    this.GuidHelper = new GuidHelper();
    xyyz.debug.FuncEnd(PromiseGeneric.name);
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
      XyyzId: this.GuidHelper.NewGuid(),
      IsCEDoc: false,
      ParentDesktop: null,
      Nickname: nickname + ' - content doc'
    }
    return toReturn;
  }
}
