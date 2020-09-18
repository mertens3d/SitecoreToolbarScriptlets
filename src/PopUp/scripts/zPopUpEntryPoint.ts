import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent";
import { LoggerConsoleWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter";
import { LoggerStorageWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter";
import { RepositoryAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent";
import { ConstAllSettings } from "../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings";
import { HindSiteSetting } from "../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSetting";
import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { ScUrlAgent } from "../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
import { MenuCommandKey } from "../../Shared/scripts/Enums/2xxx-MenuCommand";
import { SettingKey } from "../../Shared/scripts/Enums/3xxx-SettingKey";
import { IHindSiteSetting } from "../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { SharedConst } from "../../Shared/scripts/SharedConst";
import { CommandManager } from "./Classes/AllCommands";
import { PopConst } from "./Classes/PopConst";
import { EventManager } from "./Managers/EventManager";
import { Handlers } from "./Managers/Handlers";
import { PopUpMessagesBrokerAgent } from "./Agents/PopUpMessagesBrokerAgent";
import { BrowserTabAgent } from "./Managers/TabManager";
import { UiManager } from "./Managers/UiManager/UiManager";
import { ContentReplyReceivedEvent_Observer } from "../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Observer";
import { FeedbackModuleMessages_Observer } from "./UiModules/UiFeedbackModules/FeedbackModuleMessages";
import { SelectSnapshotModule } from "./UiModules/SelectSnapshotModule/SelectSnapshotModule";

class PopUpEntry {
  RepoAgent: RepositoryAgent;
  Logger: LoggerAgent;
  SettingsAgent: SettingsAgent;
  scUrlAgent: ScUrlAgent;
  handlers: Handlers;
  uiMan: UiManager;
  FeedbackModuleMsg_Observer: FeedbackModuleMessages_Observer;
  eventMan: EventManager;
  commandMan: CommandManager;
  BrowserTabAgent: BrowserTabAgent;
  PopUpMessageBrokerAgent: PopUpMessagesBrokerAgent;
    ModuleSelectSnapShots: SelectSnapshotModule;

  async main() {
    try {
      this.InstantiateAndInitSettingsAndLogger();
      this.InstantiateAgents();
      this.InstantiateMembers();

      this.Logger.SectionMarker('Begin Init');

      await this.InitHub()
        .then(() => this.WireCustomevents())
        .then(() => this.eventMan.TriggerPingEventAsync(this.commandMan.GetMenuCommandParamsByKey(MenuCommandKey.Ping)))
        .then(() => this.Logger.Log(this.main.name + ' completed'))
        .catch((err) => console.log(err));

      this.Logger.SectionMarker('End Init');

      this.Logger.SectionMarker('Begin Standby');
    } catch (err) {
      console.log(err);
    }
  }

  private InstantiateAndInitSettingsAndLogger() {
    this.Logger = new LoggerAgent();

    this.RepoAgent = new RepositoryAgent(this.Logger);
    this.SettingsAgent = new SettingsAgent(this.Logger, this.RepoAgent);

    var allSettings: IHindSiteSetting[] = new ConstAllSettings().AllSettings;
    this.SettingsAgent.InitSettingsAgent(allSettings);

    this.InitLogger();
  }

  private async InstantiateMembers() {
    //this.messageMan = new PopUpMessageManager(this.PopUpMessageAgent, this.Logger);

    this.ModuleSelectSnapShots = new SelectSnapshotModule(this.Logger, PopConst.Const.Selector.HS.SelStateSnapShot);

    this.handlers = new Handlers(this.Logger, this.SettingsAgent, this.BrowserTabAgent, this.PopUpMessageBrokerAgent, this.ModuleSelectSnapShots);
    this.commandMan = new CommandManager(this.Logger, this.handlers);
    this.uiMan = new UiManager(this.Logger, this.SettingsAgent, this.BrowserTabAgent, this.commandMan, this.ModuleSelectSnapShots); //after tabman, after HelperAgent
    this.eventMan = new EventManager(this.Logger, this.SettingsAgent, this.uiMan, this.handlers, this.PopUpMessageBrokerAgent, this.ModuleSelectSnapShots); // after uiman
  }

  private InitLogger() {
    this.Logger.FuncStart(this.InitLogger.name);

    let enableLoggingSetting: HindSiteSetting = this.SettingsAgent.GetByKey(SettingKey.EnableLogging);

    if (SharedConst.Const.Debug.ForceLoggingEnabled || enableLoggingSetting.ValueAsBool()) {
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

  InstantiateAgents() {
    this.scUrlAgent = new ScUrlAgent(this.Logger);
    this.BrowserTabAgent = new BrowserTabAgent(this.Logger, this.scUrlAgent, this.SettingsAgent);
    this.PopUpMessageBrokerAgent = new PopUpMessagesBrokerAgent(this.Logger);
  }

  WireCustomevents() {
    this.Logger.FuncStart(this.WireCustomevents.name);

    let contentReplyReceivedEvent_Observer = new ContentReplyReceivedEvent_Observer(this.Logger, this.uiMan);
    this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(contentReplyReceivedEvent_Observer);

    this.FeedbackModuleMsg_Observer = new FeedbackModuleMessages_Observer(this.Logger, PopConst.Const.Selector.HS.FeedbackMessages);
    this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(this.FeedbackModuleMsg_Observer)
    this.Logger.FuncEnd(this.WireCustomevents.name);
  }

  async InitHub(): Promise<void> {
    try {
      this.uiMan.InitUiManager();

      this.eventMan.InitEventManager(this.commandMan.MenuCommandParamsBucket);

      await this.scUrlAgent.InitScUrlAgent()
        .catch((err) => {
          this.Logger.ErrorAndContinue('Pop Up Entry Point Main', JSON.stringify(err));
          throw (err);
        });
    } catch (err) {
      this.Logger.ErrorAndThrow(this.InitHub.name, err);
    }
  }
}

let popUpEntry: PopUpEntry = new PopUpEntry();

popUpEntry.main();