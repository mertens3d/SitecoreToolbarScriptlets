import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDTAreaProxyMutationEvent_Payload } from "./IDTAreaProxyMutationEvent_Payload";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class DTAreaProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDTAreaProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDTAreaProxyMutationEvent_Payload> {

  readonly TypeDiscriminator = TypeDiscriminator.DTAreaProxyMutationEvent_Observer;

    constructor(apiCore: IAPICore, callback: HindsiteEventHandler_Type) {
      super(apiCore, DTAreaProxyMutationEvent_Observer.name, callback);
    }

}
