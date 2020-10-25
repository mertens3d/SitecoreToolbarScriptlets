import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { I_ContentTreeBasedProxyMutationEvent_Payload } from "./IContentEditorProxyMutationEvent_Payload";
import { _HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { IScFrameProxy } from "../../../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";

export class _ContentTreeBasedProxyMutationEvent_Observer extends _HindSiteEvent_Observer<I_ContentTreeBasedProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<I_ContentTreeBasedProxyMutationEvent_Payload>  {
  TypeDiscriminator = TypeDiscriminator._ContentTreeBasedProxyMutationEvent_Observer;

  protected ShowLogActions: boolean = true;
  private OwnerDTFrameProxy: IScFrameProxy;
  Friendly: string;

  constructor(apiCore: IAPICore, ownerFrameProxy: IScFrameProxy) {
    super(apiCore, _ContentTreeBasedProxyMutationEvent_Observer.name);
    this.OwnerDTFrameProxy = ownerFrameProxy;
  }

  UpdateAsync(payload: I_ContentTreeBasedProxyMutationEvent_Payload) {
    this.OwnerDTFrameProxy.OnContentEditorProxyMutation(payload);
  }
}