import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IContentTreeProxyMutationEvent_Payload } from "./IContentTreeProxyMutationEvent_Payload";

export class ContentTreeMutationEvent_Subject extends HindeSiteEvent_Subject<IContentTreeProxyMutationEvent_Payload> {
    ShowLogActions: boolean = true;
    constructor(hindeCore: IHindeCore) {
        super(hindeCore, ContentTreeMutationEvent_Subject.name);
    }
}
