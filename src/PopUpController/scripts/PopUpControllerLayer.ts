﻿import { HindSiteUiLayer } from "../../PopUpUi/scripts/HindSiteUiLayer";
import { LoggerAgent } from "../../Shared/scripts/Agents/LoggerAgent/LoggerAgent";
import { TaskMonitor } from "../../Shared/scripts/Agents/TaskMonitor/TaskMonitor";
import { ErrorHandlerAgent } from "../../Shared/scripts/Agents/ErrorHandler/ErrorHandlerAgent";
import { LoggerConsoleWriter } from "../../Shared/scripts/Agents/LoggerAgent/LoggerConsoleWriter";
import { LoggerStorageWriter } from "../../Shared/scripts/Agents/LoggerAgent/LoggerStorageWriter";
import { RepositoryAgent } from "../../Shared/scripts/Agents/RepositoryAgent/RepositoryAgent";
import { HindSiteSettingWrapper } from "../../Shared/scripts/Agents/SettingsAgent/HindSiteSettingWrapper";
import { SettingsAgent } from "../../Shared/scripts/Agents/SettingsAgent/SettingsAgent";
import { ScPageTypeResolver } from "../../Shared/scripts/Agents/UrlAgent/ScPageTypeResolver";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
import { StaticHelpers } from "../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../Shared/scripts/Enums/30 - SettingKey";
import { IRepositoryAgent } from "../../Shared/scripts/Interfaces/Agents/IRepositoryAgent";
import { IScUrlAgent } from "../../Shared/scripts/Interfaces/Jackets/IScUrlAgent";
import { ISettingsAgent } from "../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { ICommandDefinitionBucket } from "../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket";
import { IHindSiteUiLayer } from "../../Shared/scripts/Interfaces/IHindSiteUiLayer";
import { SharedConst } from "../../Shared/scripts/SharedConst";
import { CommandManager } from "./Managers/CommandManager";
import { MessageBroker_PopUp } from "./Agents/PopUpMessagesBrokerAgent";
import { PopUpBrowserProxy } from "./Proxies/PopUpBrowserProxy";
import { CommandType } from "../../Shared/scripts/Enums/CommandType";
import { HandlersForInternal } from "./Classes/HandlersForInternal";
import { BrowserTabAgent } from "../../Shared/scripts/Agents/BrowserTabAgent";
import { IUiCommandFlagRaisedEvent_Payload } from "../../Shared/scripts/Events/UiCommandFlagRaisedEvent/IUiCommandFlagRaisedEvent_Payload";
import { CommandDefintionFactory } from "./Classes/PopUpCommands";
import { UiCommandFlagRaisedEvent_Observer } from "../../Shared/scripts/Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Observer";
import { ContentReplyReceivedEvent_Observer } from "../../Shared/scripts/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Observer";
import { IControllerMessageReceivedEvent_Payload } from "../../Shared/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IHindeCore } from "../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { TypeDiscriminator } from "../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { UrlJacket } from "../../DOMJacket/UrlJacket";
import { IPopUpBrowserProxy } from "../../Shared/scripts/Interfaces/Proxies/IBrowserProxy";
import { ICommonCore } from "../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { CoreFactory } from "../../Shared/scripts/Classes/CoreFactory";
import { HindeCore } from "../../Shared/scripts/HindeCore";

class PopUpControllerLayer {
  BrowserTabAgent: BrowserTabAgent;
  HandlersForInternal: HandlersForInternal;
  private BrowserProxy: PopUpBrowserProxy;
  private CommandDefintionBucket: ICommandDefinitionBucket;
  private commandMan: CommandManager;
  private HindeCore: IHindeCore;
  private PopUpMessageBrokerAgent: MessageBroker_PopUp;
  private RepoAgent: IRepositoryAgent;
  private ScUrlAgent: IScUrlAgent;
  private SettingsAgent: ISettingsAgent;
  private UiCommandRaisedFlag_Observer: UiCommandFlagRaisedEvent_Observer;
  private UiLayer: IHindSiteUiLayer;

  public async Startup() {
    try {
      this.InitCore();

      this.BrowserProxy = new PopUpBrowserProxy(this.HindeCore);

      await this.BrowserProxy.Init_BrowserProxyAsyncElements()
        .then(() => {
          this.InstantiateAgents_Controller();
          this.InstantiateManagers_Controller();
          this.Init_Controller();
        });
    } catch (err) {
      console.log(err);
    }
  }

  private InitCore() {

    this.HindeCore = null;

    let commonCore: ICommonCore = CoreFactory.BuildCommonCore();
    this.HindeCore = new HindeCore(commonCore);

    //this.HindeCore.Logger = new LoggerAgent(this.HindeCore);
    //this.TaskMonitor = new TaskMonitor(this.HindeCore);
    //this.ErrorHand = new ErrorHandlerAgent(this.HindeCore);

    //this.HindeCore = {
    //  Logger: this.HindeCore.Logger,
    //  ErrorHand: this.ErrorHand,
    //  TaskMonitor: this.TaskMonitor,
    //  TypeDiscriminator: TypeDiscriminator.unknown
    //};

    //this.TaskMonitor.InitAfterErrorHand();


    this.RepoAgent = new RepositoryAgent(this.HindeCore);
    this.SettingsAgent = new SettingsAgent(this.HindeCore, this.RepoAgent);
    this.SettingsAgent.Init_SettingsAgent();
    this.Init_Logger();
  }

  private InstantiateAgents_Controller() {
    let genericUrlAgent = new UrlJacket(this.HindeCore, this.BrowserProxy.Url)
    this.ScUrlAgent = new ScPageTypeResolver(this.HindeCore, genericUrlAgent);
    this.PopUpMessageBrokerAgent = new MessageBroker_PopUp(this.HindeCore, this.BrowserProxy, this.SettingsAgent);
  }

  private async InstantiateManagers_Controller() {
    this.HindeCore.Logger.FuncStart(this.InstantiateManagers_Controller.name);

    this.CommandDefintionBucket = new CommandDefintionFactory(this.HindeCore).BuildMenuCommandParamsBucket();
    this.UiLayer = new HindSiteUiLayer.HindSiteUiLayer(this.HindeCore, this.SettingsAgent, this.CommandDefintionBucket, this.ScUrlAgent);

    let popUpBrowserProxy: IPopUpBrowserProxy = new PopUpBrowserProxy(this.HindeCore);
    this.BrowserTabAgent = new BrowserTabAgent(this.HindeCore, this.ScUrlAgent, this.SettingsAgent, popUpBrowserProxy);
    this.HandlersForInternal = new HandlersForInternal(this.HindeCore, this.BrowserTabAgent);
    this.commandMan = new CommandManager(this.HindeCore, this.PopUpMessageBrokerAgent, this.CommandDefintionBucket, this.UiLayer, this.HandlersForInternal);

    this.HindeCore.Logger.FuncEnd(this.InstantiateManagers_Controller.name);
  }

  private async Init_Controller() {
    this.HindeCore.Logger.SectionMarker(this.Init_Controller.name);

    this.HindeCore.Logger.FuncStart(this.Init_Controller.name);

    this.commandMan.Init_CommandManager();
    this.WireEvents_Controller();
    this.Start();

    this.HindeCore.Logger.FuncEnd(this.Init_Controller.name);
  }

  private WireEvents_Controller() {
    this.HindeCore.Logger.FuncStart(this.WireEvents_Controller.name);

    this.UiCommandRaisedFlag_Observer = new UiCommandFlagRaisedEvent_Observer(this.HindeCore, this.OnUiCommandRaisedEvent.bind(this))

    if (StaticHelpers.IsNullOrUndefined([this.UiLayer.UiCommandRaisedFlag_Subject, this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject])) {
      this.HindeCore.ErrorHand.ErrorAndThrow(this.WireEvents_Controller.name, 'Null check');
    } else {
      this.UiLayer.UiCommandRaisedFlag_Subject.RegisterObserver(this.UiCommandRaisedFlag_Observer);
      let contentReplyReceivedEvent_Observer = new ContentReplyReceivedEvent_Observer(this.HindeCore, this.OnContentReplyReceivedEventCallBack.bind(this));

      this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(contentReplyReceivedEvent_Observer);

      //todo put this back somehow this.FeedbackModuleMsg_Observer) this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(null);
    }

    this.HindeCore.Logger.FuncEnd(this.WireEvents_Controller.name);
  }

  OnContentReplyReceivedEventCallBack(dataContentReplyReceivedEvent_Payload: IControllerMessageReceivedEvent_Payload) {
    this.HindeCore.Logger.FuncStart(this.OnContentReplyReceivedEventCallBack.name);
    if (this.UiLayer) {
      this.UiLayer.OnContentReplyReceived(dataContentReplyReceivedEvent_Payload);
    }

    this.HindeCore.Logger.Log('Return to standby');
    this.HindeCore.Logger.FuncEnd(this.OnContentReplyReceivedEventCallBack.name);
  }

  OnUiCommandRaisedEvent(uiCommandFlagRaisedEvent_Payload: IUiCommandFlagRaisedEvent_Payload) {
    this.HindeCore.Logger.Log('Controller got command message');

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
    this.HindeCore.Logger.FuncStart(this.Init_Logger.name);

    let enableLoggingSetting: HindSiteSettingWrapper = this.SettingsAgent.HindSiteSettingsBucket.GetByKey(SettingKey.EnableDebugging);

    if (SharedConst.Const.Debug.ForceLoggingEnabled || enableLoggingSetting.HindSiteSetting.ValueAsBool()) {
      var RollingLogId = new RollingLogIdDrone(this.SettingsAgent, this.HindeCore);
      var nextLogId = RollingLogId.GetNextLogId();

      let storageLogWriter = new LoggerStorageWriter();
      storageLogWriter.SetLogToStorageKey(nextLogId);

      let consoleLogger = new LoggerConsoleWriter();

      //this.HindeCore.Logger.AddWriter(storageLogWriter);
      this.HindeCore.Logger.AddWriter(consoleLogger);
    }
    this.HindeCore.Logger.FlushBuffer();

    this.HindeCore.Logger.FuncEnd(this.Init_Logger.name);
  }
}

let popUpControllerLayer: PopUpControllerLayer = new PopUpControllerLayer();

popUpControllerLayer.Startup();