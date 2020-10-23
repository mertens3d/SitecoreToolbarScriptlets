import { DocumentJacket } from "../../../DOMJacket/scripts/Document/DocumentJacket";
import { DefaultCommandData } from "../../../Shared/scripts/Classes/CommandHandlerDataForContent/CommandPayloadForInternal";
import { ReqCommandMsgFlag } from "../../../Shared/scripts/Enums/10 - MessageFlag";
import { CommandTypeFlag } from "../../../Shared/scripts/Enums/CommandType";
import { APICommandFlag } from "../../../Shared/scripts/Enums/APICommand";
import { InternalCommandFlag } from "../../../Shared/scripts/Enums/InternalCommand";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { CommandStartEndCancelEvent_Subject } from "../../../Shared/scripts/Events/CommandStartEndCancelEvent/CommandStartEndCancelEvent_Subject";
import { CommandState_State } from "../../../Shared/scripts/Events/CommandStartEndCancelEvent/CommandState_State";
import { ICommandStartEndCancelEvent_Payload } from "../../../Shared/scripts/Events/CommandStartEndCancelEvent/ICommandStartEndCancelEvent_Payload";
import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxy";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ISolicitor } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/ISolicitor";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandData } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandRouterParams } from "../../../Shared/scripts/Interfaces/ICommandRouterParams";
import { IInternalCommandResults } from "../../../Shared/scripts/Interfaces/IInternalCommandResults";
import { IMapMsgFlagToAPICommand } from "../../../Shared/scripts/Interfaces/IMapMsgFlagToAPICommand";
import { IMapMsgFlagToInternalFlag } from "../../../Shared/scripts/Interfaces/IMapMsgFlagToInternalFlag";
import { ICommandRouterResult } from "../../../Shared/scripts/Interfaces/StateOf/ICommandRouterResult";
import { IScUiReturnPayload } from "../../../Shared/scripts/Interfaces/StateOf/IScUiReturnPayload";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { SolicitorForScheduledAutoSnapShot } from "../CommandSolicitors/CommandSolicitorForAutoSnapShot";
import { CommandMappingMsgFlagToInternalFlag } from "./APICommandMappingB";
import { MappingMsgFlagToAPIFlag } from "./CommandMapping";
import { CommandRunnerInternal } from "./CommandRunnerInternal";

export class CommandRouter extends _FrontBase {
  private AtticAgent: IContentAtticAgent;
  private AutoSnapShotAgent: SolicitorForScheduledAutoSnapShot;
  public CommandTriggeredEvent_Subject: CommandStartEndCancelEvent_Subject;

  private Solicitors: ISolicitor[] = [];
  private Dependancies: ICommandDependancies;
  private DocumentJacket: DocumentJacket;

  private InternalCommandRunner: CommandRunnerInternal;
  private ScUiProxy: IHindSiteScUiProxy;

  constructor(hindeCore: IHindeCore, scUiProxy: IHindSiteScUiProxy, atticAgent: IContentAtticAgent, autoSnapShotAgent: SolicitorForScheduledAutoSnapShot, documentJacket: DocumentJacket) {
    super(hindeCore);
    this.ScUiProxy = scUiProxy;
    this.AtticAgent = atticAgent;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.DocumentJacket = documentJacket;

    this.Instantiate();
  }

  public RegisterAsSolicitor(solicitor: ISolicitor): void {
    this.Solicitors.push(solicitor);
  }

  private Instantiate() {
    this.InternalCommandRunner = new CommandRunnerInternal(this.HindeCore, this.AtticAgent, this.AutoSnapShotAgent, this.DocumentJacket, this, this.Solicitors);

    this.CommandTriggeredEvent_Subject = new CommandStartEndCancelEvent_Subject(this.HindeCore);

    this.Dependancies = {
      AtticAgent: this.AtticAgent,
      SolicitorForAutoSnapShot: this.AutoSnapShotAgent,
      DocumentJacket: this.DocumentJacket,
      HindeCore: this.HindeCore
    }
  }

  public async RouteCommand(routingParams: ICommandRouterParams): Promise<ICommandRouterResult> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RouteCommand.name, ReqCommandMsgFlag[routingParams.ReqMsgFlag]);

      let calculatedCommandData: ICommandData = this.CalculateCommandToExec(routingParams);

      let payload: ICommandStartEndCancelEvent_Payload = {
        CommandState: CommandState_State.CommandStarted
      }

      this.CommandTriggeredEvent_Subject.NotifyObserversAsync(payload);

      if (calculatedCommandData.CommandType == CommandTypeFlag.Api) {
        await this.ExecuteApiCommand(calculatedCommandData)
          .then((a) => resolve())
          .finally(() => reject('need to do'));
      }
      else if (calculatedCommandData.CommandType = CommandTypeFlag.ContentInternal) {
        try {
          await this.ExecuteInternalCommand(calculatedCommandData)
            //.then(() => this.ScUiProxy.RaiseToastNotification('Completed'))
            .then((internalCommandResults: IInternalCommandResults) => {
              this.Logger.Log('Completed the internal command');
              resolve();
            })
            .catch((err: any) => this.ErrorHand.HandleTopLevelTryCatch(err, err))
            .finally(() => reject('todo'));
        } catch (err) {
          this.ErrorHand.HandleTopLevelTryCatch(err, err)
        }
      }
      else {
        this.ErrorHand.HandleFatalError(this.RouteCommand.name, 'did not find command');
      }
      this.Logger.FuncEnd(this.RouteCommand.name);
    });
  }

  private async ExecuteInternalCommand(commandData: ICommandData): Promise<IInternalCommandResults> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteInternalCommand.name);
      if (commandData) {
        let self = this;
        let internalCommandResults: IInternalCommandResults = null;

        try {

          this.InternalCommandRunner.HandleInternalCommand(commandData)
            .then((result: IInternalCommandResults) => { internalCommandResults = result})
            .then(() => {
              let payloadComplete: ICommandStartEndCancelEvent_Payload = {
                CommandState: CommandState_State.CommandCompletedSuccessfully
              }
            })
            .then(() => resolve(internalCommandResults))
            .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage(this.ExecuteInternalCommand.name, err)));
        } catch (err) {
          this.ErrorHand.HandleTopLevelTryCatch(err, err);
        }
      }
      this.Logger.FuncEnd(this.ExecuteInternalCommand.name);
    });
  }

  private ExecuteApiCommand(commandData: ICommandData): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteApiCommand.name);
      if (commandData) {
        await this.ScUiProxy.APICommand(commandData.ToAPIPayload)
          .then((response: IScUiReturnPayload) => {
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

  private CalculateCommandToExec(routingParams: ICommandRouterParams): ICommandData {
    let commandData = new DefaultCommandData();
    commandData.CommandType = CommandTypeFlag.Unknown;
    commandData.InternalCommandFlag = InternalCommandFlag.Unknown;

    commandData.ToAPIPayload = {
      DataOneWindowStorage: null,
      APICommand: APICommandFlag.NavigateForward,
      SnapShotFlavor: SnapShotFlavor.Unknown,
      SnapShotOfStateScUiApi: null,
    }

    let apiCommandMapping: IMapMsgFlagToAPICommand[] = MappingMsgFlagToAPIFlag.AllMapping;

    let foundMatch: boolean = false;

    apiCommandMapping.forEach((pair: IMapMsgFlagToAPICommand) => {
      if (pair.MsgFlag === routingParams.ReqMsgFlag) {
        commandData.ToAPIPayload.APICommand = pair.APICommand;
        commandData.CommandType = CommandTypeFlag.Api;
        foundMatch = true;
      }
    });

    if (!foundMatch) {
      let internalMapping: IMapMsgFlagToInternalFlag[] = CommandMappingMsgFlagToInternalFlag.AllMapping;

      internalMapping.forEach((pair: IMapMsgFlagToInternalFlag) => {
        if (pair.MsgFlag === routingParams.ReqMsgFlag) {
          commandData.CommandType = CommandTypeFlag.ContentInternal;
          commandData.InternalCommandFlag = pair.InternalCommand;
          foundMatch = true;
          
        }
      });
    }

    this.Logger.LogAsJsonPretty('routingParams', routingParams);
    this.Logger.LogAsJsonPretty('commandData', commandData);

    if (!foundMatch) {
      this.ErrorHand.HandleFatalError([CommandRouter.name, this.CalculateCommandToExec.name], 'No match found: ' + ReqCommandMsgFlag[routingParams.ReqMsgFlag]);
    }

    return commandData;
  }
}