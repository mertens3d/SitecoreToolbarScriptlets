import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { DTFrameProxy } from "../../FrameProxies/DTFrameProxy";
import { I_ContentTreeBasedProxyMutationEvent_Payload } from "./IContentEditorProxyMutationEvent_Payload";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class _ContentTreeBasedProxyMutationEvent_Observer extends HindSiteEvent_Observer<I_ContentTreeBasedProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<I_ContentTreeBasedProxyMutationEvent_Payload>  {
  TypeDiscriminator = TypeDiscriminator._ContentTreeBasedProxyMutationEvent_Observer;

 protected ShowLogActions: boolean = true;
  private OwnerDTFrameProxy: DTFrameProxy;
  Friendly: string;

  constructor(apiCore: IAPICore, ownerFrameProxy: DTFrameProxy) {
    super(apiCore, _ContentTreeBasedProxyMutationEvent_Observer.name);
    this.OwnerDTFrameProxy = ownerFrameProxy;
  }

  UpdateAsync(payload: I_ContentTreeBasedProxyMutationEvent_Payload) {
    this.OwnerDTFrameProxy.OnContentEditorProxyMutation(payload);
  }
}