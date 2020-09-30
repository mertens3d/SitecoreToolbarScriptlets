import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ITreeProxyMutationEvent_Payload } from "./ITreeMutationEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class TreeMutationEvent_Subject extends HindeSiteEvent_Subject<ITreeProxyMutationEvent_Payload> {
    constructor(logger: ILoggerAgent, treeElement: HTMLElement) {
        super(logger, TreeMutationEvent_Subject.name);
    }
}
