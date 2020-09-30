import { StaticHelpers } from "../../Shared/scripts/Classes/StaticHelpers";
import { ILoggerAgent } from "../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScUrlAgent } from "../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { ISettingsAgent } from "../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IUiVisibilityTestAgent } from "../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent";
import { ICommandDefinitionBucket } from "../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket";
import { IHindSiteUiLayer } from "../../Shared/scripts/Interfaces/IHindSiteUiLayer";
import { IStateOfPopUp } from "../../Shared/scripts/Interfaces/IStateOfPopUp";
import { PopConst } from "../../Shared/scripts/Const/PopConst";
import { UiCommandsManager } from "./Managers/UiCommandsManager";
import { UiEventManager } from "./Managers/UiEventManager";
import { UiModulesManager } from "./Managers/UiManager/UiModulesManager";
import { UiVisibilityTestAgent } from "./Managers/UiManager/UiVisibilityTestAgent";
import { DebuggingFeedbackModuleMessages_Observer } from "./UiModules/UiFeedbackModules/FeedbackModuleMessages";
import { LoggableBase } from "../../Shared/scripts/LoggableBase";
import { UiCommandFlagRaisedEvent_Subject } from "../../Shared/scripts/Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Subject";
import { UiCommandFlagRaisedEvent_Observer } from "../../Shared/scripts/Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Observer";
import { IControllerMessageReceivedEvent_Payload } from "../../Shared/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export namespace HindSiteUiLayer {
  export class HindSiteUiLayer extends LoggableBase implements IHindSiteUiLayer {
    readonly CommandDefinitionBucket: ICommandDefinitionBucket;
    private UiEventMan: UiEventManager;
    FeedbackModuleMsg_Observer: DebuggingFeedbackModuleMessages_Observer;

    readonly SettingsAgent: ISettingsAgent;
    private readonly ScUrlAgent: IScUrlAgent;
    UiCommandRaisedFlag_Subject: UiCommandFlagRaisedEvent_Subject;
    UiCommandsMan: UiCommandsManager;
    UiModulesMan: UiModulesManager;
    UiVisibilityTestAgent: IUiVisibilityTestAgent;
    UiCommandRaisedFlag_Observer: UiCommandFlagRaisedEvent_Observer;

    constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, commandDefinitionBucket: ICommandDefinitionBucket, scUrlAgent: IScUrlAgent) {
      super(logger);
      this.Logger.CTORStart(HindSiteUiLayer.name);

      try {
        this.SettingsAgent = settingsAgent;
        this.CommandDefinitionBucket = commandDefinitionBucket;
        this.ScUrlAgent = scUrlAgent;

        if (StaticHelpers.IsNullOrUndefined([this.SettingsAgent, this.ScUrlAgent, this.CommandDefinitionBucket])) {
          this.Logger.ErrorAndThrow(HindSiteUiLayer.name, 'null at constructor');
        }

        //there's something that is not finishing before the htmlbutton is needed

        this.Instantiate_Ui();
        this.Init_Ui();
        this.WireEvents_Ui();
      } catch (err) {
        this.Logger.ErrorAndThrow(HindSiteUiLayer.name, err);
      }

      this.Logger.CTOREnd(HindSiteUiLayer.name);
    }

    GetStateOfPopUp(): IStateOfPopUp {
      return this.UiEventMan.GetStateOfPopUp();
    }

    OnContentReplyReceived(dataContentReplyReceivedEvent_Payload: IControllerMessageReceivedEvent_Payload) {
      this.Logger.FuncStart(this.OnContentReplyReceived.name);

      //calling twice as a workaround to make sure snapshot select is populated before visibility tests are run
      //todo - fix
      this.UiModulesMan.UpdateUiFromContentReply(dataContentReplyReceivedEvent_Payload.StateOfScUiProxy_Live, dataContentReplyReceivedEvent_Payload.StateOfStorageSnapShots);
      this.UiModulesMan.UpdateUiFromContentReply(dataContentReplyReceivedEvent_Payload.StateOfScUiProxy_Live, dataContentReplyReceivedEvent_Payload.StateOfStorageSnapShots);
      this.Logger.FuncEnd(this.OnContentReplyReceived.name);


      
    }

    private async Instantiate_Ui() {
      this.Logger.FuncStart(this.Instantiate_Ui.name);

      try {
        this.UiVisibilityTestAgent = new UiVisibilityTestAgent(this.Logger);

        this.UiCommandsMan = new UiCommandsManager(this.Logger, this.CommandDefinitionBucket, this.UiVisibilityTestAgent);
        this.UiModulesMan = new UiModulesManager(this.Logger, this.SettingsAgent, this.CommandDefinitionBucket, this.UiCommandsMan, this.UiVisibilityTestAgent, this.ScUrlAgent); //after tabman, after HelperAgent
        this.UiEventMan = new UiEventManager(this.Logger, this.UiModulesMan); // after uiman
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

      this.FeedbackModuleMsg_Observer = new DebuggingFeedbackModuleMessages_Observer(this.Logger, PopConst.Const.Selector.HS.FeedbackMessages);
      this.UiCommandRaisedFlag_Subject = this.UiEventMan.UiCommandRaisedFlag_UiEventManagerRelay_Subject;

      //this.UiCommandRaisedFlag_Observer = new UiCommandFlagRaisedEvent_Observer(this.Logger, this.OnUiCommandEvent_UiEventManagerRelay.bind(this));

      this.Logger.FuncEnd(this.WireEvents_Ui.name);
    }
  }
}