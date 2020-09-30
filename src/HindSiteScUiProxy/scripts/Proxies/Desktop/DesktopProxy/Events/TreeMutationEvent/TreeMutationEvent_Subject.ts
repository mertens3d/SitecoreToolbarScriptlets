import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IContentTreeProxyMutationEvent_Payload } from "./IContentTreeProxyMutationEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class TreeMutationEvent_Subject extends HindeSiteEvent_Subject<IContentTreeProxyMutationEvent_Payload> {
    constructor(logger: ILoggerAgent, treeElement: HTMLElement) {
        super(logger, TreeMutationEvent_Subject.name);
    }
}
