import { CommonEvents } from "./CommonEvents";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp";
import { IsScMode } from "../../../Shared/scripts/Interfaces/IscMode";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { PayloadDataFromPopUp } from "../../../Shared/scripts/Classes/PayloadDataReqPopUp";

export class ExternalEvents extends CommonEvents {
  async __hndlrAddCETab() {
    this.__initNewOperation();
    this.MsgMan().SendMessageHndlr(new MsgFromPopUp(MsgFlag.ReqAddCETab));
  }

  __hndlrCancelOperation(evt: MouseEvent) {
    this.UiMan().SetCancelFlag();
  }

  __DrawStorage(evt: any) {
    this.MsgMan().FromAtticDrawStorage();
  }

  __hndlrDesktop(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessageHndlr(new MsgFromPopUp(MsgFlag.ReqGoDesktop))
  }

  HndlrAdminB() {
    this.__initNewOperation();
    this.MsgMan().SendMessageHndlr(new MsgFromPopUp(MsgFlag.ReqAdminB))
  }
  async __hndlrSetScMode(newMode: IsScMode, evt: MouseEvent) {
    this.__initNewOperation();

    var payload = new MsgFromPopUp(MsgFlag.ReqSetScMode);
    payload.Data = new PayloadDataFromPopUp();
    payload.Data.ReqScMode = newMode;
    payload.Data.UseOriginalWindowLocation = evt.ctrlKey;

    this.MsgMan().SendMessageHndlr(payload);
  }

  async __hndlrOpenCE() {
    this.__initNewOperation();
    this.MsgMan().SendMessageHndlr(new MsgFromPopUp(MsgFlag.ReqOpenCE));
  }

  async __hndlrQuickPublish(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessageHndlr(new MsgFromPopUp(MsgFlag.ReqQuickPublish))

    this.MsgMan().SendMessageHndlr(new MsgFromPopUp(MsgFlag.TaskSuccessful));
  }

  HndlrSnapShotRemove(evt: any) {
    this.__initNewOperation();
    this.MsgMan().SendMessageHndlr(new MsgFromPopUp(MsgFlag.RemoveFromStorage));
  }

  CreateNewWindowIfRequired(evt: MouseEvent) {
    return new Promise(async (resolve, reject) => {
      if (! evt.ctrlKey) {
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
        var payload = new MsgFromPopUp(MsgFlag.ReqRestoreClick);
        payload.Data.idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();

        this.MsgMan().SendMessageHndlr(payload);
      })
      .catch(() => { this.debug().Error(this.HndlrSnapShotRestore.name, 'promise error' )});

    this.debug().FuncEnd(this.HndlrSnapShotRestore.name);
  }

  HndlrSnapShotUpdateNickName() {
    this.__initNewOperation();

    var self = this.PopAtticMan;
    var payload = new MsgFromPopUp(MsgFlag.UpdateNickName);
    payload.Data.idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
    payload.Data.NewNickname = this.UiMan().GetValueInNickname();;
    this.MsgMan().SendMessageHndlr(payload);
  }
  async __hndlrSnapShotCreate(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessageHndlr(new MsgFromPopUp(MsgFlag.ReqTakeSnapShot));
  }
}