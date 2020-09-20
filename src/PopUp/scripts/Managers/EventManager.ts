import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { MenuCommandKey } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ICommandHandlerDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForPopUp";
import { PopUpMessagesBrokerAgent } from '../Agents/PopUpMessagesBrokerAgent';
import { SingleClickEvent_Observer } from "../Events/SingleClickEvent/SingleClickEvent_Observer";
import { TypCommandButtonModule } from '../UiModules/ButtonModules/TypCommandButtonModule';
import { _baseButtonModule } from '../UiModules/ButtonModules/_baseButtonModule';
import { SelectSnapshotModule } from '../UiModules/SelectSnapshotModule/SelectSnapshotModule';
import { Handlers } from './Handlers';
import { UiModulesManager } from './UiManager/UiModulesManager';
import { IUiModuleButton } from "../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { IUiModule } from '../../../Shared/scripts/Interfaces/Agents/IUiModule';
import { HindSiteSettingCheckBoxModule } from '../UiModules/SettingsModule/HindSiteSettingCheckBoxModule';

export class EventManager extends LoggableBase {
  Handlers: Handlers

  PopUpMesssageBrokerAgent: PopUpMessagesBrokerAgent; // for .bind(this)
  SelectSnapShotModule: SelectSnapshotModule;
  UiModulesMan: UiModulesManager;
  CommandButtonSingleClickEvent_Observer: SingleClickEvent_Observer;

  constructor(logger: ILoggerAgent, handlers: Handlers, popupMessageBrokerAgent: PopUpMessagesBrokerAgent, moduleSelectSnapShot: SelectSnapshotModule, uimodulesMan: UiModulesManager) {
    super(logger);
    this.Handlers = handlers;
    this.PopUpMesssageBrokerAgent = popupMessageBrokerAgent;
    this.SelectSnapShotModule = moduleSelectSnapShot;
    this.UiModulesMan = uimodulesMan;
    this.CommandButtonSingleClickEvent_Observer = new SingleClickEvent_Observer(this.Logger, this.OnSingleClickEvent);
  }

  OnSingleClickEvent<ISingleClickEvent_Payload>(singleClickEventPayload: ISingleClickEvent_Payload) {
    alert('click');
  };

  InitEventManager(): void {
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
          this.Logger.WarningAndContinue(this.ListenForCommandEvents.name, 'null SingleButtonClickEvent_Subject');
        }
      });
    }
  }

  async TriggerPingEventAsync(): Promise<void> {
    this.Logger.FuncStart(this.TriggerPingEventAsync.name);

    let pingButtomModule: TypCommandButtonModule = this.UiModulesMan.GetCommandButtonByKey(MenuCommandKey.Ping)

    // todo - put back let data = this.BuildCommandData(pingCommand);
    // todo this.RouteAllCommandEvents(data);

    this.Logger.FuncEnd(this.TriggerPingEventAsync.name);
  }

  async RouteAllCommandEvents(data: ICommandHandlerDataForPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RouteAllCommandEvents.name);
      await data.EventHandlerData.Handler(data)
        .then(() => resolve())
        .catch((err) => reject(this.RouteAllCommandEvents.name + ' | ' + err));
      this.Logger.FuncEnd(this.RouteAllCommandEvents.name);
    });
  }
}