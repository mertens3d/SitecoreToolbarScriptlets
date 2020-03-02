import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { MsgFromContent } from '../../../Shared/scripts/Classes/MsgPayloadResponseFromContent';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Classes/IDataPayloadSnapShot';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { CacheMode } from '../../../Shared/scripts/Enums/CacheMode';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { OneGenericSetting } from "../../../Shared/scripts/Classes/OneGenericSetting";
import { SettingKey } from '../../../Shared/scripts/Enums/SettingKey';
import { SharedConst } from '../../../Shared/scripts/SharedConst';
import { SettingsHelper } from '../../../Shared/scripts/Helpers/SettingsHelper';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { ICurrStateContent } from '../../../Shared/scripts/Interfaces/ICurrState';

export class ContentMessageManager extends ContentManagerBase {
  AutoSaveHasBeenScheduled: boolean = false;

  constructor(contentHub: ContentHub) {
    super(contentHub);
    contentHub.Logger.FuncStart(ContentMessageManager.name);

    var self = this;
    browser.runtime.onMessage.addListener(request => self.ContentReceiveRequest(request));

    contentHub.Logger.FuncEnd(ContentMessageManager.name);
  }

  ValidateRequest(reqMsgFromPopup: MsgFromPopUp): MsgFromPopUp {
    this.Log().FuncStart(this.ValidateRequest.name);
    var isValid: boolean = true;

    if (reqMsgFromPopup) {
      if (reqMsgFromPopup.CurrentContentPrefs) {
        if (reqMsgFromPopup.Data) {
        } else {
          reqMsgFromPopup.Data = new PayloadDataFromPopUp();
        }
      } else {
        this.Log().Error(this.ValidateRequest.name, 'No CurrentContentPrefs')
        reqMsgFromPopup.IsValid = false;
        isValid = false;
      }
    } else {
      this.Log().Error(this.ValidateRequest.name, 'no reqMsgFromPopup');
    }

    reqMsgFromPopup.IsValid = isValid;
    this.Log().FuncEnd(this.ValidateRequest.name, isValid.toString());
    return reqMsgFromPopup;
  }

  ScheduleIntervalTasks(reqMsgFromPopup: MsgFromPopUp) {
    this.Log().FuncStart(this.ScheduleIntervalTasks.name);
    this.Log().LogVal('Has been scheduled: ', this.AutoSaveHasBeenScheduled)

    let autoSaveSetting: OneGenericSetting = this.Helpers().SettingsHelp.GetByKey(SettingKey.AutoSaveIntervalMin, reqMsgFromPopup.CurrentContentPrefs)

    if (SettingsHelper.ValueAsInteger(autoSaveSetting) > 0) {
      if (!this.AutoSaveHasBeenScheduled) {
        this.Log().MarkerA();
        var self = this;
        this.Log().MarkerB();
        var intervalMs = StaticHelpers.MinToMs(ContentConst.Const.Timeouts.AutoSaveIntervalMin);

        this.Log().MarkerC();
        window.setInterval(() => {
          self.AutoSaveSnapShot(this.ScUiMan().GetCurrentPageType());
        }, intervalMs)

        this.Log().MarkerD();
        this.AutoSaveHasBeenScheduled = true;
      }
    }
    this.Log().FuncEnd(this.ScheduleIntervalTasks.name);
  }

  AutoSaveSnapShot(pageType: scWindowType) {
    this.Log().FuncStart(this.AutoSaveSnapShot.name);
    var SnapShotSettings: IDataPayloadSnapShot = {
      SnapShotNewNickname: '',
      Flavor: SnapShotFlavor.Autosave,
      CurrentPageType: pageType
    }

    this.OneScWinMan().SaveWindowState(SnapShotSettings);

    this.Log().FuncEnd(this.AutoSaveSnapShot.name);
  }
  SetLoggerFromMessage(reqMsgFromPopup: MsgFromPopUp) {
    let currSetting: OneGenericSetting = this.Helpers().SettingsHelp.GetByKey(SettingKey.LogToConsole, reqMsgFromPopup.CurrentContentPrefs);
    let valueToUse: boolean = SharedConst.Const.Settings.Defaults.LogToConsole;
    if (currSetting) {
      let candidate = SettingsHelper.ValueAsBool(currSetting);
      if (candidate) {
        console.log('setting value as bool ' + valueToUse);
        console.log('setting it to ' + valueToUse);
      } else {
        console.log('candidate was null');
      }
      this.Log().Init(valueToUse);
    } else {
      console.log('curr setting not found');
    }
  }

  async ContentReceiveRequest(reqMsgFromPopup: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(reqMsgFromPopup.MsgFlag));
      var promResult: PromiseResult = new PromiseResult(this.ContentReceiveRequest.name, this.Log());
      this.Log().LogAsJsonPretty(MsgFromPopUp.name, reqMsgFromPopup);

      var response: MsgFromContent = null;

      if (reqMsgFromPopup) {
        reqMsgFromPopup = this.ValidateRequest(reqMsgFromPopup);
        if (reqMsgFromPopup.IsValid) {
          this.SetLoggerFromMessage(reqMsgFromPopup);

          this.ScheduleIntervalTasks(reqMsgFromPopup);

          await this.ReqMsgRouter(reqMsgFromPopup)
            .then((result: MsgFromContent) => {
              response = result;
              promResult.MarkSuccessful();
            })
            .catch((err) => promResult.MarkFailed(err))
        } else {
          promResult.MarkFailed('reqMsgFromPopup is not valid')
        }
      }
      else {
        promResult.MarkFailed('no request')
      }

      this.Log().LogVal('responding', StaticHelpers.MsgFlagAsString(response.MsgFlag));
      this.Log().FuncEnd(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(reqMsgFromPopup.MsgFlag));

      // response.MsgFlag != MsgFlag.RespError

      if (promResult.WasSuccessful()) {
        resolve(response);
      } else {
        response = new MsgFromContent(MsgFlag.RespError);
        response.ContentState.LastReqFailReason = promResult.RejectReasons;
        reject(promResult.RejectReasons);
      }
    })
    //return Promise.resolve(response);
  }

  Init() {
    this.Log().FuncStart(this.Init.name + ' ' + ContentMessageManager.name);
    var self = this;

    //this.MsgRunner = new MessageRunner(
    //  (msg: IMsgFromX) => {
    //    self.ReceiveMessageHndlr(msg)
    //  },
    //  this.SendMessageHndlr,
    //  null,
    //  this.debug(), 'Content');

    this.Log().FuncEnd(this.Init.name);
  }

  NotifyCompleteOnContent(targetDoc: IDataOneDoc = null, Message: string): void {
    if (!targetDoc) {
      targetDoc = this.ScUiMan().TopLevelDoc();
    }

    let bodyTag = targetDoc.ContentDoc.getElementsByTagName('body')[0];//(treeGlyphTargetId);

    var flagElem: HTMLElement = targetDoc.ContentDoc.createElement('div');
    flagElem.innerHTML = '<div>' + Message + '</div>';
    flagElem.style.position = 'absolute';
    flagElem.style.top = '100px';
    flagElem.style.left = '100px';
    flagElem.style.backgroundColor = 'yellow';
    flagElem.style.zIndex = '999';
    flagElem.style.fontSize = '40px';

    setTimeout(function () {
      flagElem.remove();
      window.close();
    }, ContentConst.Const.Timeouts.WaitBeforeRemovingCompleteFlagOnContent);

    bodyTag.appendChild(flagElem);
  }

  async ReqMsgRouter(payload: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(payload.MsgFlag));
      this.Log().LogAsJsonPretty(MsgFromPopUp.name, payload);

      let promiseResult: PromiseResult = new PromiseResult(this.ReqMsgRouter.name, this.Log());

      var response: MsgFromContent = await this.ContentFactory().NewMsgFromContentShell();

      switch (payload.MsgFlag) {
        case MsgFlag.ReqRestoreToNewTab:
          console.log('we are going to restore to this window');
          break;

        case MsgFlag.ReqAddCETab:
          await this.Helpers().PromiseHelp.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.ScUiMan().TopLevelDoc())
            .then(() => { this.Helpers().PromiseHelp.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], this.ScUiMan().TopLevelDoc()) })
            .then(promiseResult.MarkSuccessful)
            .catch((err) => promiseResult.MarkFailed(err));
          break;

        case MsgFlag.ReqAdminB:
          this.ScUiMan().AdminB(this.ScUiMan().TopLevelDoc(), null);

          break;

        case MsgFlag.Ping:
          this.Log().LogVal('Ping', StaticHelpers.MsgFlagAsString(payload.MsgFlag));
          if (this.ReadyForMessages) {
            response.MsgFlag = MsgFlag.RespListeningAndReady;
            promiseResult.MarkSuccessful();
          } else {
            promiseResult.MarkFailed('not ready');
          }
          break;

        //case MsgFlag.GetAllStorageOneWindow:

        //  response.Data.CurrentSnapShots = await this.AtticMan().GetAllStorageAsIDataOneWindow();
        //  response.MsgFlag = MsgFlag.ResponseCurrentSnapShots;
        //  break;

        case MsgFlag.ReqCurState:

          //response.State.CurrentSnapShots = await this.AtticMan().GetAllStorageAsIDataOneWindow();

          //this.debug().LogVal('response', JSON.stringify(response));
          response.MsgFlag = MsgFlag.RespCurState;
          promiseResult.MarkSuccessful();
          break;

        case MsgFlag.ReqOpenCE:

          break;

        case MsgFlag.ReqMarkFavorite:
          this.AtticMan().MarkFavorite(payload.Data)
            .then(promiseResult.MarkSuccessful)
            .catch((err) => promiseResult.MarkFailed(err));
          break;

        case MsgFlag.ReqQuickPublish:
          await this.OneScWinMan().PublishActiveCE(this.ScUiMan().TopLevelDoc())
            .then(promiseResult.MarkSuccessful)
            .catch((err) => promiseResult.MarkFailed(err));
          break;

        case MsgFlag.ReqRestoreClick:
          await this.__restoreClick(payload.Data)
            .then(promiseResult.MarkSuccessful)
            .catch((err) => promiseResult.MarkFailed(err));
          break;

        case MsgFlag.ReqTakeSnapShot:
          await this.OneScWinMan().SaveWindowState(payload.Data.SnapShotSettings)
            .then(promiseResult.MarkSuccessful)
            .catch((err) => promiseResult.MarkFailed(err));
          break;

        case MsgFlag.RemoveFromStorage:
          await this.AtticMan().RemoveOneFromStorage(payload.Data.IdOfSelect)
            .then(promiseResult.MarkSuccessful)
            .catch((err) => promiseResult.MarkFailed(err));
          break;

        case MsgFlag.RespTaskSuccessful:
          this.NotifyCompleteOnContent(null, payload.Data.ScreenMessage);

        case MsgFlag.ReqUpdateNickName:
          await this.AtticMan().UpdateNickname(payload.Data)
            .then(promiseResult.MarkSuccessful)
            .catch((err) => promiseResult.MarkFailed(err));
          break;

        default:
          this.Log().Error('Unhandled MsgFlag', StaticHelpers.MsgFlagAsString(payload.MsgFlag));
          promiseResult.MarkFailed('Unhandled MsgFlag ' + StaticHelpers.MsgFlagAsString(payload.MsgFlag));
          break;
      }

      //this.debug().LogVal('Response at the end', JSON.stringify(response))

      await this.ContentFactory().UpdateContentState(response.ContentState)
        .then((result: ICurrStateContent) => response.ContentState = result)
        .catch((err) => promiseResult.MarkFailed(err));

      response.ContentState.LastReq = payload.MsgFlag;

      this.Log().FuncEnd(this.ReqMsgRouter.name);

      if (promiseResult.WasSuccessful()) {
        response.MsgFlag = MsgFlag.RespTaskSuccessful;
        resolve(response);
      } else {
        reject(promiseResult.RejectReasons);
      }
    });
  }

  private __restoreClick(Data: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      let promiseResult: PromiseResult = new PromiseResult(this.__restoreClick.name, this.Log());

      try {
        this.Log().MarkerA();
        var dataOneWindowStorage = this.AtticMan().GetFromStorageById(Data.IdOfSelect, CacheMode.OkToUseCache);
        this.Log().MarkerB();
        var self = this;

        var targetDoc: IDataOneDoc = this.ScUiMan().TopLevelDoc();//  await this.PageMan().GetTargetWindowAsync(Data.UseOriginalWindowLocation ? true : false, dataOneWindowStorage.WindowType);

        if (targetDoc) {
          await self.OneScWinMan().RestoreWindowStateToTarget(targetDoc, dataOneWindowStorage)
            .then(promiseResult.MarkSuccessful)
            .catch((err) => promiseResult.MarkFailed(err))
        }
        else {
          self.Log().Error(this.__restoreClick.name, 'no target window');
        }
      } catch (ex) {
        this.Log().Error(this.__restoreClick.name, ex)
      }

      if (promiseResult.WasSuccessful()) {
        resolve();
      } else {
        reject(promiseResult.RejectReasons);
      }
    });
  }

  IsLogEnabled(): boolean {
    return this.Log().EnabledStatus();
  }

  OperationCancelled: any;
  SetParentInfo(__winDataParent: IDataOneDoc) {
  }
}