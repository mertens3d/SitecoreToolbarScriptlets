import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDTFrameProxyMutationEvent_Payload } from "./IDTFrameProxyMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class DTFrameProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDTFrameProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDTFrameProxyMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.DTFrameProxyMutationEvent_Observer;

  constructor(apiCore: IAPICore, callback: HindsiteEventHandler_Type) {
    super(apiCore, DTFrameProxyMutationEvent_Observer.name, callback);
  }

}