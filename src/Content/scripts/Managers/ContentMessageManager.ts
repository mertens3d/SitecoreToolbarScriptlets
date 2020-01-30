﻿import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { IMessageManager } from '../../../Shared/scripts/Interfaces/IMessageManager';
import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { MsgFromContent } from '../../../Shared/scripts/Classes/MsgPayloadResponseFromContent';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { MessageRunner } from '../../../Shared/scripts/Classes/MsgRunner';
import { IMsgFromX } from '../../../Shared/scripts/Interfaces/IMsgPayload';

//var browser = browser || {};

//browser.runtime.onMessage.addListener((message) => {
//  if (message.command === "beastify") {
//    //insertBeast(message.beastURL);
//  } else if (message.command === "reset") {
//    //removeExistingBeasts();
//  }
//});

export class ContentMessageManager extends ContentManagerBase implements IMessageManager {
  MsgRunner: MessageRunner;

  constructor(contentHub: ContentHub) {
    super(contentHub);
    contentHub.debug.FuncStart(ContentMessageManager.name);

    contentHub.debug.FuncEnd(ContentMessageManager.name);
  }

  Init() {
    this.debug().FuncStart(this.Init.name + ' ' + ContentMessageManager.name);
    var self = this;

    this.MsgRunner = new MessageRunner(
      (msg: IMsgFromX) => {
        self.ReceiveMessageHndlr(msg)
      },
      this.SendMessageHndlr, this.debug(), 'Content');

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
  async ReceiveMessageHndlr(payload: MsgFromPopUp) {
    this.debug().FuncStart(ContentMessageManager.name + ' ' + this.ReceiveMessageHndlr.name);
    //var message: MsgFlag = MsgFlag.Unknown;
    var response;

    switch (payload.MsgFlag) {
      case MsgFlag.AddCETab:
        await this.PromiseGen().RaceWaitAndClick(this.Const().Selector.SC.scStartButton, this.PageDataMan().TopLevelWindow().DataDocSelf)
          .then(() => { this.PromiseGen().WaitForThenClick(this.Const().Selector.SC.StartMenuLeftOption, this.PageDataMan().TopLevelWindow().DataDocSelf) });
        break;

      case MsgFlag.AdminB:
        this.debug().LogVal('flag is adminb', payload.FlagAsString);
        this.debug().DebugPageDataMan(this.PageDataMan());


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
        this.debug().LogVal('Unrecognized MsgFlag', payload.FlagAsString);

        break;
    }
  }

  private respondSuccessful() {
    this.SendMessageHndlr(new MsgFromContent(MsgFlag.TaskSuccessful))
  }

  private respondFail() {
    this.SendMessageHndlr(new MsgFromContent(MsgFlag.TaskFailed));
  }

  SendMessageHndlr(msgflag: MsgFromContent) {
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