import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { HindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { IHindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ISingleClickEvent_Payload } from './ISelectSnapUiMutationEvent_Payload';

export class SingleClickEvent_Observer extends HindSiteEvent_Observer<ISingleClickEvent_Payload> implements IHindSiteEvent_Observer<ISingleClickEvent_Payload> {

    constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
        super(logger, SingleClickEvent_Observer.name, callback);
    }

}
