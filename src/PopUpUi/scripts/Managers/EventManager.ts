import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { ModuleKey } from '../../../Shared/scripts/Enums/ModuleKey';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IUiModuleButton } from "../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { PopUpMessagesBrokerAgent } from '../Agents/PopUpMessagesBrokerAgent';
import { HandlersForInternal } from '../Classes/HandlersExternal';
import { ISingleClickEvent_Payload } from '../Events/SingleClickEvent/ISingleClickEvent_Payload';
import { SingleClickEvent_Observer } from "../Events/SingleClickEvent/SingleClickEvent_Observer";
import { UiModulesManager } from './UiManager/UiModulesManager';

export class EventManager extends LoggableBase {
  Handlers: HandlersForInternal

  PopUpMesssageBrokerAgent: PopUpMessagesBrokerAgent; // for .bind(this)
  UiModulesMan: UiModulesManager;
  CommandButtonSingleClickEvent_Observer: SingleClickEvent_Observer;

  constructor(logger: ILoggerAgent, handlers: HandlersForInternal, popupMessageBrokerAgent: PopUpMessagesBrokerAgent,  uimodulesMan: UiModulesManager) {
    super(logger);
    this.Handlers = handlers;
    this.PopUpMesssageBrokerAgent = popupMessageBrokerAgent;
    this.UiModulesMan = uimodulesMan;

    if (StaticHelpers.IsNullOrUndefined([handlers, popupMessageBrokerAgent,uimodulesMan])) {
      throw (UiModulesManager.name + ' null at constructor');
    }


  }

  OnSingleClickEvent(singleClickEventPayload: ISingleClickEvent_Payload) {
    this.Logger.Log('single click');
    //let stateOPopUp: IStateOfPopUp = this.UiModulesMan.GetStateOfPopUp(singleClickEventPayload.HandlerData.MsgFlag);
    this.PopUpMesssageBrokerAgent.SendCommandToContentImprovedAsync(singleClickEventPayload.HandlerData.MsgFlag)
  };

  InitEventManager(): void {
    this.CommandButtonSingleClickEvent_Observer = new SingleClickEvent_Observer(this.Logger, this.OnSingleClickEvent.bind(this));
    this.Logger.FuncStart(this.InitEventManager.name);
    this.Logger.FuncEnd(this.InitEventManager.name);
  }

  WireEvents(): void {
    this.Logger.FuncStart(this.WireEvents.name);
    this.ListenForCommandEvents();

    this.Logger.FuncEnd(this.WireEvents.name);
  }

  ListenForSettingsEvents() {
  }

  ListenForCommandEvents() {
    let baseButtonModules: IUiModuleButton[] = this.UiModulesMan.GetBaseButtonModules();

    if (baseButtonModules) {
      baseButtonModules.forEach((baseButtonModule: IUiModuleButton) => {
        if (!StaticHelpers.IsNullOrUndefined(baseButtonModule.SingleButtonClickEvent_Subject)) {
          baseButtonModule.SingleButtonClickEvent_Subject.RegisterObserver(this.CommandButtonSingleClickEvent_Observer);
        } else {
          this.Logger.WarningAndContinue(this.ListenForCommandEvents.name, 'null SingleButtonClickEvent_Subject ' + ModuleKey[baseButtonModule.ModuleKey]);
        }
      });
    }
  }

  //async RouteAllCommandEvents(data: ICommandHandlerDataForPopUp): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.RouteAllCommandEvents.name);
  //    await data.EventHandlerData.Handler(data)
  //      .then(() => resolve())
  //      .catch((err) => reject(this.RouteAllCommandEvents.name + ' | ' + err));
  //    this.Logger.FuncEnd(this.RouteAllCommandEvents.name);
  //  });
  //}
}