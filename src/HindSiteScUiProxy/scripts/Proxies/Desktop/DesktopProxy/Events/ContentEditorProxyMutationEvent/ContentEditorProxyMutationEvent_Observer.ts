import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { DTFrameProxy } from "../../FrameProxies/DTFrameProxy";
import { I_ContentTreeBasedProxyMutationEvent_Payload } from "./IContentEditorProxyMutationEvent_Payload";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";

export class _ContentTreeBasedProxyMutationEvent_Observer extends HindSiteEvent_Observer<I_ContentTreeBasedProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<I_ContentTreeBasedProxyMutationEvent_Payload>  {
  ShowLogActions: boolean = true;
  private OwnerDTFrameProxy: DTFrameProxy;
  Friendly: string;

  constructor(hindeCore: IHindeCore, ownerFrameProxy: DTFrameProxy) {
    super(hindeCore, _ContentTreeBasedProxyMutationEvent_Observer.name);
    this.OwnerDTFrameProxy = ownerFrameProxy;
  }

  UpdateAsync(payload: I_ContentTreeBasedProxyMutationEvent_Payload) {
    this.OwnerDTFrameProxy.OnContentEditorProxyMutation(payload);
  }
}