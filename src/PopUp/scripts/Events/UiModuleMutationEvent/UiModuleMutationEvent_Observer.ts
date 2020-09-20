import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { HindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { IUiModuleMutationEvent_Payload } from "./IUiModuleMutationEvent_Payload";
import { HindsiteEventHandler_Type } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindsiteEventHandler_Type';

export class UiModuleMutationEvent_Observer extends HindSiteEvent_Observer<IUiModuleMutationEvent_Payload> implements IHindSiteEvent_Observer<IUiModuleMutationEvent_Payload> {

  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, UiModuleMutationEvent_Observer.name, callback);

    }
}
