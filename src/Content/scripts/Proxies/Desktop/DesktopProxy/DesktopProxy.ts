import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { FrameProxy } from "../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxy";
import { IDataStateOfFrame } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfFrame";
import { MiscAgent } from "../../../Agents/MiscAgent/MiscAgent";
import { RecipeRestoreFrameOnDesktop } from "../../../ContentApi/Recipes/RecipeRestoreDesktop/RecipeRestoreDesktop";
import { FrameHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { DesktopStartBarProxy } from "../DesktopStartBarProxy/DesktopStartBarProxy";
import { DesktopIframeProxyBucket } from "./DesktopIframeProxyBucket";
import { DesktopDomChangedEvent_Subject } from "./Events/DomChangedEvent/Subject_DesktopDomChangedEvent";
import { IDomChangedEvent_Payload } from "./Events/DomChangedEvent/IDomChangedEvent_Payload";
import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { DesktopDomChangedEvent_Observer } from "./DesktopDomChangedEvent_Observer";
import { FrameMutationEvent_Observer } from "./FrameMutationEvent_Observer";

export class DesktopProxy extends LoggableBase {
  private DesktopIframeProxyBucket: DesktopIframeProxyBucket;

  DesktopStartBarAgent: DesktopStartBarProxy;
  private __iframeHelper: FrameHelper;
  private _dtStartBarAgent: DesktopStartBarProxy;
  private AssociatedDoc: IDataOneDoc;
  private MiscAgent: MiscAgent;
  private SettingsAgent: ISettingsAgent;
  private DomChangedEventSubject: DesktopDomChangedEvent_Subject;

  constructor(logger: ILoggerAgent, miscAgent: MiscAgent, associatedDoc: IDataOneDoc, settingsAgent: ISettingsAgent) {
    super(logger);

    this.Logger.InstantiateStart(DesktopProxy.name);
    this.MiscAgent = miscAgent;
    this.SettingsAgent = settingsAgent;
    this.AssociatedDoc = associatedDoc;

    this.DesktopIframeProxyBucket = new DesktopIframeProxyBucket(this.Logger, this.AssociatedDoc, this.SettingsAgent);

    this.DesktopStartBarAgent = new DesktopStartBarProxy(this.Logger, this, this.SettingsAgent);

    let self = this;
    this.DesktopIframeProxyBucket.DesktopIframeProxyAddedEvent_Subject.RegisterObserver(new FrameMutationEvent_Observer(self.Logger, self.DesktopStartBarAgent));

    this.DomChangedEventSubject = new DesktopDomChangedEvent_Subject(this.Logger, this.AssociatedDoc);

    this.DomChangedEventSubject.RegisterObserver(new DesktopDomChangedEvent_Observer(this.Logger, this))

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

  Observer_DesktopDomChangedEvent(payload: IDomChangedEvent_Payload) {
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

  ProcessLiveFrames(results: FrameProxy[]): IDataStateOfDesktop {
    let toReturnDesktopState: IDataStateOfDesktop = new DefaultStateOfDesktop();

    if (results) {
      for (var idx = 0; idx < results.length; idx++) {
        let frameProxy: FrameProxy = results[idx];

        let stateOfFrame = frameProxy.GetStateOfFrame();

        toReturnDesktopState.StateOfFrames.push(stateOfFrame);
        if (frameProxy.GetZindex() === 1) {
          toReturnDesktopState.IndexOfActiveFrame = idx;
        }
      }
    }

    return toReturnDesktopState;
  }

  async GetStateOfDesktop(): Promise<IDataStateOfDesktop> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfDesktop.name);

      try {
        await this.GetIframeHelper().GetLiveFrames(this.AssociatedDoc)
          .then((results: FrameProxy[]) => this.ProcessLiveFrames(results))
          .then((results: IDataStateOfDesktop) => resolve(results))
          .catch((err) => this.Logger.ErrorAndThrow(this.GetStateOfDesktop.name, err));
      } catch (err) {
        reject(this.GetStateOfDesktop.name + ' | ' + err);
      }

      this.Logger.FuncEnd(this.GetStateOfDesktop.name);
    });
  }

  async SetStateOfDesktop(desktopState: IDataStateOfDesktop): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateOfDesktop.name);;

      if (desktopState) {
        if (this.MiscAgent.NotNullOrUndefined([this.AssociatedDoc, desktopState, desktopState.StateOfFrames], this.SetStateOfDesktop.name)) {
          for (var idx = 0; idx < desktopState.StateOfFrames.length; idx++) {
            let stateOfFrame: IDataStateOfFrame = desktopState.StateOfFrames[idx];

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
        reject(this.SetStateOfDesktop.name + '  No desktop state provided');
      }

      this.Logger.FuncEnd(this.SetStateOfDesktop.name);
    });
  }
}