import { DefaultStateOfDesktop } from "../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop";
import { StaticHelpers } from "../../../../../Shared/scripts/Classes/StaticHelpers";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { InitReport_DesktopProxy } from "../../../../../Shared/scripts/Interfaces/Agents/InitResultsDesktopProxy";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataStateOfDesktop } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { LoggableBase } from "../../../../../Shared/scripts/LoggableBase";
import { DTPopUpMenuProxy } from "./DesktopPopUpMenuProxy";
import { DTStartBarProxy } from "./DesktopStartBarProxy/DesktopStartBarProxy";
import { DTAreaProxyMutationEvent_Observer } from "./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer";
import { IDTFrameProxyMutationEvent_Payload } from "./Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { IDTAreaProxyMutationEvent_Payload } from "./Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload";
import { DTAreaProxy } from "./DTAreaProxy";

export class DesktopProxy extends LoggableBase {
  private DTStartBarProxy: DTStartBarProxy;
  private AssociatedDoc: IDataOneDoc;
  private DTAreaProxy: DTAreaProxy;
  DTPopUpMenuProxy: DTPopUpMenuProxy;
  DTAreaProxyMutationEvent_Observer: DTAreaProxyMutationEvent_Observer;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc) {
    super(logger);
    this.Logger.CTORStart(DesktopProxy.name);

    if (associatedDoc) {
      this.AssociatedDoc = associatedDoc;
    } else {
      this.Logger.ErrorAndThrow(DesktopProxy.name, 'No associated doc');
    }

    this.Logger.CTOREnd(DesktopProxy.name);
  }

  async PublishItem(): Promise<void> {
    await this.DTAreaProxy.PublishTopFrame();
  }

  async Instantiate_DesktopProxy(): Promise<void> {
    try {
      this.Logger.FuncStart(this.Instantiate_DesktopProxy.name);

      let initReportDesktopProxy = new InitReport_DesktopProxy();

      this.DTAreaProxyMutationEvent_Observer = new DTAreaProxyMutationEvent_Observer(this.Logger, this.OnAreaProxyMutationEvent);
      this.DTAreaProxy = new DTAreaProxy(this.Logger, this.AssociatedDoc);

      await this.DTAreaProxy.Instantiate_DTAreaProxy();

      this.DTStartBarProxy = new DTStartBarProxy(this.Logger, this.AssociatedDoc);
      await this.DTStartBarProxy.Instantiate_DTStartBarProxy();

    } catch (err) {
      this.Logger.ErrorAndThrow(this.Instantiate_DesktopProxy.name, err);
    }

    this.Logger.FuncEnd(this.Instantiate_DesktopProxy.name);
  }

  WireEvents_DesktopProxy() {
    this.Logger.FuncStart(this.WireEvents_DesktopProxy.name);

    this.DTAreaProxy.WireEvents_DTAreaProxy();
    this.Logger.FuncEnd(this.WireEvents_DesktopProxy.name);
  }

  async AddContentEditorAsync(): Promise<void> {
    try {
      this.DTPopUpMenuProxy = new DTPopUpMenuProxy(this.Logger);

      await this.DTStartBarProxy.TriggerRedButton()
        .then(() => this.DTPopUpMenuProxy.RecipeAddNewContentEditorToDesktop(this.AssociatedDoc))
        .catch((err) => this.Logger.ErrorAndThrow(this.AddContentEditorAsync.name, err));
    } catch (err) {
      this.Logger.ErrorAndThrow(this.AddContentEditorAsync.name, err);
    }
  }

  OnAreaProxyMutationEvent(payload: IDTAreaProxyMutationEvent_Payload) {
  }

  OnDTFrameProxyMutationEvent(frameProxyMutatationEvent_Payload: IDTFrameProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnDTFrameProxyMutationEvent.name);

    this.DTStartBarProxy.OnTreeMutationEvent_DesktopStartBarProxy(frameProxyMutatationEvent_Payload);

    this.Logger.FuncEnd(this.OnDTFrameProxyMutationEvent.name);
  }

  //OnDTFrameProxyMutation(desktopDTFrameProxyMutatationEvent_Payload: INativeIFrameAddedEvent_Payload) {
  //  //todo - put back?
  //  //if (this.DesktopProxyMutationEvent_Subject) {
  //  //  this.DesktopProxyMutationEvent_Subject.NotifyObservers(desktopDTFrameProxyMutatationEvent_Payload);
  //  //}
  //}

  GetAssociatedDoc(): IDataOneDoc {
    return this.AssociatedDoc;
  }

  async GetStateOfDesktop(): Promise<IDataStateOfDesktop> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfDesktop.name);

      try {
        let toReturnDesktopState: IDataStateOfDesktop = new DefaultStateOfDesktop();
        toReturnDesktopState.StateOfDTArea = this.DTAreaProxy.GetStateOfFrames();

        resolve(toReturnDesktopState);
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

      if (stateOfDesktop && stateOfDesktop.StateOfDTArea) {
        if (!StaticHelpers.IsNullOrUndefined([this.AssociatedDoc])) {
          this.DTAreaProxy.AddToIncomingSetStateList(stateOfDesktop.StateOfDTArea);

          for (var idx = 0; idx < stateOfDesktop.StateOfDTArea.StateOfDTFrames.length; idx++) {
            await this.AddContentEditorAsync()
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