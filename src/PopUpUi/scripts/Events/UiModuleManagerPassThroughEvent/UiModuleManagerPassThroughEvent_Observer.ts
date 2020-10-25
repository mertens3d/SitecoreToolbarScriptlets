import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { IUiModuleManagerPassThroughEvent_Payload } from './IUiModuleManagerPassThroughEvent_Payload';
import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { ICommonCore } from "../../../../Shared/scripts/Interfaces/Agents/ICommonCore";

export class UiModuleManagerPassThroughEvent_Observer extends _HindSiteEvent_Observer<IUiModuleManagerPassThroughEvent_Payload> implements IHindSiteEvent_Observer<IUiModuleManagerPassThroughEvent_Payload> {

  readonly TypeDiscriminator = TypeDiscriminator.UiModuleManagerPassThroughEvent_Observer;

  constructor(hindeCore: ICommonCore, callback: HindsiteEventHandler_Type) {
    super(hindeCore, UiModuleManagerPassThroughEvent_Observer.name, callback);

    }
}
