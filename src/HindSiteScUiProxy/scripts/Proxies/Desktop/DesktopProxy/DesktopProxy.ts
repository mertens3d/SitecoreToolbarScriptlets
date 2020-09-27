import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { StaticHelpers } from "../../../../../Shared/scripts/Classes/StaticHelpers";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { InitResultsDesktopProxy } from "../../../../../Shared/scripts/Interfaces/Agents/InitResultsDesktopProxy";
import { InitResultsDTFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfDTFrame } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { RecipeRestoreFrameOnDesktop } from "../../../ContentApi/Recipes/RecipeRestoreDesktop";
import { FrameHelper } from "../../../Helpers/FrameHelper";
import { LoggableBase } from "../../../../../Shared/scripts/LoggableBase";
import { DTFrameProxy } from "./FrameProxies/DTFrameProxy";
import { _BaseFrameProxy } from "./FrameProxies/_BaseFrameProxy";
import { DesktopStartBarProxy } from "../DesktopStartBarProxy/DesktopStartBarProxy";
import { DTFrameProxyBucket } from "./DTFrameProxyBucket";
import { DesktopProxyMutationEvent_Observer } from "./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Observer";
import { DesktopProxyMutationEvent_Subject } from "./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Subject";
import { IDesktopProxyMutationEvent_Payload } from "./Events/DesktopProxyMutationEvent/IDesktopProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Observer } from "./Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer";
import { IDTFrameProxyMutationEvent_Payload } from "./Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { IScWindowProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { RecipeAddNewContentEditorToDesktop } from "../../../ContentApi/Recipes/RecipeAddContentEditorToDesktop";

export class DesktopProxy extends LoggableBase {
  private __iframeHelper: FrameHelper;

  DTFrameProxyMutationEvent_Observer: DTFrameProxyMutationEvent_Observer;
  DesktopProxyMutationEvent_Subject: DesktopProxyMutationEvent_Subject;
  private DesktopStartBarAgent: DesktopStartBarProxy;
  private AssociatedDoc: IDataOneDoc;
  private DesktopFrameProxyBucket: DTFrameProxyBucket;
  private DomChangedEvent_Subject: DesktopProxyMutationEvent_Subject;
  private RecipeBasics: RecipeBasics;
  private OwnerScWinProxy: IScWindowProxy;
  DomChangeEvent_Observer: DesktopProxyMutationEvent_Observer;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc, OwnerScWinProxy: IScWindowProxy) {
    super(logger);
    this.Logger.InstantiateStart(DesktopProxy.name);

    if (associatedDoc) {
      this.AssociatedDoc = associatedDoc;
      this.RecipeBasics = new RecipeBasics(this.Logger);
    } else {
      this.Logger.ErrorAndThrow(DesktopProxy.name, 'No associated doc');
    }

    this.OwnerScWinProxy = OwnerScWinProxy;

    this.Logger.InstantiateEnd(DesktopProxy.name);
  }

  async PublishItem(): Promise<void> {
    let dtFrameProxy: DTFrameProxy = this.DesktopFrameProxyBucket.GetActiveFrame();
    if (dtFrameProxy) {
      await dtFrameProxy.ContentEditorProxy.PublishItem();
    }
  }

  async OnReadyInitDesktopProxy(): Promise<InitResultsDesktopProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.OnReadyInitDesktopProxy.name);

      let initResultsDesktopProxy = new InitResultsDesktopProxy();

      this.DTFrameProxyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer(this.Logger, this);
      this.DesktopFrameProxyBucket = new DTFrameProxyBucket(this.Logger);

      await this.OnReadyPopulateDTFrameProxyBucket()
        .then(() => {
          this.DesktopStartBarAgent = new DesktopStartBarProxy(this.Logger, this);
          let self = this;
          this.DesktopProxyMutationEvent_Subject = new DesktopProxyMutationEvent_Subject(self.Logger, this.AssociatedDoc);
          this.WireEvents();
        })
        .then(() => resolve(initResultsDesktopProxy))
        .catch((err) => this.Logger.ErrorAndThrow(this.OnReadyInitDesktopProxy.name, err));

      this.Logger.FuncEnd(this.OnReadyInitDesktopProxy.name);
    });
  }

  async AddContentEditorTabAsync(): Promise<void> {
    try {
      let recipe = new RecipeAddNewContentEditorToDesktop(this.Logger, this.OwnerScWinProxy, this.AssociatedDoc);
      recipe.Execute()
        .catch((err) => this.Logger.ErrorAndThrow(this.AddContentEditorTabAsync.name, err));
    } catch (err) {
      this.Logger.ErrorAndThrow(this.AddContentEditorTabAsync.name, err);
    }
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
          frameProxies.forEach(async (frameProxy: _BaseFrameProxy) => {
            this.AddDTFrameProxyAsync(<DTFrameProxy>frameProxy);
          });
        });
    }
    catch (err) {
      this.Logger.ErrorAndThrow(this.OnReadyPopulateDTFrameProxyBucket.name, err);
    }
  }

  WireEvents() {
    //let setting = this.SettingsAgent.SetByKey(SettingKey.AutoRenameCeButton);
    //if (setting && setting.ValueAsBool()) {
    //}

    this.DomChangedEvent_Subject = new DesktopProxyMutationEvent_Subject(this.Logger, this.AssociatedDoc);
    this.DomChangeEvent_Observer = new DesktopProxyMutationEvent_Observer(this.Logger, this.OnDesktopProxyMutationEvent.bind(this));
    this.DomChangedEvent_Subject.RegisterObserver(this.DomChangeEvent_Observer);
  }

  OnDesktopProxyMutationEvent(payload: IDesktopProxyMutationEvent_Payload) {
    this.Logger.Log("The desktop DOM changed - probably an iframe has been added");
    if (payload && payload.AddedDTFrameProxies.length > 0) {
      payload.AddedDTFrameProxies.forEach(async (dtFrameProxy: DTFrameProxy) => {
        dtFrameProxy.OnReadyInitDTFrameProxy()
          .then(() => this.AddDTFrameProxyAsync(dtFrameProxy))
          .catch((err) => { throw (DesktopProxyMutationEvent_Observer.name + ' | ' + err) });
      });
    }
  }

  AddDTFrameProxyAsync(dtframeProxy: DTFrameProxy): void {
    this.Logger.FuncStart(this.AddContentEditorTabAsync.name);

    let initResultFrameProxy = new InitResultsDTFrameProxy();

    if (!StaticHelpers.IsNullOrUndefined([dtframeProxy, dtframeProxy.ContentEditorProxy])) {
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

    this.Logger.FuncEnd(this.AddContentEditorTabAsync.name);
  }

  GetAssociatedDoc(): IDataOneDoc {
    return this.AssociatedDoc;
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

  async SetStateOfDesktop(stateOfDesktop: IDataStateOfDesktop): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateOfDesktop.name);;

      //let promAr: Promise<void>[] = [];

      if (stateOfDesktop && stateOfDesktop.StateOfDTFrames && stateOfDesktop.StateOfDTFrames.length > 0) {
        if (!StaticHelpers.IsNullOrUndefined([this.AssociatedDoc])) {
          for (var idx = 0; idx < stateOfDesktop.StateOfDTFrames.length; idx++) {
            let stateOfFrame: IDataStateOfDTFrame = stateOfDesktop.StateOfDTFrames[idx];

            var recipe: RecipeRestoreFrameOnDesktop = new RecipeRestoreFrameOnDesktop(this.Logger, this.AssociatedDoc, stateOfFrame, this.DesktopStartBarAgent, this.OwnerScWinProxy);

            //todo - do I need to await this? can't it just be triggered? we're not waiting on anything to finish

            //promAr.push(recipe.Execute());

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

      //await  Promise.all(promAr)
      //    .then(() => resolve())
      //    .catch((err) => reject(this.SetStateOfDesktop.name + ' | ' + err));

      this.Logger.FuncEnd(this.SetStateOfDesktop.name);
    });
  }
}