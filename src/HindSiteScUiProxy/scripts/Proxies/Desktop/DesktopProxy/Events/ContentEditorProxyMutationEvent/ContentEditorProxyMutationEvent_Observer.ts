import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { DTFrameProxy } from "../../FrameProxies/DTFrameProxy";
import { IContentEditorProxyMutationEvent_Payload } from "./IContentEditorProxyMutationEvent_Payload";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";

export class ContentEditorProxyMutationEvent_Observer extends HindSiteEvent_Observer<IContentEditorProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IContentEditorProxyMutationEvent_Payload>  {
  private OwnerDTFrameProxy: DTFrameProxy;
  Friendly: string;

  constructor(hindeCore: IHindeCore, ownerFrameProxy: DTFrameProxy) {
    super(hindeCore, ContentEditorProxyMutationEvent_Observer.name);
    this.OwnerDTFrameProxy = ownerFrameProxy;
  }

  UpdateAsync(payload: IContentEditorProxyMutationEvent_Payload) {
    this.OwnerDTFrameProxy.OnContentEditorProxyMutation(payload);
  }
}