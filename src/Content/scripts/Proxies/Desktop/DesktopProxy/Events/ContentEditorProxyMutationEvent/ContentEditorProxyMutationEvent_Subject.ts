import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IContentEditorProxyMutationEvent_Payload } from "../../../../../../../Shared/scripts/Interfaces/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";

export class ContentEditorProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IContentEditorProxyMutationEvent_Payload>  {
  constructor(logger: ILoggerAgent) {
    super(logger, ContentEditorProxyMutationEvent_Subject.name);

    this.Logger.InstantiateStart(ContentEditorProxyMutationEvent_Subject.name);

    this.Logger.InstantiateEnd(ContentEditorProxyMutationEvent_Subject.name);
  }
}