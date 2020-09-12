import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { FrameProxy } from "../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxy";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { ContentEditorProxy } from "../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopIframeProxyMutatedEvent_Subject } from "./Events/Subject_DesktopIframeProxyMutatedEvent/FrameProxyMutatedEvent_Subject";
import { IFrameProxyMutated_Payload } from "./Events/Subject_DesktopIframeProxyMutatedEvent/IFrameProxyMutatedEvent_Payload";
import { DesktopIframeProxy } from "../../ContentEditor/ContentEditorProxy/DesktopIframeProxy";
import { FrameHelper } from "../../../Helpers/IframeHelper";

export class DesktopIframeProxyBucket extends LoggableBase {
  private CeProxies: ContentEditorProxy[] = [];
  private __iframeHelper: any;
  private AssociatedDesktopDoc: IDataOneDoc;
  SettingsAgent: ISettingsAgent;

  DesktopIframeProxyAddedEvent_Subject: DesktopIframeProxyMutatedEvent_Subject;

  constructor(logger: ILoggerAgent, desktopDocument: IDataOneDoc, settingsAgent: ISettingsAgent) {
    super(logger);
    this.Logger.InstantiateStart(DesktopIframeProxyBucket.name);
    this.AssociatedDesktopDoc = desktopDocument;
    this.SettingsAgent = settingsAgent;
    this.DesktopIframeProxyAddedEvent_Subject = new DesktopIframeProxyMutatedEvent_Subject(this.Logger);
    this.Logger.InstantiateEnd(DesktopIframeProxyBucket.name);
  }

  private GetFrameHelper() {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new FrameHelper(this.Logger, this.SettingsAgent);
    }
    return this.__iframeHelper;
  }

  AddDesktopIframeProxy(desktopIframeProxy: DesktopIframeProxy): void {
    this.Logger.FuncStart(this.AddDesktopIframeProxy.name);

    let newCeProxy = desktopIframeProxy.NewCeProxy;

    if (this.CeProxies.indexOf(newCeProxy) < 0) {
      this.CeProxies.push(newCeProxy);

      let payload: IFrameProxyMutated_Payload = {
        NewCeProxy: newCeProxy
      }

      this.DesktopIframeProxyAddedEvent_Subject.NotifyObservers(payload);
    } else {
      this.Logger.WarningAndContinue(this.AddDesktopIframeProxy.name, 'Proxy already exists in bucket');
    }
    this.Logger.FuncEnd(this.AddDesktopIframeProxy.name);
  }

  async AddToBucketFromIframeProxy(oneIframe: FrameProxy): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.AddToBucketFromIframeProxy.name);

      let desktopIframeProxy: DesktopIframeProxy = new DesktopIframeProxy(this.Logger, oneIframe, this.SettingsAgent);

      await desktopIframeProxy.WaitForReady()
        .then(() => this.AddDesktopIframeProxy(desktopIframeProxy))
        .then(() => resolve())
        .catch((err) => reject(this.AddToBucketFromIframeProxy.name + ' | ' + err));
      this.Logger.FuncEnd(this.AddToBucketFromIframeProxy.name);
    });
  }

  async InitHostedIframes(): Promise<void> {
    try {
      await this.GetFrameHelper().GetHostedframes(this.AssociatedDesktopDoc)
        .then((foundIframes: FrameProxy[]) => {
          foundIframes.forEach(async (oneIframe) => {
            this.AddToBucketFromIframeProxy(oneIframe);
          });
        })
    }
    catch (err) {
      this.Logger.ErrorAndThrow(this.InitHostedIframes.name, err);
    }
  }
}