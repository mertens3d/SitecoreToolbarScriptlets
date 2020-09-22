import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { HindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { IUiCommandFlagRaisedEvent_Payload } from './IUiCommandFlagRaisedEvent_Payload';

export class UiCommandFlagRaisedEvent_Observer extends HindSiteEvent_Observer<IUiCommandFlagRaisedEvent_Payload> implements IHindSiteEvent_Observer<IUiCommandFlagRaisedEvent_Payload> {

  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, UiCommandFlagRaisedEvent_Observer.name, callback);

    }
}
