import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
//import { IMessageManager } from '../../../Shared/scripts/Interfaces/IMessageManager';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
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
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';

export class ContentMessageManager extends ContentManagerBase {
  AutoSaveHasBeenScheduled: boolean = false;

  constructor(contentHub: ContentHub) {
    super(contentHub);
    contentHub.debug.FuncStart(ContentMessageManager.name);

    var self = this;
    browser.runtime.onMessage.addListener(request => self.ContentReceiveRequest(request));

    contentHub.debug.FuncEnd(ContentMessageManager.name);
  }

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
    this.debug().FuncStart(this.ScheduleIntervalTasks.name );
    this.debug().LogVal('Has been scheduled: ' , this.AutoSaveHasBeenScheduled)
    this.debug().LogVal('reqMsgFromPopup.CurrentContentPrefs.AutoSave: ', reqMsgFromPopup.CurrentContentPrefs.AutoSave)
    if (true || reqMsgFromPopup.CurrentContentPrefs.AutoSave) {
      if (!this.AutoSaveHasBeenScheduled) {
        this.debug().MarkerA();
        var self = this;
        this.debug().MarkerB();
        var intervalMs = StaticHelpers.MinToMs(ContentConst.Const.Timeouts.AutoSaveIntervalMin);

        this.debug().MarkerC();
        window.setInterval(() => {
          self.AutoSaveSnapShot(this.ScUiMan().GetCurrentPageType());
        }, intervalMs)

        this.debug().MarkerD();
        this.AutoSaveHasBeenScheduled = true;
      }
    }
    this.debug().FuncEnd(this.ScheduleIntervalTasks.name);
  }

  AutoSaveSnapShot(pageType: scWindowType) {
    this.debug().FuncStart(this.AutoSaveSnapShot.name);
    var SnapShotSettings: IDataPayloadSnapShot = {
      SnapShotNewNickname: '',
      Flavor: SnapShotFlavor.Autosave,
      CurrentPageType: pageType
    }

    this.OneScWinMan().SaveWindowState(SnapShotSettings);

    this.debug().FuncEnd(this.AutoSaveSnapShot.name);
  }

  async ContentReceiveRequest(reqMsgFromPopup: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(reqMsgFromPopup.MsgFlag));

      this.debug().DebugMsgFromPopUp(reqMsgFromPopup);
      this.debug().MarkerA();

      var response: MsgFromContent;// = new MsgFromContent(MsgFlag.TestResponse);

      if (reqMsgFromPopup) {
        reqMsgFromPopup = this.ValidateRequest(reqMsgFromPopup);
        if (reqMsgFromPopup.IsValid) {
          this.ScheduleIntervalTasks(reqMsgFromPopup);
          response = await this.ReqMsgRouter(reqMsgFromPopup);
        } else {
          this.debug().Error(this.ContentReceiveRequest.name, 'reqMsgFromPopup is not valid');
        }
      }
      else {
        response = new MsgFromContent(MsgFlag.RespError);
        this.debug().Error(this.ContentReceiveRequest.name, 'no request');
      }

      this.debug().FuncEnd(this.ContentReceiveRequest.name, StaticHelpers.MsgFlagAsString(reqMsgFromPopup.MsgFlag));

      if (response.MsgFlag != MsgFlag.RespError) {
        resolve(response);
      } else {
        reject(response);
      }
    })
    //return Promise.resolve(response);
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

  NotifyCompleteOnContent(targetDoc: IDataOneDoc = null, Message: string): void {
    if (!targetDoc) {
      targetDoc = this.ScUiMan().TopLevelDoc();
    }

    let bodyTag = targetDoc.Document.getElementsByTagName('body')[0];//(treeGlyphTargetId);

    var flagElem: HTMLElement = targetDoc.Document.createElement('div');
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
    this.debug().FuncStart(this.ReqMsgRouter.name, StaticHelpers.MsgFlagAsString(payload.MsgFlag));

    this.debug().MarkerA();
    this.debug().DebugMsgFromPopUp(payload);
    this.debug().MarkerB();

    //need to reference content factory
    var response: MsgFromContent = await this.Helpers().cont.NewMsgFromContentShell();
    this.debug().MarkerC();
    switch (payload.MsgFlag) {
      case MsgFlag.ReqRestoreToNewTab:
        console.log('we are going to restore to this window');
        break;

      case MsgFlag.ReqAddCETab:
        await this.Helpers().PromiseHelp.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.ScUiMan().TopLevelDoc())
          .then(() => { this.Helpers().PromiseHelp.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], this.ScUiMan().TopLevelDoc()) });
        break;

      case MsgFlag.ReqAdminB:
        this.ScUiMan().AdminB(this.ScUiMan().TopLevelDoc(), null);
        break;

      case MsgFlag.Ping:
        this.debug().LogVal('Ping', StaticHelpers.MsgFlagAsString(payload.MsgFlag));
        if (this.ReadyForMessages) {
          response.MsgFlag = MsgFlag.RespListeningAndReady;
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
        break;

      case MsgFlag.ReqOpenCE:

        break;

      case MsgFlag.ReqMarkFavorite:
        this.AtticMan().MarkFavorite(payload.Data)
          .then(() => this.respondSuccessful())
          .catch((failMsg) => this.respondFail(failMsg));
        break;

      case MsgFlag.ReqQuickPublish:
        var targetWin = this.ScUiMan().TopLevelDoc();
        await this.OneScWinMan().PublishActiveCE(targetWin);
        break;

      case MsgFlag.ReqRestoreClick:

        await this.__restoreClick(payload.Data)
          .then(() => this.respondSuccessful())
          .catch((failReason) => this.respondFail(failReason));
        break;

      case MsgFlag.ReqTakeSnapShot:
        this.OneScWinMan().SaveWindowState(payload.Data.SnapShotSettings);
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

        var targetDoc: IDataOneDoc = this.ScUiMan().TopLevelDoc();//  await this.PageMan().GetTargetWindowAsync(Data.UseOriginalWindowLocation ? true : false, dataOneWindowStorage.WindowType);

        if (targetDoc) {
          await self.OneScWinMan().RestoreWindowStateToTarget(targetDoc, dataOneWindowStorage)
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
  SetParentInfo(__winDataParent: IDataOneDoc) {
  }

  //  function insertBeast(beastURL) {
  //alert('insert beast');
  //let beastImage = document.createElement("img");
  //beastImage.setAttribute("src", beastURL);
  //beastImage.style.height = "100vh";
  //beastImage.className = "beastify-image";
  //document.body.appendChild(beastImage);
}