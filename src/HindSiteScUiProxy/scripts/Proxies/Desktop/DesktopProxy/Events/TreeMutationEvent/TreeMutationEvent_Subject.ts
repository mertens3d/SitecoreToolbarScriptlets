import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IContentTreeProxyMutationEvent_Payload } from "./IContentTreeProxyMutationEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ElementJacket } from "../../../../../../../DOMJacket/ElementJacket";

export class TreeMutationEvent_Subject extends HindeSiteEvent_Subject<IContentTreeProxyMutationEvent_Payload> {
  ShowLogActions: boolean = true;
  constructor(hindeCore: IHindeCore, treeElement: ElementJacket) {
        super(hindeCore, TreeMutationEvent_Subject.name);
    }
}
