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
    private ProxyAddedListeners: Function[] = [];
    SettingsAgent: ISettingsAgent;

    constructor(logger: ILoggerAgent, desktopDocument: IDataOneDoc, settingsAgent: ISettingsAgent) {
        super(logger);
        this.AssociatedDesktopDoc = desktopDocument;
        this.SettingsAgent = settingsAgent;
    }


    private GetIframeHelper(): IframeHelper {
        if (this.__iframeHelper == null) {
            this.__iframeHelper = new IframeHelper(this.Logger);
        }
        return this.__iframeHelper;
    }

    AddCeProxy(newCeProxy: ContentEditorProxy): void {
        if (this.CeProxies.indexOf(newCeProxy) < 0) {
            this.CeProxies.push(newCeProxy);
            this.BroadcastCeProxyAdded(newCeProxy);
        }
    }


    async AddToBucketFromIframe(oneIframe: IframeProxy): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.Logger.FuncStart(this.AddToBucketFromIframe.name);
            var newCeProxy = new ContentEditorProxy(oneIframe.GetContentDoc(), this.Logger, this.SettingsAgent);
            await newCeProxy.WaitForReadyAssociatedDocandInit()
                //.then(() => newCeProxy.AddListenerToActiveNodeChange(this.GetDtStartBarAgent().CallBackActiveElementChanged))
                .then(() => this.AddCeProxy(newCeProxy))
                .then(() => resolve())
                .catch((err) => reject(this.AddToBucketFromIframe.name + ' | ' + err));
            this.Logger.FuncEnd(this.AddToBucketFromIframe.name);
        });
    }


    async InitHostedContentEditors(): Promise<void> {
        try {
            await this.GetIframeHelper().GetHostedIframes(this.AssociatedDesktopDoc)
                .then((foundIframes: IframeProxy[]) => {
                    foundIframes.forEach(async (oneIframe) => {
                        this.AddToBucketFromIframe(oneIframe);
                    });
                })
                .catch((err) => { throw (err); });
        }
        catch (err) {
            this.Logger.ErrorAndThrow(this.InitHostedContentEditors.name, err);
        }
    }


    EnrollProxyAddedListener(callback: Function): void {
        if (this.ProxyAddedListeners.indexOf(callback) < 0) {
            this.ProxyAddedListeners.push(callback);
        }
    }


    private BroadcastCeProxyAdded(ceProxy: ContentEditorProxy): void {
        this.ProxyAddedListeners.forEach((callback) => callback(ceProxy));
    }
}
