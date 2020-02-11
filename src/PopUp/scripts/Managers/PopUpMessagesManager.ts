/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />
import { PopUpManagerBase } from "./PopUpManagerBase";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { ICurrStateContent } from "../../../Shared/scripts/Interfaces/ICurrState";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { ResultSuccessFail } from "../../../Shared/scripts/Classes/ResultSuccessFail";
import { IterationHelper } from "../../../Shared/scripts/Classes/IterationHelper";

export class PopUpMessagesManager extends PopUpManagerBase {
  CachedState: ICurrStateContent;

  Init() {
    this.ScheduleAutoSaveSnapShot();
    this.ScheduleAutoLogin();
  }

  ReceiveResponseHndlr(response: MsgFromContent) {
    this.debug().FuncStart(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));
    if (response) {
      this.CachedState = response.ContentState;

      this.UiMan().RefreshUiFromCache();

      switch (response.MsgFlag) {
        case MsgFlag.RespCurState:

          break;

        default:
          this.debug().LogVal('Unrecognized MsgFlag', StaticHelpers.MsgFlagAsString(response.MsgFlag));
          break;
      }

      this.debug().LogVal('response', JSON.stringify(response));

      this.debug().FuncEnd(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));
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
    if (this.CachedState.WindowType === scWindowType.LoginPage) {
      this.SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqLoginWithAdminB, this.PopHub));
    }
  }

  OnePing(targetTab: browser.tabs.Tab, msg: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.OnePing.name);


      var result: ResultSuccessFail = new ResultSuccessFail();

      await browser.tabs.sendMessage(targetTab.id, msg)
        .then((response) => {
          //was successful?
          this.debug().LogVal('response', JSON.stringify(response));
          var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
          if (asMsgFromContent) {
            this.debug().Log(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
            if (asMsgFromContent.MsgFlag = MsgFlag.RespListeningAndReady) {
              result.Succeeded = true;
            }
          } else {
            result.Succeeded = false;
            result.FailMessage = 'response is not imsg';
          }
        })
        .catch((err) => {
          this.debug().LogVal('catch err', err.toString());
          result.Succeeded = false;
          result.FailMessage = 'error on ping';
        }
        );

      if (result.Succeeded) {
        this.debug().FuncEnd(this.OnePing.name, 'succeeded');
        resolve();
      } else {
        this.debug().FuncEnd(this.OnePing.name, 'failed');
        reject(result.FailMessage);
      }
    });//promise
  }// function

  async WaitForListening() {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.WaitForListening.name);

      var result: ResultSuccessFail = new ResultSuccessFail();
      result.Succeeded = false;
      var iterationJr: IterationHelper = new IterationHelper(this.debug(), this.WaitForListening.name);
      var targetTab: browser.tabs.Tab;
      await browser.tabs.query({ currentWindow: true, active: true })
        .then((tabs) => targetTab = tabs[0]);

      var msg: MsgFromPopUp = new MsgFromPopUp(MsgFlag.Ping, this.PopHub);

      msg.CurrentContentPrefs = await (await this.PopAtticMan().CurrentSettings()).ContentPrefs;

      while (iterationJr.DecrementAndKeepGoing() && !result.Succeeded) {
        await this.OnePing(targetTab, msg)
          .then(() => {
            this.debug().Log('succeeded a');
            result.Succeeded = true;
          })
          .catch((ex) => {
            this.debug().Log('failed a ' + ex.toString());
            result.Succeeded = false;
          });

        if (!result.Succeeded) {
          this.debug().Log('Ping did not succeed, trying again');
          await iterationJr.Wait();
          this.debug().Log('Done waiting');
        }
        else {
          this.debug().Log('Ping succeeded');
        }
      }//while


      this.debug().Log('Done while');

      if (result.Succeeded) {
        this.debug().FuncEnd(this.WaitForListening.name);
        resolve();
      } else {
        this.debug().FuncEnd(this.WaitForListening.name);
        if (iterationJr.IsExhausted) {
          result.FailMessage += '  ' + iterationJr.IsExhaustedMsg;
        }
        reject(result.FailMessage);
      }
    });//promise
  }
  SendMessageToSingleTab(tab, messageToSend: MsgFromPopUp) {
    this.debug().FuncStart(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))

    browser.tabs.sendMessage(
      tab.id,
      messageToSend
    ).then((response) => {
      this.debug().LogVal('response', JSON.stringify(response));

      var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
      if (asMsgFromContent) {
        this.debug().Log(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));

        this.ReceiveResponseHndlr(asMsgFromContent);
      } else {
        this.debug().Error(this.SendMessageToTabs.name, 'response is not imsg');
      }
    })

      .catch(this.onError);

    this.debug().FuncEnd(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))
  }

  private SendMessageToTabs(tabs, messageToSend: MsgFromPopUp) {
    this.debug().FuncStart(this.SendMessageToTabs.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))

    for (let tab of tabs) {
      this.SendMessageToSingleTab(tab, messageToSend);
    }

    this.debug().FuncEnd(this.SendMessageToTabs.name)
  }

  onError(error) {
    console.error(`Error: ${error}`);
  }

  async SendMessageToContent(msgPlayload: MsgFromPopUp) {
    this.debug().FuncStart(this.SendMessageToContent.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));

    msgPlayload.CurrentContentPrefs = await (await this.PopAtticMan().CurrentSettings()).ContentPrefs;

    await browser.tabs.query({
      currentWindow: true,
      active: true
    }).then((tabs) => this.SendMessageToTabs(tabs, msgPlayload))
      .catch(
        this.onError
      );

    this.debug().FuncEnd(this.SendMessageToContent.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));
  }

  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}