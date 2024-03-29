﻿import { HindsiteEventHandler_Type } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ICommandStartEndCancelEvent_Payload } from './ICommandStartEndCancelEvent_Payload';
import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class CommandStartEndCancelEvent_Observer extends HindSiteEvent_Observer<ICommandStartEndCancelEvent_Payload> implements IHindSiteEvent_Observer<ICommandStartEndCancelEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.CommandStartEndCancelEvent_Observer;

    constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
      super(hindeCore, CommandStartEndCancelEvent_Observer.name, callback);
    }

}
