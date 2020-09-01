import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { AbsoluteUrl } from "../../../Shared/scripts/Interfaces/AbsoluteUrl";
import { ICommandHndlrDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHndlrDataForPopUp";
import { TabManager } from "../Managers/TabManager";
import { CommonEvents } from "./CommonEvents";

export class HandlersExternal extends CommonEvents {
  private BuildNewMsgFromPopUp(msgFlag: MsgFlag): MsgFromPopUp {
    this.AllAgents.Logger.FuncStart(this.BuildNewMsgFromPopUp.name);
    var msg = new MsgFromPopUp(msgFlag, this.PopHub.TabMan.GetWindowType(), this.PopHub.UiMan.ModuleSelectSnapShot.GetSelectSnapshotId(), this.PopHub._allAgents.SettingsAgent.GetOnlyContentPrefs());
    this.AllAgents.Logger.FuncEnd(this.BuildNewMsgFromPopUp.name);
    return msg;
  }

  async AddCETab(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.PopUpHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqAddCETab);

      await data.PopUpHub.EventMan.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
  async PutAdminB(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.PopUpHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqAdminB);

      await data.PopUpHub.EventMan.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async QuickPublish(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.PopUpHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqQuickPublish);

      await data.PopUpHub.EventMan.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotCreate(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.PopUpHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqTakeSnapShot);

      await data.PopUpHub.EventMan.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotRestoreTBDTab(data: ICommandHndlrDataForPopUp) {
    //TBD = To Be Determined
    data.PopUpHub._allAgents.Logger.FuncStart(data.PopUpHub.EventMan.Handlers.External.HndlrSnapShotRestoreTBDTab.name);

    if (!data.Evt.ctrlKey) {
      await data.PopUpHub.EventMan.Handlers.External.HndlrSnapShotRestoreSameTab(data);
    } else {
      await data.PopUpHub.EventMan.Handlers.External.HndlrSnapShotRestoreNewTab(data);
    }

    data.PopUpHub._allAgents.Logger.FuncEnd(data.PopUpHub.EventMan.Handlers.External.HndlrSnapShotRestoreTBDTab.name);
  }

  async HndlrSnapShotRestoreSameTab(data: ICommandHndlrDataForPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      data.PopUpHub._allAgents.Logger.FuncStart(data.PopUpHub.EventMan.Handlers.External.HndlrSnapShotRestoreSameTab.name);

      var msg = data.PopUpHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqRestoreClick);
      msg.Data.IdOfSelect = data.PopUpHub.UiMan.ModuleSelectSnapShot.GetSelectSnapshotId();

      await data.PopUpHub.EventMan.Handlers.External.SendContentCommand(msg)
        .then((resolve))
        .catch((ex) => reject(ex));

      data.PopUpHub._allAgents.Logger.FuncEnd(data.PopUpHub.EventMan.Handlers.External.HndlrSnapShotRestoreSameTab.name);
    });
  }

  async HndlrSnapShotRestoreNewTab(data: ICommandHndlrDataForPopUp) {
    data.PopUpHub._allAgents.Logger.FuncStart(data.PopUpHub.EventMan.Handlers.External.HndlrSnapShotRestoreNewTab.name);

    data.PopUpHub.TabMan.SetQueryStringKeyValue(QueryStrKey.hsTargetSs, data.PopUpHub.UiMan.ModuleSelectSnapShot.GetSelectSnapshotId().ToString());

    let newUrl: AbsoluteUrl = data.PopUpHub.TabMan.GetFullUrl();

    await data.PopUpHub.EventMan.Handlers.External.CreateNewWindow(data, newUrl)
      .catch((ex) => {
        data.PopUpHub.EventMan.Handlers.External.AllAgents.Logger.ErrorAndThrow(data.PopUpHub.EventMan.Handlers.External.HndlrSnapShotRestoreSameTab.name, ex.toString());
      });

    data.PopUpHub._allAgents.Logger.FuncEnd(data.PopUpHub.EventMan.Handlers.External.HndlrSnapShotRestoreNewTab.name);
  }

  async HndlrSnapShotUpdateNickName(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.PopUpHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqUpdateNickName);

      msg.Data.SnapShotSettings.SnapShotNewNickname = data.PopUpHub.UiMan.GetValueInNickname();

      await data.PopUpHub.EventMan.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  async Ping(data: ICommandHndlrDataForPopUp): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.PopUpHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.Ping);

      await data.PopUpHub.EventMan.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  __hndlrCancelOperation(data: ICommandHndlrDataForPopUp) {
    data.PopUpHub.UiMan.SetCancelFlag();
  }

  MarkFavorite(data: ICommandHndlrDataForPopUp, tanManagerTempFix: TabManager) {
    return new Promise<void>(async (resolve, reject) => {
      var msg: MsgFromPopUp = data.PopUpHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqMarkFavorite);
      await data.PopUpHub.EventMan.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  //ConfirmRemoveAndCheck(storageMatch: IDataOneWindowStorage): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    var result: boolean = confirm('Remove ?: ' + this.TimeNicknameFavStrForConfirmation(storageMatch));
  //    if (result === true) {
  //      this.AllAgents.Logger.LogVal('Key to Delete', storageMatch.RawData.key);

  //      let targetId = storageMatch.Id;

  //      await window.localStorage.removeItem(storageMatch.RawData.key);

  //      await this.GetFromStorageById(targetId)
  //        .then((result) => {
  //          if (!result) {
  //            resolve();
  //          } else {
  //            reject('Snapshot still exists after deleting');
  //          }
  //        })
  //    } else {
  //      reject('Confirmation not received');
  //    }
  //  })
  //}

  HndlrSnapShotRemove(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.PopUpHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.RemoveFromStorage);

      var result: boolean = confirm('Remove ?: ' + msg.Data.IdOfSelect.AsShort());
      if (result === true) {
        await data.PopUpHub.EventMan.Handlers.External.SendContentCommand(msg)
          .then(() => resolve())
          .catch((err) => reject(err));
      } else {
        reject('Canceled');
      }
    });
  }

  HndlrCompactCE(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.PopUpHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqToggleCompactCss);

      msg.Data.SnapShotSettings.SnapShotNewNickname = data.PopUpHub.UiMan.GetValueInNickname();
      await data.PopUpHub.EventMan.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  CreateNewWindow(data: ICommandHndlrDataForPopUp, tabUrl: AbsoluteUrl): Promise<void> {
    return new Promise(async (resolve, reject) => {

      data.PopUpHub.EventMan.Handlers.External.AllAgents.Logger.FuncStart(data.PopUpHub.EventMan.Handlers.External.CreateNewWindow.name);

      await data.PopUpHub.BrowserMan.CreateNewTab(tabUrl)
        .then(() => resolve())
        .catch((err) => reject(err));

      data.PopUpHub.EventMan.Handlers.External.AllAgents.Logger.FuncEnd(data.PopUpHub.EventMan.Handlers.External.CreateNewWindow.name);
    });
  }

  HndlrPresentationDetails(data: ICommandHndlrDataForPopUp) {
    data.PopUpHub.EventMan.Handlers.External.AllAgents.Logger.ErrorAndThrow(data.PopUpHub.EventMan.Handlers.External.HndlrPresentationDetails.name, 'to do');
  }
}