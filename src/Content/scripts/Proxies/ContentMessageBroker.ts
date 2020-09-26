import { LoggableBase } from "../../../Shared/scripts/LoggableBase";
import { ScUiManager } from "../../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { MsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { SettingKey } from "../../../Shared/scripts/Enums/3xxx-SettingKey";
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { ISnapShotsAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/ISnapShotsAgent";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IContentBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { IContentMessageBroker } from "../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { IDataStateOfStorageSnapShots } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IStateOfController";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { InternalCommandRunner } from "./InternalCommandRunner";
import { CommandRouter } from "./CommandRouter";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Shared/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export class ContentMessageBroker extends LoggableBase implements IContentMessageBroker {
  private SettingsAgent: ISettingsAgent;
  private HindSiteScWindowApi: IHindSiteScUiProxy;

  private AtticAgent: IContentAtticAgent;

  ContentBrowserProxy: IContentBrowserProxy;
  AutoSnapShotAgent: AutoSnapShotAgent;
  CommandRouter: CommandRouter;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, apiManager: IHindSiteScUiProxy, atticMan: IContentAtticAgent, contentBrowserProxy: IContentBrowserProxy, autoSnapShotAgent: AutoSnapShotAgent, commandRouter: CommandRouter) {
    super(logger);
    this.Logger.InstantiateStart(ContentMessageBroker.name);

    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.HindSiteScWindowApi = apiManager;
    this.AtticAgent = atticMan;

    this.ContentBrowserProxy = contentBrowserProxy;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.CommandRouter = commandRouter;
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

  async ReqMsgRouter(messageFromController: IMessageControllerToContent): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));

      await this.CommandRouter.RouteCommand(messageFromController.MsgFlag, messageFromController)
        .then(() => this.ConstructResponse(messageFromController.MsgFlag))
        .then((response: MsgContentToController) => resolve(response))
        .catch((err) => reject(this.ReqMsgRouter.name + ' | ' + err));

      this.Logger.FuncEnd(this.ReqMsgRouter.name);
    });
  }

  ConstructResponse(msgFlag: MsgFlag): Promise<MsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ConstructResponse.name);
      let response = new MsgContentToController(MsgFlag.Unknown);

      await this.HindSiteScWindowApi.GetStateOfScWindow()
        .then((result: IDataContentReplyReceivedEvent_Payload) => {
          response.Payload = result;
          response.Payload.LastReq = msgFlag;
          response.MsgFlag = MsgFlag.RespTaskSuccessful;
          response.Payload.LastReqFriendly = MsgFlag[msgFlag];
          response.Payload.ErrorStack = response.Payload.ErrorStack.concat(result.ErrorStack);
        })
        .then(() => this.AtticAgent.GetStateOfStorageSnapShots())
        .then((result: IDataStateOfStorageSnapShots) => response.Payload.StateOfStorageSnapShots = result)
        .then(() => resolve(response))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.ConstructResponse.name);
    });
  }
}