import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { FrameProxy } from "../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxy";
import { DesktopProxy } from "./DesktopProxy";
import { IDesktopDomChangedEvent_Payload } from "./Events/DomChangedEvent/IDomChangedEvent_Payload";
import { GenericEvent_Observer } from "./Events/GenericEvent/GenericEvent_Subject";
import { IGeneric_Observer } from "./Events/GenericEvent/IGeneric_Observer";

export class DesktopDomChangedEvent_Observer extends GenericEvent_Observer<IDesktopDomChangedEvent_Payload> implements IGeneric_Observer<IDesktopDomChangedEvent_Payload>  {
  private Owner: DesktopProxy;
  Friendly: string;
  private SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, owner: DesktopProxy, settingsAgent: ISettingsAgent) {
    super(logger);
    this.Owner = owner;
    this.Friendly = DesktopDomChangedEvent_Observer.name;
    this.SettingsAgent = settingsAgent;
  }

  UpdateAsync(payload: IDesktopDomChangedEvent_Payload) {
    this.Logger.Log("The desktop DOM changed - probably an iframe has been added");
    if (payload && payload.AddedIframes.length > 0) {
      payload.AddedIframes.forEach(async (iframeElement) => {
        this.Logger.LogVal('added iframe id', iframeElement.id);

        let iframeProxy: FrameProxy = new FrameProxy(this.Logger, iframeElement, iframeElement.id, this.SettingsAgent);

        iframeProxy.WaitForReady()
          .then(() => this.Owner.AddToFrameBucket(iframeProxy))
          .catch((err) => { throw (DesktopDomChangedEvent_Observer.name + ' | ' + err) });
      })
    }
    this.Logger.LogAsJsonPretty('payload', payload);
  }
}