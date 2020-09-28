import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IContentEditorProxyMutationEvent_Payload } from "./IContentEditorProxyMutationEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class ContentEditorProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IContentEditorProxyMutationEvent_Payload>  {
  constructor(logger: ILoggerAgent) {
    super(logger, ContentEditorProxyMutationEvent_Subject.name);
  }
}