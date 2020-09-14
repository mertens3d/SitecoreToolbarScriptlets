import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { HindeSiteEvent_Subject } from "../_HindSiteEvent/HindeSiteEvent_Subject";
import { IContentEditorProxyMutationEvent_Payload } from "./ContentEditorProxyMutationEvent_Payload";

export class ContentEditorProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IContentEditorProxyMutationEvent_Payload>  {
  constructor(logger: ILoggerAgent) {
    super(logger, ContentEditorProxyMutationEvent_Subject.name);

    this.Logger.InstantiateStart(ContentEditorProxyMutationEvent_Subject.name);

    this.Logger.InstantiateEnd(ContentEditorProxyMutationEvent_Subject.name);
  }
}