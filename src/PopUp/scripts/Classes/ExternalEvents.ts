import { CommonEvents } from "./CommonEvents";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp";
import { IsScMode } from "../../../Shared/scripts/Interfaces/IscMode";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { PayloadDataFromPopUp } from "../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { ResultSuccessFail } from "../../../Shared/scripts/Classes/ResultSuccessFail";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";

export class ExternalEvents extends CommonEvents {
  async __hndlrAddCETab() {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqAddCETab, this.PopHub), this.TabMan().CurrentTabData);
  }

  __hndlrCancelOperation(evt: MouseEvent) {
    this.UiMan().SetCancelFlag();
  }

  MarkFavorite(evt: MouseEvent) {
    this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqMarkFavorite, this.PopHub), this.TabMan().CurrentTabData)
  }
  __DrawStorage(evt: MouseEvent) {
    this.MsgMan().FromAtticDrawStorage();
  }

  __hndlrDesktop(evt: MouseEvent) {
    this.__initNewOperation();

    this.locMan().ChangeLocationSwitchBoard(scWindowType.Desktop);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqGoDesktop, this.PopHub))
  }

  HndlrAdminB() {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqAdminB, this.PopHub), this.TabMan().CurrentTabData)
  }
  async __hndlrSetScMode(newMode: IsScMode, evt: MouseEvent) {
    this.__initNewOperation();

    var payload = new MsgFromPopUp(MsgFlag.ReqSetScMode, this.PopHub);
    payload.Data = new PayloadDataFromPopUp();
    payload.Data.ReqScMode = newMode;
    payload.Data.UseOriginalWindowLocation = evt.ctrlKey;

    this.locMan().SetScMode(payload.Data.ReqScMode, payload.Data.UseOriginalWindowLocation);
    //.then(() => this.respondSuccessful())
    //.catch((failReason) => this.respondFail(failReason));

    //this.MsgMan().SendMessageToContent(payload);
  }

  async __hndlrOpenCE() {
    this.__initNewOperation();
    this.locMan().ChangeLocationSwitchBoard(scWindowType.ContentEditor);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqOpenCE, this.PopHub));
  }

  async __hndlrQuickPublish(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqQuickPublish, this.PopHub), this.TabMan().CurrentTabData)
  }

  HndlrSnapShotRemove(evt: any) {
    this.__initNewOperation();
    var msg: MsgFromPopUp = new MsgFromPopUp(MsgFlag.RemoveFromStorage, this.PopHub);
    this.MsgMan().SendMessageToContentTab(msg, this.TabMan().CurrentTabData);
  }

  CreateNewWindowIfRequired(evt: MouseEvent, tabUrl: string) {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.CreateNewWindowIfRequired.name, 'ctrl key? ' + evt.ctrlKey.toString() + ' ' + tabUrl);

      let result: ResultSuccessFail = new ResultSuccessFail();
      let toReturn: IDataBrowserTab;

      if (!evt.ctrlKey) {
        await this.BrowserMan().CreateNewTab(tabUrl)
          .then((newTab: IDataBrowserTab) => {
            this.debug().MarkerA();
            toReturn = newTab
          }
          );

        this.debug().DebugIDataBrowserTab(toReturn);

        result.Succeeded = true;
      }
      else {
        toReturn = this.TabMan().CurrentTabData;
        result.Succeeded = true;
      }

      this.debug().LogVal('Success', result.Succeeded);

      if (result.Succeeded) {
        this.debug().FuncEnd(this.CreateNewWindowIfRequired.name);
        resolve(toReturn);
      } else {
        this.debug().FuncEnd(this.CreateNewWindowIfRequired.name);
        reject(result.RejectMessage);
      }
    });
  }

  async HndlrSnapShotRestore(evt: MouseEvent) {
    this.debug().FuncStart(this.HndlrSnapShotRestore.name);
    this.__initNewOperation();

    await this.CreateNewWindowIfRequired(evt, this.TabMan().CurrentTabData.Tab.url)
      .then((newTab: IDataBrowserTab) => {
        this.debug().Log('completed successfully hdnlr');
        //var payload = new MsgFromPopUp(MsgFlag.NewWindowTest);
        var payload = new MsgFromPopUp(MsgFlag.ReqRestoreClick, this.PopHub);
        payload.Data.IdOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();

        //var dt:number = new Date().getTime();
        //while ((new Date().getTime() - dt) <= 5000) { /* Do nothing */ }

        this.MsgMan().SendMessageToContentTab(payload, newTab);
      })
      .catch((ex) => {
        this.debug().Error(this.HndlrSnapShotRestore.name, ex.toString())
      });

    this.debug().FuncEnd(this.HndlrSnapShotRestore.name);
  }

  HndlrSnapShotUpdateNickName() {
    this.__initNewOperation();

    var self = this.PopAtticMan;
    var payload = new MsgFromPopUp(MsgFlag.ReqUpdateNickName, this.PopHub);
    payload.Data.IdOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
    payload.Data.SnapShotSettings.SnapShotNewNickname = this.UiMan().GetValueInNickname();;
    this.MsgMan().SendMessageToContentTab(payload, this.TabMan().CurrentTabData);
  }
  async __hndlrSnapShotCreate(evt: MouseEvent) {
    this.__initNewOperation();
    var msg = new MsgFromPopUp(MsgFlag.ReqTakeSnapShot, this.PopHub);
    msg.Data.SnapShotSettings.Flavor = SnapShotFlavor.Manual;
    await this.MsgMan().SendMessageToContentTab(msg, this.TabMan().CurrentTabData);
  }
}