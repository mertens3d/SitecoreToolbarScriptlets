﻿import { MsgFromPopUp } from "../../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFromContent } from "../../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { ScWindowStateValidator } from "../../../../Shared/scripts/Classes/ScWindowStateValidator";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataContentReplyReceivedEvent_Payload } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export class PopUpMessagesBroker {
  LastKnownContentState: IDataContentReplyReceivedEvent_Payload;
  private Logger: ILoggerAgent;

  constructor(loggerAgent: ILoggerAgent) {
    this.Logger = loggerAgent;
  }

  ReceiveResponseHndlr(response: any): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.ReceiveResponseHndlr.name);

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
            reject(this.ReceiveResponseHndlr.name + ' response is not class: ' + MsgFromContent.name);
          }
        }
      } else {
        reject(this.ReceiveResponseHndlr.name + ' null or undefined response');
      }
      this.Logger.FuncEnd(this.ReceiveResponseHndlr.name);
    });
  }

  private SendMessageToSingleTab(messageToSend: MsgFromPopUp): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag));

      let targetTab: browser.tabs.Tab;

      await browser.tabs.query({ currentWindow: true, active: true })
        .then((result: browser.tabs.Tab[]) => { targetTab = result[0]; })
        .catch((err) => reject(err));

      this.Logger.LogVal('Tab Id', targetTab.id);

      await browser.tabs.sendMessage(targetTab.id, messageToSend)
        .then((response: any) => this.ReceiveResponseHndlr(response))
        .then((scWindowState: IDataContentReplyReceivedEvent_Payload) => {
          let validator = new ScWindowStateValidator(this.Logger);

          let validatedPayload: IDataContentReplyReceivedEvent_Payload = validator.ValidatePayload(scWindowState);

          resolve(validatedPayload);
        })
        .catch((ex) => { reject(ex) });

      this.Logger.FuncEnd(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag));
    });
  }

  async SendMessageToContentAsync(msgPlayload: MsgFromPopUp): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToContentAsync.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));

      this.SendMessageToSingleTab(msgPlayload)
        .then((result: IDataContentReplyReceivedEvent_Payload) => resolve(result))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.SendMessageToContentAsync.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));
    });
  }
}