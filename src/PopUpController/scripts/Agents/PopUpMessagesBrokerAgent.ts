import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { ContentReplyReceivedEvent_Subject } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Subject";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { MsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { ScWindowStateValidator } from "../../../Shared/scripts/Classes/ScWindowStateValidator";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IStateOfController";
import { IPopUpBrowserProxy } from "../../../Shared/scripts/Interfaces/Proxies/IBrowserProxy";
import { IStateOfPopUp } from "../../../Shared/scripts/Interfaces/IStateOfPopUp";
import { IMessageContentToController } from "../../../Shared/scripts/Interfaces/IMsgPayload";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { HindSiteSettingWrapper } from "../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { SettingFlavor } from "../../../Shared/scripts/Enums/SettingFlavor";
import { IHindSiteSetting } from "../../../Shared/scripts/Interfaces/Agents/IGenericSetting";

export class PopUpMessagesBrokerAgent extends LoggableBase {
  LastKnownContentState: IDataContentReplyReceivedEvent_Payload;
  public ContentReplyReceivedEvent_Subject: ContentReplyReceivedEvent_Subject;
  BrowserProxy: IPopUpBrowserProxy;
  SettingsAgent: ISettingsAgent;

  constructor(loggerAgent: ILoggerAgent, browserProxy: IPopUpBrowserProxy, settingsAgent: ISettingsAgent) {
    super(loggerAgent);
    this.BrowserProxy = browserProxy;
    this.SettingsAgent = settingsAgent;
    this.ContentReplyReceivedEvent_Subject = new ContentReplyReceivedEvent_Subject(this.Logger);
  }

  private __cleardebugText() {
    this.Logger.HandlerClearDebugText(this.Logger);
  }

  BuildMessageToContent(msgFlag: MsgFlag, stateOfPopUp: IStateOfPopUp): IMessageControllerToContent {
    let wrappedSettings: HindSiteSettingWrapper[] = this.SettingsAgent.GetSettingsByFlavor([SettingFlavor.ContentAndPopUpStoredInPopUp, SettingFlavor.ContentOnly]);
    let settingsToSend: IHindSiteSetting[] = [];
    wrappedSettings.forEach((wrappedSetting: HindSiteSettingWrapper) => settingsToSend.push(wrappedSetting.HindSiteSetting));

    let messageControllerToContent: IMessageControllerToContent = {
      CurrentContentPrefs: settingsToSend,
      IsValid: false,
      MsgFlag: msgFlag,
      SelectSnapshotId: stateOfPopUp.SelectSnapShotId,
      SnapShotNewNickname: stateOfPopUp.NewNickName
    }
    return messageControllerToContent;
  }

  async SendCommandToContentImprovedAsync(msgFlag: MsgFlag, stateOfPopUp: IStateOfPopUp): Promise<void> {
    this.Logger.FuncStart(this.SendCommandToContentImprovedAsync.name);
    try {
      if (!StaticHelpers.IsNullOrUndefined([stateOfPopUp])) {
        this.__cleardebugText();

        let messageControllerToContent: IMessageControllerToContent = this.BuildMessageToContent(msgFlag, stateOfPopUp);

        this.SendMessageToContentAsync(messageControllerToContent)
          .then((replyMessagePayload: IDataContentReplyReceivedEvent_Payload) => this.HandleReply(replyMessagePayload))
          .catch((err) => this.Logger.ErrorAndThrow(this.SendCommandToContentImprovedAsync.name, err));
      } else {
        this.Logger.ErrorAndThrow(this.SendCommandToContentImprovedAsync.name, 'null check');
      }
    } catch (err) {
      throw (this.SendCommandToContentImprovedAsync.name + ' | ' + err);
    }
    this.Logger.FuncEnd(this.SendCommandToContentImprovedAsync.name);
  }

  private HandleReply(replyMessagePayload: IDataContentReplyReceivedEvent_Payload) {
    if (!StaticHelpers.IsNullOrUndefined(replyMessagePayload)) {
      this.ContentReplyReceivedEvent_Subject.NotifyObservers(replyMessagePayload);
    } else {
      this.Logger.WarningAndContinue(this.HandleReply.name, 'null payload. Not notifying ')
    }

  }

  async SendMessageToContentAsync(messageFromController: IMessageControllerToContent): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToContentAsync.name);

      if (!StaticHelpers.IsNullOrUndefined(messageFromController)) {
        this.SendMessageToSingleTabAsync(messageFromController)
          .then((result: IDataContentReplyReceivedEvent_Payload) => resolve(result))
          .catch((err) => reject(err));
      } else {
        this.Logger.ErrorAndThrow(this.SendMessageToContentAsync.name, 'null stateOfPopUp');
      }

      this.Logger.FuncEnd(this.SendMessageToContentAsync.name, StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));
    });
  }
  private SendMessageToSingleTabAsync(messageControllerToContent: IMessageControllerToContent): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToSingleTabAsync.name, StaticHelpers.MsgFlagAsString(messageControllerToContent.MsgFlag));

      this.BrowserProxy.SendMessageAsync_BrowserProxy(messageControllerToContent)
        .then((response: IMessageContentToController) => this.ReceiveResponseHandler(response))
        .then((scWindowState: IDataContentReplyReceivedEvent_Payload) => {
          let validator = new ScWindowStateValidator(this.Logger);

          let validatedPayload: IDataContentReplyReceivedEvent_Payload = validator.ValidatePayload(scWindowState);

          resolve(validatedPayload);
        })

        .catch((ex) => {
          this.Logger.WarningAndContinue(this.SendMessageToSingleTabAsync.name, ex);
          resolve(null);
        });

      this.Logger.FuncEnd(this.SendMessageToSingleTabAsync.name, StaticHelpers.MsgFlagAsString(messageControllerToContent.MsgFlag));
    });
  }
  ReceiveResponseHandler(response: IMessageContentToController): Promise<IDataContentReplyReceivedEvent_Payload> {
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
            reject(this.ReceiveResponseHandler.name + ' response is not class: ' + MsgContentToController.name);
          }
        }
      } else {
        reject(this.ReceiveResponseHandler.name + ' null or undefined response');
      }
      this.Logger.FuncEnd(this.ReceiveResponseHandler.name);
    });
  }

  
}