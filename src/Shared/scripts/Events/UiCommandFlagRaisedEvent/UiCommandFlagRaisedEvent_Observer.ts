import { ICommonCore } from "../../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { HindsiteEventHandler_Type } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { IUiCommandFlagRaisedEvent_Payload } from './IUiCommandFlagRaisedEvent_Payload';
import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";

export class UiCommandFlagRaisedEvent_Observer extends HindSiteEvent_Observer<IUiCommandFlagRaisedEvent_Payload> implements IHindSiteEvent_Observer<IUiCommandFlagRaisedEvent_Payload> {
  TypeDiscriminator = TypeDiscriminator.UiCommandFlagRaisedEvent_Observer;
  constructor(hindeCore: ICommonCore, callback: HindsiteEventHandler_Type) {
    super(hindeCore, UiCommandFlagRaisedEvent_Observer.name, callback);
  }
}