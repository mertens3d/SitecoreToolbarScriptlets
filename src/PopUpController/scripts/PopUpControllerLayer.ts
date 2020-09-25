import { ContentReplyReceivedEvent_Observer } from "../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Observer";
import { CommandDefintionFactory } from "../../PopUpUi/scripts/Classes/PopUpCommands";
import { IUiCommandFlagRaisedEvent_Payload } from "../../PopUpUi/scripts/Events/UiCommandFlagRaisedEvent/IUiCommandFlagRaisedEvent_Payload";
import { UiCommandFlagRaisedEvent_Observer } from "../../PopUpUi/scripts/Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Observer";
import { HindSiteUiLayer } from "../../PopUpUi/scripts/HindSiteUiLayer";
import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent";
import { LoggerConsoleWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter";
import { LoggerStorageWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter";
import { RepositoryAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent";
import { HindSiteSettingWrapper } from "../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { ScUrlAgent } from "../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
import { StaticHelpers } from "../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../Shared/scripts/Enums/3xxx-SettingKey";
import { IRepositoryAgent } from "../../Shared/scripts/Interfaces/Agents/IRepositoryAgent";
import { IScUrlAgent } from "../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { ISettingsAgent } from "../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { ICommandDefinitionBucket, IHindSiteUiLayer } from "../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket";
import { SharedConst } from "../../Shared/scripts/SharedConst";
import { CommandManager } from "../Managers/CommandManager";
import { PopUpMessagesBrokerAgent } from "./Agents/PopUpMessagesBrokerAgent";
import { PopUpBrowserProxy } from "./Proxies/BrowserProxy";
import { IDataContentReplyReceivedEvent_Payload } from "../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { CommandType } from "../../Shared/scripts/Enums/CommandType";
import { HandlersForInternal } from "../../PopUpUi/scripts/Classes/HandlersForInternal";
import { PopUpBrowserTabAgent } from "../../PopUpUi/scripts/Managers/PopUpBrowserTabAgent";

class PopUpControllerLayer {
  private RepoAgent: IRepositoryAgent;
  private SettingsAgent: ISettingsAgent;
  private PopUpMessageBrokerAgent: PopUpMessagesBrokerAgent;
  private Logger: LoggerAgent;
  private commandMan: CommandManager;
  private UiCommandRaisedFlag_Observer: UiCommandFlagRaisedEvent_Observer;
  private UiLayer: IHindSiteUiLayer;
  private CommandDefintionBucket: ICommandDefinitionBucket;
  private ScUrlAgent: IScUrlAgent;
  private PopUpBrowserProxy: PopUpBrowserProxy;
  HandlersForInternal: HandlersForInternal;
  BrowserTabAgent: PopUpBrowserTabAgent;
  public async Startup() {
    try {
      this.Preamble_SettingsAndLogger();

      this.PopUpBrowserProxy = new PopUpBrowserProxy(this.Logger);
      await this.PopUpBrowserProxy.Init_BrowserProxy()
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
    this.ScUrlAgent = new ScUrlAgent(this.Logger, this.PopUpBrowserProxy);
    this.ScUrlAgent.Init_ScUrlAgent();
    this.PopUpMessageBrokerAgent = new PopUpMessagesBrokerAgent(this.Logger, this.PopUpBrowserProxy, this.SettingsAgent);
  }

  private async InstantiateManagers_Controller() {
    this.Logger.FuncStart(this.InstantiateManagers_Controller.name);

    this.CommandDefintionBucket = new CommandDefintionFactory(this.Logger).BuildMenuCommandParamsBucket();
    this.UiLayer = new HindSiteUiLayer(this.Logger, this.SettingsAgent, this.CommandDefintionBucket, this.ScUrlAgent);

    this.BrowserTabAgent = new PopUpBrowserTabAgent(this.Logger, this.ScUrlAgent, this.SettingsAgent, this.PopUpBrowserProxy);
    this.HandlersForInternal = new HandlersForInternal(this.Logger, this.BrowserTabAgent);
    this.commandMan = new CommandManager(this.Logger, this.PopUpMessageBrokerAgent, this.CommandDefintionBucket, this.UiLayer, this.HandlersForInternal);

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
      let contentReplyReceivedEvent_Observer = new ContentReplyReceivedEvent_Observer(this.Logger, this.OnContentReplyReceivedEventCallBack.bind(this));

      this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(contentReplyReceivedEvent_Observer);

      //todo put this back somehow this.FeedbackModuleMsg_Observer) this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(null);
    }

    this.Logger.FuncEnd(this.WireEvents_Controller.name);
  }

  OnContentReplyReceivedEventCallBack(dataContentReplyReceivedEvent_Payload: IDataContentReplyReceivedEvent_Payload) {
    this.Logger.FuncStart(this.OnContentReplyReceivedEventCallBack.name);
    if (this.UiLayer) {
      this.UiLayer.OnContentReplyReceived(dataContentReplyReceivedEvent_Payload);
    }

    this.Logger.Log('Return to standby');
    this.Logger.FuncEnd(this.OnContentReplyReceivedEventCallBack.name);
  }

  OnUiCommandRaisedEvent(uiCommandFlagRaisedEvent_Payload: IUiCommandFlagRaisedEvent_Payload) {
    this.Logger.Log('Controller got command message');

    if (uiCommandFlagRaisedEvent_Payload.CommandType === CommandType.Content) {
      this.PopUpMessageBrokerAgent.SendCommandToContentImprovedAsync(uiCommandFlagRaisedEvent_Payload.MsgFlag, uiCommandFlagRaisedEvent_Payload.StateOfPopUp)
    } else {
      this.commandMan.HandleCommandTypePopUp(uiCommandFlagRaisedEvent_Payload);
    }
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

let popUpControllerLayer: PopUpControllerLayer = new PopUpControllerLayer();

popUpControllerLayer.Startup();