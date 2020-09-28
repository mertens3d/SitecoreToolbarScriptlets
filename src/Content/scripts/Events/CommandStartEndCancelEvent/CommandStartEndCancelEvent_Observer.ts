import { HindsiteEventHandler_Type } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ICommandStartEndCancelEvent_Payload } from './ICommandStartEndCancelEvent_Payload';

export class CommandStartEndCancelEvent_Observer extends HindSiteEvent_Observer<ICommandStartEndCancelEvent_Payload> implements IHindSiteEvent_Observer<ICommandStartEndCancelEvent_Payload> {

    constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
      super(logger, CommandStartEndCancelEvent_Observer.name, callback);
    }

}
