﻿import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { SettingKey } from "../../../Shared/scripts/Enums/3xxx-SettingKey";
import { IControllerMessageReceivedEvent_Payload } from "../../../Shared/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IContentBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { IMessageBroker_Content } from "../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScUrlAgent } from "../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IStateOfStorageSnapShots } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { ICommandRouterParams, IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IStateOfController";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { CommandRouter } from "./CommandRouter";
import { IStateOfScUiProxy } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IMessageContentToController } from "../../../Shared/scripts/Interfaces/IMsgPayload";

export class MessageBroker_Content extends LoggableBase implements IMessageBroker_Content {
  private SettingsAgent: ISettingsAgent;
  private HindSiteScUiProxy: IHindSiteScUiProxy;

  private AtticAgent: IContentAtticAgent;

  ContentBrowserProxy: IContentBrowserProxy;
  AutoSnapShotAgent: AutoSnapShotAgent;
  CommandRouter: CommandRouter;
  ScUrlAgent: IScUrlAgent;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, apiManager: IHindSiteScUiProxy, atticMan: IContentAtticAgent, contentBrowserProxy: IContentBrowserProxy, autoSnapShotAgent: AutoSnapShotAgent, commandRouter: CommandRouter, scUrlAgent: IScUrlAgent) {
    super(logger);
    this.Logger.CTORStart(MessageBroker_Content.name);

    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.HindSiteScUiProxy = apiManager;
    this.AtticAgent = atticMan;

    this.ContentBrowserProxy = contentBrowserProxy;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.CommandRouter = commandRouter;
    this.ScUrlAgent = scUrlAgent;

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
        .then((stateOfScUiProxy: IStateOfScUiProxy) => {
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