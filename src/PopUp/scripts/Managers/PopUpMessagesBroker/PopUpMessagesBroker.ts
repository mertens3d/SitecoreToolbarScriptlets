import { MsgFromPopUp } from "../../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFromContent } from "../../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IMessageBrokerFeedback } from "../../../../Shared/scripts/Interfaces/Agents/IMessageBrokerFeedback/IMessageBrokerFeedback";
import { IContentState } from "../../../../Shared/scripts/Interfaces/Data/IContentState";
import { ScWindowStateValidator } from "../../../../Shared/scripts/Classes/ScWindowStateValidator";

export class PopUpMessagesBroker {
  LastKnownContentState: IContentState;
  private Logger: ILoggerAgent;
  private MsgFeedback: IMessageBrokerFeedback;

  constructor(loggerAgent: ILoggerAgent, msgFeedback: IMessageBrokerFeedback,) {
    this.Logger = loggerAgent;
    this.MsgFeedback = msgFeedback;
  }

  ReceiveResponseHndlr(response: any): Promise<IContentState> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.ReceiveResponseHndlr.name);

      if (response) {
        StaticHelpers.MsgFlagAsString(response.MsgFlag)

        if (response) {
          this.MsgFeedback.UpdateMsgStatusStack('Response Received: ' + StaticHelpers.MsgFlagAsString(response.MsgFlag));

          var asMsgFromContent: MsgFromContent = <MsgFromContent>response;

          if (asMsgFromContent) {
            switch (response.MsgFlag) {
              case MsgFlag.RespCurState:
                break;
              case MsgFlag.RespTaskSuccessful:
                resolve(asMsgFromContent.ScWindowState);
                break;
              case MsgFlag.RespTaskFailed :
                reject(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
                break;
              default:
                reject('Unrecognized MsgFlag' + StaticHelpers.MsgFlagAsString(response.MsgFlag))
                break;
            }
          }
          else {
            reject(this.ReceiveResponseHndlr.name + ' response is not class: ' + MsgFromContent.name);
          }
        }
      } else {
        reject(this.ReceiveResponseHndlr.name + ' null or undefined response');
      }
      this.Logger.FuncEnd(this.ReceiveResponseHndlr.name);
    });
  }

  private SendMessageToSingleTab(messageToSend: MsgFromPopUp): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag));

      this.MsgFeedback.UpdateMsgStatusStack('Sending Msg: ' + StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag));
      //this.Logger.LogAsJsonPretty("messageToSend", messageToSend);

      let targetTab: browser.tabs.Tab;

      await browser.tabs.query({ currentWindow: true, active: true })
        .then((result: browser.tabs.Tab[]) => { targetTab = result[0]; })
        .catch((err) => reject(err));

      this.Logger.LogVal('Tab Id', targetTab.id);

        await browser.tabs.sendMessage(targetTab.id, messageToSend)
        .then((response: any) => this.ReceiveResponseHndlr(response))
        .then((scWindowState: IContentState) => {
          let validator = new ScWindowStateValidator(this.Logger);
          let validatedContentState: IContentState = validator.ValidateScWindowState(scWindowState);
          resolve(validatedContentState);
        })
        .catch((ex) => { reject(ex) });

      this.Logger.FuncEnd(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag));
    });
  }

  async SendMessageToContentTab(msgPlayload: MsgFromPopUp): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));

      await this.SendMessageToSingleTab(msgPlayload)
        .then((result: IContentState) => {
          resolve(result);
        })
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));
    });
  }
}