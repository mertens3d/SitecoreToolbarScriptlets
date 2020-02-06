import { CommonEvents } from "./CommonEvents";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp";
import { IsScMode } from "../../../Shared/scripts/Interfaces/IscMode";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { PayloadDataFromPopUp } from "../../../Shared/scripts/Classes/PayloadDataReqPopUp";

export class ExternalEvents extends CommonEvents {
  async __hndlrAddCETab() {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqAddCETab, this.PopHub));
  }

  __hndlrCancelOperation(evt: MouseEvent) {
    this.UiMan().SetCancelFlag();
  }

  MarkFavorite(evt: MouseEvent) {
    this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqMarkFavorite, this.PopHub))
  }
  __DrawStorage(evt: MouseEvent) {
    this.MsgMan().FromAtticDrawStorage();
  }

  __hndlrDesktop(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqGoDesktop, this.PopHub))
  }

  HndlrAdminB() {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqAdminB, this.PopHub))
  }
  async __hndlrSetScMode(newMode: IsScMode, evt: MouseEvent) {
    this.__initNewOperation();

    var payload = new MsgFromPopUp(MsgFlag.ReqSetScMode, this.PopHub);
    payload.Data = new PayloadDataFromPopUp();
    payload.Data.ReqScMode = newMode;
    payload.Data.UseOriginalWindowLocation = evt.ctrlKey;

    this.MsgMan().SendMessageToContent(payload);
  }

  async __hndlrOpenCE() {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqOpenCE, this.PopHub));
  }

  async __hndlrQuickPublish(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqQuickPublish, this.PopHub))

  }

  HndlrSnapShotRemove(evt: any) {
    this.__initNewOperation();
    var msg: MsgFromPopUp = new MsgFromPopUp(MsgFlag.RemoveFromStorage, this.PopHub);
    this.MsgMan().SendMessageToContent(msg);
  }

  CreateNewWindowIfRequired(evt: MouseEvent) {
    return new Promise(async (resolve, reject) => {
      if (!evt.ctrlKey) {
        browser.tabs.create({
          url: this.UiMan().currentState.Url,
        }).then((tab) => {
          browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            console.log('status: ' + tab.status);
            if (tab.status == 'complete' && tab.active) {
              resolve();
            }
          })
        })
          .catch(reject);
      }
      else {
        resolve();
      }
    });
  }

  async HndlrSnapShotRestore(evt: MouseEvent) {
    this.debug().FuncStart(this.HndlrSnapShotRestore.name);
    this.__initNewOperation();

    await this.CreateNewWindowIfRequired(evt)
      .then(() => {
        //var payload = new MsgFromPopUp(MsgFlag.NewWindowTest);
        var payload = new MsgFromPopUp(MsgFlag.ReqRestoreClick, this.PopHub);
        payload.Data.IdOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();

        this.MsgMan().SendMessageToContent(payload);
      })
      .catch(() => { this.debug().Error(this.HndlrSnapShotRestore.name, 'promise error') });

    this.debug().FuncEnd(this.HndlrSnapShotRestore.name);
  }

  HndlrSnapShotUpdateNickName() {
    this.__initNewOperation();

    var self = this.PopAtticMan;
    var payload = new MsgFromPopUp(MsgFlag.ReqUpdateNickName, this.PopHub);
    payload.Data.IdOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
    payload.Data.SnapShotSettings.SnapShotNewNickname = this.UiMan().GetValueInNickname();;
    this.MsgMan().SendMessageToContent(payload);
  }
  async __hndlrSnapShotCreate(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqTakeSnapShot, this.PopHub));
  }
}