import { LoggableBase } from "../../../Shared/scripts/LoggableBase";
import { ApiCommandPayload, CommandPayloadForInternal } from "../../../Shared/scripts/Classes/CommandHandlerDataForContent/CommandHandlerDataForContent";
import { MsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { CommandType } from "../../../Shared/scripts/Enums/CommandType";
import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { ISnapShotsAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/ISnapShotsAgent";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IApiCallPayload } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { IMessageControllerToContent, ICommandRouterParams } from "../../../Shared/scripts/Interfaces/IStateOfController";
import { CommandToExecuteData } from "./CommandToExecuteData";
import { InternalCommandRunner } from "./InternalCommandRunner";
import { IToastAgent } from "../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { ScUiManager } from "../../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ScUrlAgent } from "../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";

export class CommandRouter extends LoggableBase {
  private InternalCommandRunner: InternalCommandRunner;
  private ScUiProxy: IHindSiteScUiProxy;
  private ToastAgent: IToastAgent;
  private ScUiMan: ScUiManager;
  private AtticAgent: IContentAtticAgent;
  private SettingsAgent: ISettingsAgent;
  private AutoSnapShotAgent: AutoSnapShotAgent;
  private ScUrlAgent: ScUrlAgent;

  constructor(logger: ILoggerAgent, scUiProxy: IHindSiteScUiProxy, toastAgent: IToastAgent, scUiMan: ScUiManager, atticAgent: IContentAtticAgent, settingsAgent: ISettingsAgent, autoSnapShotAgent: AutoSnapShotAgent, scUrlAgent: ScUrlAgent) {
    super(logger);
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.ScUiProxy = scUiProxy;
    this.AtticAgent = atticAgent;
    this.SettingsAgent = settingsAgent;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.ScUrlAgent = scUrlAgent;

    this.InternalCommandRunner = new InternalCommandRunner(this.Logger, this.AtticAgent, this.AutoSnapShotAgent, this.ScUiProxy, this.ScUrlAgent);
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

        let dependancies: ICommandDependancies = {
          AtticAgent: this.AtticAgent,
          AutoSnapShotAgent: this.AutoSnapShotAgent,
          Logger: this.Logger,
          ScUiProxy: this.ScUiProxy,
          ScUrlAgent: this.ScUrlAgent
        }

        await commandToExecute.bind(this.InternalCommandRunner)(commandParams, dependancies)
          .then(() => resolve())
          .catch((err) => reject(this.ExecuteInternalCommand.name + ' | ' + err));
      }

      this.Logger.FuncEnd(this.ExecuteInternalCommand.name);
    });
  }

  BuildCommandPayloadForInternal(): ICommandParams {
    let scProxyPayload = this.BuildScProxyPayload();
    let commandParams: ICommandParams = new CommandPayloadForInternal(this.Logger, this.AtticAgent, this.ToastAgent, this.ScUiMan, this.SettingsAgent, this.AutoSnapShotAgent, scProxyPayload);

    return commandParams;
  }

  BuildScProxyPayload(): IApiCallPayload {
    let commandData: IApiCallPayload = new ApiCommandPayload();

    return commandData;
  }

  RouteCommand(routingParams: ICommandRouterParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RouteCommand.name, MsgFlag[routingParams.MsgFlag]);
      let commandData: CommandToExecuteData = this.CalculateCommandToExec(routingParams.MsgFlag);

      if (commandData.CommandType == CommandType.Api) {
        await this.ExecuteApiCommand(commandData.commandToExecute, routingParams.MsgFlag)
          .then(() => this.ScUiProxy.RaiseToastNotification('Completed'))
          .then(() => resolve())
          .catch((err) => reject(err));
      }
      else if (commandData.CommandType = CommandType.ContentInternal) {
        await this.ExecuteInternalCommand(commandData.commandToExecute, routingParams)
          .then(() => this.ScUiProxy.RaiseToastNotification('Completed'))
          .then(() => resolve())
          .catch((err) => reject(err));
      }

      if (commandData) {
      }
      else {
        this.Logger.ErrorAndThrow(this.RouteCommand.name, 'did not find command');
      }
      this.Logger.FuncEnd(this.RouteCommand.name);
    });
  }

  private ExecuteApiCommand(functionToExecute: Function, msgFlag: MsgFlag): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteApiCommand.name);
      if (functionToExecute) {
        let commandData = this.BuildScProxyPayload();

        await functionToExecute.bind(this)(commandData)
          .then((response: MsgContentToController) => resolve(response))
          .catch((err) => reject(err));
      } else {
        reject(this.ExecuteApiCommand.name + ' | no functionToExecute');
      }

      this.Logger.FuncEnd(this.ExecuteApiCommand.name);
    });
  }

  private CalculateCommandToExec(msgFlag: MsgFlag): CommandToExecuteData {
    let commandData = new CommandToExecuteData(this.Logger);
    commandData.commandToExecute = null;
    commandData.CommandType = CommandType.Unknown;

    switch (msgFlag) {
      case MsgFlag.ReqAddCETab:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.AddCETabAsync;
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

      case MsgFlag.InitFromQueryString:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.InitFromQueryString;
        break;

      default:
        this.Logger.Log('Unhandled MsgFlag', StaticHelpers.MsgFlagAsString(msgFlag));
        break;
    }

    return commandData;
  }
}