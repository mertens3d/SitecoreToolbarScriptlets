import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ISingleClickEvent_Payload } from "./ISingleClickEvent_Payload";

export class SingleClickEvent_Observer extends HindSiteEvent_Observer<ISingleClickEvent_Payload> implements IHindSiteEvent_Observer<ISingleClickEvent_Payload> {

    constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
        super(hindeCore, SingleClickEvent_Observer.name, callback);
    }

}
