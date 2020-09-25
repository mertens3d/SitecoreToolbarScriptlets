import { DTFrameProxyMutationEvent_Observer } from "../../Events/DesktopProxy/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer";
import { DefaultStateOfDesktop } from "../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { RecipeBasicsForContent } from "../../../../Shared/scripts/Classes/RecipeBasics";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { InitResultsDesktopProxy } from "../../../../Shared/scripts/Interfaces/Agents/InitResultsDesktopProxy";
import { InitResultsDTFrameProxy } from "../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy";
import { IDataOneDoc } from "../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataStateOfDesktop } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfDTFrame } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { IDTFrameProxyMutationEvent_Payload } from "../../../../Shared/scripts/Interfaces/Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { IDesktopProxy, IDesktopStartBarProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy";
import { RecipeRestoreFrameOnDesktop } from "../../../../Content/scripts/ContentApi/Recipes/RecipeRestoreDesktop/RecipeRestoreDesktop";
import { FrameHelper } from "../../../../Content/scripts/Helpers/FrameHelper";
import { LoggableBase } from "../../../../Shared/scripts/LoggableBase";
import { DTFrameProxy } from "../../../../Content/scripts/Proxies/DTFrameProxy";
import { _BaseFrameProxy } from "../../../../Content/scripts/Proxies/_BaseFrameProxy";
import { DesktopStartBarProxy } from "../../../../Content/scripts/Proxies/Desktop/DesktopStartBarProxy/DesktopStartBarProxy";
import { DTFrameProxyBucket } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/DTFrameProxyBucket";
import { DesktopProxyMutationEvent_Observer } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Observer";
import { DesktopProxyMutationEvent_Subject } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Subject";
import { IDesktopProxyMutationEvent_Payload } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/DesktopProxyMutationEvent/IDesktopProxyMutationEvent_Payload";
import { IContentBrowserProxy } from "../../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { ICommandHandlerDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";

export class DesktopProxy extends LoggableBase implements IDesktopProxy {
  private __iframeHelper: FrameHelper;
  private __dtStartBarAgent: DesktopStartBarProxy;

  private DTFrameProxyMutationEvent_Observer: DTFrameProxyMutationEvent_Observer;
  private DesktopProxyMutationEvent_Subject: DesktopProxyMutationEvent_Subject;
  DesktopStartBarAgent: IDesktopStartBarProxy;
  private AssociatedDoc: IDataOneDoc;
  private DesktopFrameProxyBucket: DTFrameProxyBucket;
  private DomChangedEvent_Subject: DesktopProxyMutationEvent_Subject;
  private RecipeBasics: RecipeBasicsForContent;
  private ContentBrowserProxy: IContentBrowserProxy;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc, contentBrowserProxy: IContentBrowserProxy) {
    super(logger);

    this.Logger.InstantiateStart(DesktopProxy.name);
    if (associatedDoc) {
      this.AssociatedDoc = associatedDoc;

      this.ContentBrowserProxy = contentBrowserProxy;
      this.RecipeBasics = new RecipeBasicsForContent(this.Logger, this.ContentBrowserProxy);
    } else {
      this.Logger.ErrorAndThrow(DesktopProxy.name, 'No associated doc');
    }

    this.Logger.InstantiateEnd(DesktopProxy.name);
  }
  async OnReadyInitDesktopProxy(): Promise<InitResultsDesktopProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.OnReadyInitDesktopProxy.name);

      let initResultsDesktopProxy = new InitResultsDesktopProxy();

      this.DTFrameProxyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer(this.Logger, this.OnDTFrameProxyMutationEvent.bind(this));
      this.DesktopFrameProxyBucket = new DTFrameProxyBucket(this.Logger);

      await this.OnReadyPopulateDTFrameProxyBucket()
        .then(() => {
          this.DesktopStartBarAgent = new DesktopStartBarProxy(this.Logger, this.ContentBrowserProxy, this.AssociatedDoc);
          let self = this;
          this.DesktopProxyMutationEvent_Subject = new DesktopProxyMutationEvent_Subject(self.Logger, this.AssociatedDoc, this.ContentBrowserProxy);
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
      this.__iframeHelper = new FrameHelper(this.Logger, this.ContentBrowserProxy);
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
    //let setting = this.SettingsAgent.SetByKey(SettingKey.AutoRenameCeButton);
    //if (setting && setting.ValueAsBool()) {
    //}

    this.DomChangedEvent_Subject = new DesktopProxyMutationEvent_Subject(this.Logger, this.AssociatedDoc, this.ContentBrowserProxy);
    let DomChangeEvent_Observer = new DesktopProxyMutationEvent_Observer(this.Logger, this.CallbackToName.bind(this));
    this.DomChangedEvent_Subject.RegisterObserver(DomChangeEvent_Observer);
  }

  CallbackToName(payload: IDesktopProxyMutationEvent_Payload) {
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
      this.__dtStartBarAgent = new DesktopStartBarProxy(this.Logger, this.ContentBrowserProxy, this.AssociatedDoc);
    }

    return this.__dtStartBarAgent;
  }

  private GetIframeHelper(): FrameHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new FrameHelper(this.Logger, this.ContentBrowserProxy);
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

  async SetStateOfDesktop(desktopState: IDataStateOfDesktop, commanddata: ICommandHandlerDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateOfDesktop.name);;

      if (desktopState && desktopState.StateOfDTFrames && desktopState.StateOfDTFrames.length > 0) {
        if (!StaticHelpers.IsNullOrUndefined([this.AssociatedDoc])) {
          for (var idx = 0; idx < desktopState.StateOfDTFrames.length; idx++) {
            let stateOfFrame: IDataStateOfDTFrame = desktopState.StateOfDTFrames[idx];

            var recipe: RecipeRestoreFrameOnDesktop = new RecipeRestoreFrameOnDesktop(commanddata, stateOfFrame);

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