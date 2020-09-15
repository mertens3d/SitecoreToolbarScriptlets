import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { DesktopProxy } from "../../DesktopProxy";
import { HindSiteEvent_Observer } from "../_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";
import { IDesktopProxyMutationEvent_Payload } from "./IDesktopProxyMutationEvent_Payload";
import { DTFrameProxy } from "../../../../DTFrameProxy";

export class DesktopProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDesktopProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDesktopProxyMutationEvent_Payload>  {
  private Owner: DesktopProxy;

  constructor(logger: ILoggerAgent, owner: DesktopProxy) {
    super(logger, DesktopProxyMutationEvent_Observer.name);
    this.Owner = owner;
  }

  UpdateAsync(payload: IDesktopProxyMutationEvent_Payload) {
    this.Logger.Log("The desktop DOM changed - probably an iframe has been added");
    if (payload && payload.AddedDTFrameProxies.length > 0) {

      payload.AddedDTFrameProxies.forEach(async (dtFrameProxy: DTFrameProxy) => {
        dtFrameProxy.OnReadyInitDTFrameProxy()
          .then(() => this.Owner.AddDTFrameProxyAsync(dtFrameProxy))
          .catch((err) => { throw (DesktopProxyMutationEvent_Observer.name + ' | ' + err) });
      });
    }
  }
}