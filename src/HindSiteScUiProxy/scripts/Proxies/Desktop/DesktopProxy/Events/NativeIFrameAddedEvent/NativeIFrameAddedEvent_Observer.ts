import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { INativeIFrameAddedEvent_Payload } from "./INativeIFrameAddedEvent_Payload";

export class NativeIFrameAddedEvent_Observer extends HindSiteEvent_Observer<INativeIFrameAddedEvent_Payload> implements IHindSiteEvent_Observer<INativeIFrameAddedEvent_Payload>  {

  constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
    super(hindeCore, NativeIFrameAddedEvent_Observer.name, callback);
  }
}