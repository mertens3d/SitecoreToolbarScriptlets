import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/DefaultMsgContentToController";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { ReqCommandMsgFlag } from "../../../Shared/scripts/Enums/10 - MessageFlag";
import { ReplyCommandMsgFlag } from "../../../Shared/scripts/Enums/ReplyCommandMsgFlag";
import { SettingKey } from "../../../Shared/scripts/Enums/30 - SettingKey";
import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxy";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IContentBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { IMessageBroker_Content } from "../../../Shared/scripts/Interfaces/Agents/IContentMessageBroker";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../../Shared/scripts/Interfaces/StateOf/IStateOfStorageSnapShots";
import { ICommandRouterParams } from "../../../Shared/scripts/Interfaces/ICommandRouterParams";
import { IMessageContentToController } from "../../../Shared/scripts/Interfaces/IMessageContentToController";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IMessageControllerToContent";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { CommandRouter } from "./CommandRouter";

export class BrowserMessageBroker_Content extends _FrontBase implements IMessageBroker_Content {
  private SettingsAgent: ISettingsAgent;
  private HindSiteScUiProxy: IHindSiteScUiProxy;

  private AtticAgent: IContentAtticAgent;

  ContentBrowserProxy: IContentBrowserProxy;
  AutoSnapShotAgent: AutoSnapShotAgent;
  CommandRouter: CommandRouter;

  constructor(hindeCore: IHindeCore, settingsAgent: ISettingsAgent, apiManager: IHindSiteScUiProxy, atticMan: IContentAtticAgent, contentBrowserProxy: IContentBrowserProxy, autoSnapShotAgent: AutoSnapShotAgent, commandRouter: CommandRouter) {
    super(hindeCore);
    this.Logger.CTORStart(BrowserMessageBroker_Content.name);

    this.SettingsAgent = settingsAgent;
    this.HindSiteScUiProxy = apiManager;
    this.AtticAgent = atticMan;

    this.ContentBrowserProxy = contentBrowserProxy;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.CommandRouter = commandRouter;

    this.Instantiate();

    this.Logger.CTOREnd(BrowserMessageBroker_Content.name);
  }

  private Instantiate() {
    //empty
  }

  BeginListening() {
    this.Logger.FuncStart(this.BeginListening.name);

    this.WireEvents();
    this.Logger.Log('Listening for messages');

    this.Logger.FuncEnd(this.BeginListening.name);
  }

  private WireEvents() {
    if (this.ContentBrowserProxy) {
      this.ContentBrowserProxy.AddListenerForPopUp((request: IMessageControllerToContent) => this.ContentReceiveRequest(request));
    }
  }

  ValidateRequest(messageFromController: IMessageControllerToContent): IMessageControllerToContent {
    this.Logger.FuncStart(this.ValidateRequest.name);
    var isValid: boolean = true;

    if (messageFromController) {
      if (messageFromController.CurrentContentPrefs) {
      }
      else {
        this.ErrorHand.WarningAndContinue(this.ValidateRequest.name, 'No CurrentContentPrefs');
        messageFromController.IsValid = false;
        isValid = false;
      }
    }
    else {
      this.ErrorHand.WarningAndContinue(this.ValidateRequest.name, 'messageFromController is null');
      isValid = false;
    }

    messageFromController.IsValid = isValid;
    this.Logger.FuncEnd(this.ValidateRequest.name, isValid.toString());
    return messageFromController;
  }

  private NotifyFail(failrReason: string) {
    this.ErrorHand.ErrorAndContinue(this.NotifyFail.name, 'Fail ' + failrReason);
  }

  async ContentReceiveRequest(messageControllerToContent: IMessageControllerToContent): Promise<IMessageContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.FuncStart(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(messageControllerToContent.MsgFlag));

      this.Logger.LogVal('ce butt', this.SettingsAgent.GetByKey(SettingKey.AutoLogin).ValueAsBool());

      if (messageControllerToContent) {
        messageControllerToContent = this.ValidateRequest(messageControllerToContent);
        if (messageControllerToContent.IsValid) {
          this.SettingsAgent.UpdateSettingsFromPopUpMsg(messageControllerToContent.CurrentContentPrefs);

          await this.ReqMsgRouter(messageControllerToContent)
            .then((msgContentToController: IMessageContentToController) => {
              this.Logger.Log('responding: ' + ReplyCommandMsgFlag[msgContentToController.MsgFlagReply]);
              resolve(msgContentToController);
            })
            .catch((err: any) => {
              this.NotifyFail(err);
              resolve(new DefaultMsgContentToController(ReplyCommandMsgFlag.RespTaskFailed));
            });
        }
        else {
          resolve(new DefaultMsgContentToController(ReplyCommandMsgFlag.RespFailedDidNotValidate));
        }
      }
      else {
        reject('no request');
      }

      this.Logger.FuncEnd(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(messageControllerToContent.MsgFlag));
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('Resuming Standby');
      this.Logger.Log('');
      this.Logger.Log('');
      this.Logger.Log('');
    });
  }

  async ReqMsgRouter(messageFromController: IMessageControllerToContent): Promise<DefaultMsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));

      let commandRouterParams: ICommandRouterParams = {
        MsgFlag: messageFromController.MsgFlag,
        NewNickName: messageFromController.StateOfPopUI.NewNickName,
        SelectSnapShotId: messageFromController.StateOfPopUI.SelectSnapShotId,
        SelectText: '',
      };

      await this.CommandRouter.RouteCommand(commandRouterParams)
        .then(() => this.ConstructResponse(messageFromController.MsgFlag))
        .then((response: DefaultMsgContentToController) => {
          resolve(response);
        })
        .catch((err: any) => reject(this.ReqMsgRouter.name + ' | ' + err));

      this.Logger.FuncEnd(this.ReqMsgRouter.name);
    });
  }

  async ConstructResponse(msgFlag: ReqCommandMsgFlag): Promise<DefaultMsgContentToController> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.ConstructResponse.name);
      let responseContentToController = new DefaultMsgContentToController(ReplyCommandMsgFlag.Unknown);

      await this.HindSiteScUiProxy.GetStateOfScUiProxy()
        .then((stateOfScUiProxy: IStateOfScUi) => {
          responseContentToController.Payload.StateOfScUiProxy_Live = stateOfScUiProxy;
          responseContentToController.Payload.LastReq = msgFlag;
          responseContentToController.MsgFlagReply = ReplyCommandMsgFlag.RespTaskSuccessful;
          responseContentToController.Payload.LastReqFriendly = ReqCommandMsgFlag[msgFlag];
          responseContentToController.Payload.ErrorStack = ['todo'];
        })
        .then(() => this.AtticAgent.GetStateOfStorageSnapShots())
        .then((stateOfStorageSnapShots: IStateOfStorageSnapShots) => responseContentToController.Payload.StateOfStorageSnapShots = stateOfStorageSnapShots)
        .then(() => resolve(responseContentToController))
        .catch((err: any) => reject(err));

      this.Logger.FuncEnd(this.ConstructResponse.name);
    });
  }
}