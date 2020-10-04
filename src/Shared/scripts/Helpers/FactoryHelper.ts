﻿import { DTFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { NativeIframeProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/NativeScIframeProxy";
import { IHindeCore } from "../Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../Interfaces/Agents/ISettingsAgent";
import { _HindeCoreBase } from "../LoggableBase";
import { CEFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/CEFrameProxy";

export class FactoryHelper extends _HindeCoreBase {
  SettingsAgent: ISettingsAgent;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
  }

  CEFrameFactory(nativeIframeProxy: NativeIframeProxy, nickname: string): CEFrameProxy {
    this.Logger.FuncStart(this.BaseFramePromiseFactory.name);
    let toReturn = new CEFrameProxy(this.HindeCore, nativeIframeProxy);
    toReturn.Instantiate();
    toReturn.WireEvents();
    this.Logger.FuncEnd(this.BaseFramePromiseFactory.name);
    return toReturn;
  }

  BaseFramePromiseFactory(nativeIframeProxy: NativeIframeProxy, nickname: string): DTFrameProxy {
    this.Logger.FuncStart(this.BaseFramePromiseFactory.name);
    var toReturn: DTFrameProxy = null;

    //let documentProxy = new DocumentProxy(this.HindeCore, iframeElem.contentDocument);
    //let scWindowType = documentProxy.GetScwindowType();

    //toReturn = new _BaseFrameProxy<scWindowType>(this.HindeCore, iframeElem);

    if (nativeIframeProxy && nickname) {
      var toReturn: DTFrameProxy = new DTFrameProxy(this.HindeCore, nativeIframeProxy);
    } else {
      this.ErrorHand.ErrorAndThrow(this.BaseFramePromiseFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', nativeIframeProxy);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }

    this.Logger.FuncEnd(this.BaseFramePromiseFactory.name);
    return toReturn;
  }

  async DTFrameProxyFactory(nativeIframeProxy: NativeIframeProxy): Promise<DTFrameProxy> {
    var toReturn: DTFrameProxy = null;
    if (nativeIframeProxy) {
      var toReturn = new DTFrameProxy(this.HindeCore, nativeIframeProxy);
      await toReturn.Instantiate();
    } else {
      this.ErrorHand.ErrorAndThrow(this.DTFrameProxyFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', nativeIframeProxy);
    }
    return toReturn;
  }
} 