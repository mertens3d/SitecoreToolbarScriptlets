import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { ContentReplyReceivedEvent_Subject } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Subject";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { ScWindowStateValidator } from "../../../Shared/scripts/Classes/ScWindowStateValidator";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IStateOfPopUp } from "../../../Shared/scripts/Interfaces/IMsgPayload";

export class PopUpMessagesBrokerAgent extends LoggableBase {
  LastKnownContentState: IDataContentReplyReceivedEvent_Payload;
  ContentReplyReceivedEvent_Subject: ContentReplyReceivedEvent_Subject;

  constructor(loggerAgent: ILoggerAgent) {
    super(loggerAgent);
    this.ContentReplyReceivedEvent_Subject = new ContentReplyReceivedEvent_Subject(this.Logger);
  }

  private __cleardebugText() {
    this.Logger.HandlerClearDebugText(this.Logger);
  }

  SendCommandToContent(sendMsgPlayload: IStateOfPopUp) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendCommandToContent.name);
      this.__cleardebugText();
      //todo - put back?  this.UiMan.ClearCancelFlag();

      this.SendMessageToContentAsync(sendMsgPlayload)
        .then((replyMessagePayload: IDataContentReplyReceivedEvent_Payload) => this.ContentReplyReceivedEvent_Subject.NotifyObservers(replyMessagePayload))
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.SendCommandToContent.name);
    });
  }

  async SendCommandToContentImprovedAsync(sendMsgPlayload: IStateOfPopUp): Promise<void> {
    this.Logger.FuncStart(this.SendCommandToContent.name);
    try {
      this.__cleardebugText();
      //todo - put back?  this.UiMan.ClearCancelFlag();

      this.SendMessageToContentAsync(sendMsgPlayload)
        .then((replyMessagePayload: IDataContentReplyReceivedEvent_Payload) => this.ContentReplyReceivedEvent_Subject.NotifyObservers(replyMessagePayload))
    } catch (err) {
      throw (this.SendCommandToContentImprovedAsync.name + ' | ' + err);
    }
    this.Logger.FuncEnd(this.SendCommandToContent.name);
  }

  ReceiveResponseHandler(response: any): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.ReceiveResponseHandler.name);

      if (response) {
        StaticHelpers.MsgFlagAsString(response.MsgFlag)

        if (response) {
          var asMsgFromContent: MsgFromContent = <MsgFromContent>response;

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
              default:
                reject('Unrecognized MsgFlag' + StaticHelpers.MsgFlagAsString(response.MsgFlag))
                break;
            }
          }
          else {
            reject(this.ReceiveResponseHandler.name + ' response is not class: ' + MsgFromContent.name);
          }
        }
      } else {
        reject(this.ReceiveResponseHandler.name + ' null or undefined response');
      }
      this.Logger.FuncEnd(this.ReceiveResponseHandler.name);
    });
  }

  private SendMessageToSingleTab(stateOfPopUp: IStateOfPopUp): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(stateOfPopUp.MsgFlag));


      let targetTab: browser.tabs.Tab;

      await browser.tabs.query({ currentWindow: true, active: true })
        .then((result: browser.tabs.Tab[]) => { targetTab = result[0]; })
        .catch((err) => reject(err));

      this.Logger.LogVal('Tab Id', targetTab.id);

      await browser.tabs.sendMessage(targetTab.id, stateOfPopUp)
        .then((response: any) => this.ReceiveResponseHandler(response))
        .then((scWindowState: IDataContentReplyReceivedEvent_Payload) => {
          let validator = new ScWindowStateValidator(this.Logger);

          let validatedPayload: IDataContentReplyReceivedEvent_Payload = validator.ValidatePayload(scWindowState);

          resolve(validatedPayload);
        })
        .catch((ex) => { reject(ex) });

      this.Logger.FuncEnd(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(stateOfPopUp.MsgFlag));
    });
  }

  async SendMessageToContentAsync(stateOfPopUp: IStateOfPopUp): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToContentAsync.name, StaticHelpers.MsgFlagAsString(stateOfPopUp.MsgFlag));

      this.SendMessageToSingleTab(stateOfPopUp)
        .then((result: IDataContentReplyReceivedEvent_Payload) => resolve(result))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.SendMessageToContentAsync.name, StaticHelpers.MsgFlagAsString(stateOfPopUp.MsgFlag));
    });
  }
}