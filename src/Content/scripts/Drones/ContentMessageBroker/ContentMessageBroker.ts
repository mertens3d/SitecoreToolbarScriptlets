import { CommandHandlerDataForContent } from "../../../../Shared/scripts/Classes/CommandHandlerDataForContent/CommandHandlerDataForContent";
import { MsgFromContent } from "../../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IHindSiteScWindowApi } from "../../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IContentMessageBroker } from "../../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { ICommandHandlerDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { ICommandRecipes } from "../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { IStateOfPopUp } from "../../../../Shared/scripts/Interfaces/IMsgPayload";
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

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, apiManager: IHindSiteScWindowApi, atticMan: IContentAtticAgent, toastAgent: IToastAgent, scUiMan: ScUiManager, scWinMan: IScWindowManager) {
    super(logger);
    this.Logger.InstantiateStart(ContentMessageBroker.name);

    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.ApiManager = apiManager;
    this.AtticAgent = atticMan;
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.ScWinMan = scWinMan;
    this.Logger.InstantiateEnd(ContentMessageBroker.name);
  }

  BeginListening() {
    this.Logger.FuncStart(this.BeginListening.name);

    var self = this;
    browser.runtime.onMessage.addListener(request => self.ContentReceiveRequest(request));

    this.Logger.Log('Listening for messages');
    this.Logger.FuncEnd(this.BeginListening.name);
  }

  ValidateRequest(stateOfPopUp: IStateOfPopUp): IStateOfPopUp {
    this.Logger.FuncStart(this.ValidateRequest.name);
    var isValid: boolean = true;

    if (stateOfPopUp) {
      if (stateOfPopUp.CurrentContentPrefs) {
      } else {
        this.Logger.ErrorAndThrow(this.ValidateRequest.name, 'No CurrentContentPrefs')
        stateOfPopUp.IsValid = false;
        isValid = false;
      }
    } else {
      this.Logger.ErrorAndThrow(this.ValidateRequest.name, 'no reqMsgFromPopup');
    }

    stateOfPopUp.IsValid = isValid;
    this.Logger.FuncEnd(this.ValidateRequest.name, isValid.toString());
    return stateOfPopUp;
  }

  private NotifyFail(failrReason: string) {
    this.Logger.ErrorAndContinue(this.NotifyFail.name, 'Fail ' + failrReason);
  }

  async ContentReceiveRequest(stateOfPopUp: IStateOfPopUp): Promise<MsgFromContent> {
    return new Promise(async (resolve, reject) => {
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.FuncStart(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(stateOfPopUp.MsgFlag));

      this.Logger.LogVal('ce butt', this.SettingsAgent.GetByKey(SettingKey.AutoLogin).ValueAsBool());

      if (stateOfPopUp) {
        stateOfPopUp = this.ValidateRequest(stateOfPopUp);
        if (stateOfPopUp.IsValid) {
          this.SettingsAgent.UpdateSettingsFromPopUpMsg(stateOfPopUp.CurrentContentPrefs)

          await this.ReqMsgRouter(stateOfPopUp)
            .then((contentResponse: MsgFromContent) => {
              this.Logger.Log('responding: ' + StaticHelpers.MsgFlagAsString(contentResponse.MsgFlag))
              resolve(contentResponse);
            })
            .catch((err) => {
              this.NotifyFail(err);
              resolve(new MsgFromContent(MsgFlag.RespTaskFailed));
              //reject(err);
            });
        } else {
          reject('reqMsgFromPopup is not valid')
        }
      }
      else {
        reject('no request')
      }

      this.Logger.FuncEnd(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(stateOfPopUp.MsgFlag));
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('Resuming Standby');
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('');
    })
  }

  private CalculateRecipeToExec(stateOfPopUp: IStateOfPopUp): ICommandRecipes {
    let RecipeToExecute: ICommandRecipes;
    switch (stateOfPopUp.MsgFlag) {
      case MsgFlag.ReqUpdateNickName:
        RecipeToExecute = new RecipeChangeNickName(this.Logger, stateOfPopUp.SnapShotNewNickname, stateOfPopUp.SelectSnapshotId, this.AtticAgent)
        break;

      default:
        break;
    }
    return RecipeToExecute;
  }
  private CalculateCommandToExec(stateOfPopUp: IStateOfPopUp): Function {
    let commandToExecute: Function = null;

    switch (stateOfPopUp.MsgFlag) {
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

      case MsgFlag.ReqMarkFavorite:
        commandToExecute = this.ApiManager.MarkFavorite;
        break;

      case MsgFlag.ReqQuickPublish:
        commandToExecute = this.ApiManager.PublischActiveCE;
        break;

      case MsgFlag.ReqSetStateOfSitecoreWindow:
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
        this.Logger.Log('Unhandled MsgFlag', StaticHelpers.MsgFlagAsString(stateOfPopUp.MsgFlag));
        break;
    }

    return commandToExecute;
  }

  async ReqMsgRouter(stateOfPopup: IStateOfPopUp): Promise<MsgFromContent> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(stateOfPopup.MsgFlag));

      if (stateOfPopup.SelectSnapshotId) {
        stateOfPopup.SelectSnapshotId = new GuidData(stateOfPopup.SelectSnapshotId.Raw);
      }

      let commandToExecute: Function = this.CalculateCommandToExec(stateOfPopup);
      if (commandToExecute) {
        await this.ExecuteCommand(commandToExecute, stateOfPopup)
          .then((response: MsgFromContent) => resolve(response))
          .catch((err) => reject(err));
      } else {
        let recipeToExecute: ICommandRecipes = this.CalculateRecipeToExec(stateOfPopup);

        if (recipeToExecute) {
          await recipeToExecute.Execute()
            .then(() => this.ConstructResponse(stateOfPopup.MsgFlag))
            .then((response: MsgFromContent) => resolve(response))
            .catch((err) => reject(err));
        } else {
          reject('Unhandled MsgFlag: ' + StaticHelpers.MsgFlagAsString(stateOfPopup.MsgFlag));
        }
      }

      this.Logger.FuncEnd(this.ReqMsgRouter.name);
    });
  }

  ConstructResponse(msgFlag: MsgFlag): Promise<MsgFromContent> {
    return new Promise(async (resolve, reject) => {
      let response = new MsgFromContent(MsgFlag.Unknown);

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

  ExecuteCommand(commandToExecute: Function, stateOfPopUp: IStateOfPopUp): Promise<MsgFromContent> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteCommand.name);
      if (commandToExecute) {
        let commandData: ICommandHandlerDataForContent = new CommandHandlerDataForContent(this.Logger, this.AtticAgent, this.ScWinMan, this.ToastAgent, this.ScUiMan, this.SettingsAgent)

        commandData.TargetSnapShotId = stateOfPopUp.SelectSnapshotId;
        commandData.ContentMessageBroker = this;
        //commandData.TargetSnapShotFlavor = stateOfPopUp.Payload.SnapShotSettings.Flavor;
        commandData.TargetCeProxy = null; //todo
        commandData.TargetDoc = null; // todo

        await commandToExecute(commandData)
          .then(() => this.ConstructResponse(stateOfPopUp.MsgFlag))
          .then((response: MsgFromContent) => resolve(response))
          .catch((err) => reject(err));
      }

      this.Logger.FuncEnd(this.ExecuteCommand.name);
    });
  }
}