import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { MenuCommandKey } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ICommandHandlerDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForPopUp";
import { PopUpMessagesBrokerAgent } from '../Agents/PopUpMessagesBrokerAgent';
import { SingleClickEvent_Observer } from "../Events/SelectSnapUiMutationEvent/SingleClickEvent_Observer";
import { TypButtonModule } from '../UiModules/ButtonModules/TypButtonModule';
import { _baseButtonModule } from '../UiModules/ButtonModules/_baseButtonModule';
import { SelectSnapshotModule } from '../UiModules/SelectSnapshotModule/SelectSnapshotModule';
import { Handlers } from './Handlers';
import { UiModulesManager } from './UiManager/UiModulesManager';
import { IUiModuleButton } from '../../../Shared/scripts/Interfaces/Agents/IUiModule';

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

  OnSingleClickEvent<ISingleClickEvent_Payload> (singleClickEventPayload: ISingleClickEvent_Payload) {
    alert('click');

  };

  InitEventManager(): void {
    this.ListenForCommandEvents();
  }

  ListenForCommandEvents() {
    let baseButtonModules: IUiModuleButton[] = this.UiModulesMan.GetBaseButtonModules();

    if (baseButtonModules) {
      baseButtonModules.forEach((baseButtonModule: IUiModuleButton) => {
        baseButtonModule.SingleButtonClickEvent_Subject.RegisterObserver(this.CommandButtonSingleClickEvent_Observer);
      });
    }
  }

  async TriggerPingEventAsync(): Promise<void> {
    this.Logger.FuncStart(this.TriggerPingEventAsync.name);

    let pingButtomModule: TypButtonModule = this.UiModulesMan.GetCommandButtonByKey(MenuCommandKey.Ping)

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