import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { IDesktopProxyMutationEvent_Payload } from "./IDesktopProxyMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class DesktopProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDesktopProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDesktopProxyMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.DesktopProxyMutationEvent_Observer;

 protected ShowLogActions: boolean = true;
  constructor(apiCore: IAPICore, callback: HindsiteEventHandler_Type) {
    super(apiCore, DesktopProxyMutationEvent_Observer.name, callback);
  }
}