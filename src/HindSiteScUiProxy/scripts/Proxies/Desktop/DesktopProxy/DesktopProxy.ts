import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { InitReport_DesktopProxy } from "../../../../../Shared/scripts/Interfaces/Agents/InitResultsDesktopProxy";
import { IStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTProxy";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";
import { ScDocumentFacade } from "../../../../Facades/ScDocumentFacade";
import { DTPopUpMenuProxy } from "./DesktopPopUpMenuProxy";
import { DTStartBarProxy } from "./DesktopStartBarProxy/DesktopStartBarProxy";
import { DTAreaProxy } from "./DTAreaProxy";
import { DesktopProxyMutationEvent_Subject } from "./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Subject";
import { DTAreaProxyMutationEvent_Observer } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { _BaseStateFullProxy } from "./FrameProxies/_StateProxy";
import { IStateFullProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { StateFullProxyDisciminator } from "../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { IStateOfDTFrame } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { IDTFramesNeeded } from "../../../../../Shared/scripts/Interfaces/Agents/IContentEditorCountsNeeded";

export class DesktopSFProxy extends _BaseStateFullProxy<IStateOfDesktop> implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.Desktop;
  //DesktopProxyMutationEvent_Observer: DesktopProxyMutationEvent_Observer;
  private AssociatedDoc: ScDocumentFacade;
  private DesktopProxyMutationEvent_Subject: DesktopProxyMutationEvent_Subject;
  private DTAreaProxy: DTAreaProxy;
  private DTPopUpMenuProxy: DTPopUpMenuProxy;
  private DTStartBarProxy: DTStartBarProxy;
  public DTAreaProxyMutationEvent_Observer: DTAreaProxyMutationEvent_Observer;

  constructor(hindeCore: IHindeCore, associatedDoc: ScDocumentFacade) {
    super(hindeCore);
    this.Logger.CTORStart(DesktopSFProxy.name);

    if (associatedDoc) {
      this.AssociatedDoc = associatedDoc;
    } else {
      this.ErrorHand.ErrorAndThrow(DesktopSFProxy.name, 'No associated doc');
    }

    this.Logger.CTOREnd(DesktopSFProxy.name);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    try {
      this.Logger.FuncStart(this.InstantiateAsyncMembers.name, DesktopSFProxy.name);

      let initReportDesktopProxy = new InitReport_DesktopProxy();

      this.DTAreaProxy = new DTAreaProxy(this.HindeCore, this.AssociatedDoc);
      this.DTAreaProxy.InstantiateAsyncMembers();

      this.DTStartBarProxy = new DTStartBarProxy(this.HindeCore, this.AssociatedDoc);
      this.DTStartBarProxy.Instantiate_DTStartBarProxy();

      this.DTAreaProxyMutationEvent_Observer = new DTAreaProxyMutationEvent_Observer(this.HindeCore, this.OnAreaProxyMutationEvent.bind(this));
      this.DesktopProxyMutationEvent_Subject = new DesktopProxyMutationEvent_Subject(this.HindeCore);

      this.RecipeBasics = new RecipeBasics(this.HindeCore);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err);
    }

    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, DesktopSFProxy.name);
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, DesktopSFProxy.name);

    this.DTAreaProxy.WireEvents();
    this.DTStartBarProxy.WireEvent();

    this.DTAreaProxy.DTAreaProxyMutationEvent_Subject.RegisterObserver(this.DTAreaProxyMutationEvent_Observer);

    this.Logger.FuncEnd(this.WireEvents.name, DesktopSFProxy.name);
  }

  async GetState(): Promise<IStateOfDesktop> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, DesktopSFProxy.name);

      let toReturnDesktopState: IStateOfDesktop = new DefaultStateOfDesktop();

      await this.DTAreaProxy.GetState()
        .then((stateOfDTAreaProxy: IStateOfDTArea) => toReturnDesktopState.StateOfDTArea = stateOfDTAreaProxy)
        .then(() => resolve(toReturnDesktopState))
        .catch((err) => reject(this.GetState.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetState.name, DesktopSFProxy.name);
    });
  }

  async SetState(stateOfDesktop: IStateOfDesktop): Promise<void> {
    this.Logger.FuncStart(this.SetState.name, DesktopSFProxy.name);
    this.TaskMonitor.AsyncTaskStarted(this.SetState.name);

    try {
      let promAr: Promise<void>[] = [];

      this.DTAreaProxy.SetState(stateOfDesktop.StateOfDTArea)
        .then((dtFramesNeeded: IDTFramesNeeded) => {
          this.Logger.LogAsJsonPretty('dtFramesNeeded', dtFramesNeeded);

          dtFramesNeeded.DiscriminatorAr.forEach((disciminator: StateFullProxyDisciminator) => {
            if (disciminator === StateFullProxyDisciminator.ContentEditor) {
              promAr.push(this.AddContentEditorAsync());
            } else if (disciminator === StateFullProxyDisciminator.PackageDesigner) {
              promAr.push(this.AddPackageDesignerAsync())
            } else {
              this.ErrorHand.ErrorAndThrow(this.SetState.name, 'unhandled disciminator ')
            }
          })
        })
        .then(() => Promise.all(promAr))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.SetState.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetState.name, err);
    }

    this.TaskMonitor.AsyncTaskCompleted(this.SetState.name);
    this.Logger.FuncEnd(this.SetState.name, DesktopSFProxy.name);
  }

  TriggerInboundEventsAsync() {
    // n/a
  }

  //-----------------------------------------------------------------------

  async PublishItem(): Promise<void> {
    await this.DTAreaProxy.PublishTopFrame();
  }

  async AddPackageDesignerAsync(): Promise<void> {

    try {
      this.DTPopUpMenuProxy = new DTPopUpMenuProxy(this.HindeCore);

      await this.DTStartBarProxy.TriggerRedButton()
        .then(() => this.TaskMonitor.AsyncTaskStarted(this.AddContentEditorAsync.name))
        .then(() => this.DTPopUpMenuProxy.RecipeAddNewPackageDesignerToDesktop(this.AssociatedDoc))
        .then(() => this.RecipeBasics.WaitForTimePeriod(ContentConst.Const.Numbers.Desktop.TimeNewCEWaitForScOverlayToClearMs, this.AddContentEditorAsync.name))//ui-widget-overlay ui-front
        .then(() => this.TaskMonitor.AsyncTaskCompleted(this.AddContentEditorAsync.name))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.AddContentEditorAsync.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.AddContentEditorAsync.name, err);
    }

  }
  async AddContentEditorAsync(): Promise<void> {
    try {
      this.DTPopUpMenuProxy = new DTPopUpMenuProxy(this.HindeCore);

      await this.DTStartBarProxy.TriggerRedButton()
        .then(() => this.TaskMonitor.AsyncTaskStarted(this.AddContentEditorAsync.name))
        .then(() => this.DTPopUpMenuProxy.RecipeAddNewContentEditorToDesktop(this.AssociatedDoc))
        // sitecore briefly pops up a div inside of iframe jqueryModalDialogsFrame with a class of ui-widget-overlay ui-front that appears to block mouse clicks
        // this pause is intended to allow time for it to finish its work and be removed.
        // at some point this could be modified to wait for a shorter amount of time, and then look to make sure the div is not present
        .then(() => this.RecipeBasics.WaitForTimePeriod(ContentConst.Const.Numbers.Desktop.TimeNewCEWaitForScOverlayToClearMs, this.AddContentEditorAsync.name))//ui-widget-overlay ui-front
        .then(() => this.TaskMonitor.AsyncTaskCompleted(this.AddContentEditorAsync.name))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.AddContentEditorAsync.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.AddContentEditorAsync.name, err);
    }
  }

  OnAreaProxyMutationEvent(dTAreaProxyMutationEvent_Payload: IDTAreaProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnAreaProxyMutationEvent.name);

    //this.DesktopProxyMutationEvent.Notify
    this.DTStartBarProxy.OnTreeMutationEvent_DesktopStartBarProxy(dTAreaProxyMutationEvent_Payload);
    this.Logger.FuncEnd(this.OnAreaProxyMutationEvent.name);
  }

  //OnDTFrameProxyMutationEvent(frameProxyMutatationEvent_Payload: IDTFrameProxyMutationEvent_Payload) {
  //  this.Logger.FuncStart(this.OnDTFrameProxyMutationEvent.name);

  //  this.Logger.FuncEnd(this.OnDTFrameProxyMutationEvent.name);
  //}

  //OnDTFrameProxyMutation(desktopDTFrameProxyMutatationEvent_Payload: INativeIFrameAddedEvent_Payload) {
  //  //todo - put back?
  //  //if (this.DesktopProxyMutationEvent_Subject) {
  //  //  this.DesktopProxyMutationEvent_Subject.NotifyObservers(desktopDTFrameProxyMutatationEvent_Payload);
  //  //}
  //}

  GetAssociatedDoc(): ScDocumentFacade {
    return this.AssociatedDoc;
  }
}