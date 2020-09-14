import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { DesktopProxy } from "../../DesktopProxy";
import { HindSiteEvent_Observer } from "../_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";
import { ICEFrameProxyMutationEvent_Payload } from "./IFrameProxyMutationEvent_Payload";

export class CEFrameProxyMutationEvent_Observer extends HindSiteEvent_Observer<ICEFrameProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<ICEFrameProxyMutationEvent_Payload> {
  private Owner: DesktopProxy;

  constructor(logger: ILoggerAgent, owner: DesktopProxy) {
    super(logger, CEFrameProxyMutationEvent_Observer.name);
    this.Owner = owner;
  }

  UpdateAsync(frameProxyMutatationEvent_Payload: ICEFrameProxyMutationEvent_Payload): void {
    this.Owner.OnCEFrameProxyMutationEvent(frameProxyMutatationEvent_Payload);

    // (payload: IPayloadDesktop_DomChangedEvent) => { self.Observer_DesktopDomChangedEvent(payload) });
  }
}