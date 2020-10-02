import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IContentEditorProxyMutationEvent_Payload } from "./IContentEditorProxyMutationEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class ContentEditorProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IContentEditorProxyMutationEvent_Payload>  {
  constructor(hindeCore: IHindeCore) {
    super(hindeCore, ContentEditorProxyMutationEvent_Subject.name);
  }
}