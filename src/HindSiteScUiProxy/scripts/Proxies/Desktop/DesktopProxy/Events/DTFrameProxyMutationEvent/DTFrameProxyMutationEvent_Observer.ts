import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IDTFrameProxyMutationEvent_Payload } from "./IDTFrameProxyMutationEvent_Payload";

export class DTFrameProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDTFrameProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDTFrameProxyMutationEvent_Payload> {

  constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
    super(hindeCore, DTFrameProxyMutationEvent_Observer.name, callback);
  }

}