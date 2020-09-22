import { PopUpMessagesBrokerAgent } from "../../PopUpController/Agents/PopUpMessagesBrokerAgent";
import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent";
import { HindSiteSettingWrapper } from "../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { CommandManager } from "../../PopUpUi/scripts/Classes/CommandManager";
import { RepositoryAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent";
import { IRepositoryAgent } from "../../Shared/scripts/Interfaces/Agents/IRepositoryAgent";
import { ISettingsAgent } from "../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { SharedConst } from "../../Shared/scripts/SharedConst";
import { SettingKey } from "../../Shared/scripts/Enums/3xxx-SettingKey";
import { LoggerStorageWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter";
import { LoggerConsoleWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
import { PopUpUiEntry } from "../../PopUpUi/scripts/zPopUpUiEntryPoint";
import { UiCommandFlagRaisedEvent_Observer } from "../../PopUpUi/scripts/Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Observer";
import { IUiCommandFlagRaisedEvent_Payload } from "../../PopUpUi/scripts/Events/UiCommandFlagRaisedEvent/IUiCommandFlagRaisedEvent_Payload";
import { ContentReplyReceivedEvent_Observer } from "../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Observer";
import { CommandDefintionFactory } from "../../PopUpUi/scripts/Classes/PopUpCommands";

class PopUpControllerEntry {
  RepoAgent: IRepositoryAgent;
  SettingsAgent: ISettingsAgent;
  PopUpMessageBrokerAgent: PopUpMessagesBrokerAgent;
  Logger: LoggerAgent;
  commandMan: CommandManager;
  UiCommandRaisedFlag_Observer: UiCommandFlagRaisedEvent_Observer;
  PopUpUiEntry: PopUpUiEntry;
  CommandDefintionBucket: import("C:/projects/SitecoreToolbarScriptlets/src/Shared/scripts/Interfaces/IMenuCommandDefinitionBucket").ICommandDefinitionBucket;

  async main() {
    try {
      this.Instantiate();
      this.PopUpUiEntry = new PopUpUiEntry();
      this.PopUpUiEntry.main(this.commandMan.CommandDefinitionBucket);
      this.PopUpUiEntry.EventMan.UiCommandRaisedFlag_Subject.RegisterObserver(this.UiCommandRaisedFlag_Observer);
      this.Init();
    } catch (err) {
    }
  }

  private async Init() {
    this.Logger.SectionMarker('Begin Init');
    this.commandMan.Init();
    this.WireEvents();
    this.Start();
  }

  private WireEvents() {
    this.WireCustomevents();
  }

  OnUiCommandRaisedEvent(uiCommandFlagRaisedEvent_Payload: IUiCommandFlagRaisedEvent_Payload) {
    this.Logger.Log('Controller got command message');

    this.PopUpMessageBrokerAgent.SendCommandToContentImprovedAsync(uiCommandFlagRaisedEvent_Payload.MsgFlag, uiCommandFlagRaisedEvent_Payload.StateOfPopUp)
  }

  private Start() {
    this.commandMan.TriggerPingEventAsync();
  }

  private InstantiateAndInitSettingsAndLogger() {
    this.Logger = new LoggerAgent();
    this.RepoAgent = new RepositoryAgent(this.Logger);
    this.SettingsAgent = new SettingsAgent(this.Logger, this.RepoAgent);
    this.SettingsAgent.Init_SettingsAgent();
    this.InitLogger();
  }

  private async Instantiate() {
    this.InstantiateAndInitSettingsAndLogger();
    this.UiCommandRaisedFlag_Observer = new UiCommandFlagRaisedEvent_Observer(this.Logger, this.OnUiCommandRaisedEvent.bind(this))

    this.PopUpMessageBrokerAgent = new PopUpMessagesBrokerAgent(this.Logger);
    this.CommandDefintionBucket = new CommandDefintionFactory(this.Logger).BuildMenuCommandParamsBucket();
    this.commandMan = new CommandManager(this.Logger, this.PopUpMessageBrokerAgent, this.CommandDefintionBucket);
  }
  private InitLogger() {
    this.Logger.FuncStart(this.InitLogger.name);

    let enableLoggingSetting: HindSiteSettingWrapper = this.SettingsAgent.HindSiteSettingsBucket.GetByKey(SettingKey.EnableLogging);

    if (SharedConst.Const.Debug.ForceLoggingEnabled || enableLoggingSetting.HindSiteSetting.ValueAsBool()) {
      var RollingLogId = new RollingLogIdDrone(this.SettingsAgent, this.Logger);
      var nextLogId = RollingLogId.GetNextLogId();

      let storageLogWriter = new LoggerStorageWriter();
      storageLogWriter.SetLogToStorageKey(nextLogId);

      let consoleLogger = new LoggerConsoleWriter();

      //this.Logger.AddWriter(storageLogWriter);
      this.Logger.AddWriter(consoleLogger);
    }
    this.Logger.FlushBuffer();

    this.Logger.FuncEnd(this.InitLogger.name);
  }
  WireCustomevents() {
    let contentReplyReceivedEvent_Observer = new ContentReplyReceivedEvent_Observer(this.Logger, null); //todo wire null to ui
    this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(contentReplyReceivedEvent_Observer);
    this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(null);//todo put this back somehow this.FeedbackModuleMsg_Observer)
  }
}

let popUpControllerEntry: PopUpControllerEntry = new PopUpControllerEntry();

popUpControllerEntry.main();