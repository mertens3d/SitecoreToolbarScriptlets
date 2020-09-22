import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { HindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { IUiSettingBasedModuleMutationEven_Payload } from './IUiSettingBasedModuleMutationEvent_Payload';

export class UiSettingBasedModuleMutationEvent_Observer extends HindSiteEvent_Observer<IUiSettingBasedModuleMutationEven_Payload> implements IHindSiteEvent_Observer<IUiSettingBasedModuleMutationEven_Payload> {

  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, UiSettingBasedModuleMutationEvent_Observer.name, callback);

    }
}
