import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IDocumentProxyMutationEvent_Payload } from "./IDocumentProxyMutationEvent_Payload";

export class DocumentProxyMutationEvent_Observer extends HindSiteEvent_Observer<IDocumentProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IDocumentProxyMutationEvent_Payload> {

    constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
        super(hindeCore, DocumentProxyMutationEvent_Observer.name, callback);
    }
}
