import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataDesktopState } from "../../../../../Shared/scripts/Interfaces/Data/IDataDesktopState";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { FrameProxy } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe";
import { IDataOneStorageOneTreeState } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState";
import { IDataOneWindowStorage } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";
import { MiscAgent } from "../../../Agents/MiscAgent/MiscAgent";
import { RecipeRestoreDesktop } from "../../../ContentApi/Recipes/RecipeRestoreDesktop/RecipeRestoreDesktop";
import { IframeHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { DesktopStartBarProxy } from "../DesktopStartBarProxy/DesktopStartBarProxy";
import { DesktopIframeProxyBucket } from "./DesktopIframeProxyBucket";
import { IPayloadDesktop_DomChangedEvent } from "./Events/DesktopDomChangedEvent/IPayloadContentEditorDomChanged";
import { Subject_DesktopDomChangedEvent } from "./Events/DesktopDomChangedEvent/Subject_DesktopDomChangedEvent";
import { IPayload_DesktopIframeProxyMutated } from "./Events/Subject_DesktopIframeProxyMutatedEvent/IPayload_DesktopIframeProxyMutatedEvent";

export class DesktopProxy extends LoggableBase {
  private DesktopIframeProxyBucket: DesktopIframeProxyBucket;

  DesktopStartBarAgent: DesktopStartBarProxy;
  private __iframeHelper: IframeHelper;
  private _dtStartBarAgent: DesktopStartBarProxy;
  private AssociatedDoc: IDataOneDoc;

  private MiscAgent: MiscAgent;
  private SettingsAgent: ISettingsAgent;
  private Subject_DomChangedEvent: Subject_DesktopDomChangedEvent;

  constructor(logger: ILoggerAgent, miscAgent: MiscAgent, associatedDoc: IDataOneDoc, settingsAgent: ISettingsAgent) {
    super(logger);

    this.Logger.InstantiateStart(DesktopProxy.name);
    this.MiscAgent = miscAgent;
    this.SettingsAgent = settingsAgent;
    this.AssociatedDoc = associatedDoc;

    this.DesktopIframeProxyBucket = new DesktopIframeProxyBucket(this.Logger, this.AssociatedDoc, this.SettingsAgent);

    this.DesktopStartBarAgent = new DesktopStartBarProxy(this.Logger, this, this.SettingsAgent);

    let self = this;
    this.DesktopIframeProxyBucket.DesktopIframeProxyAddedEvent.RegisterObserver((conEditProxy: IPayload_DesktopIframeProxyMutated) => self.DesktopStartBarAgent.CallBackConEdProxyAdded(conEditProxy));

    this.Subject_DomChangedEvent = new Subject_DesktopDomChangedEvent(this.Logger, this.AssociatedDoc);

    this.Subject_DomChangedEvent.RegisterObserver((payload: IPayloadDesktop_DomChangedEvent) => { self.Observer_DesktopDomChangedEvent(payload) });

    this.Logger.InstantiateEnd(DesktopProxy.name);
  }

  async InitDesktopProxy(): Promise<void> {
    try {
      await this.DesktopIframeProxyBucket.InitHostedIframes()
        .catch((err) => this.Logger.ErrorAndThrow(this.InitDesktopProxy.name, err));
    } catch (err) {
      throw (this.InitDesktopProxy.name + ' ' + err);
    }
  }

  Observer_DesktopDomChangedEvent(payload: IPayloadDesktop_DomChangedEvent) {
    this.Logger.Log("The desktop DOM changed - probably an iframe has been added");
    if (payload && payload.AddedIframes.length > 0) {
      payload.AddedIframes.forEach(async (iframeElement) => {
        this.Logger.LogVal('added iframe id', iframeElement.id);

        let iframeProxy: FrameProxy = new FrameProxy(this.Logger, iframeElement, iframeElement.id, this.SettingsAgent);

        await iframeProxy.WaitForReady()
          .then(() => this.DesktopIframeProxyBucket.AddToBucketFromIframeProxy(iframeProxy))
      })
    }
    this.Logger.LogAsJsonPretty('payload', payload);
  }

  GetAssociatedDoc(): IDataOneDoc {
    return this.AssociatedDoc;
  }

  GetDtStartBarAgent(): DesktopStartBarProxy {
    if (!this._dtStartBarAgent) {
      this._dtStartBarAgent = new DesktopStartBarProxy(this.Logger, this, this.SettingsAgent);
    }

    return this._dtStartBarAgent;
  }

  private GetIframeHelper(): IframeHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new IframeHelper(this.Logger, this.SettingsAgent);
    }
    return this.__iframeHelper;
  }

  async GetStateDesktop(): Promise<IDataDesktopState> {
    this.Logger.FuncStart(this.GetStateDesktop.name);

    try {
      var toReturnDesktopState: IDataDesktopState = this.CreateNewDtDataShell();

      await this.GetIframeHelper().GetHostedIframes(this.AssociatedDoc)
        .then((results) => toReturnDesktopState.HostedIframes = results)
        .catch((err) => this.Logger.ErrorAndThrow(this.GetStateDesktop.name, err));

      if (toReturnDesktopState.HostedIframes && toReturnDesktopState.HostedIframes.length > 0) {
        for (var iframeIdx = 0; iframeIdx < toReturnDesktopState.HostedIframes.length; iframeIdx++) {
          this.Logger.LogVal('iframeIdx: ', iframeIdx);

          var iframeProxy: FrameProxy = toReturnDesktopState.HostedIframes[iframeIdx];

          let oneCeState: IDataOneStorageOneTreeState = iframeProxy.GetState();

          toReturnDesktopState.HostedContentEditors.push(oneCeState);

          if (iframeProxy.GetZindex() === 1) {
            toReturnDesktopState.ActiveCEAgent = iframeProxy.CeAgent;
            toReturnDesktopState.ActiveCeState = oneCeState;
          }
        }
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.GetStateDesktop.name, err);
    }

    this.Logger.FuncEnd(this.GetStateDesktop.name, toReturnDesktopState.HostedContentEditors.length);

    return toReturnDesktopState;
  }

  async SetStateDesktop(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateDesktop.name);;

      if (this.MiscAgent.NotNullOrUndefined([targetDoc, dataToRestore, dataToRestore.AllCEAr], this.SetStateDesktop.name)) {
        for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
          let targetData: IDataOneStorageOneTreeState = dataToRestore.AllCEAr[idx];
          //this.Logger.Log('Restoring ' + (idx + 1) + ":" + dataToRestore.AllCEAr.length + ' active node: ' + targetData.ActiveNode.NodeFriendly);
          var recipe: RecipeRestoreDesktop = new RecipeRestoreDesktop(this.Logger, targetDoc, targetData, this.SettingsAgent, this.DesktopStartBarAgent);

          await recipe.Execute()
            //.then(() => this.EnrollListenerForActiveNodeChange())
            .catch((err) => reject(err));
        }

        resolve();
      } else {
        reject(this.SetStateDesktop.name + ' bad data');
      }

      this.Logger.FuncEnd(this.SetStateDesktop.name);
    });
  }

  CreateNewDtDataShell(): IDataDesktopState {
    var toReturn: IDataDesktopState = {
      HostedContentEditors: [],
      HostedIframes: [],
      ActiveCEAgent: null,
      ActiveCeState: null
    }

    return toReturn;
  }
}