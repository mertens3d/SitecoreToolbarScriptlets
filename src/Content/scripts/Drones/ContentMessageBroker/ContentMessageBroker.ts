import { CommandHandlerDataForContent } from "../../../../Shared/scripts/Classes/CommandHandlerDataForContent/CommandHandlerDataForContent";
import { MsgContentToController } from "../../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IHindSiteScWindowApi } from "../../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IContentBrowserProxy } from "../../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { IContentMessageBroker } from "../../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { ICommandHandlerDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandRecipes } from "../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { IMessageControllerToContent } from "../../../../Shared/scripts/Interfaces/IStateOfController";
import { RecipeChangeNickName } from "../../ContentApi/Recipes/RecipeChangeNickName/RecipeChangeNickName";
import { LoggableBase } from "../../Managers/LoggableBase";
import { ScUiManager } from "../../Managers/SitecoreUiManager/SitecoreUiManager";
import { IDataContentReplyReceivedEvent_Payload } from "../../Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export class ContentMessageBroker extends LoggableBase implements IContentMessageBroker {
  private SettingsAgent: ISettingsAgent;
  private ApiManager: IHindSiteScWindowApi;
  private AtticAgent: IContentAtticAgent;
  private ToastAgent: IToastAgent;
  private ScUiMan: ScUiManager;
  private ScWinMan: IScWindowManager;
  ContentBrowserProxy: IContentBrowserProxy;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, apiManager: IHindSiteScWindowApi, atticMan: IContentAtticAgent, toastAgent: IToastAgent, scUiMan: ScUiManager, scWinMan: IScWindowManager, contentBrowserProxy: IContentBrowserProxy) {
    super(logger);
    this.Logger.InstantiateStart(ContentMessageBroker.name);

    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.ApiManager = apiManager;
    this.AtticAgent = atticMan;
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.ScWinMan = scWinMan;
    this.ContentBrowserProxy = contentBrowserProxy;
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

  private CalculateRecipeToExec(messageFromController: IMessageControllerToContent): ICommandRecipes {
    let RecipeToExecute: ICommandRecipes;
    switch (messageFromController.MsgFlag) {
      case MsgFlag.ReqUpdateNickName:
        RecipeToExecute = new RecipeChangeNickName(this.Logger, messageFromController.SnapShotNewNickname, messageFromController.SelectSnapshotId, this.AtticAgent)
        break;

      default:
        break;
    }
    return RecipeToExecute;
  }
  private CalculateCommandToExec(messageFromController: IMessageControllerToContent): Function {
    let commandToExecute: Function = null;

    switch (messageFromController.MsgFlag) {
      case MsgFlag.ReqAddCETab:
        commandToExecute = this.ApiManager.AddCETab;
        break;

      case MsgFlag.ReqAdminB:
        commandToExecute = this.ApiManager.AdminB;
        break;

      case MsgFlag.Ping:
        commandToExecute = this.ApiManager.Ping;
        break;

      case MsgFlag.ReqOpenCE:
        commandToExecute = this.ApiManager.OpenContentEditor;
        break;

      case MsgFlag.ReqToggleFavorite:
        commandToExecute = this.ApiManager.ToggleFavorite;
        break;

      case MsgFlag.ReqQuickPublish:
        commandToExecute = this.ApiManager.PublischActiveCE;
        break;

      case MsgFlag.ReqSetStateOfSitecoreSameWindow:
        commandToExecute = this.ApiManager.SetStateOfSitecoreWindow;
        break;

      case MsgFlag.ReqToggleCompactCss:
        commandToExecute = this.ApiManager.ToggleCompactCss;
        break;

      case MsgFlag.ReqTakeSnapShot:
        commandToExecute = this.ApiManager.SaveWindowState;
        break;

      case MsgFlag.ReqRemoveFromStorage:
        commandToExecute = this.ApiManager.RemoveSnapShot;
        break;

      default:
        this.Logger.Log('Unhandled MsgFlag', StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));
        break;
    }

    return commandToExecute;
  }

  async ReqMsgRouter(messageFromController: IMessageControllerToContent): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));

      if (messageFromController.SelectSnapshotId) {
        messageFromController.SelectSnapshotId = new GuidData(messageFromController.SelectSnapshotId.Raw);
      }

      let commandToExecute: Function = this.CalculateCommandToExec(messageFromController);
      if (commandToExecute) {
        await this.ExecuteCommand(commandToExecute, messageFromController)
          .then((response: MsgContentToController) => resolve(response))
          .catch((err) => reject(err));
      } else {
        let recipeToExecute: ICommandRecipes = this.CalculateRecipeToExec(messageFromController);

        if (recipeToExecute) {
          await recipeToExecute.Execute()
            .then(() => this.ConstructResponse(messageFromController.MsgFlag))
            .then((response: MsgContentToController) => resolve(response))
            .catch((err) => reject(err));
        } else {
          reject('Unhandled MsgFlag: ' + StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));
        }
      }

      this.Logger.FuncEnd(this.ReqMsgRouter.name);
    });
  }

  ConstructResponse(msgFlag: MsgFlag): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      let response = new MsgContentToController(MsgFlag.Unknown);

      await this.ApiManager.GetStateOfContent()
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

  ExecuteCommand(commandToExecute: Function, messageFromController: IMessageControllerToContent): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteCommand.name);
      if (commandToExecute) {
        let commandData: ICommandHandlerDataForContent = new CommandHandlerDataForContent(this.Logger, this.AtticAgent, this.ScWinMan, this.ToastAgent, this.ScUiMan, this.SettingsAgent)

        commandData.TargetSnapShotId = messageFromController.SelectSnapshotId;
        commandData.ContentMessageBroker = this;
        //commandData.TargetSnapShotFlavor = stateOfPopUpUI.Payload.SnapShotSettings.Flavor;
        commandData.TargetCeProxy = null; //todo
        commandData.TargetDoc = null; // todo

        await commandToExecute(commandData)
          .then(() => this.ConstructResponse(messageFromController.MsgFlag))
          .then((response: MsgContentToController) => resolve(response))
          .catch((err) => reject(err));
      }

      this.Logger.FuncEnd(this.ExecuteCommand.name);
    });
  }
}