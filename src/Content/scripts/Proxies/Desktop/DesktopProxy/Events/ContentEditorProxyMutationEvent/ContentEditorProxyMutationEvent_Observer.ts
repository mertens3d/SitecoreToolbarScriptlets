import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { FrameProxy } from "../../../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxy";
import { HindSiteEvent_Observer } from "../_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";
import { IContentEditorProxyMutationEvent_Payload } from "./ContentEditorProxyMutationEvent_Payload";

export class ContentEditorProxyMutationEvent_Observer extends HindSiteEvent_Observer<IContentEditorProxyMutationEvent_Payload> implements IHindSiteEvent_Observer<IContentEditorProxyMutationEvent_Payload>  {
  private OwnerFrameProxy: FrameProxy;
  Friendly: string;
  private SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, ownerFrameProxy: FrameProxy) {
    super(logger, ContentEditorProxyMutationEvent_Observer.name);
    this.OwnerFrameProxy = ownerFrameProxy;
    //this.SettingsAgent = settingsAgent;
  }

  UpdateAsync(payload: IContentEditorProxyMutationEvent_Payload) {
    this.OwnerFrameProxy.OnContentEditorProxyMutation(payload);
  }
}