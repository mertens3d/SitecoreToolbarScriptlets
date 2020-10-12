import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDocumentProxyMutationEvent_Payload } from "./IDocumentProxyMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class DocumentProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDocumentProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDocumentProxyMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.DocumentProxyMutationEvent_Observer;

  constructor(apiCore: IAPICore, callback: HindsiteEventHandler_Type) {
    super(apiCore, DocumentProxyMutationEvent_Observer.name, callback);
  }
}