/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />
import { PopUpManagerBase } from "./PopUpManagerBase";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { ICurrStateContent } from "../../../Shared/scripts/Interfaces/ICurrState";
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { IterationHelper } from "../../../Shared/scripts/Classes/IterationHelper";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";

export class PopUpMessagesManager extends PopUpManagerBase {
  LastKnownContentState: ICurrStateContent;

  Init() {
    this.ScheduleAutoSaveSnapShot();
    this.ScheduleAutoLogin();
  }

  ReceiveResponseHndlr(response: any) {
    this.AllPopUpAgents.Logger.FuncStart(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));

    if (response) {
      this.UiMan().UpdateMsgStatusStack('Response Received: ' + StaticHelpers.MsgFlagAsString(response.MsgFlag));

      var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
      if (asMsgFromContent) {
        this.LastKnownContentState = response.ContentState;
        this.AllPopUpAgents.Logger.Log(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));

        this.UiMan().RefreshUiFromCache();

        switch (response.MsgFlag) {
          case MsgFlag.RespCurState:
            break;
          case MsgFlag.RespTaskSuccessful:
            break;
          case MsgFlag.RespError:
            this.AllPopUpAgents.Logger.Error(this.ReceiveResponseHndlr.name, response.ContentState.ErrorStack);
            break;
          default:
            this.AllPopUpAgents.Logger.LogVal('Unrecognized MsgFlag', StaticHelpers.MsgFlagAsString(response.MsgFlag));
            break;
        }

        //this.AllPopUpAgents.Logger.LogVal('response', JSON.stringify(response, null, 1));
      } else {
        this.AllPopUpAgents.Logger.Error(this.ReceiveResponseHndlr.name, 'response is not imsg');
      }
      this.AllPopUpAgents.Logger.FuncEnd(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));
    }
  }

  ScheduleAutoSaveSnapShot() {
  }

  ScheduleAutoLogin() {
    //if (this.SettingsMan().GetByKey(SettingKey.AutoLogin).ValueAsBool) {
    //  var self = this;

    //  window.setInterval(() => {
    //    self.AutoLogin();
    //  }, this.PopConst().Timeouts.AutoLoginCheckInterval)
    //}
  }

  AutoLogin() {
    //todo - put back ?
    //if (this.CachedState.WindowType === scWindowType.LoginPage) {
    //  this.SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqLoginWithAdminB, this.PopHub));
    //}
  }

  OnePing(targetTab: IDataBrowserTab, msg: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.AllPopUpAgents.Logger.FuncStart(this.OnePing.name);

      var promResult: PromiseResult = new PromiseResult(this.OnePing.name, this.AllPopUpAgents.Logger);

      this.AllPopUpAgents.Logger.LogVal('sending to tab id', targetTab.Tab.id);
      //this.AllPopUpAgents.Logger.LogAsJsonPretty('msg', msg);

      this.UiMan().UpdateMsgStatusStack('Sending Msg: ' + StaticHelpers.MsgFlagAsString(msg.MsgFlag));

      await browser.tabs.sendMessage(targetTab.Tab.id, msg)
        .then((response) => {
          //was successful?
          this.AllPopUpAgents.Logger.MarkerC();
          this.AllPopUpAgents.Logger.LogAsJsonPretty('response', response);

          var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
          if (asMsgFromContent) {
            this.AllPopUpAgents.Logger.Log(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
            if (asMsgFromContent.MsgFlag = MsgFlag.RespListeningAndReady) {
              promResult.MarkSuccessful();
            }
          } else {
            promResult.MarkFailed('no message from content');
          }
        })
        .catch((err) => {
          this.AllPopUpAgents.Logger.MarkerB();
          promResult.MarkFailed(err)
        });

      this.AllPopUpAgents.Logger.FuncEnd(this.OnePing.name);

      if (promResult.WasSuccessful()) {
        resolve();
      } else {
        reject(promResult.RejectReasons);
      }
    });//promise
  }// function

  async WaitForListeningTab(targetTab: IDataBrowserTab) {
    return new Promise(async (resolve, reject) => {
      this.AllPopUpAgents.Logger.FuncStart(this.WaitForListeningTab.name);

      var promResult: PromiseResult = new PromiseResult(this.WaitForListeningTab.name, this.AllPopUpAgents.Logger);
      var iterationJr: IterationHelper = new IterationHelper(this.Helpers(), this.WaitForListeningTab.name);

      var msg: MsgFromPopUp = new MsgFromPopUp(MsgFlag.Ping, this.PopHub);

      msg.CurrentContentPrefs = this.SettingsMan().GetOnlyContentPrefs();

      while (iterationJr.DecrementAndKeepGoing() && !promResult.WasSuccessful()) {
        this.AllPopUpAgents.Logger.Log('Pinging');
        await this.OnePing(targetTab, msg)
          .then(() => promResult.MarkSuccessful())
          .catch((ex) => {
            this.AllPopUpAgents.Logger.MarkerA();
            promResult.MarkFailed(ex)
          });

        if (!promResult.WasSuccessful()) {
          this.UiMan().UpdateMsgStatusStack('Ping did not succeed, waiting');
          await iterationJr.Wait();
          this.AllPopUpAgents.Logger.Log('Done waiting');
          msg
        }
        else {
          this.UiMan().UpdateMsgStatusStack('Ping succeeded');
        }
      }//while

      this.AllPopUpAgents.Logger.FuncEnd(this.WaitForListeningTab.name);

      if (promResult.WasSuccessful()) {
        resolve(targetTab);
      } else {
        if (iterationJr.IsExhausted) {
          promResult.MarkFailed( iterationJr.IsExhaustedMsg);
        }
        reject(promResult.RejectReasons);
      }
    });//promise
  }
  private SendMessageToSingleTab(dataBrowserTab: IDataBrowserTab, messageToSend: MsgFromPopUp) {
    return new Promise((resolve, reject) => {
      this.AllPopUpAgents.Logger.FuncStart(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))

      var result: PromiseResult = new PromiseResult(this.SendMessageToSingleTab.name, this.AllPopUpAgents.Logger);

      this.UiMan().UpdateMsgStatusStack('Sending Msg: ' + StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag));

      browser.tabs.sendMessage(
        dataBrowserTab.Tab.id,
        messageToSend
        )
        .then((response: any) => this.ReceiveResponseHndlr(response))
        .then(() => result.MarkSuccessful)
        .catch((ex) => {
          result.MarkFailed('likely no response yet');
        });

      this.AllPopUpAgents.Logger.FuncEnd(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))
      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }
  //private SendMessageToTabs(tabs, messageToSend: MsgFromPopUp) {
  //  this.debug().FuncStart(this.SendMessageToTabs.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))

  //  for (let tab of tabs) {
  //    this.SendMessageToSingleTab(tab, messageToSend);
  //  }

  //  this.debug().FuncEnd(this.SendMessageToTabs.name)
  //}

  onError(error) {
    console.error(`Error: ${error}`);
  }

  async SendMessageToContentTab(msgPlayload: MsgFromPopUp, targetTab: IDataBrowserTab = null) {
    return new Promise(async (resolve, reject) => {
      if (!targetTab) {
        targetTab = this.TabMan().CurrentTabData;
      }

      this.AllPopUpAgents.Logger.FuncStart(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));
      var result: PromiseResult = new PromiseResult(this.SendMessageToContentTab.name, this.AllPopUpAgents.Logger);

      msgPlayload.CurrentContentPrefs = await this.SettingsMan().GetOnlyContentPrefs();

      await this.WaitForListeningTab(targetTab)
        .then(() => this.SendMessageToSingleTab(targetTab, msgPlayload))
        .then(() => result.MarkSuccessful)
        .catch((err) => result.MarkFailed(err));

      this.AllPopUpAgents.Logger.FuncEnd(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));

      if (result.MarkSuccessful) {
        resolve();
      } else {
        (reject(result.RejectReasons));
      }
    });
  }

  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}