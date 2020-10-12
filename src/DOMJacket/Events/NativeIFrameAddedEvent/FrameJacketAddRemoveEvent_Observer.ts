import { HindsiteEventHandler_Type } from "../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { ICommonCore } from "../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { IFrameJacketAddRemoveEvent_Payload } from "./IFrameJacketAddRemoveEvent_Payload";
import { TypeDiscriminator } from "../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class FrameJacketAddRemoveEvent_Observer extends HindSiteEvent_Observer<IFrameJacketAddRemoveEvent_Payload> implements IHindSiteEvent_Observer<IFrameJacketAddRemoveEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.FrameJacketAddRemoveEvent_Observer;

    constructor(commonCore: ICommonCore, callback: HindsiteEventHandler_Type) {
        super(commonCore, FrameJacketAddRemoveEvent_Observer.name, callback);
    }
}
