import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { LoggableBase } from "../../../../../Managers/LoggableBase";
import { DesktopStartBarProxy } from "../../../DesktopStartBarProxy/DesktopStartBarProxy";
import { IFrameProxyMutationEvent_Payload } from "./IFrameProxyMutationEvent_Payload";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";
import { DesktopFrameProxyBucket, DesktopFrameProxyBucketUnit } from "../../DesktopFrameProxyBucket";

export class FrameProxyMutationEvent_Observer extends LoggableBase implements IHindSiteEvent_Observer<IFrameProxyMutationEvent_Payload> {
  private Owner: DesktopStartBarProxy;
  Friendly: string;
  OwnerDesktopFrameProxyBucket: DesktopFrameProxyBucketUnit;

  constructor(logger: ILoggerAgent, owner: DesktopStartBarProxy, ownerDesktopFrameProxyBucket: DesktopFrameProxyBucketUnit) {
    super(logger);
    this.Owner = owner;
    this.OwnerDesktopFrameProxyBucket = ownerDesktopFrameProxyBucket;
    this.Friendly = FrameProxyMutationEvent_Observer.name;
  }

  UpdateAsync(frameProxyMutatationEvent_Payload: IFrameProxyMutationEvent_Payload): void {
    if (this.OwnerDesktopFrameProxyBucket) {
      //todo this.OwnerDesktopFrameProxyBucket.Owner.OnFrameProxyMutation(frameProxyMutatationEvent_Payload);
    }

    this.Owner.OnContentEditorProxyAdded(frameProxyMutatationEvent_Payload);

    // (payload: IPayloadDesktop_DomChangedEvent) => { self.Observer_DesktopDomChangedEvent(payload) });
  }
}