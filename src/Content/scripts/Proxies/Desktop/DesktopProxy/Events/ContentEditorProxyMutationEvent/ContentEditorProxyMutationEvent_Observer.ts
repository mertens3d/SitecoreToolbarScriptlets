﻿import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { DTFrameProxy } from "../../../../DTFrameProxy";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IContentEditorProxyMutationEvent_Payload } from "../../../../../../../Shared/scripts/Interfaces/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";

export class ContentEditorProxyMutationEvent_Observer extends HindSiteEvent_Observer<IContentEditorProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IContentEditorProxyMutationEvent_Payload>  {
  private OwnerDTFrameProxy: DTFrameProxy;
  Friendly: string;

  constructor(logger: ILoggerAgent, ownerFrameProxy: DTFrameProxy) {
    super(logger, ContentEditorProxyMutationEvent_Observer.name);
    this.OwnerDTFrameProxy = ownerFrameProxy;
  }

  UpdateAsync(payload: IContentEditorProxyMutationEvent_Payload) {
    this.OwnerDTFrameProxy.OnContentEditorProxyMutation(payload);
  }
}