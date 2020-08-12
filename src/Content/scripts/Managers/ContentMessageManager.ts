import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { MsgFromContent } from '../../../Shared/scripts/Classes/MsgPayloadResponseFromContent';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Interfaces/IDataPayloadSnapShot';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { CacheMode } from '../../../Shared/scripts/Enums/CacheMode';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { SettingKey } from '../../../Shared/scripts/Enums/SettingKey';
import { SharedConst } from '../../../Shared/scripts/SharedConst';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { ICurrStateContent } from '../../../Shared/scripts/Interfaces/ICurrState';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IOneGenericSetting } from '../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting';

export class ContentMessageManager extends ContentManagerBase {
  AutoSaveHasBeenScheduled: boolean = false;

  constructor(contentHub: ContentHub, contentAgents: IAllAgents) {
    super(contentHub, contentAgents);
    this.AllAgents.Logger.FuncStart(ContentMessageManager.name);

    var self = this;
    browser.runtime.onMessage.addListener(request => self.ContentReceiveRequest(request));

    this.AllAgents.Logger.FuncEnd(ContentMessageManager.name);
  }

  ValidateRequest(reqMsgFromPopup: MsgFromPopUp): MsgFromPopUp {
    this.AllAgents.Logger.FuncStart(this.ValidateRequest.name);
    var isValid: boolean = true;

    if (reqMsgFromPopup) {
      if (reqMsgFromPopup.CurrentContentPrefs) {
        if (reqMsgFromPopup.Data) {
        } else {
          reqMsgFromPopup.Data = new PayloadDataFromPopUp();
        }
      } else {
        this.AllAgents.Logger.ErrorAndThrow(this.ValidateRequest.name, 'No CurrentContentPrefs')
        reqMsgFromPopup.IsValid = false;
        isValid = false;
      }
    } else {
      this.AllAgents.Logger.ErrorAndThrow(this.ValidateRequest.name, 'no reqMsgFromPopup');
    }

    reqMsgFromPopup.IsValid = isValid;
    this.AllAgents.Logger.FuncEnd(this.ValidateRequest.name, isValid.toString());
    return reqMsgFromPopup;
  }

  ScheduleIntervalTasks(reqMsgFromPopup: MsgFromPopUp) {
    this.AllAgents.Logger.FuncStart(this.ScheduleIntervalTasks.name);
    this.AllAgents.Logger.LogVal('Has been scheduled: ', this.AutoSaveHasBeenScheduled)

    let autoSaveSetting: IOneGenericSetting = this.AllAgents.SettingsAgent.GetByKey(SettingKey.AutoSaveIntervalMin)

    if (this.AllAgents.SettingsAgent.ValueAsInteger(autoSaveSetting) > 0) {
      if (!this.AutoSaveHasBeenScheduled) {
        this.AllAgents.Logger.MarkerA();
        var self = this;
        this.AllAgents.Logger.MarkerB();
        var intervalMs = StaticHelpers.MinToMs(ContentConst.Const.Timeouts.AutoSaveIntervalMin);

        this.AllAgents.Logger.MarkerC();
        window.setInterval(() => {
          self.AutoSaveSnapShot(this.ScUiMan().GetCurrentPageType());
        }, intervalMs)

        this.AllAgents.Logger.MarkerD();
        this.AutoSaveHasBeenScheduled = true;
      }
    }
    this.AllAgents.Logger.FuncEnd(this.ScheduleIntervalTasks.name);
  }

  AutoSaveSnapShot(pageType: scWindowType) {
    this.AllAgents.Logger.FuncStart(this.AutoSaveSnapShot.name);
    var SnapShotSettings: IDataPayloadSnapShot = {
      SnapShotNewNickname: '',
      Flavor: SnapShotFlavor.Autosave,
      CurrentPageType: pageType
    }

    this.OneScWinMan().SaveWindowState(SnapShotSettings);

    this.AllAgents.Logger.FuncEnd(this.AutoSaveSnapShot.name);
  }
  async SetLoggerFromMessage(reqMsgFromPopup: MsgFromPopUp) {
    let currSetting: IOneGenericSetting = this.AllAgents.SettingsAgent.GetByKey(SettingKey.LogToConsole);
    let valueToUse: boolean = SharedConst.Const.Settings.Defaults.LogToConsole;
    if (currSetting) {
      let candidate = this.AllAgents.SettingsAgent.ValueAsBool(currSetting);
      if (candidate) {
        console.log('setting value as bool ' + valueToUse);
        console.log('setting it to ' + valueToUse);
      } else {
        console.log('candidate was null');
      }
      await this.AllAgents.Logger.Init(valueToUse);
    } else {
      console.log('curr setting not found');
    }
  }

  async ContentReceiveRequest(reqMsgFromPopup: MsgFromPopUp) {
    this.AllAgents.SettingsAgent.SetContentSettings(reqMsgFromPopup.CurrentContentPrefs);

    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(reqMsgFromPopup.MsgFlag));
      var promResult: PromiseResult = new PromiseResult(this.ContentReceiveRequest.name, this.AllAgents.Logger);

      var response: MsgFromContent = null;

      if (reqMsgFromPopup) {
        reqMsgFromPopup = this.ValidateRequest(reqMsgFromPopup);
        if (reqMsgFromPopup.IsValid) {
          await this.ReqMsgRouter(reqMsgFromPopup)
            .then((result: MsgFromContent) => { response = result; })
            .then(() =>  promResult.MarkSuccessful() )
            .catch((err) => promResult.MarkFailed(err))
        } else {
          promResult.MarkFailed('reqMsgFromPopup is not valid')
        }
      }
      else {
        promResult.MarkFailed('no request')
      }

      if (response !== null) {
        this.AllAgents.Logger.LogVal('responding', StaticHelpers.MsgFlagAsString(response.MsgFlag));
      }

      if (promResult.WasSuccessful()) {
        resolve(response);
      } else {
        response = new MsgFromContent(MsgFlag.RespError);
        response.ContentState.LastReqFailReason = promResult.RejectReasons;
        reject(promResult.RejectReasons);
      }

      this.AllAgents.Logger.FuncEnd(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(reqMsgFromPopup.MsgFlag));
    })
  }

  Init() {
    this.AllAgents.Logger.FuncStart(this.Init.name + ' ' + ContentMessageManager.name);
    var self = this;

    //this.MsgRunner = new MessageRunner(
    //  (msg: IMsgFromX) => {
    //    self.ReceiveMessageHndlr(msg)
    //  },
    //  this.SendMessageHndlr,
    //  null,
    //  this.debug(), 'Content');

    this.AllAgents.Logger.FuncEnd(this.Init.name);
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
      this.AllAgents.Logger.FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(payload.MsgFlag));
      //this.AllAgents.Logger.LogAsJsonPretty(MsgFromPopUp.name, payload);

      let promResult: PromiseResult = new PromiseResult(this.ReqMsgRouter.name, this.AllAgents.Logger);

      var response: MsgFromContent = await this.ContentFactory().NewMsgFromContentShell();

      switch (payload.MsgFlag) {
        case MsgFlag.ReqRestoreToNewTab:
          console.log('we are going to restore to this window');
          break;

        case MsgFlag.ReqAddCETab:
          let targetDoc: IDataOneDoc = this.ScUiMan().TopLevelDoc();
          let allIframeDataAtBeginning;

          await this.AllAgents.HelperAgent.PromisesRecipes.FromDesktopOpenNewCEIframe(targetDoc)
            .then(() => promResult.MarkSuccessful())
            .catch((err) => promResult.MarkFailed(err));

          //this.AllAgents.HelperAgent.PromisesBasic.GetAllLiveIframeData(targetDoc)
          //.then((result) => allIframeDataAtBeginning = result)
          //.then(() => this.AllAgents.HelperAgent.PromisesBasic.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, targetDoc))

          //.then(() => this.AllAgents.HelperAgent.PromisesBasic.WaitForReadyIframe())

          //.then(() => { this.AllAgents.HelperAgent.PromisesBasic.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], targetDoc) })
          //.then(() => this.AllAgents.HelperAgent.PromisesBasic.WaitForNewIframe(allIframeDataAtBeginning, targetDoc))
          //.then(() => promResult.MarkSuccessful())
          //.catch((err) => promResult.MarkFailed(err));
          break;

        case MsgFlag.ReqAdminB:
          this.ScUiMan().AdminB(this.ScUiMan().TopLevelDoc(), null);

          break;

        case MsgFlag.Ping:
          this.AllAgents.Logger.LogVal('Ping', StaticHelpers.MsgFlagAsString(payload.MsgFlag));
          if (this.ReadyForMessages) {
            response.MsgFlag = MsgFlag.RespListeningAndReady;
            promResult.MarkSuccessful();
          } else {
            promResult.MarkFailed('not ready');
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
          promResult.MarkSuccessful();
          break;

        case MsgFlag.ReqOpenCE:

          break;

        case MsgFlag.ReqMarkFavorite:
          this.AtticMan().MarkFavorite(payload.Data)
            .then(() => promResult.MarkSuccessful())
            .catch((err) => promResult.MarkFailed(err));
          break;

        case MsgFlag.ReqQuickPublish:
          await this.OneScWinMan().PublishActiveCE(this.ScUiMan().TopLevelDoc())
            .then(() => promResult.MarkSuccessful())
            .catch((err) => promResult.MarkFailed(err));
          break;

        case MsgFlag.ReqRestoreClick:
          await this.__restoreClick(payload.Data)
            .then(() => promResult.MarkSuccessful())
            .catch((err) => promResult.MarkFailed(err));
          break;

        case MsgFlag.ReqCompactCE:
          await this.SetCompactCss(payload.Data)
            .then(() => promResult.MarkSuccessful())
            .catch((err) => promResult.MarkFailed(err));
          break;

        case MsgFlag.ReqTakeSnapShot:
          await this.OneScWinMan().SaveWindowState(payload.Data.SnapShotSettings)
            .then(() => { this.AllAgents.Logger.MarkerA() })
            .then(() => { this.AllAgents.Logger.MarkerA() })
            .then(() => promResult.MarkSuccessful())
            .catch((err) => promResult.MarkFailed(err));

          promResult.MarkSuccessful();
          break;

        case MsgFlag.RemoveFromStorage:
          await this.AtticMan().RemoveOneFromStorage(payload.Data.IdOfSelect)
            .then(() => promResult.MarkSuccessful())
            .catch((err) => promResult.MarkFailed(err));
          break;

      

        case MsgFlag.RespTaskSuccessful:
          this.NotifyCompleteOnContent(null, payload.Data.ScreenMessage);

        case MsgFlag.ReqUpdateNickName:
          await this.AtticMan().UpdateNickname(payload.Data)
            .then(() => promResult.MarkSuccessful())
            .catch((err) => promResult.MarkFailed(err));
          break;

        default:
          this.AllAgents.Logger.ErrorAndThrow('Unhandled MsgFlag', StaticHelpers.MsgFlagAsString(payload.MsgFlag));
          promResult.MarkFailed('Unhandled MsgFlag ' + StaticHelpers.MsgFlagAsString(payload.MsgFlag));
          break;
      }

      //this.debug().LogVal('Response at the end', JSON.stringify(response))

      await this.ContentFactory().UpdateContentState(response.ContentState)
        .then((result: ICurrStateContent) => response.ContentState = result)
        .catch((err) => promResult.MarkFailed(err));

      response.ContentState.LastReq = payload.MsgFlag;

      if (promResult.WasSuccessful()) {
        response.MsgFlag = MsgFlag.RespTaskSuccessful;
        resolve(response);
      } else {
        reject(promResult.RejectReasons);
      }

      this.AllAgents.Logger.FuncEnd(this.ReqMsgRouter.name);
    });
  }

  private SetCompactCss(Data: PayloadDataFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.SetCompactCss.name);

      var targetDoc: IDataOneDoc = this.ScUiMan().TopLevelDoc();
      if (targetDoc) {
        var self = this;
        await this.OneScWinMan().SetCompactCss(targetDoc)
          .then(() => resolve())
          .catch((err) => { this.AllAgents.Logger.ErrorAndThrow(this.SetCompactCss.name, err) })
      }


      this.AllAgents.Logger.FuncEnd(this.SetCompactCss.name);
    });

  }



  private __restoreClick(Data: PayloadDataFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__restoreClick.name);

      let promiseResult: PromiseResult = new PromiseResult(this.__restoreClick.name, this.AllAgents.Logger);

      try {
        this.AllAgents.Logger.MarkerA();

        if (Data.IdOfSelect) {
          this.AllAgents.Logger.LogVal("IdOfSelect", Data.IdOfSelect);
          var dataOneWindowStorage;

          await this.AtticMan().GetFromStorageById(Data.IdOfSelect, CacheMode.OkToUseCache)
          .then((result) => dataOneWindowStorage = result);

          var self = this;

          var targetDoc: IDataOneDoc = this.ScUiMan().TopLevelDoc();//  await this.PageMan().GetTargetWindowAsync(Data.UseOriginalWindowLocation ? true : false, dataOneWindowStorage.WindowType);

          if (targetDoc) {
            await self.OneScWinMan().RestoreWindowStateToTargetDoc(targetDoc, dataOneWindowStorage)
              .then(() => promiseResult.MarkSuccessful())
              .catch((err) => promiseResult.MarkFailed(err))
          }
          else {
            self.AllAgents.Logger.ErrorAndThrow(this.__restoreClick.name, 'no target window');
          }
        } else {
          promiseResult.MarkFailed('No IdOfSelect');
        }
      } catch (ex) {
        this.AllAgents.Logger.ErrorAndThrow(this.__restoreClick.name, ex)
      }

      this.AllAgents.Logger.FuncEnd(this.__restoreClick.name);

      if (promiseResult.WasSuccessful()) {
        resolve();
      } else {
        reject(promiseResult.RejectReasons);
      }
    });
  }

  IsLogEnabled(): boolean {
    return this.AllAgents.Logger.EnabledStatus();
  }

  OperationCancelled: any;
  SetParentInfo(__winDataParent: IDataOneDoc) {
  }
}