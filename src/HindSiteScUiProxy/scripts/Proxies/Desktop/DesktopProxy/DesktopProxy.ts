import { DocumentJacket } from "../../../../../DOMJacket/DocumentJacket";
import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { StateFullProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/50 - scWindowType";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IDTFramesNeeded } from "../../../../../Shared/scripts/Interfaces/Agents/IContentEditorCountsNeeded";
import { IStateFullProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTProxy";
import { RecipeBasics } from "../../../RecipeBasics";
import { StateFullProxyResolver } from "../../ProxyResolver";
import { AsyncLock } from "./DesktopStartBarProxy/AsyncLock";
import { DTStartBarProxy } from "./DesktopStartBarProxy/DesktopStartBarProxy";
import { DTAreaProxy } from "./DTAreaProxy";
import { DTAreaProxyMutationEvent_Observer } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { _BaseStateFullProxy } from "./FrameProxies/_StateProxy";
import { ScRibbonProxy } from "./DesktopStartBarProxy/ScRibbonProxy";
import { ScRibbonCommand } from "../../../../../Shared/scripts/Enums/eScRibbonCommand";

export class DesktopProxy extends _BaseStateFullProxy<IStateOfDesktop> implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.Desktop;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.Desktop];
  private DocumentJacket: DocumentJacket;
  private DTAreaProxy: DTAreaProxy;
  private DTStartBarProxy: DTStartBarProxy;
  public DTAreaProxyMutationEvent_Observer: DTAreaProxyMutationEvent_Observer;
  ScRibbonProxy: ScRibbonProxy;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.Logger.CTORStart(DesktopProxy.name);

    if (documentJacket) {
      this.DocumentJacket = documentJacket;
    } else {
      this.ErrorHand.ErrorAndThrow(DesktopProxy.name, 'No associated doc');
    }

    this.Instantiate();
    this.Logger.CTOREnd(DesktopProxy.name);
  }

  private Instantiate() {
    this.RecipeBasics = new RecipeBasics(this.ApiCore);
    this.DTAreaProxy = new DTAreaProxy(this.ApiCore, this.DocumentJacket);
    this.DTStartBarProxy = new DTStartBarProxy(this.ApiCore, this.DocumentJacket);
    this.ScRibbonProxy = new ScRibbonProxy(this.ApiCore, this.DocumentJacket);
    this.DTAreaProxyMutationEvent_Observer = new DTAreaProxyMutationEvent_Observer(this.ApiCore, this.OnAreaProxyMutationEvent.bind(this));
  }

  async InstantiateAsyncMembers(): Promise<void> {
    try {
      this.Logger.FuncStart(this.InstantiateAsyncMembers.name, DesktopProxy.name);

      this.DTAreaProxy.InstantiateAsyncMembers();
      this.DTStartBarProxy.Instantiate_DTStartBarProxy();
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err);
    }

    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, DesktopProxy.name);
  }

  WireEvents() {
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
        .catch((err) => reject(this.GetState.name + ' | ' + err));

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
          dtFramesNeeded.DiscriminatorAr.forEach((disciminator: StateFullProxyDisciminator) => {
            if (disciminator !== StateFullProxyDisciminator.FallBack) {
              let proxyResolver: StateFullProxyResolver = new StateFullProxyResolver(this.ApiCore);
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
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.SetState.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetState.name + ' ' + DesktopProxy.name, err);
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
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.AddContentEditorFrameAsync.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.AddContentEditorFrameAsync.name, err);
    }
    this.Logger.FuncEnd(this.AddContentEditorFrameAsync.name);
  }

  GetAssociatedDoc(): DocumentJacket {
    return this.DocumentJacket;

  }
  async PublishItem(): Promise<void> {
    await this.DTAreaProxy.PublishTopFrame();
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
}