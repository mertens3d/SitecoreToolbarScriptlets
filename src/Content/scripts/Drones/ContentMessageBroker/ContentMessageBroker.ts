import { IContentMessageBroker } from "../../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { MsgFromPopUp } from "../../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFromContent } from "../../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { PayloadDataFromPopUp } from "../../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { ContentAPIManager } from "../../Managers/ContentAPIManager/ContentAPIManager";
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IDataOneDoc } from "../../../../Shared/scripts/Interfaces/IDataOneDoc";
import { ContentManagerBase } from "../../_first/_ContentManagerBase";
import { ContentHub } from "../../Managers/ContentHub/ContentHub";
import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { ICommandHndlrDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";

export class ContentMessageBroker extends ContentManagerBase implements IContentMessageBroker {
  private Logger: ILoggerAgent;
  private SettingsAgent: ISettingsAgent;
  private ApiManager: ContentAPIManager;
  private TopLevelDoc: IDataOneDoc;
  //ReadyForMessages: boolean = false;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, apiManager: ContentAPIManager, topLevelDoc: IDataOneDoc, hub: ContentHub, contentAgents: IAllAgents) {
    super(hub, contentAgents);
    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.ApiManager = apiManager;
    this.TopLevelDoc = topLevelDoc;

    this.Logger.InstantiateStart(ContentMessageBroker.name);

    this.Logger.InstantiateEnd(ContentMessageBroker.name);
  }

  BeginListening() {
    this.Logger.FuncStart(this.BeginListening.name);

    var self = this;
    browser.runtime.onMessage.addListener(request => self.ContentReceiveRequest(request));

    this.AllAgents.Logger.Log('Listening for messages');
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

  async ContentReceiveRequest(reqMsgFromPopup: MsgFromPopUp): Promise<MsgFromContent> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(reqMsgFromPopup.MsgFlag));

      this.SettingsAgent.SetContentSettings(reqMsgFromPopup.CurrentContentPrefs);

      if (reqMsgFromPopup) {
        reqMsgFromPopup = this.ValidateRequest(reqMsgFromPopup);
        if (reqMsgFromPopup.IsValid) {
          await this.ReqMsgRouter(reqMsgFromPopup)
            .then((contentResponse: MsgFromContent) => {
              resolve(contentResponse);
            })
            .catch((err) => reject(err))
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

  async ReqMsgRouter(payload: MsgFromPopUp): Promise<MsgFromContent> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(payload.MsgFlag));

      let commandToExecute: Function = null;

      var response: MsgFromContent = await this.NewMsgFromContentShell();

      switch (payload.MsgFlag) {
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

        case MsgFlag.RemoveFromStorage:
          commandToExecute = this.ApiManager.RemoveSnapShot;
          break;

        case MsgFlag.RespTaskSuccessful:
          commandToExecute = this.ApiManager.Notify;
          break;

        case MsgFlag.ReqUpdateNickName:
          commandToExecute = this.ApiManager.UpdateNickname
          break;

        default:
          this.Logger.ErrorAndThrow('Unhandled MsgFlag', StaticHelpers.MsgFlagAsString(payload.MsgFlag));
          break;
      }

      if (commandToExecute) {

        let commandData: ICommandHndlrDataForContent = {
          PayloadData : payload.Data,
          ContentMessageBroker: this,
          TopLevelDoc: this.TopLevelDoc,
          ContentHub: this.ContentHub
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

      this.Logger.FuncEnd(this.ReqMsgRouter.name);
    });

    //ScUiMan() {
    //  throw new Error("Method not implemented.");
    //}
  }
}