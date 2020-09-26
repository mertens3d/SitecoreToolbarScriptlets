import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { DesktopProxy } from "../../DesktopProxy";
import { IDTFrameProxyMutationEvent_Payload } from "./IDTFrameProxyMutationEvent_Payload";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";

export class DTFrameProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDTFrameProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDTFrameProxyMutationEvent_Payload> {
  private Owner: DesktopProxy;

  constructor(logger: ILoggerAgent, owner: DesktopProxy) {
    super(logger, DTFrameProxyMutationEvent_Observer.name);
    this.Owner = owner;
  }

  UpdateAsync(frameProxyMutatationEvent_Payload: IDTFrameProxyMutationEvent_Payload): void {
    this.Owner.OnDTFrameProxyMutationEvent(frameProxyMutatationEvent_Payload);
  }
}