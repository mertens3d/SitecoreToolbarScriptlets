import { HindsiteEventHandler_Type } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { HindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { IHindeCore } from '../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentTreeProxyMutationEvent_Payload } from './IContentTreeProxyMutationEvent_Payload';

export class ContentTreeProxyMutationEvent_Observer extends HindSiteEvent_Observer<IContentTreeProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IContentTreeProxyMutationEvent_Payload> {

  constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
    super(hindeCore, ContentTreeProxyMutationEvent_Observer.name, callback);
  }

}