import { DocumentJacket } from "../../../../../DOMJacket/DocumentJacket";
import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { StateFullProxyDisciminator } from "../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { IDTFramesNeeded } from "../../../../../Shared/scripts/Interfaces/Agents/IContentEditorCountsNeeded";
import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTArea } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTProxy";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { DTPopUpMenuProxy } from "./DesktopPopUpMenuProxy";
import { DTStartBarProxy } from "./DesktopStartBarProxy/DesktopStartBarProxy";
import { DTAreaProxy } from "./DTAreaProxy";
import { DTAreaProxyMutationEvent_Observer } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { _BaseStateFullProxy } from "./FrameProxies/_StateProxy";

export class DesktopSFProxy extends _BaseStateFullProxy<IStateOfDesktop> implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.Desktop;
  private DocumentJacket: DocumentJacket;
  private DTAreaProxy: DTAreaProxy;
  private DTPopUpMenuProxy: DTPopUpMenuProxy;
  private DTStartBarProxy: DTStartBarProxy;
  public DTAreaProxyMutationEvent_Observer: DTAreaProxyMutationEvent_Observer;

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket) {
    super(hindeCore);
    this.Logger.CTORStart(DesktopSFProxy.name);

    if (documentJacket) {
      this.DocumentJacket = documentJacket;
    } else {
      this.ErrorHand.ErrorAndThrow(DesktopSFProxy.name, 'No associated doc');
    }

    this.Instantiate();
    this.Logger.CTOREnd(DesktopSFProxy.name);
  }

  private Instantiate() {
    this.RecipeBasics = new RecipeBasics(this.HindeCore);
    this.DTAreaProxy = new DTAreaProxy(this.HindeCore, this.DocumentJacket);
    this.DTStartBarProxy = new DTStartBarProxy(this.HindeCore, this.DocumentJacket);
    this.DTAreaProxyMutationEvent_Observer = new DTAreaProxyMutationEvent_Observer(this.HindeCore, this.OnAreaProxyMutationEvent.bind(this));
  }

  async InstantiateAsyncMembers(): Promise<void> {
    try {
      this.Logger.FuncStart(this.InstantiateAsyncMembers.name, DesktopSFProxy.name);

      this.DTAreaProxy.InstantiateAsyncMembers();
      this.DTStartBarProxy.Instantiate_DTStartBarProxy();

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

      await this.DTAreaProxy.SetState(stateOfDesktop.StateOfDTArea)
        .then((dtFramesNeeded: IDTFramesNeeded) => {
          dtFramesNeeded.DiscriminatorAr.forEach((disciminator: StateFullProxyDisciminator) => {
            if (disciminator === StateFullProxyDisciminator.ContentEditor) {
              promAr.push(this.AddContentEditorFrameAsync());
            } else if (disciminator === StateFullProxyDisciminator.MediaLibrary) {
              promAr.push(this.AddMediaLibraryFrame())
            } else if (disciminator === StateFullProxyDisciminator.PackageDesigner) {
              promAr.push(this.AddPackageDesignerFrame())
            } else if (disciminator === StateFullProxyDisciminator.TemplateManager) {
              promAr.push(this.AddTemplateManagerFrame())
            } else {
              this.ErrorHand.ErrorAndThrow(this.SetState.name, 'unhandled discriminator ->  ' + StateFullProxyDisciminator[disciminator]) 
            }
          })
        })
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.SetState.name, err));

      await Promise.all(promAr)
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.SetState.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.SetState.name + ' ' + DesktopSFProxy.name, err);
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
  

  async AddMediaLibraryFrame(): Promise<void> {
    this.Logger.FuncStart(this.AddMediaLibraryFrame.name);
    try {
      this.DTPopUpMenuProxy = new DTPopUpMenuProxy(this.HindeCore);

      await this.DTStartBarProxy.TriggerRedButton()
        .then(() => this.TaskMonitor.AsyncTaskStarted(this.AddMediaLibraryFrame.name))
        .then(() => this.DTPopUpMenuProxy.RecipeAddNewMediaLibraryToDesktop(this.DocumentJacket))
        .then(() => this.RecipeBasics.WaitForTimePeriod(ContentConst.Const.Numbers.Desktop.TimeNewCEWaitForScOverlayToClearMs, this.AddMediaLibraryFrame.name))//ui-widget-overlay ui-front
        .then(() => this.TaskMonitor.AsyncTaskCompleted(this.AddMediaLibraryFrame.name))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.AddMediaLibraryFrame.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.AddMediaLibraryFrame.name, err);
    }
    this.Logger.FuncEnd(this.AddMediaLibraryFrame.name);
  }
  
  async AddTemplateManagerFrame(): Promise<void> {
    this.Logger.FuncStart(this.AddTemplateManagerFrame.name);
    try {
      this.DTPopUpMenuProxy = new DTPopUpMenuProxy(this.HindeCore);

      await this.DTStartBarProxy.TriggerRedButton()
        .then(() => this.TaskMonitor.AsyncTaskStarted(this.AddTemplateManagerFrame.name))
        .then(() => this.DTPopUpMenuProxy.RecipeAddNewTemplateManagerToDesktop(this.DocumentJacket))
        .then(() => this.RecipeBasics.WaitForTimePeriod(ContentConst.Const.Numbers.Desktop.TimeNewCEWaitForScOverlayToClearMs, this.AddTemplateManagerFrame.name))//ui-widget-overlay ui-front
        .then(() => this.TaskMonitor.AsyncTaskCompleted(this.AddTemplateManagerFrame.name))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.AddTemplateManagerFrame.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.AddTemplateManagerFrame.name, err);
    }
    this.Logger.FuncEnd(this.AddTemplateManagerFrame.name);
  }





  async AddPackageDesignerFrame(): Promise<void> {
    this.Logger.FuncStart(this.AddPackageDesignerFrame.name);
    try {
      this.DTPopUpMenuProxy = new DTPopUpMenuProxy(this.HindeCore);

      await
        this.DTStartBarProxy.TriggerRedButton()
          .then(() => this.TaskMonitor.AsyncTaskStarted(this.AddPackageDesignerFrame.name))
          .then(() => this.DTPopUpMenuProxy.RecipeAddNewPackageDesignerToDesktop(this.DocumentJacket))
          .then(() => this.RecipeBasics.WaitForTimePeriod(ContentConst.Const.Numbers.Desktop.TimeNewCEWaitForScOverlayToClearMs, this.AddPackageDesignerFrame.name))//ui-widget-overlay ui-front
          .then(() => this.TaskMonitor.AsyncTaskCompleted(this.AddPackageDesignerFrame.name))
          .catch((err) => this.ErrorHand.ErrorAndThrow(this.AddPackageDesignerFrame.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.AddPackageDesignerFrame.name, err);
    }
    this.Logger.FuncEnd(this.AddPackageDesignerFrame.name);
  }



  async AddContentEditorFrameAsync(): Promise<void> {
    this.Logger.FuncStart(this.AddContentEditorFrameAsync.name);
    try {
      this.DTPopUpMenuProxy = new DTPopUpMenuProxy(this.HindeCore);

      await this.DTStartBarProxy.TriggerRedButton()
        .then(() => this.TaskMonitor.AsyncTaskStarted(this.AddContentEditorFrameAsync.name))
        .then(() => this.DTPopUpMenuProxy.RecipeAddNewContentEditorToDesktop(this.DocumentJacket))
        // sitecore briefly pops up a div inside of iframe jqueryModalDialogsFrame with a class of ui-widget-overlay ui-front that appears to block mouse clicks
        // this pause is intended to allow time for it to finish its work and be removed.
        // at some point this could be modified to wait for a shorter amount of time, and then look to make sure the div is not present
        .then(() => this.RecipeBasics.WaitForTimePeriod(ContentConst.Const.Numbers.Desktop.TimeNewCEWaitForScOverlayToClearMs, this.AddContentEditorFrameAsync.name))//ui-widget-overlay ui-front
        .then(() => this.TaskMonitor.AsyncTaskCompleted(this.AddContentEditorFrameAsync.name))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.AddContentEditorFrameAsync.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.AddContentEditorFrameAsync.name, err);
    }
    this.Logger.FuncEnd(this.AddContentEditorFrameAsync.name);
  }

  OnAreaProxyMutationEvent(dTAreaProxyMutationEvent_Payload: IDTAreaProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnAreaProxyMutationEvent.name);

    this.DTStartBarProxy.OnTreeMutationEvent_DesktopStartBarProxy(dTAreaProxyMutationEvent_Payload);
    this.Logger.FuncEnd(this.OnAreaProxyMutationEvent.name);
  }

  GetAssociatedDoc(): DocumentJacket {
    return this.DocumentJacket;
  }
}