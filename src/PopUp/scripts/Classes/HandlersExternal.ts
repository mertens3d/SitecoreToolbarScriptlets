import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { AbsoluteUrl } from "../../../Shared/scripts/Interfaces/AbsoluteUrl";
import { ICommandHndlrDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHndlrDataForPopUp";
import { IContentState } from "../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { PopUpHub } from "../Managers/PopUpHub";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { MessageManager } from "../Managers/MessageManager";
import { UiManager } from "../Managers/UiManager/UiManager";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { TabManager } from "../Managers/TabManager";

export class HandlersExternal {
  private Logger: ILoggerAgent; //extends CommonEvents
  //PopHub: PopUpHub;
  private MessageManager: MessageManager;
  private UiMan: UiManager;
  private SettingsAgent: ISettingsAgent;
  private TabMan: TabManager;

  constructor(logger: ILoggerAgent, msgManager: MessageManager, uiMan: UiManager, settingsAgent: ISettingsAgent, tabMan: TabManager) {
    this.Logger = logger;
    //this.PopHub = hub;
    this.MessageManager = msgManager;
    this.UiMan = uiMan;
    this.SettingsAgent = settingsAgent;
    this.TabMan = tabMan;
    //this.AllAgents = allAgents;
  }

  private __cleardebugText() {
    this.Logger.HndlrClearDebugText(this.Logger);
  }

  private BuildNewMsgFromPopUp(msgFlag: MsgFlag): MsgFromPopUp {
    this.Logger.FuncStart(this.BuildNewMsgFromPopUp.name);
    var msg = new MsgFromPopUp(msgFlag, this.TabMan.GetWindowType(), this.UiMan.ModuleSelectSnapShot.GetSelectSnapshotId(), this.SettingsAgent.GetOnlyContentPrefs());
    this.Logger.FuncEnd(this.BuildNewMsgFromPopUp.name);
    return msg;
  }

  private SendContentCommand(msgPlayload: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendContentCommand.name);
      this.__cleardebugText();
      this.UiMan.ClearCancelFlag();

      await this.MessageManager.SendMessageToContent(msgPlayload)
        .then((contentState: IContentState) => {
          this.Logger.LogAsJsonPretty('contentState ' + this.SendContentCommand.name, contentState);
          this.UiMan.SetContentState(contentState)
          this.UiMan.RefreshUi();
          resolve();
        })
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.SendContentCommand.name);
    });
  }
  async AddCETab(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = this.BuildNewMsgFromPopUp(MsgFlag.ReqAddCETab);

      await this.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
  async PutAdminB(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = this.BuildNewMsgFromPopUp(MsgFlag.ReqAdminB);

      await this.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async QuickPublish(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = this.BuildNewMsgFromPopUp(MsgFlag.ReqQuickPublish);

      await this.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotCreate(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = this.BuildNewMsgFromPopUp(MsgFlag.ReqTakeSnapShot);

      await this.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotRestoreTBDTab(data: ICommandHndlrDataForPopUp) {
    //TBD = To Be Determined
    data.PopUpHub._allAgents.Logger.FuncStart(data.Self.Handlers.External.HndlrSnapShotRestoreTBDTab.name);

    if (!data.Evt.ctrlKey) {
      await data.Self.Handlers.External.HndlrSnapShotRestoreSameTab(data);
    } else {
      await data.Self.Handlers.External.HndlrSnapShotRestoreNewTab(data);
    }

    data.PopUpHub._allAgents.Logger.FuncEnd(data.Self.Handlers.External.HndlrSnapShotRestoreTBDTab.name);
  }

  async HndlrPing(data: ICommandHndlrDataForPopUp): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.Ping);

      await data.Self.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotRestoreSameTab(data: ICommandHndlrDataForPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      data.PopUpHub._allAgents.Logger.FuncStart(data.Self.Handlers.External.HndlrSnapShotRestoreSameTab.name);

      var msg = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqRestoreClick);
      msg.Data.IdOfSelect = data.PopUpHub.UiMan.ModuleSelectSnapShot.GetSelectSnapshotId();

      await data.Self.Handlers.External.SendContentCommand(msg)
        .then((resolve))
        .catch((ex) => reject(ex));

      data.PopUpHub._allAgents.Logger.FuncEnd(data.Self.Handlers.External.HndlrSnapShotRestoreSameTab.name);
    });
  }

  async HndlrSnapShotRestoreNewTab(data: ICommandHndlrDataForPopUp) {
    data.PopUpHub._allAgents.Logger.FuncStart(data.Self.Handlers.External.HndlrSnapShotRestoreNewTab.name);

    data.PopUpHub.TabMan.SetQueryStringKeyValue(QueryStrKey.hsTargetSs, data.PopUpHub.UiMan.ModuleSelectSnapShot.GetSelectSnapshotId().Raw);

    let newUrl: AbsoluteUrl = data.PopUpHub.TabMan.GetFullUrl();

    await data.Self.Handlers.External.CreateNewWindow(data, newUrl)
      .catch((ex) => {
        data.Self.Handlers.External.Logger.ErrorAndThrow(data.Self.Handlers.External.HndlrSnapShotRestoreSameTab.name, ex.toString());
      });

    data.PopUpHub._allAgents.Logger.FuncEnd(this.HndlrSnapShotRestoreNewTab.name);
  }

  async HndlrSnapShotUpdateNickName(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = this.BuildNewMsgFromPopUp(MsgFlag.ReqUpdateNickName);

      msg.Data.SnapShotSettings.SnapShotNewNickname = data.PopUpHub.UiMan.GetValueInNickname();

      await this.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  __hndlrCancelOperation(data: ICommandHndlrDataForPopUp) {
    data.PopUpHub.UiMan.SetCancelFlag();
  }

  ToggleFavorite(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      var msg: MsgFromPopUp = this.BuildNewMsgFromPopUp(MsgFlag.ReqMarkFavorite);
      await this.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  //ConfirmRemoveAndCheck(storageMatch: IDataOneWindowStorage): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    var result: boolean = confirm('Remove ?: ' + this.TimeNicknameFavStrForConfirmation(storageMatch));
  //    if (result === true) {
  //      this.Logger.LogVal('Key to Delete', storageMatch.RawData.key);

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
      let msg: MsgFromPopUp = this.BuildNewMsgFromPopUp(MsgFlag.RemoveFromStorage);

      var result: boolean = confirm('Remove ?: ' + Guid.AsShort(msg.Data.IdOfSelect));
      if (result === true) {
        await this.SendContentCommand(msg)
          .then(() => resolve())
          .catch((err) => reject(err));
      } else {
        reject('Canceled');
      }
    });
  }

  HndlrCompactCE(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = this.BuildNewMsgFromPopUp(MsgFlag.ReqToggleCompactCss);

      msg.Data.SnapShotSettings.SnapShotNewNickname = data.PopUpHub.UiMan.GetValueInNickname();
      await this.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  CreateNewWindow(data: ICommandHndlrDataForPopUp, tabUrl: AbsoluteUrl): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.CreateNewWindow.name);

      await data.PopUpHub.BrowserMan.CreateNewTab(tabUrl)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.CreateNewWindow.name);
    });
  }

  HndlrPresentationDetails(data: ICommandHndlrDataForPopUp) {
    this.Logger.ErrorAndThrow(this.HndlrPresentationDetails.name, 'to do');
  }
}