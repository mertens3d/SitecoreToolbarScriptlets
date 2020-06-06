/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />
import { PopUpManagerBase } from "./PopUpManagerBase";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFromContent } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { ICurrStateContent } from "../../../Shared/scripts/Interfaces/ICurrState";
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { IterationDrone } from "../../../Shared/scripts/Agents/Drones/IterationDrone";
import { PopConst } from "../Classes/PopConst";

export class PopUpMessagesManager extends PopUpManagerBase {
  LastKnownContentState: ICurrStateContent;

  Init() {
    this.ScheduleAutoSaveSnapShot();
    this.ScheduleAutoLogin();
  }

  ReceiveResponseHndlr(response: any) {
    this.AllAgents.Logger.FuncStart(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));

    if (response) {
      this.UiMan().UpdateMsgStatusStack('Response Received: ' + StaticHelpers.MsgFlagAsString(response.MsgFlag));

      var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
      if (asMsgFromContent) {
        this.LastKnownContentState = response.ContentState;
        this.AllAgents.Logger.Log(StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));

        this.UiMan().RefreshUiFromCache();

        switch (response.MsgFlag) {
          case MsgFlag.RespCurState:
            break;
          case MsgFlag.RespTaskSuccessful:
            break;
          case MsgFlag.RespError:
            this.AllAgents.Logger.ErrorAndThrow(this.ReceiveResponseHndlr.name, response.ContentState.ErrorStack);
            break;
          default:
            this.AllAgents.Logger.LogVal('Unrecognized MsgFlag', StaticHelpers.MsgFlagAsString(response.MsgFlag));
            break;
        }

        //this.allAgents.Logger.LogVal('response', JSON.stringify(response, null, 1));
      } else {
        this.AllAgents.Logger.ErrorAndThrow(this.ReceiveResponseHndlr.name, 'response is not imsg');
      }
      this.AllAgents.Logger.FuncEnd(this.ReceiveResponseHndlr.name, StaticHelpers.MsgFlagAsString(response.MsgFlag));
    }
  }

  ScheduleAutoSaveSnapShot() {
  }

  ScheduleAutoLogin() {
    //if (AllAgents. SettingsAgent.GetByKey(SettingKey.AutoLogin).ValueAsBool) {
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

  OnePing(targetTab: IDataBrowserTab, msg: MsgFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.OnePing.name);

      this.AllAgents.Logger.LogVal('sending to tab id', targetTab.Tab.id);

      this.UiMan().UpdateMsgStatusStack('Sending Msg: ' + StaticHelpers.MsgFlagAsString(msg.MsgFlag));

      var successful: boolean = true;

      await browser.tabs.sendMessage(targetTab.Tab.id, msg)
        .then((response) => {
          var asMsgFromContent: MsgFromContent = <MsgFromContent>response;
          if (asMsgFromContent) {
            this.AllAgents.Logger.LogVal('Response', StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
            

            if (asMsgFromContent.MsgFlag !== MsgFlag.RespListeningAndReady
              &&
              asMsgFromContent.MsgFlag !== MsgFlag.RespTaskSuccessful
              ) {
              throw "response message: " + asMsgFromContent.MsgFlag
            }
          } else {
            this.AllAgents.Logger.ErrorAndThrow(this.OnePing.name, 'Unable to translate the response');

          }
        })
        .then(() => resolve())
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.OnePing.name);
    });
  }

  async WaitForListeningTab(targetTab: IDataBrowserTab): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.WaitForListeningTab.name);

      var success: boolean = false;
      var iterationJr: IterationDrone = new IterationDrone(this.AllAgents.Logger, this.WaitForListeningTab.name);

      var msg: MsgFromPopUp = new MsgFromPopUp(MsgFlag.Ping, this.PopHub);

      msg.CurrentContentPrefs = this.AllAgents.SettingsAgent.GetOnlyContentPrefs();

      while (iterationJr.DecrementAndKeepGoing() && !success) {
        this.AllAgents.Logger.Log('Pinging');
        await this.OnePing(targetTab, msg)
          .then(() => success = true)
          .catch((ex) => success = false);

        if (!success) {
          this.UiMan().UpdateMsgStatusStack('Ping did not succeed, waiting');
          await iterationJr.Wait();
          this.AllAgents.Logger.Log('Done waiting');
        }
        else {
          this.UiMan().UpdateMsgStatusStack('Ping succeeded');
        }
      }//while

      this.AllAgents.Logger.FuncEnd(this.WaitForListeningTab.name);

      if (success) {
        resolve();
      } else {
        reject(iterationJr.IsExhausted ? iterationJr.IsExhaustedMsg : 'unknown error WaitForListeningTab');
      }
    });
  }
  private SendMessageToSingleTab(dataBrowserTab: IDataBrowserTab, messageToSend: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))

      var result: PromiseResult = new PromiseResult(this.SendMessageToSingleTab.name, this.AllAgents.Logger);

      this.UiMan().UpdateMsgStatusStack('Sending Msg: ' + StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag));
      //this.AllAgents.Logger.LogAsJsonPretty("messageToSend", messageToSend);

      await browser.tabs.sendMessage(dataBrowserTab.Tab.id, messageToSend)
        .then((response: any) => this.ReceiveResponseHndlr(response))
        .then(() => result.MarkSuccessful())
        .catch((ex) => {
          result.MarkFailed(ex);
          //result.MarkFailed('likely no response yet');
        });

      this.AllAgents.Logger.FuncEnd(this.SendMessageToSingleTab.name, StaticHelpers.MsgFlagAsString(messageToSend.MsgFlag))
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
      this.AllAgents.Logger.FuncStart(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));
      if (!targetTab) {
        targetTab = this.TabMan().CurrentTabData;
      }

      var promResult: PromiseResult = new PromiseResult(this.SendMessageToContentTab.name, this.AllAgents.Logger);

      msgPlayload.CurrentContentPrefs = this.AllAgents.SettingsAgent.GetOnlyContentPrefs();

      await this.WaitForListeningTab(targetTab)
        .then(() => this.SendMessageToSingleTab(targetTab, msgPlayload))
        .then(() => { this.AllAgents.Logger.MarkerD() })
        .then(() => promResult.MarkSuccessful())
        .catch((err) => promResult.MarkFailed(err));

      this.AllAgents.Logger.FuncEnd(this.SendMessageToContentTab.name, StaticHelpers.MsgFlagAsString(msgPlayload.MsgFlag));

      if (promResult.WasSuccessful()) {
        resolve();
      } else {
        (reject(promResult.RejectReasons));
      }
    });
  }
  async FromAtticDrawPopUpLogStorage() {
    try {
      await browser.storage.local.get()
        .then((storageResults: browser.storage.StorageObject) => {
          let lastId = storageResults[PopConst.Const.Storage.StorageLastKeyKey];
          let keyToUse = PopConst.Const.Storage.StorageLogKeyPrefix + lastId;
          console.log("keyToUse: " + keyToUse);
          let storedValue: browser.storage.StorageValue = storageResults[keyToUse];
          if (storedValue) {
            let valueSplit: string[] = storedValue.toString().split('|||');
            if (valueSplit) {
              console.log("length " + valueSplit.length);
              for (var idx = 0; idx < valueSplit.length; idx++) {
                console.log(valueSplit[idx]);
              }
            }
          }
        });
    } catch (e) {
      this.AllAgents.Logger.ErrorAndThrow(this.FromAtticDrawPopUpLogStorage.name, e.toString());
    }
  }
  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}