import { HindsiteEventHandler_Type } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { HindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ILoggerAgent } from '../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ITreeMutationEvent_Payload } from './ITreeMutationEvent_Payload';

export class TreeMutationEvent_Observer extends HindSiteEvent_Observer<ITreeMutationEvent_Payload> implements IHindSiteEvent_Observer<ITreeMutationEvent_Payload> {

  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, TreeMutationEvent_Observer.name, callback);
  }

}