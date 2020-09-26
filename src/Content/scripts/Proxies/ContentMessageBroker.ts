﻿import { LoggableBase } from "../../../HindSiteScUiProxy/scripts/Managers/LoggableBase";
import { ScUiManager } from "../../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { CommandHandlerDataForContent, CommandPayloadForInternal } from "../../../Shared/scripts/Classes/CommandHandlerDataForContent/CommandHandlerDataForContent";
import { MsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { SettingKey } from "../../../Shared/scripts/Enums/3xxx-SettingKey";
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { IHindSiteScWindowApi, ISnapShotsAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IContentBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { IContentMessageBroker } from "../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { IApiCommandPayload, InternalCommandPayload } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IStateOfController";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { IDataContentReplyReceivedEvent_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { CommandType } from "../../../Shared/scripts/Enums/CommandType";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { RecipeToggleFavorite } from "../Recipes/RecipeToggleFavorite";
import { RecipeRemoveItemFromStorage } from "../Recipes/RecipeRemoveItemFromStorage";

export class CommandToExecuteData extends LoggableBase {
  commandToExecute: Function;
  CommandType: CommandType;
}

export class ContentInternalCommandRunner extends LoggableBase {
  AtticAgent: IContentAtticAgent;
  HineyScApi: IHindSiteScWindowApi;

  constructor(logger: ILoggerAgent, atticAgent: IContentAtticAgent, hindSiteScApi: IHindSiteScWindowApi) {
    super(logger);
    this.AtticAgent = atticAgent;
    this.HineyScApi = hindSiteScApi;
  }

  ToggleFavorite(commandData: InternalCommandPayload) {
    return new Promise(async (resolve, reject) => {
      await new RecipeToggleFavorite(this.Logger, commandData).Execute()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async RemoveSnapShot(commandData: InternalCommandPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeRemoveItemFromStorage(this.Logger, commandData);
      await recipe.Execute()
        .then(resolve)
        .catch((err) => reject(err));
    });
  }


  SetStateOfSitecoreWindow(internalCommandPayload: InternalCommandPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.LogVal("IdOfSelect", internalCommandPayload.TargetSnapShotId);
      let dataOneWindowStorage: IDataStateOfSitecoreWindow = this.AtticAgent.GetFromStorageBySnapShotId(internalCommandPayload.TargetSnapShotId);

      if (dataOneWindowStorage) {
        this.HineyScApi.SetStateOfSitecoreWindow(internalCommandPayload.ApiPayload, dataOneWindowStorage)
          .then(() => resolve())
          .catch((err) => reject(this.SetStateOfSitecoreWindow.name + ' | ' + err));
      };
    });
  }
}

export class ContentMessageBroker extends LoggableBase implements IContentMessageBroker {
  private SettingsAgent: ISettingsAgent;
  private HindSiteScWindowApi: IHindSiteScWindowApi;
  private SnapShotsAgent: ISnapShotsAgent;
  private AtticAgent: IContentAtticAgent;
  private ToastAgent: IToastAgent;
  private ScUiMan: ScUiManager;
  private ScWinMan: IScWindowManager;
  ContentBrowserProxy: IContentBrowserProxy;
  AutoSnapShotAgent: AutoSnapShotAgent;
  ContentCommandRunner: ContentInternalCommandRunner;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, apiManager: IHindSiteScWindowApi, atticMan: IContentAtticAgent, toastAgent: IToastAgent, scUiMan: ScUiManager, scWinMan: IScWindowManager, contentBrowserProxy: IContentBrowserProxy, autoSnapShotAgent: AutoSnapShotAgent, snapShotsAgent: ISnapShotsAgent, contentInternalCommandRunner: ContentInternalCommandRunner) {
    super(logger);
    this.Logger.InstantiateStart(ContentMessageBroker.name);

    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.HindSiteScWindowApi = apiManager;
    this.AtticAgent = atticMan;
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.ScWinMan = scWinMan;
    this.ContentBrowserProxy = contentBrowserProxy;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.SnapShotsAgent = snapShotsAgent;
    this.ContentCommandRunner = contentInternalCommandRunner;
    this.Logger.InstantiateEnd(ContentMessageBroker.name);
  }

  BeginListening() {
    this.Logger.FuncStart(this.BeginListening.name);

    var self = this;
    if (this.ContentBrowserProxy) {
      this.ContentBrowserProxy.AddListener((request: IMessageControllerToContent) => this.ContentReceiveRequest(request));
    }

    this.Logger.Log('Listening for messages');
    this.Logger.FuncEnd(this.BeginListening.name);
  }

  ValidateRequest(messageFromController: IMessageControllerToContent): IMessageControllerToContent {
    this.Logger.FuncStart(this.ValidateRequest.name);
    var isValid: boolean = true;

    if (messageFromController) {
      if (messageFromController.CurrentContentPrefs) {
      } else {
        this.Logger.WarningAndContinue(this.ValidateRequest.name, 'No CurrentContentPrefs')
        messageFromController.IsValid = false;
        isValid = false;
      }
    } else {
      this.Logger.WarningAndContinue(this.ValidateRequest.name, 'messageFromController is null')
      isValid = false;
    }

    messageFromController.IsValid = isValid;
    this.Logger.FuncEnd(this.ValidateRequest.name, isValid.toString());
    return messageFromController;
  }

  private NotifyFail(failrReason: string) {
    this.Logger.ErrorAndContinue(this.NotifyFail.name, 'Fail ' + failrReason);
  }

  async ContentReceiveRequest(messageFromController: IMessageControllerToContent): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.FuncStart(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));

      this.Logger.LogVal('ce butt', this.SettingsAgent.GetByKey(SettingKey.AutoLogin).ValueAsBool());

      if (messageFromController) {
        messageFromController = this.ValidateRequest(messageFromController);
        if (messageFromController.IsValid) {
          this.SettingsAgent.UpdateSettingsFromPopUpMsg(messageFromController.CurrentContentPrefs)

          await this.ReqMsgRouter(messageFromController)
            .then((contentResponse: MsgContentToController) => {
              this.Logger.Log('responding: ' + StaticHelpers.MsgFlagAsString(contentResponse.MsgFlag))
              resolve(contentResponse);
            })
            .catch((err) => {
              this.NotifyFail(err);
              resolve(new MsgContentToController(MsgFlag.RespTaskFailed));
              //reject(err);
            });
        } else {
          resolve(new MsgContentToController(MsgFlag.RespFailedDidNotValidate))
        }
      }
      else {
        reject('no request')
      }

      this.Logger.FuncEnd(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('Resuming Standby');
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('');
    })
  }

  private CalculateCommandToExec(messageFromController: IMessageControllerToContent): CommandToExecuteData {
    let commandData = new CommandToExecuteData(this.Logger);
    commandData.commandToExecute = null;
    commandData.CommandType = CommandType.Unknown;

    switch (messageFromController.MsgFlag) {
      case MsgFlag.ReqAddCETab:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.HindSiteScWindowApi.AddCETab;
        break;

      case MsgFlag.ReqUpdateNickName:

        commandData.CommandType = CommandType.ContentInternal;
        commandData.commandToExecute = this.SnapShotsAgent.SetNickName;
        break;

      case MsgFlag.ReqAdminB:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.HindSiteScWindowApi.AdminB;
        break;

      case MsgFlag.Ping:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.HindSiteScWindowApi.Ping;
        break;

      case MsgFlag.ReqOpenCE:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.HindSiteScWindowApi.OpenContentEditor;
        break;

      case MsgFlag.ReqToggleFavorite:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ContentCommandRunner.ToggleFavorite;
        break;

      case MsgFlag.ReqQuickPublish:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.HindSiteScWindowApi.PublischActiveCE;
        break;

      case MsgFlag.ReqSetStateOfSitecoreSameWindow:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ContentCommandRunner.SetStateOfSitecoreWindow;
        break;

      case MsgFlag.ReqToggleCompactCss:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.HindSiteScWindowApi.ToggleCompactCss;
        break;

      case MsgFlag.ReqTakeSnapShot:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.HindSiteScWindowApi.SaveWindowState;
        break;

      case MsgFlag.ReqRemoveFromStorage:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.ContentCommandRunner.RemoveSnapShot;
        break;

      case MsgFlag.ReqDebugAutoSnapShot:
        commandData.CommandType = CommandType.Api;
        commandData.commandToExecute = this.HindSiteScWindowApi.DebugForceAutoSnapShot;
        break;

      default:
        this.Logger.Log('Unhandled MsgFlag', StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));
        break;
    }

    return commandData;
  }

  async ReqMsgRouter(messageFromController: IMessageControllerToContent): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));

      if (messageFromController.SelectSnapshotId) {
        messageFromController.SelectSnapshotId = new GuidData(messageFromController.SelectSnapshotId.Raw);
      }

      let commandToExecute: CommandToExecuteData = this.CalculateCommandToExec(messageFromController);

      if (commandToExecute.CommandType == CommandType.Api) {
        await this.ExecuteApiCommand(commandToExecute.commandToExecute, messageFromController)
          .then((response: MsgContentToController) => resolve(response))
          .catch((err) => reject(err));
      } else if (commandToExecute.CommandType = CommandType.ContentInternal) {
      }

      if (commandToExecute) {
      } else {
        this.Logger.ErrorAndThrow(this.ReqMsgRouter.name, 'did not find command');
      }

      this.Logger.FuncEnd(this.ReqMsgRouter.name);
    });
  }

  ConstructResponse(msgFlag: MsgFlag): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      let response = new MsgContentToController(MsgFlag.Unknown);

      await this.HindSiteScWindowApi.GetStateOfContent()
        .then((result: IDataContentReplyReceivedEvent_Payload) => {
          response.Payload = result;
          response.Payload.LastReq = msgFlag;
          response.MsgFlag = MsgFlag.RespTaskSuccessful;
          response.Payload.LastReqFriendly = MsgFlag[msgFlag];
        })
        .then(() => resolve(response))
        .catch((err) => reject(err));
    });
  }

  BuildScProxyPayload(): IApiCommandPayload {
    let commandData: IApiCommandPayload = new CommandHandlerDataForContent(this.Logger, this.AtticAgent, this.ScWinMan, this.ToastAgent, this.ScUiMan, this.SettingsAgent, this.AutoSnapShotAgent);

    return commandData;
  }
  ExecuteInternalCommand(commandToExecute: Function, messageFromController: IMessageControllerToContent): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteInternalCommand.name);
      if (commandToExecute) {
        let scProxyPayload = this.BuildScProxyPayload();
        let commandData: InternalCommandPayload = new CommandPayloadForInternal(this.Logger, this.AtticAgent, this.ScWinMan, this.ToastAgent, this.ScUiMan, this.SettingsAgent, this.AutoSnapShotAgent, scProxyPayload);
        commandData.TargetSnapShotId = messageFromController.SelectSnapshotId;
        commandData.NewNickName = messageFromController.SnapShotNewNickname;
      }

      this.Logger.FuncEnd(this.ExecuteInternalCommand.name);
    });
  }

  ExecuteApiCommand(commandToExecute: Function, messageFromController: IMessageControllerToContent): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteApiCommand.name);
      if (commandToExecute) {
        let commandData = this.BuildScProxyPayload();

        commandData.ContentMessageBroker = this;
        //commandData.TargetSnapShotFlavor = stateOfPopUpUI.Payload.SnapShotSettings.Flavor;
        commandData.TargetCeProxy = null; //todo
        commandData.TargetDoc = null; // todo

        await commandToExecute(commandData)
          .then(() => this.ConstructResponse(messageFromController.MsgFlag))
          .then((response: MsgContentToController) => resolve(response))
          .catch((err) => reject(err));
      }

      this.Logger.FuncEnd(this.ExecuteApiCommand.name);
    });
  }
}