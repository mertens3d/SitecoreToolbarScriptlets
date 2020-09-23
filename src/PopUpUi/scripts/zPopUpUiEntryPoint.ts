import { LoggableBase } from "../../Content/scripts/Managers/LoggableBase";
import { ScUrlAgent } from "../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { StaticHelpers } from "../../Shared/scripts/Classes/StaticHelpers";
import { ILoggerAgent } from "../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IUiVisibilityTestAgent } from "../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent";
import { ICommandDefinitionBucket, IUiLayer } from "../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket";
import { HandlersForInternal } from "./Classes/HandlersExternal";
import { PopConst } from "./Classes/PopConst";
import { UiCommandFlagRaisedEvent_Subject } from "./Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Subject";
import { BrowserTabAgent } from "./Managers/BrowserTabAgent";
import { UiCommandsManager } from "./Managers/UiCommandsManager";
import { UiEventManager } from "./Managers/UiEventManager";
import { UiModulesManager } from "./Managers/UiManager/UiModulesManager";
import { UiVisibilityTestAgent } from "./Managers/UiManager/UiVisibilityTestAgent";
import { FeedbackModuleMessages_Observer } from "./UiModules/UiFeedbackModules/FeedbackModuleMessages";
import { IScUrlAgent } from "../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { IStateOfPopUp } from "../../Shared/scripts/Interfaces/IStateOfPopUp";
import { IDataContentReplyReceivedEvent_Payload } from "../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export class HindSiteUi extends LoggableBase implements IUiLayer {
  BrowserTabAgent: BrowserTabAgent;
  readonly CommandDefinitionBucket: ICommandDefinitionBucket;
  private UiEventMan: UiEventManager;
  FeedbackModuleMsg_Observer: FeedbackModuleMessages_Observer;
  handlers: HandlersForInternal;
  readonly SettingsAgent: ISettingsAgent;
  private readonly ScUrlAgent: IScUrlAgent;
  UiCommandRaisedFlag_Subject: UiCommandFlagRaisedEvent_Subject;
  UiCommandsMan: UiCommandsManager;
  UiModulesMan: UiModulesManager;
  UiVisibilityTestAgent: IUiVisibilityTestAgent;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, commandDefinitionBucket: ICommandDefinitionBucket, scUrlAgent: IScUrlAgent) {
    super(logger);
    this.Logger.InstantiateStart(HindSiteUi.name);

    try {
      this.SettingsAgent = settingsAgent;
      this.CommandDefinitionBucket = commandDefinitionBucket;
      this.ScUrlAgent = scUrlAgent;

      if (StaticHelpers.IsNullOrUndefined([this.SettingsAgent, this.ScUrlAgent, this.CommandDefinitionBucket])) {
        this.Logger.ErrorAndThrow(HindSiteUi.name, 'null at constructor');
      }

      this.Instantiate_Ui();
      this.Init_Ui();
      this.WireEvents_Ui();
    } catch (err) {
      this.Logger.ErrorAndThrow(HindSiteUi.name, err);
    }

    this.Logger.InstantiateEnd(HindSiteUi.name);
  }

  GetStateOfPopUp(): IStateOfPopUp {

    return this.UiEventMan.GetStateOfPopUp();
    
  }

  OnContentReplyReceivedEventCallBack(dataContentReplyReceivedEvent_Payload: IDataContentReplyReceivedEvent_Payload) {
    this.Logger.FuncStart(this.OnContentReplyReceivedEventCallBack.name);
    this.UiModulesMan.UpdateUiFromContentReply(dataContentReplyReceivedEvent_Payload.StateOfSitecoreWindow, dataContentReplyReceivedEvent_Payload.StateOfStorageSnapShots);
    this.Logger.FuncEnd(this.OnContentReplyReceivedEventCallBack.name);
  }


  private async Instantiate_Ui() {
    this.Logger.FuncStart(this.Instantiate_Ui.name);

    try {
      this.BrowserTabAgent = new BrowserTabAgent(this.Logger, this.ScUrlAgent, this.SettingsAgent);
      this.UiVisibilityTestAgent = new UiVisibilityTestAgent(this.Logger);

      this.handlers = new HandlersForInternal(this.Logger, this.BrowserTabAgent);
      this.UiCommandsMan = new UiCommandsManager(this.Logger, this.CommandDefinitionBucket, this.UiVisibilityTestAgent);
      this.UiModulesMan = new UiModulesManager(this.Logger, this.SettingsAgent, this.BrowserTabAgent, this.CommandDefinitionBucket, this.UiCommandsMan, this.UiVisibilityTestAgent, this.ScUrlAgent); //after tabman, after HelperAgent
      this.UiEventMan = new UiEventManager(this.Logger, this.handlers, this.UiModulesMan); // after uiman
    } catch (err) {
      console.log(err);
    }

    this.Logger.FuncEnd(this.Instantiate_Ui.name);
  }

  private async Init_Ui(): Promise<void> {
    this.Logger.FuncEnd(this.Init_Ui.name);

    this.UiModulesMan.Init_UiMan();
    this.UiEventMan.Init_UiEventManager();

    this.Logger.FuncEnd(this.Init_Ui.name);
  }

  private WireEvents_Ui() {
    this.Logger.FuncStart(this.WireEvents_Ui.name);

    this.UiModulesMan.WireEvents_ModulesManager();
    this.UiEventMan.WireEvents_UiEventMan();

    this.FeedbackModuleMsg_Observer = new FeedbackModuleMessages_Observer(this.Logger, PopConst.Const.Selector.HS.FeedbackMessages);
    this.UiCommandRaisedFlag_Subject = new UiCommandFlagRaisedEvent_Subject(this.Logger);

    this.Logger.FuncEnd(this.WireEvents_Ui.name);
  }
}