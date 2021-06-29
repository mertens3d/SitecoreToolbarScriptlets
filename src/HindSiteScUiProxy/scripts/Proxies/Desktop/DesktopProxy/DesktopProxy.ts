import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { FrameJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/50 - scWindowType";
import { APICommandFlag } from "../../../../../Shared/scripts/Enums/APICommand";
import { IJacketOfType } from "../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScDocProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IScFrameProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { IStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDesktop";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDTProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";
import { ScDocProxyResolver } from "../../ScDocProxyResolver";
import { AsyncLock } from "./DesktopStartBarProxy/AsyncLock";
import { DTStartBarElemProxy } from "./DesktopStartBarProxy/DTStartBarProxy";
import { DTAreaElemProxy } from "./DTAreaElemProxy";
import { DTAreaProxyMutationEvent_Observer } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { GenericFrameProxy } from "./FrameProxies/GenericFrameProxy";
import { _ScDocProxyOfTypeT } from "./FrameProxies/ScDocProxyOfTypeT";

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

export class DesktopProxy extends _ScDocProxyOfTypeT<IStateOfDesktop> implements IScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.Desktop;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.Desktop];

  public DTAreaProxyMutationEvent_Observer: DTAreaProxyMutationEvent_Observer;
  JqueryModalDialogsFrameProxy: IScFrameProxy = null;

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
    let dTStartBarProxy = new DTStartBarElemProxy(this.ApiCore, this.DocumentJacket.QuerySelector(SharedConst.Const.KeyWords.Html.Tags.Body));
    //this.ScRibbonProxy = new ScRibbonProxy(this.ApiCore, this.DocumentJacket);

    this.HostedProxies.push(dTStartBarProxy);

    this.DTAreaProxyMutationEvent_Observer = new DTAreaProxyMutationEvent_Observer(this.ApiCore, this.OnAreaProxyMutationEvent.bind(this));
  }

  protected async InstantiateAwaitElementsSelf(): Promise<void> {
    try {
      this.Logger.FuncStart([DesktopProxy.name, this.InstantiateAwaitElementsSelf.name]);

      await this.GetJqueryModalsFrameProxy()
        .then((jqueryModalDialogsFrameProxy: IScFrameProxy) => this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy)

        .then(() => this.DocumentJacket.WaitForGenericElemJacket('.DesktopArea'))
        .then((genericElemJacket: IJacketOfType) => {
          let dTAreaProxy = new DTAreaElemProxy(this.ApiCore, this.JqueryModalDialogsFrameProxy, genericElemJacket)
          this.HostedProxies.push(dTAreaProxy);
        })

        .catch((err: any) => this.ErrorHand.HandleFatalError([DesktopProxy.name, this.InstantiateAwaitElementsSelf.name], err))
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateAwaitElementsSelf.name, err);
    }

    this.Logger.FuncEnd([DesktopProxy.name, this.InstantiateAwaitElementsSelf.name]);
  }

  WireEventsSelf(): void {
    this.Logger.FuncStart(this.WireEventsSelf.name, DesktopProxy.name);

    let dtareaProxy: DTAreaElemProxy = <DTAreaElemProxy>this.GetOnlyOrNullHostedProxiesByDisciminator(ScProxyDisciminator.DTArea);

    if (dtareaProxy) {
      dtareaProxy.DTAreaProxyMutationEvent_Subject.RegisterObserver(this.DTAreaProxyMutationEvent_Observer);
    } else {
      this.ErrorHand.HandleFatalError([DesktopProxy.name, this.WireEventsSelf.name], 'null dtarea proxy');
    }

    this.Logger.FuncEnd(this.WireEventsSelf.name, DesktopProxy.name);
  }

  async GetStateOfSelf(): Promise<IStateOfDesktop> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([DesktopProxy.name, this.GetStateOfSelf.name]);

      let toReturnDesktopState: IStateOfDesktop = new DefaultStateOfDesktop();

      //await this.DTAreaProxy.GetStateOfSelf()
      //  .then((stateOfDTArea: IStateOfDTArea) => toReturnDesktopState.DTArea = stateOfDTArea)
      resolve(toReturnDesktopState);

      //.catch((err: any) => reject(this.GetStateOfSelf.name + ' | ' + err));

      this.Logger.FuncEnd([DesktopProxy.name, this.GetStateOfSelf.name]);
    });
  }

  GetFrameDocProxies(Children: IStateOf_[]): ScProxyDisciminator[] {
    let frameDocProxies: ScProxyDisciminator[] = [];
    let stateOfDTArea: IStateOfDTArea = null;

    if (Children) {
      Children.forEach((child: IStateOfDTArea) => {
        if (child) {
          if (child.Disciminator === ScProxyDisciminator.DTArea) {
            stateOfDTArea = child;
          }
        }
      });
    }

    if (stateOfDTArea && stateOfDTArea.Children) {
      stateOfDTArea.Children.forEach((child: IStateOf_) => {
        if (child) {
          if (child && child.Disciminator === ScProxyDisciminator.FrameProxy && child.Children) {
            let firstChild: IStateOf_ = child.Children[0];
            frameDocProxies.push(firstChild.Disciminator);
          }
        }
      });
    }
    return frameDocProxies;
  }

  async SetStateSelf(stateOfDesktop: IStateOfDesktop): Promise<void> {
    this.Logger.FuncStart(this.SetStateSelf.name, DesktopProxy.name);
    this.TaskMonitor.AsyncTaskStarted(this.SetStateSelf.name);

    try {
      let promAr: Promise<void>[] = [];
      let dtareaProxy: DTAreaElemProxy = <DTAreaElemProxy>this.GetOnlyOrNullHostedProxiesByDisciminator(ScProxyDisciminator.DTArea);
      let dTStartBarProxy: DTStartBarElemProxy = <DTStartBarElemProxy>this.GetOnlyOrNullHostedProxiesByDisciminator(ScProxyDisciminator.DTStartBarElem);

      if (dtareaProxy && dTStartBarProxy) {
        let frameDocProxiesToSpawn: ScProxyDisciminator[] = this.GetFrameDocProxies(stateOfDesktop.Children);

        this.Logger.LogAsJsonPretty('proxies to spawn', frameDocProxiesToSpawn);

        //let dtAreaData: IStateOfDTArea =
        //dtareaProxy.QueueFrameProxyDocStates(stateOfDesktop.Children);

        //await this.DTAreaProxy.SetStateSelf(stateOfDesktop.DTArea)
        //  .then((dtFramesNeeded: IDTFramesNeeded) => {
        let asyncLock: AsyncLock = new AsyncLock(this.ApiCore);
        frameDocProxiesToSpawn.forEach((disciminator: ScProxyDisciminator) => {
          if (disciminator !== ScProxyDisciminator.FallBack) {
            let proxyResolver: ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);
            let windowType: ScWindowType = proxyResolver.MapProxyDiscriminatorToScWindowType(disciminator);

            if (windowType !== ScWindowType.Unknown) {
              promAr.push(dTStartBarProxy.TriggerRedButtonAsync(windowType, asyncLock));
            }
          } else {
            // do nothing
          }
          //});
        })

        this.Logger.MarkerA();

        await Promise.all(promAr)
          .then(() => Promise.resolve())
          .catch((err: any) => this.ErrorHand.HandleFatalError(this.SetStateSelf.name, err));

        this.Logger.MarkerB();

      }
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

      let dTStartBarProxy: DTStartBarElemProxy = <DTStartBarElemProxy>this.GetOnlyOrNullHostedProxiesByDisciminator(ScProxyDisciminator.DTStartBarElem);
      if (dTStartBarProxy) {
        await dTStartBarProxy.TriggerRedButtonAsync(ScWindowType.ContentEditor, asyncLock)
          .catch((err: any) => this.ErrorHand.HandleFatalError(this.AddContentEditorFrameAsync.name, err));
      }
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.AddContentEditorFrameAsync.name, err);
    }
    this.Logger.FuncEnd(this.AddContentEditorFrameAsync.name);
  }

  GetAssociatedDoc(): DocumentJacket {
    return this.DocumentJacket;
  }

  private GetJqueryModalsFrameProxy(): Promise<IScFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([DesktopProxy.name, this.GetJqueryModalsFrameProxy.name]);
      let jqueryIframeelem: FrameJacket = null;

      await this.DocumentJacket.GetHostedFirstMatchingFrameElemJacket("[id=jqueryModalDialogsFrame]")
        .then((frameElemJacket: FrameJacket) => jqueryIframeelem = frameElemJacket)
        .then(() => GenericFrameProxy.ScFrameProxyFactory(this.ApiCore, jqueryIframeelem, null))
        .then((scFrameProxy: IScFrameProxy) => resolve(scFrameProxy))
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([DesktopProxy.name, this.GetJqueryModalsFrameProxy.name], err)));

      this.Logger.FuncEnd([DesktopProxy.name, this.GetJqueryModalsFrameProxy.name]);
    });
  }

  OnAreaProxyMutationEvent(dTAreaProxyMutationEvent_Payload: IDTAreaProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnAreaProxyMutationEvent.name);

    if (this.RunTimeOptions.EnableDesktopStartBarButtonRename) {
      let dTStartBarProxy: DTStartBarElemProxy = <DTStartBarElemProxy>this.GetOnlyOrNullHostedProxiesByDisciminator(ScProxyDisciminator.DTStartBarElem);
      if (dTStartBarProxy) {
        dTStartBarProxy.OnTreeMutationEvent_DesktopStartBarProxy(dTAreaProxyMutationEvent_Payload);
      }
    }

    this.Logger.FuncEnd(this.OnAreaProxyMutationEvent.name);
  }

  TriggerCERibbonCommand(ribbonCommand: APICommandFlag) {
    this.Logger.FuncStart([DesktopProxy.name, this.TriggerCERibbonCommand.name], APICommandFlag[ribbonCommand]);
    //let dTStartBarProxy: DTStartBarElemProxy = <DTStartBarElemProxy>this.GetOnlyOrNullHostedProxiesByDisciminator(ScProxyDisciminator.DTStartBarElem);
    //if (dTStartBarProxy) {
    //  //todo - put back dTStartBarProxy.TriggerCERibbonCommand(ribbonCommand);
    //}

    let dtareaProxy: DTAreaElemProxy = <DTAreaElemProxy>this.GetOnlyOrNullHostedProxiesByDisciminator(ScProxyDisciminator.DTArea);
    if (dtareaProxy) {
      dtareaProxy.TriggerCERibbonCommand(ribbonCommand);
    }

    this.Logger.FuncEnd([DesktopProxy.name, this.TriggerCERibbonCommand.name]);
  }

  async PublishItem(): Promise<void> {
    let dTStartBarProxy: DTStartBarElemProxy = <DTStartBarElemProxy>this.GetOnlyOrNullHostedProxiesByDisciminator(ScProxyDisciminator.DTStartBarElem);
    if (dTStartBarProxy) {
      // todo - put back await dTStartBarProxy.PublishTopFrame();
    }
  }
}