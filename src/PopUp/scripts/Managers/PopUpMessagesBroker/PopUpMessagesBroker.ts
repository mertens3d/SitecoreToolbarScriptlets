import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { MsgFromPopUp } from "../../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFromContent } from "../../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { PromiseResult } from "../../../../Shared/scripts/Classes/PromiseResult";
import { IDataBrowserTab } from "../../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IMessageBrokerFeedback } from "../../../../Shared/scripts/Interfaces/Agents/IMessageBrokerFeedback/IMessageBrokerFeedback";
import { ContentStateValidator } from "../../../../Shared/scripts/Classes/ContentStateValidator";

export class PopUpMessagesBroker {
  LastKnownContentState: IContentState;
  private Logger: ILoggerAgent;
  private MsgFeedback: IMessageBrokerFeedback;
  private TargetTab: IDataBrowserTab;

  constructor(loggerAgent: ILoggerAgent, msgFeedback: IMessageBrokerFeedback,) {
    this.Logger = loggerAgent;
    this.MsgFeedback = msgFeedback;
  }

  InitMessageBroker(targetTab: IDataBrowserTab) {
    this.TargetTab = targetTab;
  }

  private ReceiveResponseHndlr(response: any): Promise<IContentState> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));

      if (response) {
        this.MsgFeedback.UpdateMsgStatusStack('Response Received: ' + StaticHelpers.MsgFlagAsString(response.MsgFlag));

        var asMsgFromContent: MsgFromContent = <MsgFromContent>response;

        if (asMsgFromContent) {
          this.Logger.Log(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));

          switch (response.MsgFlag) {
            case MsgFlag.RespCurState:
              break;
            case MsgFlag.RespTaskSuccessful:
              resolve(asMsgFromContent.ContentState);
              break;
            case MsgFlag.RespError:
              reject(asMsgFromContent.MsgFlag);
              break;
            default:
              reject('Unrecognized MsgFlag' + StaticHelpers.MsgFlagAsString(response.MsgFlag))
              break;
          }
        }
        else {
          reject(this.ReceiveResponseHndlr.name + ' response is not class: ' + MsgFromContent.name);
        }
        this.Logger.FuncEnd(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));
      }
    });
  }

  OnePing(targetTab: IDataBrowserTab, msg: MsgFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.OnePing.name);

      this.Logger.LogVal('sending to tab id', targetTab.Tab.id);

      this.MsgFeedback.UpdateMsgStatusStack('Sending Msg: ' + StaticHelpers.MsgFlagAsString(msg.MsgFlag));

      var successful: boolean = true;

      await browser.tabs.sendMessage(targetTab.Tab.id, msg)
        .then((response) => {
          var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
          if (asMsgFromContent) {
            this.Logger.LogVal('Response', StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));

            if (asMsgFromContent.MsgFlag !== MsgFlag.RespListeningAndReady
              &&
              asMsgFromContent.MsgFlag !== MsgFlag.RespTaskSuccessful) {
              throw "response message: " + asMsgFromContent.MsgFlag;
            }
          }
          else {
            this.Logger.ErrorAndThrow(this.OnePing.name, 'Unable to translate the response');
          }
        })
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.OnePing.name);
    });
  }

  //private async WaitForListeningTab(targetTab: IDataBrowserTab): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.WaitForListeningTab.name);

  //    var success: boolean = false;
  //    var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForListeningTab.name);

  //    var msg: MsgFromPopUp = new MsgFromPopUp(MsgFlag.Ping, this.PopHub);

  //    while (iterationJr.DecrementAndKeepGoing() && !success) {
  //      this.Logger.Log('Pinging');
  //      await this.OnePing(targetTab, msg)
  //        .then(() => success = true)
  //        .catch((ex) => success = false);

  //      if (!success) {
  //        this.MsgFeedback.UpdateMsgStatusStack('Ping did not succeed, waiting: ' + (iterationJr.CurrentTimeout() * 1000).toFixed() + ' ms');
  //        await iterationJr.Wait();
  //        this.Logger.Log('Done waiting');
  //      }
  //      else {
  //        this.MsgFeedback.UpdateMsgStatusStack('Ping succeeded');
  //      }
  //    } //while

  //    this.Logger.FuncEnd(this.WaitForListeningTab.name);

  //    if (success) {
  //      resolve();
  //    }
  //    else {
  //      reject(iterationJr.IsExhausted ? iterationJr.IsExhaustedMsg : 'unknown error WaitForListeningTab');
  //    }
  //  });
  //}
  private SendMessageToSingleTab(messageToSend: MsgFromPopUp): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag));

      this.MsgFeedback.UpdateMsgStatusStack('Sending Msg: ' + StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag));
      //this.Logger.LogAsJsonPretty("messageToSend", messageToSend);
      await browser.tabs.sendMessage(this.TargetTab.Tab.id, messageToSend)
        .then((response: any) => this.ReceiveResponseHndlr(response))
        .then((contentState: IContentState) => {
          let validator = new ContentStateValidator(this.Logger);

          let validatedContentState: IContentState = validator.ValidateContentState(contentState);

          //this.Logger.LogAsJsonPretty('validatedContentState', validatedContentState);

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
          this.Logger.MarkerD();
          resolve(result);
        })
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));
    });
  }
}