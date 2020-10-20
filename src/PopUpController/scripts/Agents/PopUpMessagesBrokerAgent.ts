import { HindSiteSettingWrapper } from "../../../Shared/scripts/Agents/SettingsAgent/HindSiteSettingWrapper";
import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/DefaultMsgContentToController";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { ReqCommandMsgFlag } from "../../../Shared/scripts/Enums/10 - MessageFlag";
import { ReplyCommandMsgFlag } from "../../../Shared/scripts/Enums/ReplyCommandMsgFlag";
import { SettingFlavor } from "../../../Shared/scripts/Enums/SettingFlavor";
import { ContentReplyReceivedEvent_Subject } from "../../../Shared/scripts/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Subject";
import { IControllerMessageReceivedEvent_Payload } from "../../../Shared/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IMessageContentToController_Payload } from "../../../Shared/scripts/Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";
import { IHindSiteSetting } from "../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IMessageContentToController } from "../../../Shared/scripts/Interfaces/IMessageContentToController";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IMessageControllerToContent";
import { IStateOfPopUp } from "../../../Shared/scripts/Interfaces/IStateOfPopUp";
import { IPopUpBrowserProxy } from "../../../Shared/scripts/Interfaces/Proxies/IBrowserProxy";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { ControllerMessageReceivedEventValidator } from "../../../Shared/scripts/Classes/ControllerMessageReceivedEventValidator";

export class MessageBroker_PopUp extends _FrontBase {
  LastKnownContentState: IControllerMessageReceivedEvent_Payload;
  public ContentReplyReceivedEvent_Subject: ContentReplyReceivedEvent_Subject;
  BrowserProxy: IPopUpBrowserProxy;
  SettingsAgent: ISettingsAgent;

  constructor(hindeCore: IHindeCore, browserProxy: IPopUpBrowserProxy, settingsAgent: ISettingsAgent) {
    super(hindeCore);
    this.BrowserProxy = browserProxy;
    this.SettingsAgent = settingsAgent;
    this.ContentReplyReceivedEvent_Subject = new ContentReplyReceivedEvent_Subject(this.HindeCore);
  }

  private __cleardebugText() {
    this.Logger.HandlerClearDebugText(this.HindeCore);
  }

  BuildMessageToContent(msgFlag: ReqCommandMsgFlag, stateOfPopUp: IStateOfPopUp): IMessageControllerToContent {
    let wrappedSettings: HindSiteSettingWrapper[] = this.SettingsAgent.GetSettingsByFlavor([SettingFlavor.ContentAndPopUpStoredInPopUp, SettingFlavor.ContentOnly]);
    let settingsToSend: IHindSiteSetting[] = [];
    wrappedSettings.forEach((wrappedSetting: HindSiteSettingWrapper) => settingsToSend.push(wrappedSetting.HindSiteSetting));

    let messageControllerToContent: IMessageControllerToContent = {
      CurrentContentPrefs: settingsToSend,
      IsValid: false,
      MsgFlag: msgFlag,
      StateOfPopUI: stateOfPopUp,
    }
    return messageControllerToContent;
  }

  async SendCommandToContentAsync(msgFlag: ReqCommandMsgFlag, stateOfPopUp: IStateOfPopUp): Promise<void> {
    this.Logger.FuncStart(this.SendCommandToContentAsync.name);
    try {
      if (!StaticHelpers.IsNullOrUndefined([stateOfPopUp])) {
        this.__cleardebugText();

        let messageControllerToContent: IMessageControllerToContent = this.BuildMessageToContent(msgFlag, stateOfPopUp);

        this.SendMessageToContentAsync(messageControllerToContent)
          .then((controllerMessageReceivedEvent_Payload: IControllerMessageReceivedEvent_Payload) => this.HandleReply(controllerMessageReceivedEvent_Payload))
          .catch((err: any) => this.ErrorHand.HandleFatalError(this.SendCommandToContentAsync.name, err));
      } else {
        this.ErrorHand.HandleFatalError(this.SendCommandToContentAsync.name, 'null check');
      }
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.SendCommandToContentAsync.name, err);
    }
    this.Logger.FuncEnd(this.SendCommandToContentAsync.name);
  }

  private HandleReply(controllerMessageReceivedEvent_Payload: IControllerMessageReceivedEvent_Payload) {
    if (!StaticHelpers.IsNullOrUndefined(controllerMessageReceivedEvent_Payload)) {
      this.ContentReplyReceivedEvent_Subject.NotifyObserversAsync(controllerMessageReceivedEvent_Payload);
    } else {
      this.ErrorHand.WarningAndContinue(this.HandleReply.name, 'null payload. Not notifying ')
    }
  }
  //ValidateControllerMessageReceivedEvent_Payload(controllerMessageReceivedEvent_Payload: IControllerMessageReceivedEvent_Payload) {
  //  let toReturn: IControllerMessageReceivedEvent_Payload = {
  //    ErrorStack: null,
  //    LastReq: null,
  //  }

  //}

  async SendMessageToContentAsync(messageFromController: IMessageControllerToContent): Promise<IControllerMessageReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToContentAsync.name);

      if (!StaticHelpers.IsNullOrUndefined(messageFromController)) {
        this.SendMessageToSingleTabAsync(messageFromController)
          .then((result: IControllerMessageReceivedEvent_Payload) => resolve(result))
          .catch((err: any) => reject(err));
      } else {
        this.ErrorHand.HandleFatalError(this.SendMessageToContentAsync.name, 'null stateOfPopUp');
      }

      this.Logger.FuncEnd(this.SendMessageToContentAsync.name, StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));
    });
  }
  private SendMessageToSingleTabAsync(messageControllerToContent: IMessageControllerToContent): Promise<IControllerMessageReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToSingleTabAsync.name, StaticHelpers.MsgFlagAsString(messageControllerToContent.MsgFlag));

      this.BrowserProxy.SendMessageAsync_BrowserProxy(messageControllerToContent)
        .then((response: IMessageContentToController) => this.ReceiveResponseHandler(response))
        .then((messageContentToController_Payload: IMessageContentToController_Payload) => {
          let ContollerMessageReceivedEventValidator = new ControllerMessageReceivedEventValidator(this.HindeCore);

          let validatedPayload: IControllerMessageReceivedEvent_Payload = ContollerMessageReceivedEventValidator.TranslateAndValidatePayload(messageContentToController_Payload);

          resolve(validatedPayload);
        })

        .catch((ex) => {
          this.ErrorHand.HandleFatalError(this.SendMessageToSingleTabAsync.name, ex);
          resolve(null);
        });

      this.Logger.FuncEnd(this.SendMessageToSingleTabAsync.name, StaticHelpers.MsgFlagAsString(messageControllerToContent.MsgFlag));
    });
  }
  ReceiveResponseHandler(response: IMessageContentToController): Promise<IMessageContentToController_Payload> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.ReceiveResponseHandler.name);

      if (response) {
        //StaticHelpers.MsgFlagAsString(response.MsgFlagReply)

        if (response) {
          var asMsgFromContent: IMessageContentToController = <IMessageContentToController>response;

          if (asMsgFromContent) {
            switch (response.MsgFlagReply) {
              case ReplyCommandMsgFlag.RespCurState:
                break;
              case ReplyCommandMsgFlag.RespTaskSuccessful:
                resolve(asMsgFromContent.Payload);
                break;
              case ReplyCommandMsgFlag.RespTaskFailed:
                reject(ReplyCommandMsgFlag[asMsgFromContent.MsgFlagReply]);
                break;
              case ReplyCommandMsgFlag.RespFailedDidNotValidate:
                reject(ReplyCommandMsgFlag[asMsgFromContent.MsgFlagReply]);
                break;
              default:
                reject('Unrecognized MsgFlag' + ReplyCommandMsgFlag[response.MsgFlagReply])
                break;
            }
          }
          else {
            reject(this.ReceiveResponseHandler.name + ' response is not class: ' + DefaultMsgContentToController.name);
          }
        }
      } else {
        reject(this.ReceiveResponseHandler.name + ' null or undefined response');
      }
      this.Logger.FuncEnd(this.ReceiveResponseHandler.name);
    });
  }
}