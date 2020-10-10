import { HindsiteEventHandler_Type } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type';
import { HindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer';
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IContentTreeProxyMutationEvent_Payload } from './IContentTreeProxyMutationEvent_Payload';
import { TypeDiscriminator } from '../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator';

export class ContentTreeBasedProxyMutationEvent_Observer extends HindSiteEvent_Observer<IContentTreeProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IContentTreeProxyMutationEvent_Payload> {

  readonly TypeDiscriminator = TypeDiscriminator.__ContentTreeBasedProxyMutationEvent_Observer;

  constructor(apiCore: IAPICore, callback: HindsiteEventHandler_Type) {
    super(apiCore, ContentTreeBasedProxyMutationEvent_Observer.name, callback);
  }

}