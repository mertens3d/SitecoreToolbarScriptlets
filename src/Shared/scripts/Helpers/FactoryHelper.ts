import { DTFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { IHindeCore } from "../Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../Interfaces/Agents/ISettingsAgent";
import { IFactoryHelper } from "../Interfaces/IFactoryHelper";
import { _HindeCoreBase } from "../LoggableBase";

export class FactoryHelper extends _HindeCoreBase implements IFactoryHelper {
  SettingsAgent: ISettingsAgent;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
  }

  BaseFramePromiseFactory(iframeElem: HTMLIFrameElement, nickname: string): DTFrameProxy {
    this.Logger.FuncStart(this.BaseFramePromiseFactory.name);
    var toReturn: DTFrameProxy = null;

    //let documentProxy = new DocumentProxy(this.HindeCore, iframeElem.contentDocument);
    //let scWindowType = documentProxy.GetScwindowType();

    //toReturn = new _BaseFrameProxy<scWindowType>(this.HindeCore, iframeElem);

    if (iframeElem && nickname) {
      var toReturn: DTFrameProxy = new DTFrameProxy(this.HindeCore, iframeElem);
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
      await toReturn.Instantiate();
    } else {
      this.ErrorHand.ErrorAndThrow(this.DTFrameProxyFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
    }
    return toReturn;
  }
} 