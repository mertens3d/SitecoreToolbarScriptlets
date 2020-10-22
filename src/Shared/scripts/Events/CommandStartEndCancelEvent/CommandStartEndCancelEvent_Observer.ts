import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { CommonCore } from "../../_CommonCoreBase";
import { HindsiteEventHandler_Type } from "../_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from '../_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../_HindSiteEvent/IHindSiteEvent_Observer';
import { ICommandStartEndCancelEvent_Payload } from './ICommandStartEndCancelEvent_Payload';

export class CommandStartEndCancelEvent_Observer extends HindSiteEvent_Observer<ICommandStartEndCancelEvent_Payload> implements IHindSiteEvent_Observer<ICommandStartEndCancelEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.CommandStartEndCancelEvent_Observer;

  constructor(hindeCore: CommonCore, callback: HindsiteEventHandler_Type) {
      super(hindeCore, CommandStartEndCancelEvent_Observer.name, callback);
    }

}
