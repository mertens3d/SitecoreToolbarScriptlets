import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { IDataOneDoc } from "../Interfaces/Data/IDataOneDoc";
import { IframeProxy } from "../Interfaces/Data/IDataOneIframe";
import { Guid } from "./Guid";

export class FactoryHelper extends LoggableBase {
  DataOneContentDocFactoryFromIframe(dataOneIframe: IframeProxy): IDataOneDoc {
    var toReturn: IDataOneDoc = null;

    if (dataOneIframe) {
      toReturn =
      {
        ContentDoc: dataOneIframe.IframeElem.contentDocument,
        DocId: Guid.NewRandomGuid(),
        Nickname: dataOneIframe.Nickname + ' - content doc'
      }
    } else {
      this.Logger.ErrorAndThrow(this.DataOneContentDocFactoryFromIframe.name, 'no iframe provided');
    }
    return toReturn;
  }

  DataOneIframeFactory(iframeElem: HTMLIFrameElement, nickname: string): IframeProxy {
    this.Logger.FuncStart(this.DataOneIframeFactory.name);
    var toReturn: IframeProxy = null;

    if (iframeElem && nickname) {
      var toReturn: IframeProxy = new IframeProxy(this.Logger, iframeElem, nickname);
    } else {
      this.Logger.ErrorAndThrow(this.DataOneIframeFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }

    this.Logger.FuncEnd(this.DataOneIframeFactory.name);
    return toReturn;
  }
}