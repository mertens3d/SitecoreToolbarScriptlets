import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDocumentJacketMutationEvent_Payload } from "./IDocumentProxyMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class DocumentJacketMutationEvent_Observer extends HindSiteEvent_Observer<IDocumentJacketMutationEvent_Payload> implements IHindSiteEvent_Observer<IDocumentJacketMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.DocumentJacketMutationEvent_Observer;

  constructor(apiCore: IAPICore, callback: HindsiteEventHandler_Type) {
    super(apiCore, DocumentJacketMutationEvent_Observer.name, callback);
  }
}