import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { I_ContentTreeBasedProxyMutationEvent_Payload } from "./IContentEditorProxyMutationEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class __ContentTreeBasedProxyMutationEvent__Subject extends HindeSiteEvent_Subject<I_ContentTreeBasedProxyMutationEvent_Payload>  {
  ShowLogActions: boolean = true;
  constructor(hindeCore: IHindeCore) {
    super(hindeCore, __ContentTreeBasedProxyMutationEvent__Subject.name);
  }
}