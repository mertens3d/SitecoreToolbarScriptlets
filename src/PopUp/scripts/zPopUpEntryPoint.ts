import { ContentReplyReceivedEvent_Observer } from "../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Observer";
import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent";
import { LoggerConsoleWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter";
import { LoggerStorageWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter";
import { RepositoryAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent";
import { ConstAllSettings } from "../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings";
import { HindSiteSetting } from "../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSetting";
import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { ScUrlAgent } from "../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
import { SettingKey } from "../../Shared/scripts/Enums/3xxx-SettingKey";
import { IHindSiteSetting } from "../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { SharedConst } from "../../Shared/scripts/SharedConst";
import { PopUpMessagesBrokerAgent } from "./Agents/PopUpMessagesBrokerAgent";
import { CommandManager } from "./Classes/AllCommands";
import { PopConst } from "./Classes/PopConst";
import { BrowserTabAgent } from "./Managers/BrowserTabAgent";
import { EventManager } from "./Managers/EventManager";
import { Handlers } from "./Managers/Handlers";
import { UiModulesManager } from "./Managers/UiManager/UiModulesManager";
import { SelectSnapshotModule } from "./UiModules/SelectSnapshotModule/SelectSnapshotModule";
import { FeedbackModuleMessages_Observer } from "./UiModules/UiFeedbackModules/FeedbackModuleMessages";

class PopUpEntry {
  RepoAgent: RepositoryAgent;
  Logger: LoggerAgent;
  SettingsAgent: SettingsAgent;
  scUrlAgent: ScUrlAgent;
  handlers: Handlers;
  UiMan: UiModulesManager;
  FeedbackModuleMsg_Observer: FeedbackModuleMessages_Observer;
  EventMan: EventManager;
  commandMan: CommandManager;
  BrowserTabAgent: BrowserTabAgent;
  PopUpMessageBrokerAgent: PopUpMessagesBrokerAgent;
  ModuleSelectSnapShots: SelectSnapshotModule;

  async main() {
    try {
      this.Instantiate();
      this.Init();
      this.WireEvents();
      this.Start();
    } catch (err) {
      console.log(err);
    }
  }

  private Init() {
    this.Logger.SectionMarker('Begin Init');
    this.UiMan.InitUiMan();
    this.EventMan.InitEventManager();

    this.Logger.SectionMarker('End Init');
  }

  private WireEvents() {
    this.scUrlAgent.InitScUrlAgent()
      .then(() => {
        //wire
        this.UiMan.WireEvents();
        this.EventMan.WireEvents();
        this.WireCustomevents();
      })
  }

  private Start() {
    this.EventMan.TriggerPingEventAsync();
    this.Logger.SectionMarker('Begin Standby');

    //.then(() => this.Logger.Log(this.main.name + ' completed'))
    //.catch((err) => console.log(err));
  }

  private InstantiateAndInitSettingsAndLogger() {
    this.Logger = new LoggerAgent();

    this.RepoAgent = new RepositoryAgent(this.Logger);
    this.SettingsAgent = new SettingsAgent(this.Logger, this.RepoAgent);

    var allSettings: IHindSiteSetting[] = new ConstAllSettings().AllSettings;
    this.SettingsAgent.InitSettingsAgent(allSettings);

    this.InitLogger();
  }

  private async Instantiate() {
    this.InstantiateAndInitSettingsAndLogger();

    this.scUrlAgent = new ScUrlAgent(this.Logger);
    this.BrowserTabAgent = new BrowserTabAgent(this.Logger, this.scUrlAgent, this.SettingsAgent);
    this.PopUpMessageBrokerAgent = new PopUpMessagesBrokerAgent(this.Logger);
    //this.messageMan = new PopUpMessageManager(this.PopUpMessageAgent, this.Logger);

    this.ModuleSelectSnapShots = new SelectSnapshotModule(this.Logger, PopConst.Const.Selector.HS.SelStateSnapShot);

    this.handlers = new Handlers(this.Logger, this.SettingsAgent, this.BrowserTabAgent, this.PopUpMessageBrokerAgent, this.ModuleSelectSnapShots);
    this.commandMan = new CommandManager(this.Logger, this.handlers);

    this.UiMan = new UiModulesManager(this.Logger, this.SettingsAgent, this.BrowserTabAgent, this.commandMan, this.ModuleSelectSnapShots); //after tabman, after HelperAgent
    this.EventMan = new EventManager(this.Logger, this.handlers, this.PopUpMessageBrokerAgent, this.ModuleSelectSnapShots, this.UiMan); // after uiman
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

  WireCustomevents() {
    this.Logger.FuncStart(this.WireCustomevents.name);

    let contentReplyReceivedEvent_Observer = new ContentReplyReceivedEvent_Observer(this.Logger, this.UiMan);
    this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(contentReplyReceivedEvent_Observer);

    this.FeedbackModuleMsg_Observer = new FeedbackModuleMessages_Observer(this.Logger, PopConst.Const.Selector.HS.FeedbackMessages);
    this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(this.FeedbackModuleMsg_Observer)
    this.Logger.FuncEnd(this.WireCustomevents.name);
  }
}

let popUpEntry: PopUpEntry = new PopUpEntry();

popUpEntry.main();