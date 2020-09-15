import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { SettingKey } from "../../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent, InitResultsScWindowManager, InitResultsDesktopProxy, InitResultsDTFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { _BaseFrameProxy } from "../../_BaseFrameProxy";
import { IDataStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfDTFrame } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { MiscAgent } from "../../../Agents/MiscAgent/MiscAgent";
import { RecipeRestoreFrameOnDesktop } from "../../../ContentApi/Recipes/RecipeRestoreDesktop/RecipeRestoreDesktop";
import { FrameHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { DesktopStartBarProxy } from "../DesktopStartBarProxy/DesktopStartBarProxy";
import { DesktopProxyMutationEvent_Observer } from "./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Observer";
import { DesktopProxyMutationEvent_Subject } from "./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Subject";
import { IDesktopProxyMutationEvent_Payload } from "./Events/DesktopProxyMutationEvent/IDesktopProxyMutationEvent_Payload";
import { DTFrameProxy } from "../../DTFrameProxy";
import { IDTFrameProxyMutationEvent_Payload } from "./Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { DTFrameProxyBucket } from "./DTFrameProxyBucket";
import { DTFrameProxyMutationEvent_Observer } from "./Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer";

export class DesktopProxy extends LoggableBase {
  private __iframeHelper: FrameHelper;
  private __dtStartBarAgent: DesktopStartBarProxy;

  DTFrameProxyMutationEvent_Observer: DTFrameProxyMutationEvent_Observer;
  DesktopProxyMutationEvent_Subject: DesktopProxyMutationEvent_Subject;
  DesktopStartBarAgent: DesktopStartBarProxy;
  private AssociatedDoc: IDataOneDoc;
  private DesktopFrameProxyBucket: DTFrameProxyBucket;
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

      this.DTFrameProxyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer(this.Logger, this);
      this.DesktopFrameProxyBucket = new DTFrameProxyBucket(this.Logger);

      await this.OnReadyPopulateDTFrameProxyBucket()
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

  OnDTFrameProxyMutationEvent(frameProxyMutatationEvent_Payload: IDTFrameProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnDTFrameProxyMutationEvent.name);

    this.DesktopStartBarAgent.OnTreeMutationEvent_DesktopStartBarProxy(frameProxyMutatationEvent_Payload);

      this.Logger.FuncEnd(this.OnDTFrameProxyMutationEvent.name);
  }

  OnDTFrameProxyMutation(desktopDTFrameProxyMutatationEvent_Payload: IDesktopProxyMutationEvent_Payload) {
    if (this.DesktopProxyMutationEvent_Subject) {
      this.DesktopProxyMutationEvent_Subject.NotifyObservers(desktopDTFrameProxyMutatationEvent_Payload);
    }
  }

  private GetFrameHelper(): FrameHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new FrameHelper(this.Logger);
    }
    return this.__iframeHelper;
  }

  async OnReadyPopulateDTFrameProxyBucket(): Promise<void> {
    try {
      await this.GetFrameHelper().GetIFramesAsBaseFrameProxies(this.AssociatedDoc)
        .then((frameProxies: DTFrameProxy[]) => {
          frameProxies.forEach(async (oneIframe: _BaseFrameProxy) => {
            this.AddDTFrameProxyAsync(<DTFrameProxy>oneIframe);
          });
        });
    }
    catch (err) {
      this.Logger.ErrorAndThrow(this.OnReadyPopulateDTFrameProxyBucket.name, err);
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

  AddDTFrameProxyAsync(dtframeProxy: DTFrameProxy): void {
    let initResultFrameProxy = new InitResultsDTFrameProxy();

    if (dtframeProxy && dtframeProxy.ContentEditorProxy && dtframeProxy.ContentEditorProxy.AssociatedDoc) {
      this.RecipeBasics.WaitForReadyNABFrameProxy(dtframeProxy)
        .then(() => {
          let result = this.DesktopFrameProxyBucket.AddToDTFrameProxyBucket(dtframeProxy);

          if (result) {
            dtframeProxy.OnReadyInitDTFrameProxy()
              .then((result) => {
                initResultFrameProxy = result;

                let payload: IDesktopProxyMutationEvent_Payload = {
                  AddedDTFrameProxies: [dtframeProxy],
                  MutatedElement: null,
                  DTFrameProxyMutationEvent_Payload: null
                }
                this.DesktopProxyMutationEvent_Subject.NotifyObservers(payload);
              })
              .then(() => dtframeProxy.DTFrameProxyMutationEvent_Subject.RegisterObserver(this.DTFrameProxyMutationEvent_Observer))
              .catch((err) => this.Logger.ErrorAndThrow(this.AddDTFrameProxyAsync.name, err));
          }
        })
    } else {
      this.Logger.ErrorAndThrow(this.AddDTFrameProxyAsync.name, 'null dtframeProxy or dtframeProxy.Doc');
    }
    this.Logger.LogAsJsonPretty('InitResultsDTFrameProxy', initResultFrameProxy);
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

  ProcessLiveDTFrameProxies(results: DTFrameProxy[]): IDataStateOfDesktop {
    let toReturnDesktopState: IDataStateOfDesktop = new DefaultStateOfDesktop();

    if (results) {
      for (var idx = 0; idx < results.length; idx++) {
        let dtframeProxy: DTFrameProxy = results[idx];

        let stateOfFrame = dtframeProxy.GetStateOfDTFrame();

        toReturnDesktopState.StateOfDTFrames.push(stateOfFrame);
        if (dtframeProxy.GetZindex() === 1) {
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
        await this.GetIframeHelper().GetIFramesAsDTFrameProxies(this.AssociatedDoc)
          .then((results: DTFrameProxy[]) => this.ProcessLiveDTFrameProxies(results))
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
        if (this.MiscAgent.NotNullOrUndefined([this.AssociatedDoc, desktopState, desktopState.StateOfDTFrames], this.SetStateOfDesktop.name)) {
          for (var idx = 0; idx < desktopState.StateOfDTFrames.length; idx++) {
            let stateOfFrame: IDataStateOfDTFrame = desktopState.StateOfDTFrames[idx];

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