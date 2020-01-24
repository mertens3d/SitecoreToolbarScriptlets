import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { scWindowType } from '../Enums/scWindowType';
import { IDataOneWindowStorage } from '../../JsShared/Interfaces/IDataOneWindowStorage';
import { IDataOneStorageCE } from '../Interfaces/IDataOneStorageCE';
import { IDataMenuWindowPrefs } from '../../PopUp/js/Interfaces/IDataMenuWindowPrefs';
import { IDataSettings } from '../../PopUp/js/Interfaces/IDataSettings';
import { IDataBrowserWindow } from '../Interfaces/IDataBrowserWindow';
import "../Interfaces/IDataBrowserWindow";
import { MsgFlag } from '../../JsShared/Enum/MessageFlag';
import { MsgFromPopUp } from '../../JsShared/Classes/MsgPayloadRequestFromPopUp';
import { PayloadDataFromPopUp } from '../../JsShared/Classes/PayloadDataReqPopUp';
import { IMessageManager } from '../../JsShared/Interfaces/IMessageManager';
import { MsgFromContent } from '../../JsShared/Classes/MsgPayloadResponseFromContent';

var browser = browser || {};

//browser.runtime.onMessage.addListener((message) => {
//  if (message.command === "beastify") {
//    //insertBeast(message.beastURL);
//  } else if (message.command === "reset") {
//    //removeExistingBeasts();
//  }
//});

export class MessagesManager extends ContentManagerBase implements IMessageManager {

  constructor(xyyz: ContentHub) {
    super(xyyz);
    xyyz.debug.FuncStart(MessagesManager.name);

    xyyz.debug.FuncEnd(MessagesManager.name);
  }

  Init() {
    browser.runtime.onMessage.addListener((message) => {
      this.ReceiveMessage(message);
    });
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
  async ReceiveMessage(payload: MsgFromPopUp) {
    //var message: MsgFlag = MsgFlag.Unknown;
    var response;

    switch (payload.MsgFlag) {
      case MsgFlag.AddCETab:
        await this.PromiseGen().RaceWaitAndClick(this.Const().Selector.SC.scStartButton, this.PageDataMan().TopLevelWindow().DataDocSelf)
          .then(() => { this.PromiseGen().WaitForThenClick(this.Const().Selector.SC.StartMenuLeftOption, this.PageDataMan().TopLevelWindow().DataDocSelf) });
        break;

      case MsgFlag.AdminB:
        this.locMan().AdminB(this.PageDataMan().TopLevelWindow().DataDocSelf, null);
        break;

      case MsgFlag.GetAllStorageOneWindow:

        response = this.AtticMan().GetAllStorageAsIDataOneWindow();
        break;

      case MsgFlag.GiveCurrentData:

        this.AtticMan().GetAllStorageAsIDataOneWindow();
        break;

      case MsgFlag.GoDesktop:
        this.locMan().ChangeLocationSwitchBoard(scWindowType.Desktop, this.PageDataMan().TopLevelWindow());
        break;

      case MsgFlag.OpenCE:
        this.locMan().ChangeLocationSwitchBoard(scWindowType.ContentEditor, this.PageDataMan().TopLevelWindow());
        break;

      case MsgFlag.QuickPublish:
        var targetWin = this.PageDataMan().TopLevelWindow();
        await this.OneWinMan().PublishActiveCE(targetWin);
        break;

      case MsgFlag.SetScMode:
        this.locMan().SetScMode(payload.Data.ReqScMode, payload.Data.UseOriginalWindowLocation)
          .then(() => this.respondSuccessful())
          .catch(() => this.respondFail());
        break;

      case MsgFlag.RestoreClick:

        await this.__restoreClick(payload.Data)
          .then(() => this.respondSuccessful())
          .catch(() => this.respondFail());
        break;

      case MsgFlag.TaskSuccessful:
        this.NotifyCompleteOnContent(null, payload.Data.ScreenMessage);
        

      case MsgFlag.TakeSnapShot:
        this.Xyyz.OneWindowMan.SaveWindowState(this.PageDataMan().TopLevelWindow());
        break;

      default:
        break;
    }
  }

  private respondSuccessful() {
    this.MsgMan().SendMessage(new MsgFromContent(MsgFlag.TaskSuccessful))
  }

  private respondFail() {
    this.MsgMan().SendMessage(new MsgFromContent(MsgFlag.TaskFailed));
  }

  SendMessage(msgflag: MsgFromContent) {
  }

  private __restoreClick(Data: PayloadDataFromPopUp) {
    return new Promise(async () => {
      try {
        this.debug().MarkerA();
        var dataOneWindowStorage = this.AtticMan().GetFromStorageById(Data.idOfSelect);
        this.debug().MarkerB();
        var self = this;

        var targetWindow: IDataBrowserWindow = await this.PageDataMan().GetTargetWindowAsync(Data.UseOriginalWindowLocation ? true : false, dataOneWindowStorage.WindowType);

        if (targetWindow) {
          await self.Xyyz.OneWindowMan.RestoreWindowStateToTarget(targetWindow, dataOneWindowStorage)
            .then(() => this.respondSuccessful())
            .catch(() => this.respondFail())
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
    throw new Error("Method not implemented.");
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