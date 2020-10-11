import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { ScUiManager } from "../../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { ApiCommandPayload } from "../../../Shared/scripts/Classes/CommandHandlerDataForContent/ApiCommandPayload";
import { CommandPayloadForInternal } from "../../../Shared/scripts/Classes/CommandHandlerDataForContent/CommandPayloadForInternal";
import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/DefaultMsgContentToController";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { ReqCommandMsgFlag } from "../../../Shared/scripts/Enums/10 - MessageFlag";
import { CommandType } from "../../../Shared/scripts/Enums/CommandType";
import { IHindSiteScUiAPI } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { IApiCallPayload } from "../../../Shared/scripts/Interfaces/IApiCallPayload";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandRouterParams } from "../../../Shared/scripts/Interfaces/ICommandRouterParams";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { CommandStartEndCancelEvent_Observer } from "../Events/CommandStartEndCancelEvent/CommandStartEndCancelEvent_Observer";
import { CommandStartEndCancelEvent_Subject } from "../Events/CommandStartEndCancelEvent/CommandStartEndCancelEvent_Subject";
import { CommandState_State, ICommandStartEndCancelEvent_Payload } from "../Events/CommandStartEndCancelEvent/ICommandStartEndCancelEvent_Payload";
import { CommandToExecuteData } from "./CommandToExecuteData";
import { InternalCommandRunner } from "./InternalCommandRunner";
import { DeepHotKeyAgent } from "../../../Shared/scripts/Agents/DeepHotKeyAgent";
import { HotKeyEvent_Observer } from "../../../Shared/scripts/Events/KeyBoardComboEvent/HotKeyEvent_Observer";
import { IHotKeyEvent_Payload } from "../../../Shared/scripts/Events/KeyBoardComboEvent/IHotKeyEvent_Payload";

export class CommandRouter extends _FrontBase {
  private InternalCommandRunner: InternalCommandRunner;
  private ScUiProxy: IHindSiteScUiAPI;
  private ToastAgent: IToastAgent;
  private AtticAgent: IContentAtticAgent;
  private SettingsAgent: ISettingsAgent;
  private AutoSnapShotAgent: AutoSnapShotAgent;
  private DocumentJacket: DocumentJacket;
  CommandTriggeredEvent_Observer: CommandStartEndCancelEvent_Observer;
  CommandTriggeredEvent_Subject: CommandStartEndCancelEvent_Subject;
  private Dependancies: ICommandDependancies;
  private DeepHotKeyAgent: DeepHotKeyAgent;
    HotKeyEvent_Observer: HotKeyEvent_Observer;

  constructor(hindeCore: IHindeCore, scUiProxy: IHindSiteScUiAPI, toastAgent: IToastAgent, atticAgent: IContentAtticAgent, settingsAgent: ISettingsAgent, autoSnapShotAgent: AutoSnapShotAgent, documentJacket: DocumentJacket, deepHotKeyAgent: DeepHotKeyAgent) {
    super(hindeCore);
    this.ToastAgent = toastAgent;
    this.ScUiProxy = scUiProxy;
    this.AtticAgent = atticAgent;
    this.SettingsAgent = settingsAgent;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.DocumentJacket = documentJacket;
    this.DeepHotKeyAgent = deepHotKeyAgent;

    this.Instantiate();
  }

  private Instantiate() {
    this.InternalCommandRunner = new InternalCommandRunner(this.HindeCore, this.AtticAgent, this.AutoSnapShotAgent, this.ScUiProxy, this.DocumentJacket);

    this.CommandTriggeredEvent_Subject = new CommandStartEndCancelEvent_Subject(this.HindeCore);
    this.CommandTriggeredEvent_Observer = new CommandStartEndCancelEvent_Observer(this.HindeCore, this.OnCommandStartEndCancelEvent.bind(this));
    this.CommandTriggeredEvent_Subject.RegisterObserver(this.CommandTriggeredEvent_Observer);

    this.HotKeyEvent_Observer = new HotKeyEvent_Observer(this.CommonCore, this.CallBackOnHotKeyEvent.bind(this));
    this.DeepHotKeyAgent.HotKeyEvent_Subject.RegisterObserver(this.HotKeyEvent_Observer);

    this.Dependancies = {
      AtticAgent: this.AtticAgent,
      AutoSnapShotAgent: this.AutoSnapShotAgent,
      ScUiProxy: this.ScUiProxy,
      DocumentJacket: this.DocumentJacket,
      HindeCore: this.HindeCore
    }
  }

  private CallBackOnHotKeyEvent(hotKeyEvent_Payload :IHotKeyEvent_Payload):void {

    this.Logger.LogImportant('Yay received : ' + ReqCommandMsgFlag[hotKeyEvent_Payload.ReqCommandMsgFlag]);
  }

  async OnCommandStartEndCancelEvent(payload: ICommandStartEndCancelEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.OnCommandStartEndCancelEvent.name);
    if (payload.CommandState == CommandState_State.CommandStarted) {
      await this.ToastAgent.DropToast('Starting to do something')
    } else if (payload.CommandState == CommandState_State.CommandCompletedSuccessfully) {
    }

    this.Logger.FuncEnd(this.OnCommandStartEndCancelEvent.name);
  }

  private ExecuteInternalCommand(commandToExecute: Function, routingParams: ICommandRouterParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteInternalCommand.name);
      if (commandToExecute) {
        this.Logger.LogVal('msgFlag', ReqCommandMsgFlag[routingParams.MsgFlag]);
        let commandParams = this.BuildCommandPayloadForInternal();

        if (routingParams) {
          commandParams.TargetSnapShotId = routingParams.SelectSnapShotId;
          commandParams.NewNickname = routingParams.NewNickName;
        }

        let payload: ICommandStartEndCancelEvent_Payload = {
          CommandState: CommandState_State.CommandStarted
        }
        let self = this;
        this.CommandTriggeredEvent_Subject.NotifyObserversAsync(payload);
        await commandToExecute.bind(self.InternalCommandRunner)(commandParams, this.Dependancies)
          .then(() => this.Logger.MarkerC())
          .then(() => {
            let payloadComplete: ICommandStartEndCancelEvent_Payload = {
              CommandState: CommandState_State.CommandCompletedSuccessfully
            }
            //this.CommandTriggeredEvent_Subject.NotifyObserversAsync(payloadComplete);
          })
          .then(() => this.Logger.MarkerD())
          .then(() => resolve())
          .catch((err) => this.ErrorHand.ErrorAndThrow(this.ExecuteInternalCommand.name, err));
        //}, 1000)
      }
      this.Logger.FuncEnd(this.ExecuteInternalCommand.name);
    });
  }

  BuildCommandPayloadForInternal(): ICommandParams {
    let scProxyPayload = this.BuildScProxyPayload();
    let commandParams: ICommandParams = new CommandPayloadForInternal(this.HindeCore, this.AtticAgent, this.ToastAgent, this.SettingsAgent, this.AutoSnapShotAgent, scProxyPayload);

    return commandParams;
  }

  BuildScProxyPayload(): IApiCallPayload {
    let commandData: IApiCallPayload = new ApiCommandPayload();

    return commandData;
  }

  async RouteCommand(routingParams: ICommandRouterParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RouteCommand.name, ReqCommandMsgFlag[routingParams.MsgFlag]);
      let commandData: CommandToExecuteData = this.CalculateCommandToExec(routingParams.MsgFlag);

      if (commandData.CommandType == CommandType.Api) {
        await this.ExecuteApiCommand(commandData.commandToExecute, routingParams.MsgFlag)
          .then(() => resolve())
          .catch((err) => reject(err));
      }
      else if (commandData.CommandType = CommandType.ContentInternal) {
        await this.ExecuteInternalCommand(commandData.commandToExecute, routingParams)
          //.then(() => this.ScUiProxy.RaiseToastNotification('Completed'))
          .then(() => {
            this.Logger.Log('Completed the internal command');
            resolve();
          })
          .catch((err) => reject(err));
      }

      if (commandData) {
      }
      else {
        this.ErrorHand.ErrorAndThrow(this.RouteCommand.name, 'did not find command');
      }
      this.Logger.FuncEnd(this.RouteCommand.name);
    });
  }

  private ExecuteApiCommand(functionToExecute: Function, msgFlag: ReqCommandMsgFlag): Promise<DefaultMsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteApiCommand.name);
      if (functionToExecute) {
        let commandData = this.BuildScProxyPayload();

        await functionToExecute.bind(this)(commandData)
          .then((response: DefaultMsgContentToController) => {
            this.Logger.Log('Completed the API command');
            resolve(response)
          })
          .catch((err) => reject(err));
      } else {
        reject(this.ExecuteApiCommand.name + ' | no functionToExecute');
      }

      this.Logger.FuncEnd(this.ExecuteApiCommand.name);
    });
  }

  private CalculateCommandToExec(msgFlag: ReqCommandMsgFlag): CommandToExecuteData {
    let commandData = new CommandToExecuteData(this.HindeCore);
    commandData.commandToExecute = null;
    commandData.CommandType = CommandType.Unknown;

    switch (msgFlag) {
      case ReqCommandMsgFlag.ReqAddCETab:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.AddContentEditorToDesktopAsync;
        break;

      case ReqCommandMsgFlag.ReqUpdateNickName:

        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.SetNickName;
        break;

      case ReqCommandMsgFlag.ReqAdminB:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.AdminB;
        break;

      case ReqCommandMsgFlag.Ping:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.Ping;
        break;

      case ReqCommandMsgFlag.ReqOpenCE:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.OpenContentEditor;
        break;

      case ReqCommandMsgFlag.ReqToggleFavorite:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.ToggleFavorite;
        break;

      case ReqCommandMsgFlag.ReqQuickPublish:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.PublischActiveCE;
        break;

      case ReqCommandMsgFlag.ReqSetStateOfSitecoreSameWindow:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.SetStateOfSitecoreWindow;
        break;

      case ReqCommandMsgFlag.ReqToggleCompactCss:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.ToggleCompactCss;
        break;

      case ReqCommandMsgFlag.ReqTakeSnapShot:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.SaveWindowState;
        break;

      case ReqCommandMsgFlag.ReqRemoveFromStorage:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.RemoveSnapShot;
        break;

      case ReqCommandMsgFlag.ReqDebugAutoSnapShot:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.DebugForceAutoSnapShot;
        break;

      case ReqCommandMsgFlag.SetStateFromQueryString:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.SetStateFromQueryString;
        break;

      case ReqCommandMsgFlag.SetStateFromMostRecent:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.SetStateFromMostRecent;
        break;

      default:
        this.Logger.Log('Unhandled MsgFlag', StaticHelpers.MsgFlagAsString(msgFlag));
        break;
    }

    return commandData;
  }
}