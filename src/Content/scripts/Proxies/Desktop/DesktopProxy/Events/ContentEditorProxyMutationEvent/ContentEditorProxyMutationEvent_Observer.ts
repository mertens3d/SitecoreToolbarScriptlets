import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { CEFrameProxy } from "../../../../CEFrameProxy";
import { HindSiteEvent_Observer } from "../_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";
import { IContentEditorProxyMutationEvent_Payload } from "./ContentEditorProxyMutationEvent_Payload";

export class ContentEditorProxyMutationEvent_Observer extends HindSiteEvent_Observer<IContentEditorProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IContentEditorProxyMutationEvent_Payload>  {
  private OwnerCEFrameProxy: CEFrameProxy;
  Friendly: string;

  constructor(logger: ILoggerAgent, ownerFrameProxy: CEFrameProxy) {
    super(logger, ContentEditorProxyMutationEvent_Observer.name);
    this.OwnerCEFrameProxy = ownerFrameProxy;
    //this.SettingsAgent = settingsAgent;
  }

  UpdateAsync(payload: IContentEditorProxyMutationEvent_Payload) {
    this.OwnerCEFrameProxy.OnContentEditorProxyMutation(payload);
  }
}