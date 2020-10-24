import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { FrameJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/50 - scWindowType";
import { APICommandFlag } from "../../../../../Shared/scripts/Enums/APICommand";
import { IJacketOfType } from "../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDTFramesNeeded } from "../../../../../Shared/scripts/Interfaces/Agents/IContentEditorCountsNeeded";
import { IScDocProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDesktop";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDTProxy";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";
import { ScDocProxyResolver } from "../../ScDocProxyResolver";
import { JqueryModalDialogsDocProxy } from "../../StateLessDocProxies/StateLessDocProxies/JqueryModalDialogsDocProxy";
import { JqueryModalDialogsFrameProxy } from "../../StateLessDocProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";
import { AsyncLock } from "./DesktopStartBarProxy/AsyncLock";
import { DTStartBarElemProxy } from "./DesktopStartBarProxy/DTStartBarProxy";
import { DTAreaElemProxy } from "./DTAreaElemProxy";
import { DTAreaProxyMutationEvent_Observer } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { BaseFrameProxy } from "./FrameProxies/BaseFrameProxy";
import { ScDocProxy } from "./FrameProxies/_BaseStateFullDocProxy";

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

export class DesktopProxy extends ScDocProxy<IStateOfDesktop> implements IScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.Desktop;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.Desktop];
  private DTAreaProxy: DTAreaElemProxy;
  private DTStartBarProxy: DTStartBarElemProxy;
  public DTAreaProxyMutationEvent_Observer: DTAreaProxyMutationEvent_Observer;
  JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy = null;

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
    this.DTStartBarProxy = new DTStartBarElemProxy(this.ApiCore, this.DocumentJacket.QuerySelector(SharedConst.Const.KeyWords.Html.Tags.Body));
    //this.ScRibbonProxy = new ScRibbonProxy(this.ApiCore, this.DocumentJacket);

    this.HostedProxies.push(this.DTStartBarProxy);

    this.DTAreaProxyMutationEvent_Observer = new DTAreaProxyMutationEvent_Observer(this.ApiCore, this.OnAreaProxyMutationEvent.bind(this));
  }

  async InstantiateAsyncMembersSelf(): Promise<void> {
    try {
      this.Logger.FuncStart([DesktopProxy.name, this.InstantiateAsyncMembersSelf.name]);

      await

        this.InstantiateAsyncMembersOnHostedProxies()
          .then(() => this.GetJqueryModalsFrameProxy())
          .then((jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) => this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy)

          .then(() => this.DocumentJacket.WaitForGenericElemJacket('.DesktopArea'))
          .then((genericElemJacket: IJacketOfType) => {
            this.DTAreaProxy = new DTAreaElemProxy(this.ApiCore, this.JqueryModalDialogsFrameProxy, genericElemJacket)
            this.HostedProxies.push(this.DTAreaProxy);
          })

          .catch((err: any) => this.ErrorHand.HandleFatalError([DesktopProxy.name, this.InstantiateAsyncMembersSelf.name], err))
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembersSelf.name, err);
    }

    this.Logger.FuncEnd([DesktopProxy.name, this.InstantiateAsyncMembersSelf.name]);
  }

  async WireEventsSelf(): Promise<void> {
    this.Logger.FuncStart(this.WireEventsSelf.name, DesktopProxy.name);

    if (this.DTAreaProxy) {
      this.DTAreaProxy.DTAreaProxyMutationEvent_Subject.RegisterObserver(this.DTAreaProxyMutationEvent_Observer);
    } else {
      this.ErrorHand.HandleFatalError([DesktopProxy.name, this.WireEventsSelf.name], 'null dtareaproxy');
    }

    this.WireEventsOnHostedProxies();

    this.Logger.FuncEnd(this.WireEventsSelf.name, DesktopProxy.name);
  }

  async GetStateOfSelf(): Promise<IStateOfDesktop> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([DesktopProxy.name, this.GetStateOfSelf.name]);

      let toReturnDesktopState: IStateOfDesktop = new DefaultStateOfDesktop();

      await this.DTAreaProxy.GetStateOfSelf()
        .then((stateOfDTArea: IStateOfDTArea) => toReturnDesktopState.DTArea = stateOfDTArea)
        .then(() => resolve(toReturnDesktopState))
        .catch((err: any) => reject(this.GetStateOfSelf.name + ' | ' + err));

      this.Logger.FuncEnd([DesktopProxy.name, this.GetStateOfSelf.name]);
    });
  }

  async SetStateSelf(stateOfDesktop: IStateOfDesktop): Promise<void> {
    this.Logger.FuncStart(this.SetStateSelf.name, DesktopProxy.name);
    this.TaskMonitor.AsyncTaskStarted(this.SetStateSelf.name);

    try {
      let promAr: Promise<void>[] = [];

      await this.DTAreaProxy.SetStateSelf(stateOfDesktop.DTArea)
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
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.SetStateSelf.name, err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.SetStateSelf.name + ' ' + DesktopProxy.name, err);
    }

    this.TaskMonitor.AsyncTaskCompleted(this.SetStateSelf.name);
    this.Logger.FuncEnd(this.SetStateSelf.name, DesktopProxy.name);
  }

  TriggerEventsForInboundSelf() {
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
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([DesktopProxy.name, this.GetJqueryModalsFrameProxy.name]);
      let jqueryIframeelem: FrameJacket = null;

      await this.DocumentJacket.GetHostedFirstMatchingFrameElemJacket("[id=jqueryModalDialogsFrame]")
        .then((frameElemJacket: FrameJacket) => jqueryIframeelem = frameElemJacket)
        .then(() => BaseFrameProxy.StateLessFrameProxyFactory<JqueryModalDialogsDocProxy>(this.ApiCore, jqueryIframeelem))
        .then((stateLessFrameProxy: BaseFrameProxy<JqueryModalDialogsDocProxy>) => resolve(<JqueryModalDialogsFrameProxy>stateLessFrameProxy))
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

  TriggerCERibbonCommand(ribbonCommand: APICommandFlag) {
    this.Logger.FuncStart([DesktopProxy.name, this.TriggerCERibbonCommand.name]);
    this.DTAreaProxy.TriggerCERibbonCommand(ribbonCommand);
    this.Logger.FuncEnd([DesktopProxy.name, this.TriggerCERibbonCommand.name]);
  }

  async PublishItem(): Promise<void> {
    await this.DTAreaProxy.PublishTopFrame();
  }
}