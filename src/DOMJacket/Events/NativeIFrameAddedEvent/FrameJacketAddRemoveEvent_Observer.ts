import { HindsiteEventHandler_Type } from "../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IFrameJacketAddRemoveEvent_Payload } from "./IFrameJacketAddRemoveEvent_Payload";

export class FrameJacketAddRemoveEvent_Observer extends HindSiteEvent_Observer<IFrameJacketAddRemoveEvent_Payload> implements IHindSiteEvent_Observer<IFrameJacketAddRemoveEvent_Payload> {

    constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
        super(hindeCore, FrameJacketAddRemoveEvent_Observer.name, callback);
    }
}
