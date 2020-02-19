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

  ReceiveResponseHndlr(response: MsgFromContent) {
    this.Log().FuncStart(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));
    if (response) {
      this.LastKnownContentState = response.ContentState;

      this.UiMan().RefreshUiFromCache();

      switch (response.MsgFlag) {
        case MsgFlag.RespCurState:

          break;

        case MsgFlag.RespError:
          this.Log().Error(this.ReceiveResponseHndlr.name, response.ContentState.ErrorStack);
          break;
        default:
          this.Log().LogVal('Unrecognized MsgFlag', StaticHelpers.MsgFlagAsString(response.MsgFlag));
          break;
      }

      //this.Log().LogVal('response', JSON.stringify(response, null, 1));

      this.Log().FuncEnd(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));
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
      this.Log().FuncStart(this.OnePing.name);

      var result: PromiseResult = new PromiseResult(this.OnePing.name, this.Log());

      this.Log().LogVal('sending to tab id', targetTab.Tab.id);
      //this.Log().LogAsJsonPretty('msg', msg);

      await browser.tabs.sendMessage(targetTab.Tab.id, msg)
        .then((response) => {
          //was successful?
          this.Log().LogAsJsonPretty('response', response);

          var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
          if (asMsgFromContent) {
            this.Log().Log(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
            if (asMsgFromContent.MsgFlag = MsgFlag.RespListeningAndReady) {
              result.MarkSuccessful();
            }
          } else {
            result.MarkFailed('no message from content');
            result.RejectMessage = 'response is not imsg';
          }
        })
        .catch((err) => result.MarkFailed(err));

      this.Log().FuncEnd(this.OnePing.name);

      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectMessage);
      }
    });//promise
  }// function

  async WaitForListeningTab(targetTab: IDataBrowserTab) {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.WaitForListeningTab.name);

      var result: PromiseResult = new PromiseResult(this.WaitForListeningTab.name, this.Log());
      var iterationJr: IterationHelper = new IterationHelper(this.Helpers(), this.WaitForListeningTab.name);

      var msg: MsgFromPopUp = new MsgFromPopUp(MsgFlag.Ping, this.PopHub);

      msg.CurrentContentPrefs = this.SettingsMan().GetOnlyContentPrefs();

      while (iterationJr.DecrementAndKeepGoing() && !result.WasSuccessful()) {
        this.Log().Log('Pinging');
        await this.OnePing(targetTab, msg)
          .then(() => result.MarkSuccessful())
          .catch((ex) => result.MarkFailed(ex));

        if (!result.WasSuccessful()) {
          this.Log().Log('Ping did not succeed, waiting');
          await iterationJr.Wait();
          this.Log().Log('Done waiting');
        }
        else {
          this.Log().Log('Ping succeeded');
        }
      }//while

      this.Log().FuncEnd(this.WaitForListeningTab.name);

      if (result.WasSuccessful()) {
        resolve(targetTab);
      } else {
        if (iterationJr.IsExhausted) {
          result.RejectMessage += '  ' + iterationJr.IsExhaustedMsg;
        }
        reject(result.RejectMessage);
      }
    });//promise
  }
  private SendMessageToSingleTab(tab: IDataBrowserTab, messageToSend: MsgFromPopUp) {
    return new Promise((resolve, reject) => {
      this.Log().FuncStart(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))

      var result: PromiseResult = new PromiseResult(this.SendMessageToSingleTab.name, this.Log());

      browser.tabs.sendMessage(
        tab.Tab.id,
        messageToSend
      ).then(async (response) => {
        //this.Log().LogVal('response', JSON.stringify(response, null, 1));

        var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
        if (asMsgFromContent) {
          this.Log().Log(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
          await this.ReceiveResponseHndlr(asMsgFromContent);
        } else {
          this.Log().Error(this.SendMessageToSingleTab.name, 'response is not imsg');
        }
      }).then(() => result.MarkSuccessful)
        //.catch(this.onError);
        .catch((ex) => {
          result.MarkFailed(ex);
        });

      this.Log().FuncEnd(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))
      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectMessage);
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

      this.Log().FuncStart(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));
      var result: PromiseResult = new PromiseResult(this.SendMessageToContentTab.name, this.Log());

      msgPlayload.CurrentContentPrefs = await this.SettingsMan().GetOnlyContentPrefs();

      await this.WaitForListeningTab(targetTab)
        .then(() => this.SendMessageToSingleTab(targetTab, msgPlayload))
        .then(() => result.MarkSuccessful)
        .catch((err) => result.MarkFailed(err));

      this.Log().FuncEnd(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));

      if (result.MarkSuccessful) {
        resolve();
      } else {
        (reject(result.RejectMessage));
      }
    });
  }

  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}