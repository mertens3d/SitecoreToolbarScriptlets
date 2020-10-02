import { IHindeCore } from "../Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../Interfaces/Data/IDataOneDoc";
import { IFactoryHelper } from "../Interfaces/IFactoryHelper";
import { Guid } from "./Guid";
import { _BaseFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/_BaseFrameProxy";
import { DTFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { _HindeCoreBase } from "../LoggableBase";

export class FactoryHelper extends _HindeCoreBase implements IFactoryHelper {
  SettingsAgent: ISettingsAgent;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
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
      this.ErrorHand.ErrorAndThrow(this.DataOneContentDocFactoryFromIframe.name, 'no iframe provided');
    }
    return toReturn;
  }

  BaseFramePromiseFactory(iframeElem: HTMLIFrameElement, nickname: string): _BaseFrameProxy {
    this.Logger.FuncStart(this.BaseFramePromiseFactory.name);
    var toReturn: _BaseFrameProxy = null;

    if (iframeElem && nickname) {
      var toReturn: _BaseFrameProxy = new _BaseFrameProxy(this.HindeCore, iframeElem);
    } else {
      this.ErrorHand.ErrorAndThrow(this.BaseFramePromiseFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }

    this.Logger.FuncEnd(this.BaseFramePromiseFactory.name);
    return toReturn;
  }

  async DTFrameProxyFactory(iframeElem: HTMLIFrameElement): Promise<DTFrameProxy> {
    var toReturn: DTFrameProxy = null;
    if (iframeElem) {
      var toReturn = new DTFrameProxy(this.HindeCore, iframeElem);
      await toReturn.Instantiate_DTFrameProxy();
    } else {
      this.ErrorHand.ErrorAndThrow(this.DTFrameProxyFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
    }
    return toReturn;
  }
} 