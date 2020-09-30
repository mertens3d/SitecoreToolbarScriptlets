﻿import { HindSiteUiLayer } from "../../PopUpUi/scripts/HindSiteUiLayer";
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
import { ICommandDefinitionBucket } from "../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket";
import { IHindSiteUiLayer } from "../../Shared/scripts/Interfaces/IHindSiteUiLayer";
import { SharedConst } from "../../Shared/scripts/SharedConst";
import { CommandManager } from "./Managers/CommandManager";
import { MessageBroker_PopUp } from "./Agents/PopUpMessagesBrokerAgent";
import { PopUpBrowserProxy } from "./Proxies/BrowserProxy";
import { CommandType } from "../../Shared/scripts/Enums/CommandType";
import { HandlersForInternal } from "./Classes/HandlersForInternal";
import { BrowserTabAgent } from "./Agents/BrowserTabAgent";
import { IUiCommandFlagRaisedEvent_Payload } from "../../Shared/scripts/Events/UiCommandFlagRaisedEvent/IUiCommandFlagRaisedEvent_Payload";
import { CommandDefintionFactory } from "./Classes/PopUpCommands";
import { UiCommandFlagRaisedEvent_Observer } from "../../Shared/scripts/Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Observer";
import { ContentReplyReceivedEvent_Observer } from "../../Shared/scripts/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Observer";
import { IControllerMessageReceivedEvent_Payload } from "../../Shared/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

class PopUpControllerLayer {
  private RepoAgent: IRepositoryAgent;
  private SettingsAgent: ISettingsAgent;
  private PopUpMessageBrokerAgent: MessageBroker_PopUp;
  private Logger: LoggerAgent;
  private commandMan: CommandManager;
  private UiCommandRaisedFlag_Observer: UiCommandFlagRaisedEvent_Observer;
  private UiLayer: IHindSiteUiLayer;
  private CommandDefintionBucket: ICommandDefinitionBucket;
  private ScUrlAgent: IScUrlAgent;
  private BrowserProxy: PopUpBrowserProxy;
  HandlersForInternal: HandlersForInternal;
  BrowserTabAgent: BrowserTabAgent;
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
    this.PopUpMessageBrokerAgent = new MessageBroker_PopUp(this.Logger, this.BrowserProxy, this.SettingsAgent);
  }

  private async InstantiateManagers_Controller() {
    this.Logger.FuncStart(this.InstantiateManagers_Controller.name);

    this.CommandDefintionBucket = new CommandDefintionFactory(this.Logger).BuildMenuCommandParamsBucket();
    this.UiLayer = new HindSiteUiLayer.HindSiteUiLayer(this.Logger, this.SettingsAgent, this.CommandDefintionBucket, this.ScUrlAgent);

    this.BrowserTabAgent = new BrowserTabAgent(this.Logger, this.ScUrlAgent, this.SettingsAgent);
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

  OnContentReplyReceivedEventCallBack(dataContentReplyReceivedEvent_Payload: IControllerMessageReceivedEvent_Payload) {
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
      this.PopUpMessageBrokerAgent.SendCommandToContentAsync(uiCommandFlagRaisedEvent_Payload.MsgFlag, uiCommandFlagRaisedEvent_Payload.StateOfPopUp)
    } else {
      this.commandMan.HandleCommandTypePopUp(uiCommandFlagRaisedEvent_Payload);
    }
  }

  private Start() {
    this.commandMan.TriggerPingEventAsync();
  }

  private Init_Logger() {
    this.Logger.FuncStart(this.Init_Logger.name);

    let enableLoggingSetting: HindSiteSettingWrapper = this.SettingsAgent.HindSiteSettingsBucket.GetByKey(SettingKey.EnableDebugging);

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