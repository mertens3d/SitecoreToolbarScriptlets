import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { DesktopProxy } from "../../DesktopProxy";
import { HindSiteEvent_Observer } from "../_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";
import { IDesktopProxyMutationEvent_Payload } from "./IDesktopProxyMutationEvent_Payload";

export class DesktopProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDesktopProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDesktopProxyMutationEvent_Payload>  {
  private Owner: DesktopProxy;

  constructor(logger: ILoggerAgent, owner: DesktopProxy) {
    super(logger, DesktopProxyMutationEvent_Observer.name);
    this.Owner = owner;
  }

  UpdateAsync(payload: IDesktopProxyMutationEvent_Payload) {
    this.Logger.Log("The desktop DOM changed - probably an iframe has been added");
    if (payload && payload.AddedCEFrameProxies.length > 0) {

      payload.AddedCEFrameProxies.forEach(async (frameProxy) => {
        this.Logger.LogVal('added iframe id', frameProxy.HTMLIframeElement.id);

        //let iframeProxy: FrameProxy = new FrameProxy(this.Logger, iframeElement, iframeElement.id, this.SettingsAgent);

        frameProxy.OnReadyInitCEFrameProxy()
          .then(() => this.Owner.AddCEFrameProxyAsync(frameProxy))
          .catch((err) => { throw (DesktopProxyMutationEvent_Observer.name + ' | ' + err) });
      })
    }
    this.Logger.LogAsJsonPretty('payload', payload);
  }
}