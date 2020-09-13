import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { SettingFlavor } from "../../../Shared/scripts/Enums/SettingFlavor";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { AbsoluteUrl } from "../../../Shared/scripts/Interfaces/AbsoluteUrl";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Shared/scripts/Interfaces/Events/IDataContentReplyReceivedEvent_Payload";
import { ICommandHndlrDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHndlrDataForPopUp";
import { PopUpMessageManager } from "../Managers/MessageManager";
import { TabManager } from "../Managers/TabManager";
import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { ValidMessageRecievedEvent_Subject } from "./ValidMessageRecievedEvent_Subject";

export class HandlersExternalEvent extends LoggableBase {
  private MessageManager: PopUpMessageManager;
  private SettingsAgent: ISettingsAgent;
  private TabMan: TabManager;
  ValidMessageRecievedEvent: ValidMessageRecievedEvent_Subject;

  constructor(logger: ILoggerAgent, msgManager: PopUpMessageManager, settingsAgent: ISettingsAgent, tabMan: TabManager) {
    super(logger);
    this.MessageManager = msgManager;
    this.SettingsAgent = settingsAgent;
    this.ValidMessageRecievedEvent = new ValidMessageRecievedEvent_Subject(this.Logger);
    this.TabMan = tabMan;
  }

  private __cleardebugText() {
    this.Logger.HndlrClearDebugText(this.Logger);
  }

  private BuildNewMsgFromPopUp(msgFlag: MsgFlag, data: ICommandHndlrDataForPopUp): MsgFromPopUp {
    this.Logger.FuncStart(this.BuildNewMsgFromPopUp.name);

    let settingsToSend = this.SettingsAgent.GetSettingsByFlavor([SettingFlavor.ContentAndPopUpStoredInPopUp, SettingFlavor.ContentOnly]);
    var msg = new MsgFromPopUp(msgFlag, this.TabMan.GetWindowType(), data.MenuState.SelectSnapshotId, settingsToSend);
    this.Logger.FuncEnd(this.BuildNewMsgFromPopUp.name);
    return msg;
  }

  private SendCommandToContent(sendMsgPlayload: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendCommandToContent.name);
      this.__cleardebugText();
      //todo - put back?  this.UiMan.ClearCancelFlag();

      this.MessageManager.SendMessageToContentAsync(sendMsgPlayload)
        .then((replyMessagePayload: IDataContentReplyReceivedEvent_Payload) => this.ValidMessageRecievedEvent.NotifyObservers(replyMessagePayload))
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.SendCommandToContent.name);
    });
  }

  async AddCETab(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqAddCETab, data);

      await data.Self.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async PutAdminB(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqAdminB, data);

      await data.Self.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async QuickPublish(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqQuickPublish, data);

      await data.Self.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotCreate(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqTakeSnapShot, data);

      await data.Self.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotRestoreTBDTab(data: ICommandHndlrDataForPopUp): Promise<void> {
    //TBD = To Be Determined
    data.Self.Handlers.External.Logger.FuncStart(data.Self.Handlers.External.HndlrSnapShotRestoreTBDTab.name);
    try {
      if (!data.Evt.ctrlKey) {
        await data.Self.Handlers.External.HndlrSnapShotRestoreSameTab(data);
      } else {
        await data.Self.Handlers.External.HndlrSnapShotRestoreNewTab(data);
      }
    } catch (err) {
      throw (err);
    }
    data.Self.Handlers.External.Logger.FuncEnd(data.Self.Handlers.External.HndlrSnapShotRestoreTBDTab.name);
  }

  async HndlrPing(data: ICommandHndlrDataForPopUp): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.Ping, data);

      await data.Self.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotRestoreSameTab(data: ICommandHndlrDataForPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      data.Self.Handlers.External.Logger.FuncStart(data.Self.Handlers.External.HndlrSnapShotRestoreSameTab.name);

      var msg = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqSetStateOfSitecoreWindow, data);
      msg.Payload.IdOfSelect = data.MenuState.SelectSnapshotId;

      await data.Self.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((ex) => reject(ex));

      data.Self.Handlers.External.Logger.FuncEnd(data.Self.Handlers.External.HndlrSnapShotRestoreSameTab.name);
    });
  }

  async HndlrSnapShotRestoreNewTab(data: ICommandHndlrDataForPopUp) {
    data.Self.Handlers.External.Logger.FuncStart(data.Self.Handlers.External.HndlrSnapShotRestoreNewTab.name);

    data.Self.Handlers.External.TabMan.SetQueryStringKeyValue(QueryStrKey.hsTargetSs, data.MenuState.SelectSnapshotId.Raw);

    let newUrl: AbsoluteUrl = data.Self.Handlers.External.TabMan.GetFullUrl();

    await data.Self.Handlers.External.CreateNewWindow(data, newUrl)
      .catch((ex) => {
        data.Self.Handlers.External.Logger.ErrorAndThrow(data.Self.Handlers.External.HndlrSnapShotRestoreSameTab.name, ex.toString());
      });

    data.Self.Handlers.External.Logger.FuncEnd(this.HndlrSnapShotRestoreNewTab.name);
  }

  async HndlrSnapShotUpdateNickName(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqUpdateNickName, data);

      msg.Payload.SnapShotSettings.SnapShotNewNickname = data.MenuState.CurrentNicknameValue;

      await data.Self.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  __hndlrCancelOperation(data: ICommandHndlrDataForPopUp) {
  }

  ToggleFavorite(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      var msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqMarkFavorite, data);
      await data.Self.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  HndlrSnapShotRemove(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqRemoveFromStorage, data);

      var result: boolean = confirm('Remove ?: ' + Guid.AsShort(msg.Payload.IdOfSelect));
      if (result === true) {
        await data.Self.Handlers.External.SendCommandToContent(msg)
          .then(() => resolve())
          .catch((err) => reject(err));
      } else {
        reject('Canceled');
      }
    });
  }

  HndlrCompactCE(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqToggleCompactCss, data);

      msg.Payload.SnapShotSettings.SnapShotNewNickname = data.MenuState.CurrentNicknameValue;
      await data.Self.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  CreateNewWindow(data: ICommandHndlrDataForPopUp, tabUrl: AbsoluteUrl): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.CreateNewWindow.name);

      await this.TabMan.CreateNewTab(tabUrl)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.CreateNewWindow.name);
    });
  }

  HndlrPresentationDetails(data: ICommandHndlrDataForPopUp) {
    this.Logger.ErrorAndThrow(this.HndlrPresentationDetails.name, 'to do');
  }
}