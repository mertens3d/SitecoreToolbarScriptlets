import { HindsiteEventHandler_Type } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { HindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { ILoggerAgent } from '../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentTreeProxyMutationEvent_Payload } from './IContentTreeProxyMutationEvent_Payload';

export class ContentTreeProxyMutationEvent_Observer extends HindSiteEvent_Observer<IContentTreeProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IContentTreeProxyMutationEvent_Payload> {

  constructor(logger: ILoggerAgent, callback: HindsiteEventHandler_Type) {
    super(logger, ContentTreeProxyMutationEvent_Observer.name, callback);
  }

}