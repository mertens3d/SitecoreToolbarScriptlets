import { CommonEvents } from "./CommonEvents";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp";
import { IsScMode } from "../../../Shared/scripts/Interfaces/IscMode";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { PayloadDataFromPopUp } from "../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { ResultSuccessFail } from "../../../Shared/scripts/Classes/ResultSuccessFail";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";

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

    this.locMan().ChangeLocationSwitchBoard(scWindowType.Desktop);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqGoDesktop, this.PopHub))
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

    this.locMan().SetScMode(payload.Data.ReqScMode, payload.Data.UseOriginalWindowLocation);
      //.then(() => this.respondSuccessful())
      //.catch((failReason) => this.respondFail(failReason));

    //this.MsgMan().SendMessageToContent(payload);
  }

  async __hndlrOpenCE() {
    this.__initNewOperation();
    this.locMan().ChangeLocationSwitchBoard(scWindowType.ContentEditor, this.TabMan().CurrentTabData);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqOpenCE, this.PopHub));
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
      let success: ResultSuccessFail = new ResultSuccessFail();

      this.debug().FuncStart(this.CreateNewWindowIfRequired.name, 'ctrl key? ' + evt.ctrlKey.toString());
      if (!evt.ctrlKey) {
        //this.debug().LogVal('new page url', this.UiMan().currentState.Url);

      await  this.BrowserMan().CreateNewTab();

       
      }
      else {
        success.Succeeded = true;
      }

      this.debug().FuncEnd(this.CreateNewWindowIfRequired.name);
      console.log('Success' + success.Succeeded);
      this.debug().LogVal('Success', success.Succeeded);
      if (success.Succeeded) {
        resolve();
      } else {
        reject(success.FailMessage);
      }
    });
  }

  async HndlrSnapShotRestore(evt: MouseEvent) {
    this.debug().FuncStart(this.HndlrSnapShotRestore.name);
    this.__initNewOperation();

    await this.CreateNewWindowIfRequired(evt)
      .then(() => {
        this.debug().Log('completed successfully hdnlr');
        //var payload = new MsgFromPopUp(MsgFlag.NewWindowTest);
        var payload = new MsgFromPopUp(MsgFlag.ReqRestoreClick, this.PopHub);
        payload.Data.IdOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();


        //var dt:number = new Date().getTime();
        //while ((new Date().getTime() - dt) <= 5000) { /* Do nothing */ }


        this.MsgMan().SendMessageToContent(payload);
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
    this.MsgMan().SendMessageToContent(payload);
  }
  async __hndlrSnapShotCreate(evt: MouseEvent) {
    this.__initNewOperation();
    var msg = new MsgFromPopUp(MsgFlag.ReqTakeSnapShot, this.PopHub);
    msg.Data.SnapShotSettings.Flavor = SnapShotFlavor.Manual;
    await this.MsgMan().SendMessageToContent(msg);
  }
}