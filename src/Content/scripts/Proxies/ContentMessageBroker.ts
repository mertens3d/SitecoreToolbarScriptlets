import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../Shared/scripts/Enums/10 - MessageFlag";
import { SettingKey } from "../../../Shared/scripts/Enums/30 - SettingKey";
import { IHindSiteScUiAPI } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IContentBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { IMessageBroker_Content } from "../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfStorageSnapShots";
import { ICommandRouterParams } from "../../../Shared/scripts/Interfaces/ICommandRouterParams";
import { IMessageContentToController } from "../../../Shared/scripts/Interfaces/IMessageContentToController";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IMessageControllerToContent";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { CommandRouter } from "./CommandRouter";

export class MessageBroker_Content extends _FrontBase implements IMessageBroker_Content {
  private SettingsAgent: ISettingsAgent;
  private HindSiteScUiProxy: IHindSiteScUiAPI;

  private AtticAgent: IContentAtticAgent;

  ContentBrowserProxy: IContentBrowserProxy;
  AutoSnapShotAgent: AutoSnapShotAgent;
  CommandRouter: CommandRouter;

  constructor(hindeCore: IHindeCore, settingsAgent: ISettingsAgent, apiManager: IHindSiteScUiAPI, atticMan: IContentAtticAgent, contentBrowserProxy: IContentBrowserProxy, autoSnapShotAgent: AutoSnapShotAgent, commandRouter: CommandRouter) {
    super(hindeCore);
    this.Logger.CTORStart(MessageBroker_Content.name);

    this.SettingsAgent = settingsAgent;
    this.HindSiteScUiProxy = apiManager;
    this.AtticAgent = atticMan;

    this.ContentBrowserProxy = contentBrowserProxy;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.CommandRouter = commandRouter;

    this.Logger.CTOREnd(MessageBroker_Content.name);
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
        this.ErrorHand.WarningAndContinue(this.ValidateRequest.name, 'No CurrentContentPrefs')
        messageFromController.IsValid = false;
        isValid = false;
      }
    } else {
      this.ErrorHand.WarningAndContinue(this.ValidateRequest.name, 'messageFromController is null')
      isValid = false;
    }

    messageFromController.IsValid = isValid;
    this.Logger.FuncEnd(this.ValidateRequest.name, isValid.toString());
    return messageFromController;
  }

  private NotifyFail(failrReason: string) {
    this.ErrorHand.ErrorAndContinue(this.NotifyFail.name, 'Fail ' + failrReason);
  }

  async ContentReceiveRequest(messageFromController: IMessageControllerToContent): Promise<IMessageContentToController> {
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
            .then((msgContentToController: IMessageContentToController) => {
              this.Logger.Log('responding: ' + StaticHelpers.MsgFlagAsString(msgContentToController.MsgFlag))
              resolve(msgContentToController);
            })
            .catch((err) => {
              this.NotifyFail(err);
              resolve(new DefaultMsgContentToController(MsgFlag.RespTaskFailed));
            });
        } else {
          resolve(new DefaultMsgContentToController(MsgFlag.RespFailedDidNotValidate))
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

  async ReqMsgRouter(messageFromController: IMessageControllerToContent): Promise<DefaultMsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));

      let commandRouterParams: ICommandRouterParams = {
        MsgFlag: messageFromController.MsgFlag,
        NewNickName: messageFromController.StateOfPopUI.NewNickName,
        SelectSnapShotId: messageFromController.StateOfPopUI.SelectSnapShotId
      }

      await this.CommandRouter.RouteCommand(commandRouterParams)
        .then(() => this.ConstructResponse(messageFromController.MsgFlag))
        .then((response: DefaultMsgContentToController) => {
          resolve(response)
        })
        .catch((err) => reject(this.ReqMsgRouter.name + ' | ' + err));

      this.Logger.FuncEnd(this.ReqMsgRouter.name);
    });
  }

  async ConstructResponse(msgFlag: MsgFlag): Promise<DefaultMsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ConstructResponse.name);
      let responseContentToController = new DefaultMsgContentToController(MsgFlag.Unknown);

      await this.HindSiteScUiProxy.GetStateOfScUiProxy()
        .then((stateOfScUiProxy: IStateOfScUi) => {
          responseContentToController.Payload.StateOfScUiProxy_Live = stateOfScUiProxy;
          responseContentToController.Payload.LastReq = msgFlag;
          responseContentToController.MsgFlag = MsgFlag.RespTaskSuccessful;
          responseContentToController.Payload.LastReqFriendly = MsgFlag[msgFlag];
          responseContentToController.Payload.ErrorStack = ['todo'];
        })
        .then(() => this.AtticAgent.GetStateOfStorageSnapShots())
        .then((stateOfStorageSnapShots: IStateOfStorageSnapShots) => responseContentToController.Payload.StateOfStorageSnapShots = stateOfStorageSnapShots)
        .then(() => resolve(responseContentToController))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.ConstructResponse.name);
    });
  }
}