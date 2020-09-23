import { PopUpMessagesBrokerAgent } from "./Agents/PopUpMessagesBrokerAgent";
import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent";
import { HindSiteSettingWrapper } from "../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { CommandManager } from "../Managers/CommandManager";
import { RepositoryAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent";
import { IRepositoryAgent } from "../../Shared/scripts/Interfaces/Agents/IRepositoryAgent";
import { ISettingsAgent } from "../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { SharedConst } from "../../Shared/scripts/SharedConst";
import { SettingKey } from "../../Shared/scripts/Enums/3xxx-SettingKey";
import { LoggerStorageWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter";
import { LoggerConsoleWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
import { HindSiteUi } from "../../PopUpUi/scripts/zPopUpUiEntryPoint";
import { UiCommandFlagRaisedEvent_Observer } from "../../PopUpUi/scripts/Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Observer";
import { IUiCommandFlagRaisedEvent_Payload } from "../../PopUpUi/scripts/Events/UiCommandFlagRaisedEvent/IUiCommandFlagRaisedEvent_Payload";
import { ContentReplyReceivedEvent_Observer } from "../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Observer";
import { CommandDefintionFactory } from "../../PopUpUi/scripts/Classes/PopUpCommands";
import { StateHelpers } from "../../PopUpUi/scripts/Classes/StateHelpers";
import { StaticHelpers } from "../../Shared/scripts/Classes/StaticHelpers";
import { ScUrlAgent } from "../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { ICommandDefinitionBucket } from "../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket";
import { PopUpBrowserProxy } from "./Proxies/BrowserProxy";
import { IScUrlAgent } from "../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";

class PopUpControllerEntry {
  private RepoAgent: IRepositoryAgent;
  private SettingsAgent: ISettingsAgent;
  private PopUpMessageBrokerAgent: PopUpMessagesBrokerAgent;
  private Logger: LoggerAgent;
  private commandMan: CommandManager;
  private UiCommandRaisedFlag_Observer: UiCommandFlagRaisedEvent_Observer;
  private UiLayer: HindSiteUi;
  private CommandDefintionBucket: ICommandDefinitionBucket;
  private ScUrlAgent: IScUrlAgent;
  private BrowserProxy: PopUpBrowserProxy;

  public async Startup() {
    try {
      this.Preamble_SettingsAndLogger();

      this.BrowserProxy = new PopUpBrowserProxy(this.Logger);
      await this.BrowserProxy.Init_BrowserProxy()
        .then(() => {
          this.InstantiateAgents_Controller();
          this.InstantiateManagers_Controller();
          this.Init_Controller();
        });
    } catch (err) {
      console.log(err);
    }
  }

  private Preamble_SettingsAndLogger() {
    this.Logger = new LoggerAgent();
    this.RepoAgent = new RepositoryAgent(this.Logger);
    this.SettingsAgent = new SettingsAgent(this.Logger, this.RepoAgent);
    this.SettingsAgent.Init_SettingsAgent();
    this.Init_Logger();
  }

  private InstantiateAgents_Controller() {
    this.ScUrlAgent = new ScUrlAgent(this.Logger, this.BrowserProxy);
    this.ScUrlAgent.Init_ScUrlAgent();
    this.PopUpMessageBrokerAgent = new PopUpMessagesBrokerAgent(this.Logger, this.BrowserProxy, this.SettingsAgent);
  }

  private async InstantiateManagers_Controller() {
    this.Logger.FuncStart(this.InstantiateManagers_Controller.name);

    this.CommandDefintionBucket = new CommandDefintionFactory(this.Logger).BuildMenuCommandParamsBucket();
    this.UiLayer = new HindSiteUi(this.Logger, this.SettingsAgent, this.CommandDefintionBucket, this.ScUrlAgent);
    this.commandMan = new CommandManager(this.Logger, this.PopUpMessageBrokerAgent, this.CommandDefintionBucket, this.UiLayer);

    this.Logger.FuncEnd(this.InstantiateManagers_Controller.name);
  }

  private async Init_Controller() {
    this.Logger.SectionMarker(this.Init_Controller.name);

    this.Logger.FuncStart(this.Init_Controller.name);

    this.commandMan.Init_CommandManager();
    this.WireEvents_Controller();
    this.Start();

    this.Logger.FuncEnd(this.Init_Controller.name);
  }

  private WireEvents_Controller() {
    this.Logger.FuncStart(this.WireEvents_Controller.name);

    this.UiCommandRaisedFlag_Observer = new UiCommandFlagRaisedEvent_Observer(this.Logger, this.OnUiCommandRaisedEvent.bind(this))

    if (StaticHelpers.IsNullOrUndefined([this.UiLayer.UiCommandRaisedFlag_Subject, this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject])) {
      this.Logger.ErrorAndThrow(this.WireEvents_Controller.name, 'Null check');
    } else {
      this.UiLayer.UiCommandRaisedFlag_Subject.RegisterObserver(this.UiCommandRaisedFlag_Observer);
      let contentReplyReceivedEvent_Observer = new ContentReplyReceivedEvent_Observer(this.Logger, this.UiLayer.OnContentReplyReceivedEventCallBack.bind(this.UiLayer)); //todo wire null to ui

      this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(contentReplyReceivedEvent_Observer);

     //todo put this back somehow this.FeedbackModuleMsg_Observer) this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(null);
    }

    this.Logger.FuncEnd(this.WireEvents_Controller.name);
  }

  OnUiCommandRaisedEvent(uiCommandFlagRaisedEvent_Payload: IUiCommandFlagRaisedEvent_Payload) {
    this.Logger.Log('Controller got command message');

    this.PopUpMessageBrokerAgent.SendCommandToContentImprovedAsync(uiCommandFlagRaisedEvent_Payload.MsgFlag, uiCommandFlagRaisedEvent_Payload.StateOfPopUp)
  }

  private Start() {
    this.commandMan.TriggerPingEventAsync();
  }

  private Init_Logger() {
    this.Logger.FuncStart(this.Init_Logger.name);

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

    this.Logger.FuncEnd(this.Init_Logger.name);
  }
}

let popUpControllerEntry: PopUpControllerEntry = new PopUpControllerEntry();

popUpControllerEntry.Startup();