import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { ModuleKey } from '../../../Shared/scripts/Enums/ModuleKey';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IUiModuleButton } from "../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { IStateOfPopUpUi } from '../../../Shared/scripts/Interfaces/IMsgPayload';
import { HandlersForInternal } from '../Classes/HandlersExternal';
import { ISingleClickEvent_Payload } from '../Events/SingleClickEvent/ISingleClickEvent_Payload';
import { SingleClickEvent_Observer } from "../Events/SingleClickEvent/SingleClickEvent_Observer";
import { IUiCommandFlagRaisedEvent_Payload } from '../Events/UiCommandFlagRaisedEvent/IUiCommandFlagRaisedEvent_Payload';
import { UiCommandFlagRaisedEvent_Subject } from '../Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Subject';
import { UiModulesManager } from './UiManager/UiModulesManager';

export class UiEventManager extends LoggableBase {
  Handlers: HandlersForInternal

  UiModulesMan: UiModulesManager;
  CommandButtonSingleClickEvent_Observer: SingleClickEvent_Observer;
  UiCommandRaisedFlag_Subject: UiCommandFlagRaisedEvent_Subject;

  constructor(logger: ILoggerAgent, handlers: HandlersForInternal,  uimodulesMan: UiModulesManager) {
    super(logger);
    this.Handlers = handlers;
    this.UiModulesMan = uimodulesMan;

    if (StaticHelpers.IsNullOrUndefined([handlers,  uimodulesMan])) {
      throw (UiModulesManager.name + ' null at constructor');
    }
  }

  Init_EventManager() {
    this.UiCommandRaisedFlag_Subject = new UiCommandFlagRaisedEvent_Subject(this.Logger);
  }

  OnSingleClickEvent(singleClickEventPayload: ISingleClickEvent_Payload) {
    this.Logger.Log('single click');
    //let stateOPopUp: IStateOfPopUp = this.UiModulesMan.GetStateOfPopUp(singleClickEventPayload.HandlerData.MsgFlag);

    let stateOPopUp: IStateOfPopUpUi = this.UiModulesMan.GetStateOfPopUp(singleClickEventPayload.HandlerData.MsgFlag); //todo - this msgFlag is redundunt to the payload below

    let payload: IUiCommandFlagRaisedEvent_Payload = {
      MsgFlag: singleClickEventPayload.HandlerData.MsgFlag,
      StateOfPopUp: stateOPopUp,
    };

    this.UiCommandRaisedFlag_Subject.NotifyObservers(payload);
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
}