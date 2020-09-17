import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { SettingFlavor } from "../../../Shared/scripts/Enums/SettingFlavor";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { IAbsoluteUrl } from "../../../Shared/scripts/Interfaces/IAbsoluteUrl";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { ICommandHndlrDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHndlrDataForPopUp";
import { BrowserTabAgent } from "../Managers/TabManager";
import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { PopUpMessagesBroker } from "../Managers/PopUpMessagesBroker/PopUpMessagesBroker";
import { ContentReplyReceivedEvent_Subject } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Subject";

export class HandlersExternalEvent extends LoggableBase {
  private SettingsAgent: ISettingsAgent;
  private BrowserTabAgent: BrowserTabAgent;
  ContentReplyReceivedEvent_Observer: ContentReplyReceivedEvent_Subject;
  private MessageBroker: PopUpMessagesBroker;

  constructor(logger: ILoggerAgent,  settingsAgent: ISettingsAgent, browserTabAgent: BrowserTabAgent, popUpMessagesBroker: PopUpMessagesBroker) {
    super(logger);
    this.SettingsAgent = settingsAgent;
    this.ContentReplyReceivedEvent_Observer = new ContentReplyReceivedEvent_Subject(this.Logger);
    this.BrowserTabAgent = browserTabAgent;
    this.MessageBroker = popUpMessagesBroker;
  }

  private __cleardebugText() {
    this.Logger.HndlrClearDebugText(this.Logger);
  }

  private BuildNewMsgFromPopUp(msgFlag: MsgFlag, data: ICommandHndlrDataForPopUp): MsgFromPopUp {
    this.Logger.FuncStart(this.BuildNewMsgFromPopUp.name);

    let settingsToSend = this.SettingsAgent.GetSettingsByFlavor([SettingFlavor.ContentAndPopUpStoredInPopUp, SettingFlavor.ContentOnly]);
    var msg = new MsgFromPopUp(msgFlag, this.BrowserTabAgent.GetWindowType(), data.MenuState.SelectSnapshotId, settingsToSend);
    this.Logger.FuncEnd(this.BuildNewMsgFromPopUp.name);
    return msg;
  }
  SendMessageToContentAsync(msgPayload: MsgFromPopUp): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.MessageBroker.SendMessageToContentAsync(msgPayload)
        .then((result: IDataContentReplyReceivedEvent_Payload) => resolve(result))
        .catch((err) => reject(err));
    });
  }
  private SendCommandToContent(sendMsgPlayload: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendCommandToContent.name);
      this.__cleardebugText();
      //todo - put back?  this.UiMan.ClearCancelFlag();

      this.SendMessageToContentAsync(sendMsgPlayload)
        .then((replyMessagePayload: IDataContentReplyReceivedEvent_Payload) => this.ContentReplyReceivedEvent_Observer.NotifyObservers(replyMessagePayload))
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.SendCommandToContent.name);
    });
  }

  async AddCETab(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqAddCETab, data);

      await data.EventMan.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async PutAdminB(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqAdminB, data);

      await data.EventMan.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async QuickPublish(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqQuickPublish, data);

      await data.EventMan.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotCreate(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqTakeSnapShot, data);

      await data.EventMan.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotRestoreTBDTab(data: ICommandHndlrDataForPopUp): Promise<void> {
    //TBD = To Be Determined
    data.EventMan.Handlers.External.Logger.FuncStart(data.EventMan.Handlers.External.HndlrSnapShotRestoreTBDTab.name);
    try {
      if (!data.Evt.ctrlKey) {
        await data.EventMan.Handlers.External.HndlrSnapShotRestoreSameTab(data);
      } else {
        await data.EventMan.Handlers.External.HndlrSnapShotRestoreNewTab(data);
      }
    } catch (err) {
      throw (err);
    }
    data.EventMan.Handlers.External.Logger.FuncEnd(data.EventMan.Handlers.External.HndlrSnapShotRestoreTBDTab.name);
  }

  async HndlrPing(data: ICommandHndlrDataForPopUp): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.Ping, data);

      await data.EventMan.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotRestoreSameTab(data: ICommandHndlrDataForPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      data.EventMan.Handlers.External.Logger.FuncStart(data.EventMan.Handlers.External.HndlrSnapShotRestoreSameTab.name);

      var msg = data.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqSetStateOfSitecoreWindow, data);
      msg.Payload.IdOfSelect = data.MenuState.SelectSnapshotId;

      await data.EventMan.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((ex) => reject(ex));

      data.EventMan.Handlers.External.Logger.FuncEnd(data.EventMan.Handlers.External.HndlrSnapShotRestoreSameTab.name);
    });
  }

  async HndlrSnapShotRestoreNewTab(data: ICommandHndlrDataForPopUp) {
    data.EventMan.Handlers.External.Logger.FuncStart(data.EventMan.Handlers.External.HndlrSnapShotRestoreNewTab.name);

    data.EventMan.Handlers.External.BrowserTabAgent.SetQueryStringKeyValue(QueryStrKey.hsTargetSs, data.MenuState.SelectSnapshotId.Raw);

    let newUrl: IAbsoluteUrl = data.EventMan.Handlers.External.BrowserTabAgent.GetFullUrl();

    await data.EventMan.Handlers.External.CreateNewWindow(data, newUrl)
      .catch((ex) => {
        data.EventMan.Handlers.External.Logger.ErrorAndThrow(data.EventMan.Handlers.External.HndlrSnapShotRestoreSameTab.name, ex.toString());
      });

    data.EventMan.Handlers.External.Logger.FuncEnd(this.HndlrSnapShotRestoreNewTab.name);
  }

  async HndlrSnapShotUpdateNickName(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqUpdateNickName, data);

      msg.Payload.SnapShotSettings.SnapShotNewNickname = data.MenuState.CurrentNicknameValue;

      await data.EventMan.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  __hndlrCancelOperation(data: ICommandHndlrDataForPopUp) {
  }

  ToggleFavorite(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      var msg: MsgFromPopUp = data.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqMarkFavorite, data);
      await data.EventMan.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  HndlrSnapShotRemove(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqRemoveFromStorage, data);

      var result: boolean = confirm('Remove ?: ' + Guid.AsShort(msg.Payload.IdOfSelect));
      if (result === true) {
        await data.EventMan.Handlers.External.SendCommandToContent(msg)
          .then(() => resolve())
          .catch((err) => reject(err));
      } else {
        reject('Canceled');
      }
    });
  }

  HndlrCompactCE(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqToggleCompactCss, data);

      msg.Payload.SnapShotSettings.SnapShotNewNickname = data.MenuState.CurrentNicknameValue;
      await data.EventMan.Handlers.External.SendCommandToContent(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  CreateNewWindow(data: ICommandHndlrDataForPopUp, tabUrl: IAbsoluteUrl): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.CreateNewWindow.name);

      await this.BrowserTabAgent.CreateNewTab(tabUrl)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.CreateNewWindow.name);
    });
  }

  HndlrPresentationDetails(data: ICommandHndlrDataForPopUp) {
    this.Logger.ErrorAndThrow(this.HndlrPresentationDetails.name, 'to do');
  }
}