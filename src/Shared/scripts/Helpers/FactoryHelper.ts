import { HelperBase } from "../Classes/HelperBase";
import { IDataOneDoc } from "../Interfaces/IDataOneDoc";
export class FactoryHelper extends HelperBase {

  DataOneContentDocFactoryFromIframe(IframeElem: HTMLIFrameElement, parentDocument: IDataOneDoc, nickname: string): IDataOneDoc {
    var toReturn: IDataOneDoc = {
      ParentDoc: parentDocument,
      Document: IframeElem.contentDocument,
      HasParentDesktop: false,
      DocId: this.HelperHub.GuidHelp.NewGuid(),
      IsCEDoc: false,
      ParentDesktop: null,
      Nickname: nickname + ' - content doc'
    }
    return toReturn;
  }

}
