import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../Interfaces/Data/IDataOneDoc";
import { IFactoryHelper } from "../Interfaces/IFactoryHelper";
import { Guid } from "./Guid";
import { FrameProxy } from "../Interfaces/Data/Proxies/FrameProxy";
import { CEFrameProxy } from "../Interfaces/Data/Proxies/FrameProxyForContentEditor";

export class FactoryHelper extends LoggableBase implements IFactoryHelper {
  SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent) {
    super(logger);
   
  }


  DataOneContentDocFactoryFromIframe(dataOneIframe: FrameProxy): IDataOneDoc {
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
  async FrameProxyForPromiseFactory(iframeElem: HTMLIFrameElement, nickname: string): Promise<FrameProxy> {
    this.Logger.FuncStart(this.FrameProxyForPromiseFactory.name);
    var toReturn: FrameProxy = null;

    if (iframeElem && nickname) {
      var toReturn: FrameProxy = new FrameProxy(this.Logger, iframeElem, nickname);
    } else {
      this.Logger.ErrorAndThrow(this.FrameProxyForPromiseFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }

    this.Logger.FuncEnd(this.FrameProxyForPromiseFactory.name);
    return toReturn;
  }
  async FrameProxyForDesktopFactory(iframeElem: HTMLIFrameElement, nickname: string): Promise<CEFrameProxy> {
    this.Logger.FuncStart(this.FrameProxyForDesktopFactory.name);
    var toReturn: CEFrameProxy = null;

    if (iframeElem && nickname) {
      var toReturn = new CEFrameProxy(this.Logger, iframeElem, nickname);
      await toReturn.OnReadyInitCEFrameProxy();
    } else {
      this.Logger.ErrorAndThrow(this.FrameProxyForDesktopFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }

    this.Logger.FuncEnd(this.FrameProxyForDesktopFactory.name);
    return toReturn;
  }
}