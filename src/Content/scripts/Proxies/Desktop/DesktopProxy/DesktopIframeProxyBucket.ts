import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IframeProxy } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe";
import { IframeHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { ContentEditorProxy } from "../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { Subject_DesktopIframeProxyMutatedEvent } from "./Events/Subject_DesktopIframeProxyMutatedEvent/Subject_DesktopIframeProxyMutatedEvent";
import { IPayload_DesktopIframeProxyMutated } from "./Events/Subject_DesktopIframeProxyMutatedEvent/IPayload_DesktopIframeProxyMutatedEvent";
import { DesktopIframeProxy } from "../../ContentEditor/ContentEditorProxy/DesktopIframeProxy";

export class DesktopIframeProxyBucket extends LoggableBase {
  private CeProxies: ContentEditorProxy[] = [];
  private __iframeHelper: any;
  private AssociatedDesktopDoc: IDataOneDoc;
  SettingsAgent: ISettingsAgent;
  DesktopIframeProxyAddedEvent: Subject_DesktopIframeProxyMutatedEvent;

  constructor(logger: ILoggerAgent, desktopDocument: IDataOneDoc, settingsAgent: ISettingsAgent) {
    super(logger);
    this.Logger.InstantiateStart(DesktopIframeProxyBucket.name);
    this.AssociatedDesktopDoc = desktopDocument;
    this.SettingsAgent = settingsAgent;
    this.DesktopIframeProxyAddedEvent = new Subject_DesktopIframeProxyMutatedEvent(this.Logger);
    this.Logger.InstantiateEnd(DesktopIframeProxyBucket.name);
  }

  private GetIframeHelper(): IframeHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new IframeHelper(this.Logger);
    }
    return this.__iframeHelper;
  }

  AddDesktopIframeProxy(desktopIframeProxy: DesktopIframeProxy): void {
    this.Logger.FuncStart(this.AddDesktopIframeProxy.name);

    let newCeProxy = desktopIframeProxy.NewCeProxy;

    if (this.CeProxies.indexOf(newCeProxy) < 0) {
      this.CeProxies.push(newCeProxy);

      let payload: IPayload_DesktopIframeProxyMutated = {
        NewCeProxy: newCeProxy
      }

      this.DesktopIframeProxyAddedEvent.NotifyObservers(payload);
    } else {
      this.Logger.WarningAndContinue(this.AddDesktopIframeProxy.name, 'Proxy already exists in bucket');
    }
    this.Logger.FuncEnd(this.AddDesktopIframeProxy.name);
  }

  async AddToBucketFromIframeProxy(oneIframe: IframeProxy): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.AddToBucketFromIframeProxy.name);

      let desktopIframeProxy: DesktopIframeProxy = new DesktopIframeProxy(this.Logger, oneIframe, this.SettingsAgent);

     

      await desktopIframeProxy.WaitForReadyAssociatedDocandInit()
        .then(() => this.AddDesktopIframeProxy(desktopIframeProxy))
        .then(() => resolve())
        .catch((err) => reject(this.AddToBucketFromIframeProxy.name + ' | ' + err));
      this.Logger.FuncEnd(this.AddToBucketFromIframeProxy.name);
    });
  }

   InitHostedContentEditors(): void {
    try {
      let foundIframes: IframeProxy[] = this.GetIframeHelper().GetHostedIframes(this.AssociatedDesktopDoc)
      foundIframes.forEach(async (oneIframe) => {
        this.AddToBucketFromIframeProxy(oneIframe);
      });
    }
    catch (err) {
      this.Logger.ErrorAndThrow(this.InitHostedContentEditors.name, err);
    }
  }
}