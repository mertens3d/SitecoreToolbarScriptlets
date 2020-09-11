import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataSateOfDesktop } from "../../../../../Shared/scripts/Interfaces/Data/IDataDesktopState";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { FrameProxy } from "../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxy";
import { IDataStateOfContentEditor } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState";
import { MiscAgent } from "../../../Agents/MiscAgent/MiscAgent";
import { RecipeRestoreFrameOnDesktop } from "../../../ContentApi/Recipes/RecipeRestoreDesktop/RecipeRestoreDesktop";
import { FrameHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { DesktopStartBarProxy } from "../DesktopStartBarProxy/DesktopStartBarProxy";
import { DesktopIframeProxyBucket } from "./DesktopIframeProxyBucket";
import { IPayloadDesktop_DomChangedEvent } from "./Events/DesktopDomChangedEvent/IPayloadContentEditorDomChanged";
import { Subject_DesktopDomChangedEvent } from "./Events/DesktopDomChangedEvent/Subject_DesktopDomChangedEvent";
import { IPayload_DesktopIframeProxyMutated } from "./Events/Subject_DesktopIframeProxyMutatedEvent/IPayload_DesktopIframeProxyMutatedEvent";
import { IDataStateOfFrame } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfFrame";

export class DesktopProxy extends LoggableBase {
  private DesktopIframeProxyBucket: DesktopIframeProxyBucket;

  DesktopStartBarAgent: DesktopStartBarProxy;
  private __iframeHelper: FrameHelper;
  private _dtStartBarAgent: DesktopStartBarProxy;
  private AssociatedDoc: IDataOneDoc;
  private HostedIframes: FrameProxy[];
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

  private GetIframeHelper(): FrameHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new FrameHelper(this.Logger, this.SettingsAgent);
    }
    return this.__iframeHelper;
  }

  async GetStateDesktop(): Promise<IDataSateOfDesktop> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateDesktop.name);

      try {
        var toReturnDesktopState: IDataSateOfDesktop = this.CreateNewDtDataShell();

        await this.GetIframeHelper().GetHostedframes(this.AssociatedDoc)
          .then((results: FrameProxy[]) => {
            if (results) {
              results.forEach((oneFrame) => toReturnDesktopState.FrameStates.push(oneFrame.GetStateOfFrame()))
            }
          })
          .then(() => resolve(toReturnDesktopState))
          .catch((err) => this.Logger.ErrorAndThrow(this.GetStateDesktop.name, err));

        //if (toReturnDesktopState.HostedIframes && toReturnDesktopState.HostedIframes.length > 0) {
        //  for (var iframeIdx = 0; iframeIdx < toReturnDesktopState.HostedIframes.length; iframeIdx++) {
        //    this.Logger.LogVal('iframeIdx: ', iframeIdx);

        //    var iframeProxy: FrameProxy = toReturnDesktopState.HostedIframes[iframeIdx];

        //    let oneCeState: IDataContentEditorState = iframeProxy.GetState();

        //    toReturnDesktopState.FrameStates.push(oneCeState);

        //    if (iframeProxy.GetZindex() === 1) {
        //      toReturnDesktopState.ActiveCEAgent = iframeProxy.ConEditProxy;
        //      toReturnDesktopState.ActiveCeState = oneCeState;
        //    }
        //  }
        //}
      } catch (err) {
        reject(this.GetStateDesktop.name + ' ' + err);
      }

      this.Logger.FuncEnd(this.GetStateDesktop.name, toReturnDesktopState.FrameStates.length);
    });
  }

  async SetStateOfDesktop(desktopState: IDataSateOfDesktop): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateOfDesktop.name);;

      if (desktopState) {
        if (this.MiscAgent.NotNullOrUndefined([this.AssociatedDoc, desktopState, desktopState.FrameStates], this.SetStateOfDesktop.name)) {
          for (var idx = 0; idx < desktopState.FrameStates.length; idx++) {
            let stateOfFrame: IDataStateOfFrame = desktopState.FrameStates[idx];

            var recipe: RecipeRestoreFrameOnDesktop = new RecipeRestoreFrameOnDesktop(this.Logger, this.AssociatedDoc, stateOfFrame, this.SettingsAgent, this.DesktopStartBarAgent);

            //todo - do I need to await this? can't it just be triggered? we're not waiting on anything to finish
            await recipe.Execute()
              .then(() => resolve())
              .catch((err) => reject(err));
          }
        } else {
          reject(this.SetStateOfDesktop.name + ' bad data');
        }
      } else {
        reject(this.SetStateOfDesktop.name + '  No desktop state to set');
      }

      this.Logger.FuncEnd(this.SetStateOfDesktop.name);
    });
  }

  CreateNewDtDataShell(): IDataSateOfDesktop {
    var toReturn: IDataSateOfDesktop = {
      FrameStates: [],
      ActiveCeState: null
    }

    return toReturn;
  }
}