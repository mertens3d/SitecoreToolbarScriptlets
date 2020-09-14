import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { SettingKey } from "../../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent, InitResultsScWindowManager, InitResultsDesktopProxy, InitResultsCEFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { _BaseFrameProxy } from "../../_BaseFrameProxy";
import { IDataStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfFrame } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfFrame";
import { MiscAgent } from "../../../Agents/MiscAgent/MiscAgent";
import { RecipeRestoreFrameOnDesktop } from "../../../ContentApi/Recipes/RecipeRestoreDesktop/RecipeRestoreDesktop";
import { FrameHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { DesktopStartBarProxy } from "../DesktopStartBarProxy/DesktopStartBarProxy";
import { DesktopProxyMutationEvent_Observer } from "./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Observer";
import { CEFrameProxyBucket } from "./DesktopFrameProxyBucket";
import { DesktopProxyMutationEvent_Subject } from "./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Subject";
import { IDesktopProxyMutationEvent_Payload } from "./Events/DesktopProxyMutationEvent/IDesktopProxyMutationEvent_Payload";
import { CEFrameProxy } from "../../CEFrameProxy";
import { CEFrameProxyMutationEvent_Observer } from "./Events/FrameProxyMutationEvent/FrameProxyMutationEvent_Observer";
import { ICEFrameProxyMutationEvent_Payload } from "./Events/FrameProxyMutationEvent/IFrameProxyMutationEvent_Payload";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";

export class DesktopProxy extends LoggableBase {
  private __iframeHelper: FrameHelper;
  private __dtStartBarAgent: DesktopStartBarProxy;

  CEFrameProxyMutationEvent_Observer: CEFrameProxyMutationEvent_Observer;
  DesktopProxyMutationEvent_Subject: DesktopProxyMutationEvent_Subject;
  DesktopStartBarAgent: DesktopStartBarProxy;
  private AssociatedDoc: IDataOneDoc;
  private DesktopFrameProxyBucket: CEFrameProxyBucket;
  private DomChangedEvent_Subject: DesktopProxyMutationEvent_Subject;
  private MiscAgent: MiscAgent;
  private SettingsAgent: ISettingsAgent;
  private RecipeBasics: RecipeBasics;

  constructor(logger: ILoggerAgent, miscAgent: MiscAgent, associatedDoc: IDataOneDoc, settingsAgent: ISettingsAgent) {
    super(logger);

    this.Logger.InstantiateStart(DesktopProxy.name);
    if (associatedDoc) {
      this.MiscAgent = miscAgent;
      this.SettingsAgent = settingsAgent;
      this.AssociatedDoc = associatedDoc;
      this.RecipeBasics = new RecipeBasics(this.Logger);
    } else {
      this.Logger.ErrorAndThrow(DesktopProxy.name, 'No associated doc');
    }

    this.Logger.InstantiateEnd(DesktopProxy.name);
  }
  async OnReadyInitDesktopProxy(): Promise<InitResultsDesktopProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.OnReadyInitDesktopProxy.name);

      let initResultsDesktopProxy = new InitResultsDesktopProxy();

      this.CEFrameProxyMutationEvent_Observer = new CEFrameProxyMutationEvent_Observer(this.Logger, this);
      this.DesktopFrameProxyBucket = new CEFrameProxyBucket(this.Logger);

      await this.OnReadyPopulateCEFrameProxyBucket()
        .then(() => {
          this.DesktopStartBarAgent = new DesktopStartBarProxy(this.Logger, this, this.SettingsAgent);
          let self = this;
          this.DesktopProxyMutationEvent_Subject = new DesktopProxyMutationEvent_Subject(self.Logger, this.AssociatedDoc);
          this.WireEvents();
        })
        .then(() => resolve(initResultsDesktopProxy))
        .catch((err) => this.Logger.ErrorAndThrow(this.OnReadyInitDesktopProxy.name, err));

      this.Logger.FuncEnd(this.OnReadyInitDesktopProxy.name);
    });
  }

  OnCEFrameProxyMutationEvent(frameProxyMutatationEvent_Payload: ICEFrameProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnCEFrameProxyMutationEvent.name);

    this.DesktopStartBarAgent.OnTreeMutationEvent_DesktopStartBarProxy(frameProxyMutatationEvent_Payload);

      this.Logger.FuncEnd(this.OnCEFrameProxyMutationEvent.name);
  }

  OnCEFrameProxyMutation(desktopCEFrameProxyMutatationEvent_Payload: IDesktopProxyMutationEvent_Payload) {
    if (this.DesktopProxyMutationEvent_Subject) {
      this.DesktopProxyMutationEvent_Subject.NotifyObservers(desktopCEFrameProxyMutatationEvent_Payload);
    }
  }

  private GetFrameHelper(): FrameHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new FrameHelper(this.Logger);
    }
    return this.__iframeHelper;
  }

  async OnReadyPopulateCEFrameProxyBucket(): Promise<void> {
    try {
      await this.GetFrameHelper().GetIFramesAsFrameProxies(this.AssociatedDoc)
        .then((frameProxies: CEFrameProxy[]) => {
          frameProxies.forEach(async (oneIframe: _BaseFrameProxy) => {
            this.AddCEFrameProxyAsync(<CEFrameProxy>oneIframe);
          });
        });
    }
    catch (err) {
      this.Logger.ErrorAndThrow(this.OnReadyPopulateCEFrameProxyBucket.name, err);
    }
  }

  WireEvents() {
    let setting = this.SettingsAgent.GetByKey(SettingKey.AutoRenameCeButton);
    if (setting && setting.ValueAsBool()) {
    }

    this.DomChangedEvent_Subject = new DesktopProxyMutationEvent_Subject(this.Logger, this.AssociatedDoc);
    let DomChangeEvent_Observer = new DesktopProxyMutationEvent_Observer(this.Logger, this);
    this.DomChangedEvent_Subject.RegisterObserver(DomChangeEvent_Observer);
  }

  AddCEFrameProxyAsync(ceframeProxy: CEFrameProxy): void {
    let initResultFrameProxy = new InitResultsCEFrameProxy();

    if (ceframeProxy && ceframeProxy.ContentEditorProxy && ceframeProxy.ContentEditorProxy.AssociatedDoc) {
      this.RecipeBasics.WaitForReadyFrameProxy(ceframeProxy)
        .then(() => {
          let result = this.DesktopFrameProxyBucket.AddToCEFrameProxyBucket(ceframeProxy);

          if (result) {
            ceframeProxy.OnReadyInitCEFrameProxy()
              .then((result) => {
                initResultFrameProxy = result;

                let payload: IDesktopProxyMutationEvent_Payload = {
                  AddedCEFrameProxies: [ceframeProxy],
                  MutatedElement: null,
                  FrameProxyMutationEvent_Payload: null
                }
                this.DesktopProxyMutationEvent_Subject.NotifyObservers(payload);
              })
              .then(() => ceframeProxy.FrameProxyMutationEvent_Subject.RegisterObserver(this.CEFrameProxyMutationEvent_Observer))
              .catch((err) => this.Logger.ErrorAndThrow(this.AddCEFrameProxyAsync.name, err));
          }
        })
    } else {
      this.Logger.ErrorAndThrow(this.AddCEFrameProxyAsync.name, 'null ceframeProxy or ceframeProxy.Doc');
    }
    this.Logger.LogAsJsonPretty('InitResultsCEFrameProxy', initResultFrameProxy);
  }

  GetAssociatedDoc(): IDataOneDoc {
    return this.AssociatedDoc;
  }

  GetDtStartBarAgent(): DesktopStartBarProxy {
    if (!this.__dtStartBarAgent) {
      this.__dtStartBarAgent = new DesktopStartBarProxy(this.Logger, this, this.SettingsAgent);
    }

    return this.__dtStartBarAgent;
  }

  private GetIframeHelper(): FrameHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new FrameHelper(this.Logger);
    }
    return this.__iframeHelper;
  }

  ProcessLiveFrames(results: CEFrameProxy[]): IDataStateOfDesktop {
    let toReturnDesktopState: IDataStateOfDesktop = new DefaultStateOfDesktop();

    if (results) {
      for (var idx = 0; idx < results.length; idx++) {
        let ceframeProxy: CEFrameProxy = results[idx];

        let stateOfFrame = ceframeProxy.GetStateOfCEFrame();

        toReturnDesktopState.StateOfFrames.push(stateOfFrame);
        if (ceframeProxy.GetZindex() === 1) {
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
        await this.GetIframeHelper().GetIFramesAsFrameProxies(this.AssociatedDoc)
          .then((results: CEFrameProxy[]) => this.ProcessLiveFrames(results))
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