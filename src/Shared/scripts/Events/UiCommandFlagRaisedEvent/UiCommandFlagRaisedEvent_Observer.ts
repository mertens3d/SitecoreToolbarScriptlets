import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { IUiCommandFlagRaisedEvent_Payload } from './IUiCommandFlagRaisedEvent_Payload';

export class UiCommandFlagRaisedEvent_Observer extends HindSiteEvent_Observer<IUiCommandFlagRaisedEvent_Payload> implements IHindSiteEvent_Observer<IUiCommandFlagRaisedEvent_Payload> {
  constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
    super(hindeCore, UiCommandFlagRaisedEvent_Observer.name, callback);
  }
}