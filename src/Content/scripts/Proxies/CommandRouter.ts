import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { ScUiManager } from "../../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { ApiCommandPayload } from "../../../Shared/scripts/Classes/CommandHandlerDataForContent/ApiCommandPayload";
import { CommandPayloadForInternal } from "../../../Shared/scripts/Classes/CommandHandlerDataForContent/CommandPayloadForInternal";
import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
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
import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { CommandStartEndCancelEvent_Observer } from "../Events/CommandStartEndCancelEvent/CommandStartEndCancelEvent_Observer";
import { CommandStartEndCancelEvent_Subject } from "../Events/CommandStartEndCancelEvent/CommandStartEndCancelEvent_Subject";
import { CommandState_State, ICommandStartEndCancelEvent_Payload } from "../Events/CommandStartEndCancelEvent/ICommandStartEndCancelEvent_Payload";
import { CommandToExecuteData } from "./CommandToExecuteData";
import { InternalCommandRunner } from "./InternalCommandRunner";

export class CommandRouter extends _HindeCoreBase {
  private InternalCommandRunner: InternalCommandRunner;
  private ScUiProxy: IHindSiteScUiAPI;
  private ToastAgent: IToastAgent;
  private ScUiMan: ScUiManager;
  private AtticAgent: IContentAtticAgent;
  private SettingsAgent: ISettingsAgent;
  private AutoSnapShotAgent: AutoSnapShotAgent;
  private DocumentJacket: DocumentJacket;
  CommandTriggeredEvent_Observer: CommandStartEndCancelEvent_Observer;
  CommandTriggeredEvent_Subject: CommandStartEndCancelEvent_Subject;
  private Dependancies: ICommandDependancies;

  constructor(hindeCore: IHindeCore, scUiProxy: IHindSiteScUiAPI, toastAgent: IToastAgent, scUiMan: ScUiManager, atticAgent: IContentAtticAgent, settingsAgent: ISettingsAgent, autoSnapShotAgent: AutoSnapShotAgent, documentJacket: DocumentJacket) {
    super(hindeCore);
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.ScUiProxy = scUiProxy;
    this.AtticAgent = atticAgent;
    this.SettingsAgent = settingsAgent;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.DocumentJacket = documentJacket;

    this.InternalCommandRunner = new InternalCommandRunner(this.HindeCore, this.AtticAgent, this.AutoSnapShotAgent, this.ScUiProxy, this.DocumentJacket);

    this.CommandTriggeredEvent_Subject = new CommandStartEndCancelEvent_Subject(this.HindeCore, CommandRouter.name);
    this.CommandTriggeredEvent_Observer = new CommandStartEndCancelEvent_Observer(this.HindeCore, this.OnCommandStartEndCancelEvent.bind(this));
    this.CommandTriggeredEvent_Subject.RegisterObserver(this.CommandTriggeredEvent_Observer);

    this.Dependancies = {
      AtticAgent: this.AtticAgent,
      AutoSnapShotAgent: this.AutoSnapShotAgent,
      ScUiProxy: this.ScUiProxy,
      DocumentJacket: this.DocumentJacket,
      HindeCore: this.HindeCore
    }
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
        this.Logger.LogVal('msgFlag', MsgFlag[routingParams.MsgFlag]);
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
    let commandParams: ICommandParams = new CommandPayloadForInternal(this.HindeCore, this.AtticAgent, this.ToastAgent, this.ScUiMan, this.SettingsAgent, this.AutoSnapShotAgent, scProxyPayload);

    return commandParams;
  }

  BuildScProxyPayload(): IApiCallPayload {
    let commandData: IApiCallPayload = new ApiCommandPayload();

    return commandData;
  }

  async RouteCommand(routingParams: ICommandRouterParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RouteCommand.name, MsgFlag[routingParams.MsgFlag]);
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

  private ExecuteApiCommand(functionToExecute: Function, msgFlag: MsgFlag): Promise<DefaultMsgContentToController> {
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

  private CalculateCommandToExec(msgFlag: MsgFlag): CommandToExecuteData {
    let commandData = new CommandToExecuteData(this.HindeCore);
    commandData.commandToExecute = null;
    commandData.CommandType = CommandType.Unknown;

    switch (msgFlag) {
      case MsgFlag.ReqAddCETab:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.AddContentEditorToDesktopAsync;
        break;

      case MsgFlag.ReqUpdateNickName:

        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.SetNickName;
        break;

      case MsgFlag.ReqAdminB:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.AdminB;
        break;

      case MsgFlag.Ping:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.Ping;
        break;

      case MsgFlag.ReqOpenCE:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.OpenContentEditor;
        break;

      case MsgFlag.ReqToggleFavorite:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.ToggleFavorite;
        break;

      case MsgFlag.ReqQuickPublish:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.PublischActiveCE;
        break;

      case MsgFlag.ReqSetStateOfSitecoreSameWindow:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.SetStateOfSitecoreWindow;
        break;

      case MsgFlag.ReqToggleCompactCss:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.ToggleCompactCss;
        break;

      case MsgFlag.ReqTakeSnapShot:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.SaveWindowState;
        break;

      case MsgFlag.ReqRemoveFromStorage:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.RemoveSnapShot;
        break;

      case MsgFlag.ReqDebugAutoSnapShot:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.DebugForceAutoSnapShot;
        break;

      case MsgFlag.SetStateFromQueryString:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.SetStateFromQueryString;
        break;

      case MsgFlag.SetStateFromMostRecent:
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