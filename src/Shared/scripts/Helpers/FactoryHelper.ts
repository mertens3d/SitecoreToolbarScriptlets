import { LoggableBase } from "../LoggableBase";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../Interfaces/Data/IDataOneDoc";
import { IFactoryHelper } from "../Interfaces/IFactoryHelper";
import { Guid } from "./Guid";
import { _BaseFrameProxy } from "../../../Content/scripts/Proxies/_BaseFrameProxy";
import { DTFrameProxy } from "../../../Content/scripts/Proxies/DTFrameProxy";

export class FactoryHelper extends LoggableBase implements IFactoryHelper {
  SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent) {
    super(logger);
  }

  DataOneContentDocFactoryFromIframe(dataOneIframe: _BaseFrameProxy): IDataOneDoc {
    var toReturn: IDataOneDoc = null;

    if (dataOneIframe) {
      toReturn =
      {
        ContentDoc: dataOneIframe.HTMLIframeElement.contentDocument,
        DocId: Guid.NewRandomGuid(),
        Nickname: ' - content doc'
      }
    } else {
      this.Logger.ErrorAndThrow(this.DataOneContentDocFactoryFromIframe.name, 'no iframe provided');
    }
    return toReturn;
  }

  BaseFramePromiseFactory(iframeElem: HTMLIFrameElement, nickname: string): _BaseFrameProxy {
    this.Logger.FuncStart(this.BaseFramePromiseFactory.name);
    var toReturn: _BaseFrameProxy = null;

    if (iframeElem && nickname) {
      var toReturn: _BaseFrameProxy = new _BaseFrameProxy(this.Logger, iframeElem);
    } else {
      this.Logger.ErrorAndThrow(this.BaseFramePromiseFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }

    this.Logger.FuncEnd(this.BaseFramePromiseFactory.name);
    return toReturn;
  }

  async DTFrameProxyFactory(iframeElem: HTMLIFrameElement): Promise<DTFrameProxy> {
    var toReturn: DTFrameProxy = null;
    if (iframeElem) {
      var toReturn = new DTFrameProxy(this.Logger, iframeElem);
      await toReturn.OnReadyInitDTFrameProxy();
    } else {
      this.Logger.ErrorAndThrow(this.DTFrameProxyFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
    }
    return toReturn;
  }
} 