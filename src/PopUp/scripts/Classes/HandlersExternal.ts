﻿import { CommonEvents } from "./CommonEvents";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp";
import { IScMode } from "../../../Shared/scripts/Interfaces/IscMode";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { PayloadDataFromPopUp } from "../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { AbsoluteUrl } from "../../../Shared/scripts/Interfaces/AbsoluteUrl";
import { PopUpHub } from "../Managers/PopUpHub";

export class HandlersExternal extends CommonEvents {
  async __hndlrAddCETab(evt: MouseEvent, popHub: PopUpHub) {
    popHub.EventMan.Handlers.External.__initNewOperation();
    await popHub.PopMsgMan.SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqAddCETab, popHub), popHub.TabMan.CurrentTabData)
    popHub.UiMan.OnSuccessfullCommand();
    ;
    //.catch((ex) =>  popHub.Log.Error(popHub.EventMan.Handlers.External.__hndlrAddCETab.name, ex.toString()));
  }
  async HndlrSnapShotCreate(evt: MouseEvent, popHub: PopUpHub) {
    popHub.EventMan.Handlers.External.__initNewOperation();
    var msg = new MsgFromPopUp(MsgFlag.ReqTakeSnapShot, popHub);
    msg.Data.SnapShotSettings.Flavor = SnapShotFlavor.Manual;
    await popHub.PopMsgMan.SendMessageToContentTab(msg, popHub.TabMan.CurrentTabData);
    popHub.UiMan.OnSuccessfullCommand();
  }

  __hndlrCancelOperation(evt: MouseEvent) {
    this.UiMan().SetCancelFlag();
  }
  MarkFavorite(evt: MouseEvent) {
    this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqMarkFavorite, this.PopHub), this.TabMan().CurrentTabData);
  }
  __DrawStorage(evt: MouseEvent) {
    this.MsgMan().FromAtticDrawStorage();
  }
  GoDesktop(evt: MouseEvent) {
    this.__initNewOperation();
    this.locMan().ChangeLocationSwitchBoard(scWindowType.Desktop);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqGoDesktop, this.PopHub))
  }
  PutAdminB() {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqAdminB, this.PopHub), this.TabMan().CurrentTabData);
  }
  async SetScMode(evt: MouseEvent, popHub: PopUpHub, parameters: any[]) {
    let newMode: IScMode = parameters[0];
    await popHub.EventMan.Handlers.External.__initNewOperation()
      .then(() => popHub.LocMan.SetScMode(newMode))
      .then(() => popHub.UiMan.OnSuccessfullCommand());
      //.catch((ex) => popHub.Log.Error(popHub.EventMan.Handlers.External.SetScMode.name, ex));
  }
  async GoCe() {
    this.__initNewOperation();
    this.locMan().ChangeLocationSwitchBoard(scWindowType.ContentEditor);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqOpenCE, this.PopHub));
  }
  async QuickPublish(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqQuickPublish, this.PopHub), this.TabMan().CurrentTabData);
  }
  HndlrSnapShotRemove(evt: any) {
    this.__initNewOperation();
    var msg: MsgFromPopUp = new MsgFromPopUp(MsgFlag.RemoveFromStorage, this.PopHub);
    this.MsgMan().SendMessageToContentTab(msg, this.TabMan().CurrentTabData);
  }
  CreateNewWindowIfRequired(evt: MouseEvent, tabUrl: AbsoluteUrl) {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.CreateNewWindowIfRequired.name, 'ctrl key? ' + evt.ctrlKey.toString() + ' ' + tabUrl);
      let result: PromiseResult = new PromiseResult(this.CreateNewWindowIfRequired.name, this.Log());
      let toReturn: IDataBrowserTab;
      if (!evt.ctrlKey) {
        await this.BrowserMan().CreateNewTab(tabUrl)
          .then((newTab: IDataBrowserTab) => {
            this.Log().MarkerA();
            toReturn = newTab;
          });
        this.Log().DebugIDataBrowserTab(toReturn);
        result.MarkSuccessful();
      }
      else {
        toReturn = this.TabMan().CurrentTabData;
        result.MarkSuccessful();
      }

      this.Log().FuncEnd(this.CreateNewWindowIfRequired.name);
      if (result.WasSuccessful) {
        resolve(toReturn);
      }
      else {
        reject(result.RejectMessage);
      }
    });
  }
  async HndlrSnapShotRestore(evt: MouseEvent) {
    this.Log().FuncStart(this.HndlrSnapShotRestore.name);
    this.__initNewOperation();
    await this.CreateNewWindowIfRequired(evt, this.Helpers().UrlHelp.BuildFullUrlFromParts(this.TabMan().CurrentTabData.UrlParts))
      .then((newTab: IDataBrowserTab) => {
        this.Log().Log('completed successfully hdnlr');
        //var payload = new MsgFromPopUp(MsgFlag.NewWindowTest);
        var payload = new MsgFromPopUp(MsgFlag.ReqRestoreClick, this.PopHub);
        payload.Data.IdOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
        //var dt:number = new Date().getTime();
        //while ((new Date().getTime() - dt) <= 5000) { /* Do nothing */ }
        this.MsgMan().SendMessageToContentTab(payload, newTab);
      })
      .catch((ex) => {
        this.Log().Error(this.HndlrSnapShotRestore.name, ex.toString());
      });
    this.Log().FuncEnd(this.HndlrSnapShotRestore.name);
  }
  HndlrSnapShotUpdateNickName() {
    this.__initNewOperation();
    var self = this.PopAtticMan;
    var payload = new MsgFromPopUp(MsgFlag.ReqUpdateNickName, this.PopHub);
    payload.Data.IdOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
    payload.Data.SnapShotSettings.SnapShotNewNickname = this.UiMan().GetValueInNickname();
    ;
    this.MsgMan().SendMessageToContentTab(payload, this.TabMan().CurrentTabData);
  }
}