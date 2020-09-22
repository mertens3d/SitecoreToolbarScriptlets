import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { HindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { IUiModuleManagerPassThroughEvent_Payload } from './IUiModuleManagerPassThroughEvent_Payload';

export class UiModuleManagerPassThroughEvent_Observer extends HindSiteEvent_Observer<IUiModuleManagerPassThroughEvent_Payload> implements IHindSiteEvent_Observer<IUiModuleManagerPassThroughEvent_Payload> {

  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, UiModuleManagerPassThroughEvent_Observer.name, callback);

    }
}
