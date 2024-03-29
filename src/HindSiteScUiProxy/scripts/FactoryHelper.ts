﻿import { DTFrameProxy } from "./Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { ElementFrameJacket } from "../../DOMJacket/ElementFrameJacket";
import { ISettingsAgent } from "../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { CEFrameProxy } from "./Proxies/Desktop/DesktopProxy/FrameProxies/CEFrameProxy";
import { _APICoreBase } from "../../Shared/scripts/_APICoreBase";
import { IAPICore } from "../../Shared/scripts/Interfaces/Agents/IAPICore";

export class FactoryHelper extends _APICoreBase {
  SettingsAgent: ISettingsAgent;

  constructor(apiCore: IAPICore) {
    super(apiCore);
  }

  CEFrameFactory(frameJacket: ElementFrameJacket, nickname: string): CEFrameProxy {
    this.Logger.FuncStart(this.BaseFramePromiseFactory.name);


    this.ErrorHand.ThrowIfNullOrUndefined(this.CEFrameFactory.name, [frameJacket]);
    let toReturn = new CEFrameProxy(this.ApiCore, frameJacket);
    toReturn.InstantiateAsyncMembers();
    toReturn.WireEvents();
    this.Logger.FuncEnd(this.BaseFramePromiseFactory.name);
    return toReturn;
  }

  BaseFramePromiseFactory(nativeIframeProxy: ElementFrameJacket, nickname: string): DTFrameProxy {
    this.Logger.FuncStart(this.BaseFramePromiseFactory.name);
    var toReturn: DTFrameProxy = null;

    //let documentProxy = new DocumentProxy(this.apiCore, iframeElem.contentDocument);
    //let scWindowType = documentProxy.GetScwindowType();

    //toReturn = new _BaseFrameProxy<scWindowType>(this.apiCore, iframeElem);

    if (nativeIframeProxy && nickname) {
      var toReturn: DTFrameProxy = new DTFrameProxy(this.ApiCore, nativeIframeProxy);
      toReturn.InstantiateAsyncMembers();
    } else {
      this.ErrorHand.ErrorAndThrow(this.BaseFramePromiseFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', nativeIframeProxy);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }

    this.Logger.FuncEnd(this.BaseFramePromiseFactory.name);
    return toReturn;
  }

  async DTFrameProxyFactory(nativeIframeProxy: ElementFrameJacket): Promise<DTFrameProxy> {
    var toReturn: DTFrameProxy = null;
    if (nativeIframeProxy) {
      var toReturn = new DTFrameProxy(this.ApiCore, nativeIframeProxy);
      await toReturn.InstantiateAsyncMembers();
    } else {
      this.ErrorHand.ErrorAndThrow(this.DTFrameProxyFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', nativeIframeProxy);
    }
    return toReturn;
  }
} 