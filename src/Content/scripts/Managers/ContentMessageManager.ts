import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
//import { IMessageManager } from '../../../Shared/scripts/Interfaces/IMessageManager';
import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { MsgFromContent } from '../../../Shared/scripts/Classes/MsgPayloadResponseFromContent';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
//import { MessageRunner } from '../../../Shared/scripts/Classes/MsgRunner';
import { IMsgFromX } from '../../../Shared/scripts/Interfaces/IMsgPayload';
import { MsgFromXBase } from '../../../Shared/scripts/Interfaces/MsgFromXBase';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Classes/IDataPayloadSnapShot';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { CacheMode } from '../../../Shared/scripts/Enums/CacheMode';

//var browser = browser || {};

//browser.runtime.onMessage.addListener((message) => {
//  if (message.command === "beastify") {
//    //insertBeast(message.beastURL);
//  } else if (message.command === "reset") {
//    //removeExistingBeasts();
//  }
//});

export class ContentMessageManager extends ContentManagerBase {
  AutoSaveHasBeenScheduled: boolean = false;
  //MsgRunner: MessageRunner;

  constructor(contentHub: ContentHub) {
    super(contentHub);
    contentHub.debug.FuncStart(ContentMessageManager.name);

    var self = this;
    browser.runtime.onMessage.addListener(request => self.ContentReceiveRequest(request));

    contentHub.debug.FuncEnd(ContentMessageManager.name);
  }

  //ValidateSnapShots(reqMsgFromPopup: MsgFromPopUp)

  ValidateRequest(reqMsgFromPopup: MsgFromPopUp): MsgFromPopUp {
    this.debug().FuncStart(this.ValidateRequest.name);
    var isValid: boolean = true;

    if (reqMsgFromPopup) {
      if (reqMsgFromPopup.CurrentContentPrefs) {
        if (reqMsgFromPopup.Data) {
        } else {
          reqMsgFromPopup.Data = new PayloadDataFromPopUp();
        }
      } else {
        this.debug().Error(this.ValidateRequest.name, 'No CurrentContentPrefs')
        reqMsgFromPopup.IsValid = false;
        isValid = false;
      }
    } else {
      this.debug().Error(this.ValidateRequest.name, 'no reqMsgFromPopup');
    }

    reqMsgFromPopup.IsValid = isValid;
    this.debug().FuncEnd(this.ValidateRequest.name, isValid.toString());
    return reqMsgFromPopup;
  }

  ScheduleIntervalTasks(reqMsgFromPopup: MsgFromPopUp) {
    if (true || reqMsgFromPopup.CurrentContentPrefs.AutoSave) {
      if (!this.AutoSaveHasBeenScheduled) {
        var self = this;
        var intervalMs = this.Const().Timeouts.AutoSaveIntervalMin * 60 * 1000;
        window.setInterval(() => {
          self.AutoSaveSnapShot();
        }, intervalMs)

        this.AutoSaveHasBeenScheduled = true;
      }
    }
  }

  AutoSaveSnapShot() {
    this.debug().FuncStart(this.AutoSaveSnapShot.name);
    var SnapShotSettings: IDataPayloadSnapShot = {
      SnapShotNewNickname: '',
      Flavor: SnapShotFlavor.Autosave
    }

    this.Xyyz.OneWindowMan.SaveWindowState(this.PageDataMan().TopLevelWindow(), SnapShotSettings);
    this.debug().FuncEnd(this.AutoSaveSnapShot.name);
  }

  async ContentReceiveRequest(reqMsgFromPopup: MsgFromPopUp) {
    this.debug().FuncStart(this.ContentReceiveRequest.name);

    this.debug().DebugMsgFromPopUp(reqMsgFromPopup);

    var response: MsgFromContent;// = new MsgFromContent(MsgFlag.TestResponse);

    if (reqMsgFromPopup) {
      reqMsgFromPopup = this.ValidateRequest(reqMsgFromPopup);
      if (reqMsgFromPopup.IsValid) {
        this.ScheduleIntervalTasks(reqMsgFromPopup);
        response = await this.ReqMsgRouter(reqMsgFromPopup);
      }
    }
    else {
      response.MsgFlag = MsgFlag.RespError;
      this.debug().Error(this.ValidateRequest.name, 'no request');
    }

    this.debug().FuncEnd(this.ContentReceiveRequest.name);
    return Promise.resolve(response);
  }

  Init() {
    this.debug().FuncStart(this.Init.name + ' ' + ContentMessageManager.name);
    var self = this;

    //this.MsgRunner = new MessageRunner(
    //  (msg: IMsgFromX) => {
    //    self.ReceiveMessageHndlr(msg)
    //  },
    //  this.SendMessageHndlr,
    //  null,
    //  this.debug(), 'Content');

    this.debug().FuncEnd(this.Init.name);
  }

  NotifyCompleteOnContent(targetWindow: IDataBrowserWindow = null, Message: string): void {
    if (!targetWindow) {
      targetWindow = this.PageDataMan().TopLevelWindow();
    }

    let bodyTag = targetWindow.DataDocSelf.Document.getElementsByTagName('body')[0];//(treeGlyphTargetId);

    var flagElem: HTMLElement = targetWindow.DataDocSelf.Document.createElement('div');
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
    }, this.Const().Timeouts.WaitBeforeRemovingCompleteFlagOnContent);

    bodyTag.appendChild(flagElem);
  }

  async ReqMsgRouter(payload: MsgFromPopUp) {
    this.debug().FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(payload.MsgFlag));

    var response: MsgFromContent = await this.Factoryman().NewMsgFromContent();

    switch (payload.MsgFlag) {
      case MsgFlag.ReqRestoreToNewTab:
        console.log('we are going to restore to this window');
        break;

      case MsgFlag.ReqAddCETab:
        await this.PromiseGen().RaceWaitAndClick(this.Const().Selector.SC.scStartButton, this.PageDataMan().TopLevelWindow().DataDocSelf)
          .then(() => { this.PromiseGen().WaitForThenClick([this.Const().Selector.SC.StartMenuLeftOption], this.PageDataMan().TopLevelWindow().DataDocSelf) });
        break;

      case MsgFlag.ReqAdminB:
        this.debug().LogVal('flag is adminb', StaticHelpers.MsgFlagAsString(payload.MsgFlag));
        this.debug().DebugPageDataMan(this.PageDataMan());

        this.locMan().AdminB(this.PageDataMan().TopLevelWindow().DataDocSelf, null);
        break;

      //case MsgFlag.GetAllStorageOneWindow:

      //  response.Data.CurrentSnapShots = await this.AtticMan().GetAllStorageAsIDataOneWindow();
      //  response.MsgFlag = MsgFlag.ResponseCurrentSnapShots;
      //  break;

      case MsgFlag.ReqCurState:

        //response.State.CurrentSnapShots = await this.AtticMan().GetAllStorageAsIDataOneWindow();

        //this.debug().LogVal('response', JSON.stringify(response));
        response.MsgFlag = MsgFlag.RespCurState;
        break;

      case MsgFlag.ReqGoDesktop:
        this.locMan().ChangeLocationSwitchBoard(scWindowType.Desktop, this.PageDataMan().TopLevelWindow());
        break;

      case MsgFlag.ReqOpenCE:
        this.locMan().ChangeLocationSwitchBoard(scWindowType.ContentEditor, this.PageDataMan().TopLevelWindow());
        break;

      case MsgFlag.ReqMarkFavorite:
        this.AtticMan().MarkFavorite(payload.Data)
          .then(() => this.respondSuccessful())
          .catch((failMsg) => this.respondFail(failMsg));
        break;

      case MsgFlag.ReqQuickPublish:
        var targetWin = this.PageDataMan().TopLevelWindow();
        await this.OneWinMan().PublishActiveCE(targetWin);
        break;

      case MsgFlag.ReqSetScMode:
        this.locMan().SetScMode(payload.Data.ReqScMode, payload.Data.UseOriginalWindowLocation)
          .then(() => this.respondSuccessful())
          .catch((failReason) => this.respondFail(failReason));
        break;

      case MsgFlag.ReqRestoreClick:

        await this.__restoreClick(payload.Data)
          .then(() => this.respondSuccessful())
          .catch((failReason) => this.respondFail(failReason));
        break;

      case MsgFlag.ReqTakeSnapShot:
        this.OneWinMan().SaveWindowState(this.PageDataMan().TopLevelWindow(), payload.Data.SnapShotSettings);
        break;

      case MsgFlag.RemoveFromStorage:
        await this.AtticMan().RemoveOneFromStorage(payload.Data.IdOfSelect)
          .then(() => response.ContentState.LastReqSuccessful = true)
          .catch(() => response.ContentState.LastReqSuccessful = false);
        break;

      case MsgFlag.RespTaskSuccessful:
        this.NotifyCompleteOnContent(null, payload.Data.ScreenMessage);

      case MsgFlag.ReqUpdateNickName:
        this.AtticMan().UpdateNickname(payload.Data)
        break;

      default:
        this.debug().Error('Unrecognized MsgFlag', StaticHelpers.MsgFlagAsString(payload.MsgFlag));

        break;
    }

    //this.debug().LogVal('Response at the end', JSON.stringify(response))

    await this.Factoryman().UpdateContentState(response);
    response.ContentState.LastReq = payload.MsgFlag;

    this.debug().FuncEnd(this.ReqMsgRouter.name);
    return response;
  }

  private respondSuccessful() {
    this.SendMessageHndlr(new MsgFromContent(MsgFlag.RespTaskSuccessful))
  }

  private respondFail(failReason: string) {
    var msg = new MsgFromContent(MsgFlag.RespTaskFailed);
    msg.ContentState.LastReqFailReason = failReason;
    this.SendMessageHndlr(msg);
  }

  SendMessageHndlr(msgflag: MsgFromContent) {
  }

  private __restoreClick(Data: PayloadDataFromPopUp) {
    return new Promise(async () => {
      try {
        this.debug().MarkerA();
        var dataOneWindowStorage = this.AtticMan().GetFromStorageById(Data.IdOfSelect, CacheMode.OkToUseCache);
        this.debug().MarkerB();
        var self = this;

        var targetWindow: IDataBrowserWindow = await this.PageDataMan().GetTargetWindowAsync(Data.UseOriginalWindowLocation ? true : false, dataOneWindowStorage.WindowType);

        if (targetWindow) {
          await self.Xyyz.OneWindowMan.RestoreWindowStateToTarget(targetWindow, dataOneWindowStorage)
            .then(() => this.respondSuccessful())
            .catch((failReason) => this.respondFail(failReason))
        }
        else {
          self.debug().Error(this.__restoreClick.name, 'no target window');
        }
      } catch (ex) {
        this.debug().Error(this.__restoreClick.name, ex)
      }
    });
  }

  IsDebugEnabled(): boolean {
    //this.AtticMan.CurrentSettings().DebugSettings.ShowDebugData;
    return true;
  }

  OperationCancelled: any;
  SetParentInfo(__winDataParent: IDataBrowserWindow) {
  }

  //  function insertBeast(beastURL) {
  //alert('insert beast');
  //let beastImage = document.createElement("img");
  //beastImage.setAttribute("src", beastURL);
  //beastImage.style.height = "100vh";
  //beastImage.className = "beastify-image";
  //document.body.appendChild(beastImage);
}