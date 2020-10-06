import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { IUiModuleManagerPassThroughEvent_Payload } from './IUiModuleManagerPassThroughEvent_Payload';

export class UiModuleManagerPassThroughEvent_Observer extends HindSiteEvent_Observer<IUiModuleManagerPassThroughEvent_Payload> implements IHindSiteEvent_Observer<IUiModuleManagerPassThroughEvent_Payload> {

  constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
    super(hindeCore, UiModuleManagerPassThroughEvent_Observer.name, callback);

    }
}
