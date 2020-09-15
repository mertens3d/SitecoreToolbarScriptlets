import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { DTFrameProxy } from "../../../../DTFrameProxy";
import { HindSiteEvent_Observer } from "../_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";
import { IContentEditorProxyMutationEvent_Payload } from "./ContentEditorProxyMutationEvent_Payload";

export class ContentEditorProxyMutationEvent_Observer extends HindSiteEvent_Observer<IContentEditorProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IContentEditorProxyMutationEvent_Payload>  {
  private OwnerDTFrameProxy: DTFrameProxy;
  Friendly: string;

  constructor(logger: ILoggerAgent, ownerFrameProxy: DTFrameProxy) {
    super(logger, ContentEditorProxyMutationEvent_Observer.name);
    this.OwnerDTFrameProxy = ownerFrameProxy;
    //this.SettingsAgent = settingsAgent;
  }

  UpdateAsync(payload: IContentEditorProxyMutationEvent_Payload) {
    this.OwnerDTFrameProxy.OnContentEditorProxyMutation(payload);
  }
}