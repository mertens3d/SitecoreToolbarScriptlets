import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { ModuleKey } from '../../../Shared/scripts/Enums/ModuleKey';
import { IUiCommandFlagRaisedEvent_Payload } from '../../../Shared/scripts/Events/UiCommandFlagRaisedEvent/IUiCommandFlagRaisedEvent_Payload';
import { UiCommandFlagRaisedEvent_Subject } from '../../../Shared/scripts/Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Subject';
import { IHindeCore } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IUiModuleButton } from "../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { IStateOfPopUp } from "../../../Shared/scripts/Interfaces/IStateOfPopUp";
import { IStateOfUiModules } from "../../../Shared/scripts/Interfaces/IStateOfUiModules";
import { _HindeCoreBase } from '../../../Shared/scripts/LoggableBase';
import { ISingleClickEvent_Payload } from '../Events/SingleClickEvent/ISingleClickEvent_Payload';
import { SingleClickEvent_Observer } from "../Events/SingleClickEvent/SingleClickEvent_Observer";
import { UiModulesManager } from './UiManager/UiModulesManager';

export class UiEventManager extends _HindeCoreBase {
  UiModulesMan: UiModulesManager;
  CommandButtonSingleClickEvent_Observer: SingleClickEvent_Observer;
  UiCommandRaisedFlag_UiEventManagerRelay_Subject: UiCommandFlagRaisedEvent_Subject;

  constructor(hindeCore: IHindeCore, uimodulesMan: UiModulesManager) {
    super(hindeCore);
    this.UiModulesMan = uimodulesMan;

    if (StaticHelpers.IsNullOrUndefined([uimodulesMan])) {
      throw (UiModulesManager.name + ' null at constructor');
    }
  }

  Init_UiEventManager() {
    this.Logger.FuncStart(this.Init_UiEventManager.name);
    this.UiCommandRaisedFlag_UiEventManagerRelay_Subject = new UiCommandFlagRaisedEvent_Subject(this.HindeCore);
    this.CommandButtonSingleClickEvent_Observer = new SingleClickEvent_Observer(this.HindeCore, this.OnSingleClickEvent.bind(this));
    this.Logger.FuncEnd(this.Init_UiEventManager.name);
  }

  GetStateOfPopUp(): IStateOfPopUp {
    let stateOfUiModules: IStateOfUiModules = this.UiModulesMan.GetStateOfModules(); //todo - this msgFlag is redundant to the payload below

    let StateOfPopup: IStateOfPopUp = {
      NewNickName: stateOfUiModules.SnapShotNewNickname,
      SelectSnapShotId: stateOfUiModules.SelectSnapshotId,
    }

    return StateOfPopup;
  }

  OnSingleClickEvent(singleClickEventPayload: ISingleClickEvent_Payload) {
    this.Logger.Log('single click');

    let payload: IUiCommandFlagRaisedEvent_Payload = {
      MsgFlag: singleClickEventPayload.HandlerData.MsgFlag,
      CommandType: singleClickEventPayload.HandlerData.CommandType,
      StateOfPopUp: this.GetStateOfPopUp()
    };

    this.UiCommandRaisedFlag_UiEventManagerRelay_Subject.NotifyObserversAsync(payload);
  };

  WireEvents_UiEventMan(): void {
    this.Logger.FuncStart(this.WireEvents_UiEventMan.name);
    this.ListenForCommandEvents();

    this.Logger.FuncEnd(this.WireEvents_UiEventMan.name);
  }

  ListenForSettingsEvents() {
  }

  ListenForCommandEvents() {
    this.Logger.FuncStart(this.ListenForCommandEvents.name);
    let baseButtonModules: IUiModuleButton[] = this.UiModulesMan.GetBaseButtonModules();

    if (baseButtonModules) {
      baseButtonModules.forEach((baseButtonModule: IUiModuleButton) => {
        if (!StaticHelpers.IsNullOrUndefined(baseButtonModule.SingleButtonClickEvent_Subject)) {
          baseButtonModule.SingleButtonClickEvent_Subject.RegisterObserver(this.CommandButtonSingleClickEvent_Observer);
        } else {
          this.ErrorHand.WarningAndContinue(this.ListenForCommandEvents.name, 'null SingleButtonClickEvent_Subject ' + ModuleKey[baseButtonModule.ModuleKey]);
        }
      });
    }
    this.Logger.FuncEnd(this.ListenForCommandEvents.name);
  }
}