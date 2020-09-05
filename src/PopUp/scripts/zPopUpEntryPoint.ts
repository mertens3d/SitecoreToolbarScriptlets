import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent";
import { RepoAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent";
import { AllAgents } from "../../Shared/scripts/Agents/Agents/AllAgents";
import { ConstAllSettings } from "../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings";
import { IGenericSetting } from "../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { HelperAgent } from "../../Shared/scripts/Helpers/Helpers";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
import { LoggerConsoleWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter";
import { LoggerStorageWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter";
import { SettingKey } from "../../Shared/scripts/Enums/3xxx-SettingKey";
import { PopConst } from "./Classes/PopConst";
import { OneGenericSetting } from "../../Shared/scripts/Agents/Agents/SettingsAgent/OneGenericSetting";
import { TabManager } from "./Managers/TabManager";
import { UiManager } from "./Managers/UiManager/UiManager";
import { EventManager } from "./Managers/EventManager";
import { Handlers } from "./Managers/Handlers";
import { MessageManager } from "./Managers/MessageManager";
import { FeedbackModuleMessages } from "./Managers/UiManager/Modules/UiFeedbackModules/FeedbackModuleMessages/FeedbackModuleMessages";
import { PopUpMessagesBroker } from "./Managers/PopUpMessagesBroker/PopUpMessagesBroker";
import { CommandManager } from "./Classes/AllCommands";
import { MenuCommand } from "../../Shared/scripts/Enums/2xxx-MenuCommand";
import { ScUrlAgent } from "../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { IContentState } from "../../Shared/scripts/Interfaces/IContentState/IContentState";
import { RecipeBasics } from "../../Shared/scripts/Classes/PromiseGeneric";

class PopUpEntry {
  RepoAgent: RepoAgent;
  Logger: LoggerAgent;
  SettingsAgent: SettingsAgent;
  HelperAgent: HelperAgent;

  async main() {
    try {
      this.InstantiateAndInitSettingsAndLogger();

      this.InstantiateMembers();
      await this.InitMembers()
        .then(() => { })
        .catch((err) => console.log(err));

      this.Logger.SectionMarker('Begin Standby');
    } catch (e) {
      console.log(e);
    }
  }

  private InstantiateAndInitSettingsAndLogger() {
    this.Logger = new LoggerAgent();

    this.RepoAgent = new RepoAgent(this.Logger);
    this.SettingsAgent = new SettingsAgent(this.Logger, this.RepoAgent);

    var allSettings: IGenericSetting[] = new ConstAllSettings().AllSettings;
    this.SettingsAgent.InitSettingsAgent(allSettings);

    this.InitLogger();
  }

  private async InstantiateMembers() {
    this.HelperAgent = new HelperAgent(this.Logger);
  }

  private InitLogger() {
    this.Logger.FuncStart(this.InitLogger.name);

    let enableLoggingSetting: OneGenericSetting = this.SettingsAgent.GetByKey(SettingKey.EnableLogging);
    this.Logger.MarkerB();

    this.Logger.LogAsJsonPretty('enableLoggingSetting', enableLoggingSetting);
    this.Logger.MarkerC();
    if (PopConst.Const.Debug.ForceLoggingEnabled || enableLoggingSetting.ValueAsBool()) {
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

  async InitHub() {

    let scUrlAgent = new ScUrlAgent(this.Logger);
    let tabMan = new TabManager(this.Logger, this.HelperAgent, scUrlAgent, null); //< -- todo null fix
    let FeedbackModuleMsg: FeedbackModuleMessages = new FeedbackModuleMessages(PopConst.Const.Selector.HS.FeedbackMessages, this.Logger);
    let PopUpMessageBroker: PopUpMessagesBroker = new PopUpMessagesBroker(this.Logger, FeedbackModuleMsg);
    let messageMan = new MessageManager(PopUpMessageBroker, this.Logger);
    let handlers = new Handlers(this.Logger, messageMan, this.SettingsAgent, tabMan);
    let commandMan: CommandManager = new CommandManager(handlers);
    let uiMan = new UiManager(this.Logger, this.SettingsAgent, this.HelperAgent, tabMan, commandMan); //after tabman, after HelperAgent
    let eventMan = new EventManager(this.Logger, this.SettingsAgent, uiMan, handlers); // after uiman

    let self = uiMan;
    handlers.External.AddCallbackCommandComplete((contentState: IContentState) => { uiMan.CallBackCommandComplete(contentState); });

    await
      tabMan.InitTabManager()
        .then(() => PopUpMessageBroker.InitMessageBroker())
        .then(() => uiMan.InitUiManager())
        .then(() => scUrlAgent.InitScUrlAgent())
        .then(() => eventMan.InitEventManager(commandMan.AllMenuCommands, commandMan.GetCommandById(MenuCommand.Ping)))
        .catch((err) => {
          this.Logger.ErrorAndContinue('Pop Up Entry Point Main', JSON.stringify(err));
          throw (err);
        });
  }
  async InitMembers(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.SectionMarker('Begin Init');

      this.InitHub();
      this.Logger.SectionMarker('End Init');
    });
  }
}

let popUpEntry: PopUpEntry = new PopUpEntry();

popUpEntry.main();