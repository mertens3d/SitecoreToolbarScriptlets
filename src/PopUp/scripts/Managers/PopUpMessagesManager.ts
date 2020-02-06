/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />
import { PopUpManagerBase } from "./PopUpManagerBase";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { ICurrStateContent } from "../../../Shared/scripts/Interfaces/ICurrState";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";

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



  private SendMessageToSingleTab(tab, messageToSend: MsgFromPopUp) {
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
    }).then((tabs) => this.SendMessageToTabs(tabs, msgPlayload)).catch(this.onError);

    this.debug().FuncEnd(this.SendMessageToContent.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));
  }

  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}