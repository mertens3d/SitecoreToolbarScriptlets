import { DocumentJacket } from "../../../DOMJacket/scripts/Document/DocumentJacket";
import { CommandPayloadForInternal } from "../../../Shared/scripts/Classes/CommandHandlerDataForContent/CommandPayloadForInternal";
import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/DefaultMsgContentToController";
import { ReqCommandMsgFlag } from "../../../Shared/scripts/Enums/10 - MessageFlag";
import { CommandType } from "../../../Shared/scripts/Enums/CommandType";
import { ScRibbonCommand } from "../../../Shared/scripts/Enums/eScRibbonCommand";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { CommandStartEndCancelEvent_Subject } from "../../../Shared/scripts/Events/CommandStartEndCancelEvent/CommandStartEndCancelEvent_Subject";
import { CommandState_State } from "../../../Shared/scripts/Events/CommandStartEndCancelEvent/CommandState_State";
import { ICommandStartEndCancelEvent_Payload } from "../../../Shared/scripts/Events/CommandStartEndCancelEvent/ICommandStartEndCancelEvent_Payload";
import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxy";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IApiCallPayload } from "../../../Shared/scripts/Interfaces/IApiCallPayload";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandRouterParams } from "../../../Shared/scripts/Interfaces/ICommandRouterParams";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { CommandRunnerInternal } from "./CommandRunnerInternal";
import { CommandToExecuteData } from "./CommandToExecuteData";

export class CommandRouter extends _FrontBase {
  private AtticAgent: IContentAtticAgent;
  private AutoSnapShotAgent: AutoSnapShotAgent;
  public CommandTriggeredEvent_Subject: CommandStartEndCancelEvent_Subject;

  private Dependancies: ICommandDependancies;
  private DocumentJacket: DocumentJacket;

  private InternalCommandRunner: CommandRunnerInternal;
  private ScUiProxy: IHindSiteScUiProxy;

  constructor(hindeCore: IHindeCore, scUiProxy: IHindSiteScUiProxy, atticAgent: IContentAtticAgent, autoSnapShotAgent: AutoSnapShotAgent, documentJacket: DocumentJacket) {
    super(hindeCore);
    this.ScUiProxy = scUiProxy;
    this.AtticAgent = atticAgent;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.DocumentJacket = documentJacket;

    this.Instantiate();
  }

  private Instantiate() {
    this.InternalCommandRunner = new CommandRunnerInternal(this.HindeCore, this.AtticAgent, this.AutoSnapShotAgent, this.ScUiProxy, this.DocumentJacket);

    this.CommandTriggeredEvent_Subject = new CommandStartEndCancelEvent_Subject(this.HindeCore);

    this.Dependancies = {
      AtticAgent: this.AtticAgent,
      AutoSnapShotAgent: this.AutoSnapShotAgent,
      ScUiProxy: this.ScUiProxy,
      DocumentJacket: this.DocumentJacket,
      HindeCore: this.HindeCore
    }
  }

  async RouteCommand(routingParams: ICommandRouterParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RouteCommand.name, ReqCommandMsgFlag[routingParams.MsgFlag]);
      let commandData: CommandToExecuteData = this.CalculateCommandToExec(routingParams.MsgFlag);

      let payload: ICommandStartEndCancelEvent_Payload = {
        CommandState: CommandState_State.CommandStarted
      }

      this.CommandTriggeredEvent_Subject.NotifyObserversAsync(payload);

      if (commandData.CommandType == CommandType.Api) {
        await this.ExecuteApiCommand(commandData.commandToExecute, routingParams.MsgFlag)
          .then(() => resolve())
          .finally(() => reject('need to do'));
      }
      else if (commandData.CommandType = CommandType.ContentInternal) {
        try {
          await this.ExecuteInternalCommand(commandData.commandToExecute, routingParams)
            //.then(() => this.ScUiProxy.RaiseToastNotification('Completed'))
            .then(() => {
              this.Logger.Log('Completed the internal command');
              resolve();
            })
            .catch((err: any) => this.ErrorHand.HandleTopLevelTryCatch(err, err))
            .finally(() => reject('todo'));
        } catch (err) {
          this.ErrorHand.HandleTopLevelTryCatch(err, err)
        }
      }
      if (commandData) {
      }
      else {
        this.ErrorHand.HandleFatalError(this.RouteCommand.name, 'did not find command');
      }
      this.Logger.FuncEnd(this.RouteCommand.name);
    });
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

        let self = this;

        try {
          await commandToExecute.bind(self.InternalCommandRunner)(commandParams, this.Dependancies)
            .then(() => this.Logger.MarkerC())
            .then(() => {
              let payloadComplete: ICommandStartEndCancelEvent_Payload = {
                CommandState: CommandState_State.CommandCompletedSuccessfully
              }
              //this.CommandTriggeredEvent_Subject.NotifyObserversAsync(payloadComplete);
            })
            .then(() => resolve())
            .catch((err: any) => this.ErrorHand.HandleFatalError(this.ExecuteInternalCommand.name, err));
          //}, 1000)
        } catch (err) {
          this.ErrorHand.HandleTopLevelTryCatch(err, err);
        }
      }
      this.Logger.FuncEnd(this.ExecuteInternalCommand.name);
    });
  }

  private BuildCommandPayloadForInternal(): ICommandParams {
    let scProxyPayload = this.BuildScProxyPayload();
    let commandParams: ICommandParams = new CommandPayloadForInternal(this.HindeCore, scProxyPayload);

    return commandParams;
  }

  private BuildScProxyPayload(): IApiCallPayload {
    let commandData: IApiCallPayload = {
      DataOneWindowStorage: null,
      ScRibbonCommand: ScRibbonCommand.Unknown,
      SnapShotFlavor: SnapShotFlavor.Unknown,
      SnapShotOfStateScUiApi: null,
    }
    return commandData;
  }

  private ExecuteApiCommand(functionToExecute: Function, msgFlag: ReqCommandMsgFlag): Promise<DefaultMsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteApiCommand.name);
      if (functionToExecute) {
        let commandData = this.BuildScProxyPayload();

        await functionToExecute(commandData)
          .then((response: DefaultMsgContentToController) => {
            this.Logger.Log('Completed the API command');
            resolve(response)
          })
          .catch((err: any) => reject(err));
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

    let payload: IApiCallPayload = {
      DataOneWindowStorage: null,
      ScRibbonCommand: ScRibbonCommand.NavigateForward,
      SnapShotFlavor: SnapShotFlavor.Unknown,
      SnapShotOfStateScUiApi: null,
    }

    switch (msgFlag) {
      case ReqCommandMsgFlag.ReqAddCETab:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.AddContentEditorToDesktopAsync;
        break;

      case ReqCommandMsgFlag.GetStateOfWindow:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.GetStateOfScUiProxy;
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

      case ReqCommandMsgFlag.ReqToggleRawValues:
        commandData.CommandType = CommandType.Api;
        payload.ScRibbonCommand = ScRibbonCommand.ToggleRawValues;

        commandData.commandToExecute = (() => this.ScUiProxy.TriggerCERibbonCommand(payload));
        break;

      case ReqCommandMsgFlag.OpenCERibbonPresentationDetails:
        commandData.CommandType = CommandType.Api;
        payload.ScRibbonCommand = ScRibbonCommand.PresentationDetails;
        commandData.commandToExecute = (() => this.ScUiProxy.TriggerCERibbonCommand(payload));
        break;

      case ReqCommandMsgFlag.OpenCERibbonNavigateLinks:
        commandData.CommandType = CommandType.Api;
        payload.ScRibbonCommand = ScRibbonCommand.NavigateLinks;
        commandData.commandToExecute = (() => this.ScUiProxy.TriggerCERibbonCommand(payload));
        break;

      case ReqCommandMsgFlag.ReqNavigateBack:
        commandData.CommandType = CommandType.Api;
        payload.ScRibbonCommand = ScRibbonCommand.NavigateBack;
        commandData.commandToExecute = (() => this.ScUiProxy.TriggerCERibbonCommand(payload));
        break;

      case ReqCommandMsgFlag.ReqNavigateForward:
        commandData.CommandType = CommandType.Api;

        commandData.commandToExecute = (() => this.ScUiProxy.TriggerCERibbonCommand(payload));
        break;

      case ReqCommandMsgFlag.ReqNavigateUp:
        commandData.CommandType = CommandType.Api;
        payload.ScRibbonCommand = ScRibbonCommand.NavigateUp;
        commandData.commandToExecute = (() => this.ScUiProxy.TriggerCERibbonCommand(payload));
        break;

      case ReqCommandMsgFlag.ReqToggleFavorite:
        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.InternalCommandRunner.ToggleFavorite;
        break;

      case ReqCommandMsgFlag.ReqQuickPublish:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ScUiProxy.PublischActiveCE;
        break;

      case ReqCommandMsgFlag.ReqGoToSelected:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = (() => this.ScUiProxy.CEGoSelected(payload));
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

      case ReqCommandMsgFlag.ReqDebugContentFatalError:
        commandData.CommandType = CommandType.ContentInternal;

        //let error: any = new this.ErrorHand.HandleTopLevelTryCatch(['Debug Triggered Content Fatal Error'], null);

        commandData.commandToExecute = (() => {
          throw 'Debug Triggered Content Fatal Error'
        });

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
        this.Logger.LogVal('Unhandled MsgFlag', ReqCommandMsgFlag[msgFlag]);
        break;
    }

    return commandData;
  }
}