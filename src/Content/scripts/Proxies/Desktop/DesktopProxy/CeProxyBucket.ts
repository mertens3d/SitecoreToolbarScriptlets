import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IframeProxy } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe";
import { IframeHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { ContentEditorProxy } from "../../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";

export class CeProxyBucket extends LoggableBase {
    private CeProxies: ContentEditorProxy[] = [];
    private __iframeHelper: any;
    private AssociatedDesktopDoc: IDataOneDoc;
    private TreeMutationListeners: Function[] = [];
    SettingsAgent: ISettingsAgent;

    constructor(logger: ILoggerAgent, desktopDocument: IDataOneDoc, settingsAgent: ISettingsAgent) {
      super(logger);
      this.Logger.InstantiateStart(CeProxyBucket.name);
        this.AssociatedDesktopDoc = desktopDocument;
      this.SettingsAgent = settingsAgent;
      this.Logger.InstantiateEnd(CeProxyBucket.name);
    }


    private GetIframeHelper(): IframeHelper {
        if (this.__iframeHelper == null) {
            this.__iframeHelper = new IframeHelper(this.Logger);
        }
        return this.__iframeHelper;
    }

  AddCeProxy(newCeProxy: ContentEditorProxy): void {
    this.Logger.FuncStart(this.AddCeProxy.name);
        if (this.CeProxies.indexOf(newCeProxy) < 0) {
            this.CeProxies.push(newCeProxy);
            this.BroadcastCeProxyAdded(newCeProxy);
    }
    this.Logger.FuncEnd(this.AddCeProxy.name);
    }


    async AddToBucketFromIframeProxy(oneIframe: IframeProxy): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.Logger.FuncStart(this.AddToBucketFromIframeProxy.name);
            var newCeProxy = new ContentEditorProxy(oneIframe.GetContentDoc(), this.Logger, this.SettingsAgent);
            await newCeProxy.WaitForReadyAssociatedDocandInit()
                //.then(() => newCeProxy.AddListenerToActiveNodeChange(this.GetDtStartBarAgent().CallBackActiveElementChanged))
                .then(() => this.AddCeProxy(newCeProxy))
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


  EnrollProxyAddedListener(callback: Function): void {
    this.Logger.FuncStart(this.EnrollProxyAddedListener.name);
        if (this.TreeMutationListeners.indexOf(callback) < 0) {
            this.TreeMutationListeners.push(callback);
    }
    this.Logger.FuncEnd(this.EnrollProxyAddedListener.name);
    }


  private BroadcastCeProxyAdded(ceProxy: ContentEditorProxy): void {
    this.Logger.FuncStart(this.BroadcastCeProxyAdded.name);
    this.TreeMutationListeners.forEach((callback) => callback(ceProxy));
    this.Logger.FuncEnd(this.BroadcastCeProxyAdded.name);
    }
}
