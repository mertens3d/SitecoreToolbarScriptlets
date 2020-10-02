import { HindSiteSettingWrapper } from "../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { SettingFlavor } from "../../../Shared/scripts/Enums/SettingFlavor";
import { ContentReplyReceivedEvent_Subject } from "../../../Shared/scripts/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Subject";
import { IControllerMessageReceivedEvent_Payload } from "../../../Shared/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IMessageContentToController_Payload } from "../../../Shared/scripts/Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";
import { IHindSiteSetting } from "../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IMessageContentToController } from "../../../Shared/scripts/Interfaces/IMessageContentToController";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IMessageControllerToContent";
import { IStateOfPopUp } from "../../../Shared/scripts/Interfaces/IStateOfPopUp";
import { IPopUpBrowserProxy } from "../../../Shared/scripts/Interfaces/Proxies/IBrowserProxy";
import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";
import { ControllerMessageReceivedEventValidator } from "../../../Shared/scripts/Classes/ControllerMessageReceivedEventValidator";

export class MessageBroker_PopUp extends _HindeCoreBase {
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

  BuildMessageToContent(msgFlag: MsgFlag, stateOfPopUp: IStateOfPopUp): IMessageControllerToContent {
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

  async SendCommandToContentAsync(msgFlag: MsgFlag, stateOfPopUp: IStateOfPopUp): Promise<void> {
    this.Logger.FuncStart(this.SendCommandToContentAsync.name);
    try {
      if (!StaticHelpers.IsNullOrUndefined([stateOfPopUp])) {
        this.__cleardebugText();

        let messageControllerToContent: IMessageControllerToContent = this.BuildMessageToContent(msgFlag, stateOfPopUp);

        this.SendMessageToContentAsync(messageControllerToContent)
          .then((replyMessagePayload: IControllerMessageReceivedEvent_Payload) => this.HandleReply(replyMessagePayload))
          .catch((err) => this.Logger.ErrorAndThrow(this.SendCommandToContentAsync.name, err));
      } else {
        this.Logger.ErrorAndThrow(this.SendCommandToContentAsync.name, 'null check');
      }
    } catch (err) {
      throw (this.SendCommandToContentAsync.name + ' | ' + err);
    }
    this.Logger.FuncEnd(this.SendCommandToContentAsync.name);
  }

  private HandleReply(replyMessagePayload: IControllerMessageReceivedEvent_Payload) {
    if (!StaticHelpers.IsNullOrUndefined(replyMessagePayload)) {
      this.ContentReplyReceivedEvent_Subject.NotifyObserversAsync(replyMessagePayload);
    } else {
      this.Logger.WarningAndContinue(this.HandleReply.name, 'null payload. Not notifying ')
    }

  }

  async SendMessageToContentAsync(messageFromController: IMessageControllerToContent): Promise<IControllerMessageReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToContentAsync.name);

      if (!StaticHelpers.IsNullOrUndefined(messageFromController)) {
        this.SendMessageToSingleTabAsync(messageFromController)
          .then((result: IControllerMessageReceivedEvent_Payload) => resolve(result))
          .catch((err) => reject(err));
      } else {
        this.Logger.ErrorAndThrow(this.SendMessageToContentAsync.name, 'null stateOfPopUp');
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
          this.Logger.WarningAndContinue(this.SendMessageToSingleTabAsync.name, ex);
          resolve(null);
        });

      this.Logger.FuncEnd(this.SendMessageToSingleTabAsync.name, StaticHelpers.MsgFlagAsString(messageControllerToContent.MsgFlag));
    });
  }
  ReceiveResponseHandler(response: IMessageContentToController): Promise<IMessageContentToController_Payload> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.ReceiveResponseHandler.name);

      if (response) {
        StaticHelpers.MsgFlagAsString(response.MsgFlag)

        if (response) {
          var asMsgFromContent: IMessageContentToController = <IMessageContentToController>response;

          if (asMsgFromContent) {
            switch (response.MsgFlag) {
              case MsgFlag.RespCurState:
                break;
              case MsgFlag.RespTaskSuccessful:
                resolve(asMsgFromContent.Payload);
                break;
              case MsgFlag.RespTaskFailed:
                reject(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
                break;
              case MsgFlag.RespFailedDidNotValidate:
                reject(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
                break;
              default:
                reject('Unrecognized MsgFlag' + StaticHelpers.MsgFlagAsString(response.MsgFlag))
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