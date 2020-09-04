import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { AbsoluteUrl } from "../../../Shared/scripts/Interfaces/AbsoluteUrl";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { ICommandHndlrDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHndlrDataForPopUp";
import { IContentState } from "../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { MessageManager } from "../Managers/MessageManager";
import { TabManager } from "../Managers/TabManager";

export class HandlersExternal {
  private Logger: ILoggerAgent; //extends CommonEvents
  //PopHub: PopUpHub;
  private MessageManager: MessageManager;
  private SettingsAgent: ISettingsAgent;
  private TabMan: TabManager;
  AllCallbacksCommandComplete: Function[] = [];

  constructor(logger: ILoggerAgent, msgManager: MessageManager, settingsAgent: ISettingsAgent, tabMan: TabManager) {
    this.Logger = logger;
    //this.PopHub = hub;
    this.MessageManager = msgManager;
    this.SettingsAgent = settingsAgent;
    this.TabMan = tabMan;
    //this.AllAgents = allAgents;
  }

  private __cleardebugText() {
    this.Logger.HndlrClearDebugText(this.Logger);
  }

  private BuildNewMsgFromPopUp(msgFlag: MsgFlag, data: ICommandHndlrDataForPopUp): MsgFromPopUp {
    this.Logger.FuncStart(this.BuildNewMsgFromPopUp.name);
    var msg = new MsgFromPopUp(msgFlag, this.TabMan.GetWindowType(), data.MenuState.SelectSnapshotId, this.SettingsAgent.GetOnlyContentPrefs());
    this.Logger.FuncEnd(this.BuildNewMsgFromPopUp.name);
    return msg;
  }

  AddCallbackCommandComplete(callbackFunc: Function) {
    this.AllCallbacksCommandComplete.push(callbackFunc);
  }

  private SendContentCommand(msgPlayload: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SendContentCommand.name);
      this.__cleardebugText();
      //todo - put back?  this.UiMan.ClearCancelFlag();

      await this.MessageManager.SendMessageToContent(msgPlayload)
        .then((contentState: IContentState) => {
          if (this.AllCallbacksCommandComplete) {
            for (var idx = 0; idx < this.AllCallbacksCommandComplete.length; idx++) {
              let oneCallbackFunc: Function = this.AllCallbacksCommandComplete[idx];
              oneCallbackFunc(contentState);
            }
          }
          resolve();
        })
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.SendContentCommand.name);
    });
  }
  async AddCETab(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqAddCETab, data);

      await data.Self.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
  async PutAdminB(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqAdminB, data);

      await data.Self.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async QuickPublish(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqQuickPublish, data);

      await data.Self.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotCreate(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqTakeSnapShot, data);

      await data.Self.Handlers.External.SendContentCommand(msg)
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

      await data.Self.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotRestoreSameTab(data: ICommandHndlrDataForPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      data.Self.Handlers.External.Logger.FuncStart(data.Self.Handlers.External.HndlrSnapShotRestoreSameTab.name);

      var msg = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqRestoreClick, data);
      msg.Data.IdOfSelect = data.MenuState.SelectSnapshotId;

      await data.Self.Handlers.External.SendContentCommand(msg)
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

      msg.Data.SnapShotSettings.SnapShotNewNickname = data.MenuState.CurrentNicknameValue;

      await data.Self.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  __hndlrCancelOperation(data: ICommandHndlrDataForPopUp) {
    //data.PopUpHub.UiMan.SetCancelFlag();
  }

  ToggleFavorite(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      var msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqMarkFavorite, data);
      await data.Self.Handlers.External.SendContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  HndlrSnapShotRemove(data: ICommandHndlrDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = data.Self.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.RemoveFromStorage, data);

      var result: boolean = confirm('Remove ?: ' + Guid.AsShort(msg.Data.IdOfSelect));
      if (result === true) {
        await data.Self.Handlers.External.SendContentCommand(msg)
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

      msg.Data.SnapShotSettings.SnapShotNewNickname = data.MenuState.CurrentNicknameValue;
      await data.Self.Handlers.External.SendContentCommand(msg)
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