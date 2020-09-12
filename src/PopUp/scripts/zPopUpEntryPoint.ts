import { ContentReplyReceivedEvent_Observer } from "../../Content/scripts/Proxies/Desktop/DesktopProxy/CommandCompleted_Observer";
import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent";
import { LoggerConsoleWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter";
import { LoggerStorageWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter";
import { RepositoryAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent";
import { ConstAllSettings } from "../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings";
import { HindSiteSetting } from "../../Shared/scripts/Agents/Agents/SettingsAgent/OneGenericSetting";
import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { ScUrlAgent } from "../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
import { MenuCommand } from "../../Shared/scripts/Enums/2xxx-MenuCommand";
import { SettingKey } from "../../Shared/scripts/Enums/3xxx-SettingKey";
import { IGenericSetting } from "../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { SharedConst } from "../../Shared/scripts/SharedConst";
import { CommandManager } from "./Classes/AllCommands";
import { PopConst } from "./Classes/PopConst";
import { EventManager } from "./Managers/EventManager";
import { Handlers } from "./Managers/Handlers";
import { PopUpMessageManager } from "./Managers/MessageManager";
import { PopUpMessagesBroker } from "./Managers/PopUpMessagesBroker/PopUpMessagesBroker";
import { TabManager } from "./Managers/TabManager";
import { UiManager } from "./Managers/UiManager/UiManager";
import { FeedbackModuleMessages } from "./UiModules/UiFeedbackModules/FeedbackModuleMessages/FeedbackModuleMessages";

class PopUpEntry {
  RepoAgent: RepositoryAgent;
  Logger: LoggerAgent;
  SettingsAgent: SettingsAgent;

  async main() {
    try {
      this.InstantiateAndInitSettingsAndLogger();

      this.InstantiateMembers();
      await this.InitMembers()
        .then(() =>  this.Logger.Log(this.main.name + ' completed'))
        .catch((err) => console.log(err));

      this.Logger.SectionMarker('Begin Standby');
    } catch (err) {
      console.log(err);
    }
  }

  private InstantiateAndInitSettingsAndLogger() {
    this.Logger = new LoggerAgent();

    this.RepoAgent = new RepositoryAgent(this.Logger);
    this.SettingsAgent = new SettingsAgent(this.Logger, this.RepoAgent);

    var allSettings: IGenericSetting[] = new ConstAllSettings().AllSettings;
    this.SettingsAgent.InitSettingsAgent(allSettings);

    this.InitLogger();
  }

  private async InstantiateMembers() {
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

  async InitHub(): Promise<void> {
    try {
      let scUrlAgent = new ScUrlAgent(this.Logger);
      let tabMan = new TabManager(this.Logger, scUrlAgent, null); //< -- todo null fix
      let FeedbackModuleMsg: FeedbackModuleMessages = new FeedbackModuleMessages(PopConst.Const.Selector.HS.FeedbackMessages, this.Logger);
      let PopUpMessageBroker: PopUpMessagesBroker = new PopUpMessagesBroker(this.Logger, FeedbackModuleMsg);
      let messageMan = new PopUpMessageManager(PopUpMessageBroker, this.Logger);
      let handlers = new Handlers(this.Logger, messageMan, this.SettingsAgent, tabMan);
      let commandMan: CommandManager = new CommandManager(handlers);
      let uiMan = new UiManager(this.Logger, this.SettingsAgent, tabMan, commandMan); //after tabman, after HelperAgent
      let eventMan = new EventManager(this.Logger, this.SettingsAgent, uiMan, handlers); // after uiman

      let self = uiMan;
      handlers.External.RegisterObserver(new ContentReplyReceivedEvent_Observer(this.Logger, uiMan));

      uiMan.InitUiManager();

      await scUrlAgent.InitScUrlAgent()
        .then(() => eventMan.InitEventManager(commandMan.AllMenuCommands, commandMan.GetCommandById(MenuCommand.Ping)))
        .catch((err) => {
          this.Logger.ErrorAndContinue('Pop Up Entry Point Main', JSON.stringify(err));
          throw (err);
        });
    } catch (err) {
      this.Logger.ErrorAndThrow(this.InitHub.name, err);
    }
  }

  async InitMembers(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.SectionMarker('Begin Init');

      await this.InitHub()
        .then(() => resolve())
        .catch((err) => reject(this.InitMembers.name + ' ' + err));

      this.Logger.SectionMarker('End Init');
    });
  }
}

let popUpEntry: PopUpEntry = new PopUpEntry();

popUpEntry.main();