import { DocumentJacket } from "../../../DOMJacket/scripts/Document/DocumentJacket";
import { ReqCommandMsgFlag } from "../../../Shared/scripts/Enums/10 - MessageFlag";
import { TypeDiscriminator } from "../../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { InternalCommandFlag } from "../../../Shared/scripts/Enums/InternalCommand";
import { ReplyCommandMsgFlag } from "../../../Shared/scripts/Enums/ReplyCommandMsgFlag";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ISolicitor } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/ISolicitor";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandData } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandRouterParams } from "../../../Shared/scripts/Interfaces/ICommandRouterParams";
import { IInternalCommandResults } from "../../../Shared/scripts/Interfaces/IInternalCommandResults";
import { ICommandRouterResult } from "../../../Shared/scripts/Interfaces/StateOf/ICommandRouterResult";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { SolicitorForScheduledAutoSnapShot } from "../CommandSolicitors/CommandSolicitorForAutoSnapShot";
import { RecipeChangeNickName } from "../Recipes/RecipeChangeNickName";
import { RecipeRemoveItemFromStorage } from "../Recipes/RecipeRemoveItemFromStorage";
import { RecipeToggleFavorite } from "../Recipes/RecipeToggleFavorite";
import { CommandRouter } from "./CommandRouter";

export class CommandRunnerInternal extends _FrontBase {
  private Dependancies: ICommandDependancies;
  private CommandRouter: CommandRouter;
  private Solicitors: ISolicitor[];
  private AtticAgent: IContentAtticAgent;

  constructor(hindeCore: IHindeCore, atticAgent: IContentAtticAgent, solicitorForAutoSnapShot: SolicitorForScheduledAutoSnapShot, documentJacket: DocumentJacket, commandRouter: CommandRouter, solicitors: ISolicitor[]) {
    super(hindeCore);

    this.CommandRouter = commandRouter;
    this.Solicitors = solicitors;
    this.AtticAgent = atticAgent;

    this.Dependancies = {
      AtticAgent: atticAgent,
      SolicitorForAutoSnapShot: solicitorForAutoSnapShot,
      HindeCore: this.HindeCore,
      DocumentJacket: documentJacket
    };
  }

  HandleInternalCommand(commandData: ICommandData): Promise<IInternalCommandResults> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.HandleInternalCommand.name);

      try {
        if (commandData) {
          switch (commandData.InternalCommandFlag) {
            case InternalCommandFlag.DebugForceAutoSnapShot:
              this.DebugForceAutoSnapShot(commandData)
                .then((internalCommandResults: IInternalCommandResults) => resolve(internalCommandResults))
                .catch((err) => this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.HandleInternalCommand.name], err));
              break;

            case InternalCommandFlag.Ping:
              this.Ping(commandData)
                .then((internalCommandResults: IInternalCommandResults) => resolve(internalCommandResults))
                .catch((err) => this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.HandleInternalCommand.name], err));
              break;

            case InternalCommandFlag.RemoveSnapShot:
              this.RemoveSnapShot(commandData)
                .then((internalCommandResults: IInternalCommandResults) => resolve(internalCommandResults))
                .catch((err) => this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.HandleInternalCommand.name], err));
              break;

            case InternalCommandFlag.SaveWindowState:
              this.SaveWindowState(commandData)
                .then((internalCommandResults: IInternalCommandResults) => resolve(internalCommandResults))
                .catch((err) => this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.HandleInternalCommand.name], err));
              break;

            case InternalCommandFlag.SetNickName:
              this.SetNickName(commandData)
                .then((internalCommandResults: IInternalCommandResults) => resolve(internalCommandResults))
                .catch((err) => this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.HandleInternalCommand.name], err));
              break;

            //case InternalCommandFlag.SetStateFromMostRecent:
            //  this.SetStateFromMostRecent(commandData)
            //    .then((internalCommandResults: IInternalCommandResults) => resolve(internalCommandResults))
            //    .catch((err) => this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.HandleInternalCommand.name], err));
            //  break;

            case InternalCommandFlag.ThrowFatalError:
              throw ('error throw test');

            case InternalCommandFlag.ToggleFavorite:
              this.ToggleFavorite(commandData)
                .then((internalCommandResults: IInternalCommandResults) => resolve(internalCommandResults))
                .catch((err) => this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.HandleInternalCommand.name], err));
              break;

            default:
              reject(this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.HandleInternalCommand.name], 'unhandled Internal command flag: ' + InternalCommandFlag[commandData.InternalCommandFlag]));
              break;
          }
        } else {
          reject(this.HandleInternalCommand.name + ' | no functionToExecute');
        }
      } catch (err) {
        reject(err);
      }

      this.Logger.FuncEnd(this.HandleInternalCommand.name);
    });
  }

  async SetNickName(commandParams: ICommandData): Promise<IInternalCommandResults> {
    return new Promise(async (resolve, reject) => {
      //let recipe = new RecipeForceAutoSnapShot(this.Logger, commandParams, this.Dependancies);
      let recipe = new RecipeChangeNickName(this.HindeCore, commandParams, this.Dependancies);

      recipe.Execute()
        .then(() => resolve())
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.DebugForceAutoSnapShot.name], err)));
    });
  }

  Ping(commandParams: ICommandData): Promise<IInternalCommandResults> {
    return new Promise(async (resolve, reject) => {
      resolve(ReplyCommandMsgFlag.RespListeningAndReady);
    });
  }

  private DefaultInternalCommandResult(): IInternalCommandResults {
    let toReturn: IInternalCommandResults = {
    }

    return toReturn;
  }

  async DebugForceAutoSnapShot(commandParams: ICommandData): Promise<IInternalCommandResults> {
    return new Promise(async (resolve, reject) => {
      let result: IInternalCommandResults = this.DefaultInternalCommandResult();

      let targetSolicitor: SolicitorForScheduledAutoSnapShot = null;

      if (this.Solicitors) {
        this.Solicitors.forEach((solicitor: ISolicitor) => {
          if (solicitor.TypeDiscriminator === TypeDiscriminator.SolicitorForScheduledAutoSnapShot) {
            targetSolicitor = <SolicitorForScheduledAutoSnapShot>solicitor;
          }
        });
      }

      if (targetSolicitor) {
        targetSolicitor.ExecuteTest()
          .then((testResult: any) => { })
          .then(() => resolve(result))
          .catch((err) => this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.DebugForceAutoSnapShot.name], err));
      }
    });
  }

  async SaveWindowState(commandParams: ICommandData): Promise<IInternalCommandResults> {
    return new Promise(async (resolve, reject) => {
      let routingParams: ICommandRouterParams = {
        NewNickName: '',
        ReqMsgFlag: ReqCommandMsgFlag.GetStateOfWindow,
        ReqMsgFlagFriendly: ReqCommandMsgFlag[ReqCommandMsgFlag.GetStateOfWindow],
        SelectSnapShotId: null,
        SelectText: '',
        StateSnapShot: null
      }

      this.CommandRouter.RouteCommand(routingParams)
        .then((commandRouterResults: ICommandRouterResult) => {
          this.Logger.LogAsJsonPretty('commandRouterResults', commandRouterResults);
          this.AtticAgent.WriteStateOfSitecoreToStorage(commandRouterResults.ScUiReturnPayload.StateOfScUi)
        })
        .then(() => resolve())
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([CommandRunnerInternal.name, this.SaveWindowState.name], err)));
    });
  }

  async ToggleFavorite(commandParams: ICommandData): Promise<IInternalCommandResults> {
    return new Promise(async (resolve, reject) => {
      await new RecipeToggleFavorite(this.HindeCore, commandParams, this.Dependancies).Execute()
        .then(() => resolve())
        .catch((err: any) => reject(err));
    });
  }

  //async SetStateFromMostRecent(commandParams: ICommandData): Promise<IInternalCommandResults> {
  //  try {
  //    this.Logger.FuncStart(this.SetStateFromMostRecent.name);
  //    let recipe = new RecipeSetStateFromMostRecent(this.HindeCore, commandParams, this.Dependancies);
  //    await recipe.Execute();
  //  }
  //  catch (err: any) {
  //    this.ErrorHand.HandleFatalError(this.SetStateFromMostRecent.name, err);
  //  }
  //  this.Logger.FuncEnd(this.SetStateFromMostRecent.name);
  //}

  //async SetStateFromQueryString(commandParams: ICommandData): Promise<void> {
  //  try {
  //    let recipe = new RecipeInitFromQueryStr(this.HindeCore, commandParams, this.Dependancies);
  //    recipe.Execute();
  //  }
  //  catch (err: any) {
  //    this.ErrorHand.HandleFatalError(this.SetStateFromQueryString.name, err);
  //  }
  //}

  async RemoveSnapShot(commandParams: ICommandData): Promise<IInternalCommandResults> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeRemoveItemFromStorage(this.HindeCore, commandParams, this.Dependancies);
      await recipe.Execute()
        .then(() => resolve())
        .catch((err: any) => reject(err));
    });
  }

  //SetStateOfSitecoreWindow(commandParams: ICommandData, dependancies: ICommandDependancies): Promise<void> {
  //    return new Promise(async (resolve, reject) => {
  //        dependancies.HindeCore.Logger.LogAsJsonPretty("IdOfSelect", commandParams.TargetSnapShotId);
  //        let dataOneWindowStorage: IStateOfScUi = dependancies.AtticAgent.GetFromStorageBySnapShotId(commandParams.TargetSnapShotId);

  //      if (dataOneWindowStorage) {
  //        comToAPIPayload.ApiPayload.SnapShotOfStateScUiApi = dataOneWindowStorage;
  //            dependancies.ScUiProxy.SetStateOfSitecoreWindowAsync(comToAPIPayload.ApiPayload)
  //                .then(() => resolve())
  //                .catch((err: any) => reject(this.SetStateOfSitecoreWindow.name + ' | ' + err));
  //        };
  //    });
  //}
}