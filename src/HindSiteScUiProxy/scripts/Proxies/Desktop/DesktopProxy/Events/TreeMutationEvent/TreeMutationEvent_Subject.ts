import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IContentTreeProxyMutationEvent_Payload } from "./IContentTreeProxyMutationEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class TreeMutationEvent_Subject extends HindeSiteEvent_Subject<IContentTreeProxyMutationEvent_Payload> {
    constructor(hindeCore: IHindeCore, treeElement: HTMLElement) {
        super(hindeCore, TreeMutationEvent_Subject.name);
    }
}
