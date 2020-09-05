import { MsgFromPopUp } from "../../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFromContent } from "../../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { PayloadDataFromPopUp } from "../../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { RecipeBasics } from "../../../../Shared/scripts/Classes/PromiseGeneric";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IContentApi } from "../../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IContentMessageBroker } from "../../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { ICommandHndlrDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IRecipeBasics } from "../../../../Shared/scripts/Interfaces/IPromiseHelper";
import { LoggableBase } from "../../Managers/LoggableBase";
import { SitecoreUiManager } from "../../Managers/SitecoreUiManager/SitecoreUiManager";


export class ContentMessageBroker extends LoggableBase implements IContentMessageBroker {
  private SettingsAgent: ISettingsAgent;
  private ApiManager: IContentApi;
  private AtticAgent: IContentAtticAgent;
  private RecipeBasics: IRecipeBasics;
  private ToastAgent: IToastAgent;
  private ScUiMan: SitecoreUiManager;
  private ScWinMan: IScWindowManager;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, apiManager: IContentApi, atticMan: IContentAtticAgent,
    recipeBasics: RecipeBasics, toastAgent: IToastAgent,
    scUiMan: SitecoreUiManager, scWinMan: IScWindowManager

  ) {
    super(logger);
    this.Logger.InstantiateStart(ContentMessageBroker.name);

    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.ApiManager = apiManager;
    this.AtticAgent = atticMan;
    this.RecipeBasics = recipeBasics
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
    //this.ReadyForMessages = true;
    this.Logger.FuncEnd(this.BeginListening.name);
  }

  ValidateRequest(reqMsgFromPopup: MsgFromPopUp): MsgFromPopUp {
    this.Logger.FuncStart(this.ValidateRequest.name);
    var isValid: boolean = true;

    if (reqMsgFromPopup) {
      if (reqMsgFromPopup.CurrentContentPrefs) {
        if (reqMsgFromPopup.Data) {
        } else {
          reqMsgFromPopup.Data = new PayloadDataFromPopUp();
        }
      } else {
        this.Logger.ErrorAndThrow(this.ValidateRequest.name, 'No CurrentContentPrefs')
        reqMsgFromPopup.IsValid = false;
        isValid = false;
      }
    } else {
      this.Logger.ErrorAndThrow(this.ValidateRequest.name, 'no reqMsgFromPopup');
    }

    reqMsgFromPopup.IsValid = isValid;
    this.Logger.FuncEnd(this.ValidateRequest.name, isValid.toString());
    return reqMsgFromPopup;
  }

  private NotifyFail(failrReason: string) {
    this.Logger.ErrorAndContinue(this.NotifyFail.name, 'Fail ' + failrReason);
  }

  async ContentReceiveRequest(reqMsgFromPopup: MsgFromPopUp): Promise<MsgFromContent> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(reqMsgFromPopup.MsgFlag));

      this.SettingsAgent.SetContentSettings(reqMsgFromPopup.CurrentContentPrefs);

      if (reqMsgFromPopup) {
        reqMsgFromPopup = this.ValidateRequest(reqMsgFromPopup);
        if (reqMsgFromPopup.IsValid) {
          this.Logger.LogAsJsonPretty('reqMsgFromPopup', reqMsgFromPopup);

          await this.ReqMsgRouter(reqMsgFromPopup)
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

      this.Logger.FuncEnd(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(reqMsgFromPopup.MsgFlag));
    })
  }
  async NewMsgFromContentShell() {
    this.Logger.FuncStart(this.NewMsgFromContentShell.name);
    var response = new MsgFromContent(MsgFlag.Unknown);
    //await this.UpdateContentState(response);
    //response.ContentState.LastReq = MsgFlag.Unknown;
    this.Logger.FuncEnd(this.NewMsgFromContentShell.name);
    return response;
  }

  private CalculateCommandToExec(msgFlag: MsgFlag): Function {
    let commandToExecute: Function = null;

    switch (msgFlag) {
      //case MsgFlag.ReqRestoreToNewTab:
      //  commandToExecute = this.ApiManager.RestoreToNewTab;
      //  break;

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

      case MsgFlag.ReqRestoreClick:
        commandToExecute = this.ApiManager.RestoreSnapshop;
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

      case MsgFlag.ReqUpdateNickName:
        commandToExecute = this.ApiManager.UpdateNickname
        break;

      default:
        this.Logger.ErrorAndThrow('Unhandled MsgFlag', StaticHelpers.MsgFlagAsString(msgFlag));
        break;
    }

    return commandToExecute;
  }

  async ReqMsgRouter(payload: MsgFromPopUp): Promise<MsgFromContent> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(payload.MsgFlag));

      if (payload.Data.IdOfSelect) {
        payload.Data.IdOfSelect = new GuidData(payload.Data.IdOfSelect.Raw);
      }

      this.SettingsAgent.UpdateSettings(payload.CurrentContentPrefs);

      let commandToExecute: Function = this.CalculateCommandToExec(payload.MsgFlag);

      await this.ExecuteCommand(commandToExecute, payload)
        .then((response: MsgFromContent) => resolve(response))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.ReqMsgRouter.name);
    });
  }

  ExecuteCommand(commandToExecute: Function, payload: MsgFromPopUp): Promise<MsgFromContent> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ExecuteCommand.name);
      if (commandToExecute) {
        var response: MsgFromContent = await this.NewMsgFromContentShell();

        let commandData: ICommandHndlrDataForContent = {
          AtticAgent: this.AtticAgent,
          TargetNickName: payload.Data.SnapShotSettings.SnapShotNewNickname,
          TargetSnapShotId: payload.Data.IdOfSelect,
          ContentMessageBroker: this,
          TopLevelDoc: this.ScWinMan.TopLevelDoc(),
          Logger: this.Logger,
          RecipeBasics: this.RecipeBasics,
          ToastAgent: this.ToastAgent,
          ScUiMan: this.ScUiMan,
          ScWinMan: this.ScWinMan,
          TargetSnapShotFlavor: payload.Data.SnapShotSettings.Flavor
        }

        await commandToExecute(commandData)
          .then(() => this.ApiManager.GetContentState())
          .then((result: IContentState) => {
            response.ContentState.LastReq = payload.MsgFlag;
            response.MsgFlag = MsgFlag.RespTaskSuccessful;
            response.ContentState = result;
          })
          .then(() => resolve(response))
          .catch((err) => reject(err));
      }

      this.Logger.FuncEnd(this.ExecuteCommand.name);
    });
  }
}