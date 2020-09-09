import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IframeProxy } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe";
import { IframeHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { ContentEditorProxy } from "../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { Subject_ConEdProxyAddedToDesktopEvent } from "./Events/ContentEditorProxyAddedToDesktopEvent/Subject_ContentEditorProxyAddedToDesktopEvent";
import { IPayload__ConEdProxyAddedToDesktop } from "./Events/ContentEditorProxyAddedToDesktopEvent/IPayloadDesktop__ContentEditorProxyAddedToDesktop";

export class DesktopIframeProxyBucket extends LoggableBase {
  private CeProxies: ContentEditorProxy[] = [];
  private __iframeHelper: any;
  private AssociatedDesktopDoc: IDataOneDoc;
  SettingsAgent: ISettingsAgent;
  ConEdProxyAddedEvent: Subject_ConEdProxyAddedToDesktopEvent;

  constructor(logger: ILoggerAgent, desktopDocument: IDataOneDoc, settingsAgent: ISettingsAgent) {
    super(logger);
    this.Logger.InstantiateStart(DesktopIframeProxyBucket.name);
    this.AssociatedDesktopDoc = desktopDocument;
    this.SettingsAgent = settingsAgent;
    this.ConEdProxyAddedEvent = new Subject_ConEdProxyAddedToDesktopEvent(this.Logger);
    this.Logger.InstantiateEnd(DesktopIframeProxyBucket.name);
  }

  private GetIframeHelper(): IframeHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new IframeHelper(this.Logger);
    }
    return this.__iframeHelper;
  }

  AddConEdProxy(newCeProxy: ContentEditorProxy): void {
    this.Logger.FuncStart(this.AddConEdProxy.name);
    if (this.CeProxies.indexOf(newCeProxy) < 0) {
      this.CeProxies.push(newCeProxy);

      let payload: IPayload__ConEdProxyAddedToDesktop = {
        NewCeProxy: newCeProxy
      }

      this.ConEdProxyAddedEvent.NotifyObservers(payload);
    } else {
      this.Logger.WarningAndContinue(this.AddConEdProxy.name, 'Proxy already exists in bucket');
    }
    this.Logger.FuncEnd(this.AddConEdProxy.name);
  }

  async AddToBucketFromIframeProxy(oneIframe: IframeProxy): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.AddToBucketFromIframeProxy.name);
      var newCeProxy = new ContentEditorProxy(oneIframe.GetContentDoc(), this.Logger, this.SettingsAgent, oneIframe.IframeElem.id);
      await newCeProxy.WaitForReadyAssociatedDocandInit()
        .then(() => this.AddConEdProxy(newCeProxy))
        .then(() => resolve())
        .catch((err) => reject(this.AddToBucketFromIframeProxy.name + ' | ' + err));
      this.Logger.FuncEnd(this.AddToBucketFromIframeProxy.name);
    });
  }

  async InitHostedContentEditors(): Promise<void> {
    try {
      await this.GetIframeHelper().GetHostedIframes(this.AssociatedDesktopDoc)
        .then((foundIframes: IframeProxy[]) => {
          foundIframes.forEach(async (oneIframe) => {
            this.AddToBucketFromIframeProxy(oneIframe);
          });
        })
        .catch((err) => { throw (err); });
    }
    catch (err) {
      this.Logger.ErrorAndThrow(this.InitHostedContentEditors.name, err);
    }
  }
}