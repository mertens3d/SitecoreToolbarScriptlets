/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />
import { PopUpManagerBase } from "./PopUpManagerBase";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { ICurrStateContent } from "../../../Shared/scripts/Interfaces/ICurrState";
import { ResultSuccessFail } from "../../../Shared/scripts/Classes/ResultSuccessFail";
import { IterationHelper } from "../../../Shared/scripts/Classes/IterationHelper";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";

export class PopUpMessagesManager extends PopUpManagerBase {
  CachedState: ICurrStateContent;

  Init() {
    this.ScheduleAutoSaveSnapShot();
    this.ScheduleAutoLogin();
  }

  ReceiveResponseHndlr(response: MsgFromContent) {
    this.Log().FuncStart(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));
    if (response) {
      this.CachedState = response.ContentState;

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

      this.Log().LogVal('response', JSON.stringify(response, null, 1));

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

      var result: ResultSuccessFail = new ResultSuccessFail();

      this.Log().LogVal('sending to tab id', targetTab.Tab.id);

      await browser.tabs.sendMessage(targetTab.Tab.id, msg)
        .then((response) => {
          //was successful?
          //this.debug().LogVal('response', JSON.stringify(response));
          var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
          if (asMsgFromContent) {
            this.Log().Log(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
            if (asMsgFromContent.MsgFlag = MsgFlag.RespListeningAndReady) {
              result.Succeeded = true;
            }
          } else {
            result.Succeeded = false;
            result.RejectMessage = 'response is not imsg';
          }
        })
        .catch((err) => {
          this.Log().LogVal('catch err', err.toString());
          result.Succeeded = false;
          result.RejectMessage = 'error on ping';
        }
        );

      if (result.Succeeded) {
        this.Log().FuncEnd(this.OnePing.name, 'succeeded');
        resolve();
      } else {
        this.Log().FuncEnd(this.OnePing.name, 'failed');
        reject(result.RejectMessage);
      }
    });//promise
  }// function

  async WaitForListeningTab(targetTab: IDataBrowserTab) {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.WaitForListeningTab.name);

      var result: ResultSuccessFail = new ResultSuccessFail();
      var iterationJr: IterationHelper = new IterationHelper(this.Helpers(), this.WaitForListeningTab.name);

      var msg: MsgFromPopUp = new MsgFromPopUp(MsgFlag.Ping, this.PopHub);

      msg.CurrentContentPrefs = this.SettingsMan().GetOnlyContentPrefs();

      while (iterationJr.DecrementAndKeepGoing() && !result.Succeeded) {
        this.Log().Log('Pinging');
        await this.OnePing(targetTab, msg)
          .then(() => {
            //this.Log().Log('succeeded a');
            result.Succeeded = true;
          })
          .catch((ex) => {
            this.Log().LogVal('failed', ex.toString());
            result.Succeeded = false;
          });

        if (!result.Succeeded) {
          this.Log().Log('Ping did not succeed, waiting');
          await iterationJr.Wait();
          this.Log().Log('Done waiting');
        }
        else {
          this.Log().Log('Ping succeeded');
        }
      }//while

      this.Log().Log('Done while');

      if (result.Succeeded) {
        this.Log().FuncEnd(this.WaitForListeningTab.name);
        resolve(targetTab);
      } else {
        this.Log().FuncEnd(this.WaitForListeningTab.name);
        if (iterationJr.IsExhausted) {
          result.RejectMessage += '  ' + iterationJr.IsExhaustedMsg;
        }
        reject(result.RejectMessage);
      }
    });//promise
  }
  private SendMessageToSingleTab(tab: IDataBrowserTab, messageToSend: MsgFromPopUp) {
    this.Log().FuncStart(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))

    browser.tabs.sendMessage(
      tab.Tab.id,
      messageToSend
    ).then((response) => {
      this.Log().LogVal('response', JSON.stringify(response, null, 1));

      var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
      if (asMsgFromContent) {
        this.Log().Log(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));

        this.ReceiveResponseHndlr(asMsgFromContent);
      } else {
        this.Log().Error(this.SendMessageToSingleTab.name, 'response is not imsg');
      }
    })

      .catch(this.onError);

    this.Log().FuncEnd(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))
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

  async SendMessageToContentTab(msgPlayload: MsgFromPopUp, targetTab: IDataBrowserTab) {
    this.Log().FuncStart(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));

    msgPlayload.CurrentContentPrefs = await (await this.SettingsMan().GetOnlyContentPrefs());// this.PopAtticMan().CurrentSettings()).ContentPrefs;

    this.WaitForListeningTab(targetTab)
      .then(() => this.SendMessageToSingleTab(targetTab, msgPlayload))
      .catch((err) => this.onError(err));

    //await browser.tabs.query({
    //  currentWindow: true,
    //  active: true
    //}).then((tabs) => this.SendMessageToTabs(tabs, msgPlayload))
    //  .catch(
    //    this.onError
    //  );

    this.Log().FuncEnd(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));
  }

  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}