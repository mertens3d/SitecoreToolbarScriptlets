import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../Interfaces/Data/IDataOneDoc";
import { IFactoryHelper } from "../Interfaces/IFactoryHelper";
import { Guid } from "./Guid";
import { _BaseFrameProxy } from "../../../Content/scripts/Proxies/_BaseFrameProxy";
import { CEFrameProxy } from "../../../Content/scripts/Proxies/CEFrameProxy";

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
  FrameProxyForPromiseFactory(iframeElem: HTMLIFrameElement, nickname: string): _BaseFrameProxy {
    this.Logger.FuncStart(this.FrameProxyForPromiseFactory.name);
    var toReturn: _BaseFrameProxy = null;

    if (iframeElem && nickname) {
      var toReturn: _BaseFrameProxy = new _BaseFrameProxy(this.Logger, iframeElem);
    } else {
      this.Logger.ErrorAndThrow(this.FrameProxyForPromiseFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }

    this.Logger.FuncEnd(this.FrameProxyForPromiseFactory.name);
    return toReturn;
  }

  async CEFrameProxyFactory(iframeElem: HTMLIFrameElement): Promise<CEFrameProxy> {
    this.Logger.FuncStart(this.CEFrameProxyFactory.name);
    var toReturn: CEFrameProxy = null;

    if (iframeElem ) {
      var toReturn = new CEFrameProxy(this.Logger, iframeElem);
      await toReturn.OnReadyInitCEFrameProxy();
    } else {
      this.Logger.ErrorAndThrow(this.CEFrameProxyFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
    }

    this.Logger.FuncEnd(this.CEFrameProxyFactory.name);
    return toReturn;
  }
}