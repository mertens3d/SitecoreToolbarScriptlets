import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { InitReport_DesktopProxy } from "../../../../../Shared/scripts/Interfaces/Agents/InitResultsDesktopProxy";
import { IStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTProxy";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../../Shared/scripts/LoggableBase";
import { ScDocumentProxy } from "../../ScDocumentProxy";
import { DTPopUpMenuProxy } from "./DesktopPopUpMenuProxy";
import { DTStartBarProxy } from "./DesktopStartBarProxy/DesktopStartBarProxy";
import { DTAreaProxy } from "./DTAreaProxy";
import { DesktopProxyMutationEvent_Subject } from "./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Subject";
import { DTAreaProxyMutationEvent_Observer } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";

export class DesktopProxy extends _HindeCoreBase {
  //DesktopProxyMutationEvent_Observer: DesktopProxyMutationEvent_Observer;
  private AssociatedDoc: ScDocumentProxy;
  private DesktopProxyMutationEvent_Subject: DesktopProxyMutationEvent_Subject;
  private DTAreaProxy: DTAreaProxy;
  private DTPopUpMenuProxy: DTPopUpMenuProxy;
  private DTStartBarProxy: DTStartBarProxy;
  private RecipeBasics: RecipeBasics;
  public DTAreaProxyMutationEvent_Observer: DTAreaProxyMutationEvent_Observer;

  constructor(hindeCore: IHindeCore, associatedDoc: ScDocumentProxy) {
    super(hindeCore);
    this.Logger.CTORStart(DesktopProxy.name);

    if (associatedDoc) {
      this.AssociatedDoc = associatedDoc;
    } else {
      this.ErrorHand.ErrorAndThrow(DesktopProxy.name, 'No associated doc');
    }

    this.Logger.CTOREnd(DesktopProxy.name);
  }

  async Instantiate_DesktopProxy(): Promise<void> {
    try {
      this.Logger.FuncStart(this.Instantiate_DesktopProxy.name);

      let initReportDesktopProxy = new InitReport_DesktopProxy();

      this.DTAreaProxy = new DTAreaProxy(this.HindeCore, this.AssociatedDoc);
      this.DTAreaProxy.Instantiate();

      this.DTStartBarProxy = new DTStartBarProxy(this.HindeCore, this.AssociatedDoc);
      this.DTStartBarProxy.Instantiate_DTStartBarProxy();

      this.DTAreaProxyMutationEvent_Observer = new DTAreaProxyMutationEvent_Observer(this.HindeCore, this.OnAreaProxyMutationEvent.bind(this));
      this.DesktopProxyMutationEvent_Subject = new DesktopProxyMutationEvent_Subject(this.HindeCore);

      this.RecipeBasics = new RecipeBasics(this.HindeCore);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Instantiate_DesktopProxy.name, err);
    }

    this.Logger.FuncEnd(this.Instantiate_DesktopProxy.name);
  }

  WireEvents_DesktopProxy() {
    this.Logger.FuncStart(this.WireEvents_DesktopProxy.name);

    this.DTAreaProxy.WireEvents();
    this.DTStartBarProxy.WireEvent();

    this.DTAreaProxy.DTAreaProxyMutationEvent_Subject.RegisterObserver(this.DTAreaProxyMutationEvent_Observer);

    this.Logger.FuncEnd(this.WireEvents_DesktopProxy.name);
  }

  async PublishItem(): Promise<void> {
    await this.DTAreaProxy.PublishTopFrame();
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

  GetAssociatedDoc(): ScDocumentProxy {
    return this.AssociatedDoc;
  }

  async GetStateOfDesktop(): Promise<IStateOfDesktop> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfDesktop.name);

      let toReturnDesktopState: IStateOfDesktop = new DefaultStateOfDesktop();

      await this.DTAreaProxy.GetState()
        .then((stateOfDTAreaProxy: IStateOfDTArea) => toReturnDesktopState.StateOfDTArea = stateOfDTAreaProxy)
        .then(() => resolve(toReturnDesktopState))
        .catch((err) => reject(this.GetStateOfDesktop.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetStateOfDesktop.name);
    });
  }

  async SetStateOfDesktopAsync(stateOfDesktop: IStateOfDesktop): Promise<void> {
    this.Logger.FuncStart(this.SetStateOfDesktopAsync.name);
    this.TaskMonitor.AsyncTaskStarted(this.SetStateOfDesktopAsync.name);

    try {
      let promAr: Promise<void>[] = [];

      this.DTAreaProxy.SetStateOfDTArea(stateOfDesktop.StateOfDTArea)
        .then((requestedNewFrameCount: number) => {
          this.Logger.LogVal('StateOfDTFrame count', requestedNewFrameCount.toString());
          for (var idx = 0; idx < requestedNewFrameCount; idx++) {
            promAr.push(this.AddContentEditorAsync());
          }
        }).
        then(() => Promise.all(promAr))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.SetStateOfDesktopAsync.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetStateOfDesktopAsync.name, err);
    }

    this.TaskMonitor.AsyncTaskCompleted(this.SetStateOfDesktopAsync.name);
    this.Logger.FuncEnd(this.SetStateOfDesktopAsync.name);
  }
}