import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IJacketOfType } from "../../../../../Shared/scripts/IJacketOfType";
import { FrameElemJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/50 - scWindowType";
import { ScRibbonCommand } from "../../../../../Shared/scripts/Enums/eScRibbonCommand";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDTFramesNeeded } from "../../../../../Shared/scripts/Interfaces/Agents/IContentEditorCountsNeeded";
import { IStateFullDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateFullElemProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { IStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDesktop";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDTProxy";
import { ScDocProxyResolver } from "../../ScDocProxyResolver";
import { JqueryModalDialogsDocProxy } from "../../StateLessDocProxies/StateLessDocProxies/JqueryModalDialogsDocProxy";
import { GenericStateLessFrameProxy } from "../../StateLessDocProxies/StateLessFrameProxies/GenericStateLessFrameProxy";
import { JqueryModalDialogsFrameProxy } from "../../StateLessDocProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";
import { _baseStatelessFrameProxyOfType } from "../../StateLessDocProxies/StateLessFrameProxies/_baseStatelessFrameProxyOfType";
import { AsyncLock } from "./DesktopStartBarProxy/AsyncLock";
import { DTStartBarProxy } from "./DesktopStartBarProxy/DTStartBarProxy";
import { DTAreaElemProxy } from "./DTAreaElemProxy";
import { DTAreaProxyMutationEvent_Observer } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { _BaseStateFullDocProxy } from "./FrameProxies/_BaseStateFullDocProxy";

//export class ScDocumentWatcher extends _APICoreBase {
//  ScDocumentProxyMutationEvent_Subject: ScDocumentProxyMutationEvent_Subject;

//  //*  This watches the attached document and sends out notices when it changes

//  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
//    super(apiCore);
//    this.Instantiate();
//  }

//  private Instantiate() {
//    this.ScDocumentProxyMutationEvent_Subject = new ScDocumentProxyMutationEvent_Subject(this.ApiCore);
//    //this.DocumentJacketMutationEvent_Observer = new DocumentJacketWatcher
//  }

//}

export class DesktopProxy extends _BaseStateFullDocProxy<IStateOfDesktop> implements IStateFullDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.Desktop;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.Desktop];
  private DTAreaProxy: DTAreaElemProxy;
  private DTStartBarProxy: DTStartBarProxy;
  public DTAreaProxyMutationEvent_Observer: DTAreaProxyMutationEvent_Observer;
  JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy = null;
  HostedElemProxies: IStateFullElemProxy[] = [];

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);
    this.Logger.CTORStart(DesktopProxy.name);

    if (documentJacket) {
    } else {
      this.ErrorHand.HandleFatalError(DesktopProxy.name, 'No associated doc');
    }

    this.Instantiate();
    this.Logger.CTOREnd(DesktopProxy.name);
  }

  private Instantiate() {
    this.DTStartBarProxy = new DTStartBarProxy(this.ApiCore, this.DocumentJacket);
    //this.ScRibbonProxy = new ScRibbonProxy(this.ApiCore, this.DocumentJacket);
    this.DTAreaProxyMutationEvent_Observer = new DTAreaProxyMutationEvent_Observer(this.ApiCore, this.OnAreaProxyMutationEvent.bind(this));
  }

  async InstantiateAsyncMembers(): Promise<void> {
    try {
      this.Logger.FuncStart(this.InstantiateAsyncMembers.name, DesktopProxy.name);

      this.DTStartBarProxy.Instantiate_DTStartBarProxy();

      await
        this.GetJqueryModalsFrameProxy()
          .then((jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) => this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy)

          .then(() => this.DocumentJacket.WaitForGenericElemJacket('.DesktopArea'))
          .then((genericElemJacket: IJacketOfType) => this.DTAreaProxy = new DTAreaElemProxy(this.ApiCore, this.JqueryModalDialogsFrameProxy, genericElemJacket))

          .then(() => this.DTAreaProxy.InstantiateAsyncMembers())
          .catch((err: any) => this.ErrorHand.HandleFatalError([DesktopProxy.name, this.InstantiateAsyncMembers.name], err))
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
    }

    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, DesktopProxy.name);
  }

 async  WireEvents() : Promise<void>{
    this.Logger.FuncStart(this.WireEvents.name, DesktopProxy.name);

    this.DTAreaProxy.WireEvents();
    this.DTStartBarProxy.WireEvent();

    this.DTAreaProxy.DTAreaProxyMutationEvent_Subject.RegisterObserver(this.DTAreaProxyMutationEvent_Observer);

    this.Logger.FuncEnd(this.WireEvents.name, DesktopProxy.name);
  }

  async GetState(): Promise<IStateOfDesktop> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, DesktopProxy.name);

      let toReturnDesktopState: IStateOfDesktop = new DefaultStateOfDesktop();

      await this.DTAreaProxy.GetState()
        .then((stateOfDTArea: IStateOfDTArea) => toReturnDesktopState.DTArea = stateOfDTArea)
        .then(() => resolve(toReturnDesktopState))
        .catch((err: any) => reject(this.GetState.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetState.name, DesktopProxy.name);
    });
  }

  async SetState(stateOfDesktop: IStateOfDesktop): Promise<void> {
    this.Logger.FuncStart(this.SetState.name, DesktopProxy.name);
    this.TaskMonitor.AsyncTaskStarted(this.SetState.name);

    try {
      let promAr: Promise<void>[] = [];

      await this.DTAreaProxy.SetState(stateOfDesktop.DTArea)
        .then((dtFramesNeeded: IDTFramesNeeded) => {
          let asyncLock: AsyncLock = new AsyncLock(this.ApiCore);
          dtFramesNeeded.DiscriminatorAr.forEach((disciminator: ScProxyDisciminator) => {
            if (disciminator !== ScProxyDisciminator.FallBack) {
              let proxyResolver: ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);
              let windowType: ScWindowType = proxyResolver.MapProxyDiscriminatorToScWindowType(disciminator);

              if (windowType !== ScWindowType.Unknown) {
                promAr.push(this.DTStartBarProxy.TriggerRedButtonAsync(windowType, asyncLock));
              }
            } else {
              // do nothing
            }
          });
        })
        .then(() => Promise.all(promAr))
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.SetState.name, err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.SetState.name + ' ' + DesktopProxy.name, err);
    }

    this.TaskMonitor.AsyncTaskCompleted(this.SetState.name);
    this.Logger.FuncEnd(this.SetState.name, DesktopProxy.name);
  }

  TriggerInboundEventsAsync() {
    // n/a
  }

  //-----------------------------------------------------------------------

  async AddContentEditorFrameAsync(): Promise<void> {
    this.Logger.FuncStart(this.AddContentEditorFrameAsync.name);
    try {
      let asyncLock: AsyncLock = new AsyncLock(this.ApiCore);
      await this.DTStartBarProxy.TriggerRedButtonAsync(ScWindowType.ContentEditor, asyncLock)
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.AddContentEditorFrameAsync.name, err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.AddContentEditorFrameAsync.name, err);
    }
    this.Logger.FuncEnd(this.AddContentEditorFrameAsync.name);
  }

  GetAssociatedDoc(): DocumentJacket {
    return this.DocumentJacket;
  }

  private GetJqueryModalsFrameProxy(): Promise<JqueryModalDialogsFrameProxy> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart([DesktopProxy.name, this.GetJqueryModalsFrameProxy.name]);
      let jqueryIframeelem: FrameElemJacket = null;

      this.DocumentJacket.GetHostedFirstMatchingFrameElemJacket("[id=jqueryModalDialogsFrame]")
        .then((frameElemJacket: FrameElemJacket) => jqueryIframeelem = frameElemJacket)
        .then(() => GenericStateLessFrameProxy.StateLessFrameProxyFactory<JqueryModalDialogsDocProxy>(this.ApiCore, jqueryIframeelem))
        .then((stateLessFrameProxy: _baseStatelessFrameProxyOfType<JqueryModalDialogsDocProxy>) => resolve(<JqueryModalDialogsFrameProxy>stateLessFrameProxy))
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([DesktopProxy.name, this.GetJqueryModalsFrameProxy.name], err)));

      this.Logger.FuncEnd([DesktopProxy.name, this.GetJqueryModalsFrameProxy.name]);
    });
  }

  OnAreaProxyMutationEvent(dTAreaProxyMutationEvent_Payload: IDTAreaProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnAreaProxyMutationEvent.name);

    if (this.RunTimeOptions.EnableDesktopStartBarButtonRename) {
      this.DTStartBarProxy.OnTreeMutationEvent_DesktopStartBarProxy(dTAreaProxyMutationEvent_Payload);
    }

    this.Logger.FuncEnd(this.OnAreaProxyMutationEvent.name);
  }

  TriggerCERibbonCommand(ribbonCommand: ScRibbonCommand) {
    this.Logger.FuncStart([DesktopProxy.name, this.TriggerCERibbonCommand.name]);
    this.DTAreaProxy.TriggerCERibbonCommand(ribbonCommand);
    this.Logger.FuncEnd([DesktopProxy.name, this.TriggerCERibbonCommand.name]);
  }

  async PublishItem(): Promise<void> {
    await this.DTAreaProxy.PublishTopFrame();
  }
}