import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { AbsoluteUrl } from "../../../Shared/scripts/Interfaces/AbsoluteUrl";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { PopUpHub } from "../Managers/PopUpHub";
import { TabManager } from "../Managers/TabManager";
import { CommonEvents } from "./CommonEvents";

export class HandlersExternal extends CommonEvents {
  private BuildNewMsgFromPopUp(msgFlag: MsgFlag): MsgFromPopUp {
    this.AllAgents.Logger.FuncStart(this.PopHub.EventMan.Handlers.External.BuildNewMsgFromPopUp.name);
    var msg = new MsgFromPopUp(msgFlag, this.PopHub.TabMan.CurrentTabData.UrlParts.ScWindowType, this.PopHub.UiMan.ModuleSelectSnapShot.GetSelectSnapshotId(), this.PopHub._allAgents.SettingsAgent.GetOnlyContentPrefs());
    this.AllAgents.Logger.FuncEnd(this.PopHub.EventMan.Handlers.External.BuildNewMsgFromPopUp.name);
    return msg;
  }

  async AddCETab(evt: MouseEvent, popHub: PopUpHub) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = popHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqAddCETab);

      await popHub.EventMan.Handlers.External.GoContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
  async PutAdminB(evt: MouseEvent, popHub: PopUpHub) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = popHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqAdminB);

      await popHub.EventMan.Handlers.External.GoContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async QuickPublish(evt: MouseEvent, popHub: PopUpHub) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = popHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqQuickPublish);

      await popHub.EventMan.Handlers.External.GoContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotCreate(evt: MouseEvent, popHub: PopUpHub) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = popHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqTakeSnapShot);

      await popHub.EventMan.Handlers.External.GoContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HndlrSnapShotRestore(evt: MouseEvent, popHub: PopUpHub) {
    this.AllAgents.Logger.FuncStart(this.HndlrSnapShotRestore.name);

    //this will either be a new tab or modifying the existing one

    await popHub.EventMan.Handlers.External.CreateNewWindowIfRequired(evt,
      popHub,
      popHub.Helpers.UrlHelp.BuildFullUrlFromParts(popHub.TabMan.CurrentTabData.UrlParts))
      .then((newTab: IDataBrowserTab) => {
        var msg = popHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqRestoreClick);
        msg.Data.IdOfSelect = popHub.UiMan.ModuleSelectSnapShot.GetSelectSnapshotId();

        this.GoContentCommand(msg, newTab);
      })
      .catch((ex) => {
        this.AllAgents.Logger.ErrorAndThrow(this.HndlrSnapShotRestore.name, ex.toString());
      });

    this.AllAgents.Logger.FuncEnd(this.HndlrSnapShotRestore.name);
  }

  async HndlrSnapShotUpdateNickName(evt: MouseEvent, popHub: PopUpHub) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = popHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqUpdateNickName);

      msg.Data.SnapShotSettings.SnapShotNewNickname = popHub.UiMan.GetValueInNickname();
      await popHub.EventMan.Handlers.External.GoContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  async Ping(evt: MouseEvent, popHub: PopUpHub) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = popHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.Ping);

      await popHub.EventMan.Handlers.External.GoContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  __hndlrCancelOperation(evt: MouseEvent, popHub: PopUpHub) {
    popHub.UiMan.SetCancelFlag();
  }

  MarkFavorite(evt: MouseEvent, popHub: PopUpHub, tanManagerTempFix: TabManager) {
    return new Promise<void>(async (resolve, reject) => {
      var msg: MsgFromPopUp = popHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqMarkFavorite);
      await popHub.EventMan.Handlers.External.GoContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  HndlrSnapShotRemove(evt: any, popHub: PopUpHub) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = popHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.RemoveFromStorage);

      msg.Data.SnapShotSettings.SnapShotNewNickname = popHub.UiMan.GetValueInNickname();
      await popHub.EventMan.Handlers.External.GoContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  HndlrCompactCE(evt: any, popHub: PopUpHub) {
    return new Promise<void>(async (resolve, reject) => {
      let msg: MsgFromPopUp = popHub.EventMan.Handlers.External.BuildNewMsgFromPopUp(MsgFlag.ReqToggleCompactCss);

      msg.Data.SnapShotSettings.SnapShotNewNickname = popHub.UiMan.GetValueInNickname();
      await popHub.EventMan.Handlers.External.GoContentCommand(msg)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  CreateNewWindowIfRequired(evt: MouseEvent, popHub: PopUpHub, tabUrl: AbsoluteUrl,) {
    return new Promise<IDataBrowserTab>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.CreateNewWindowIfRequired.name, 'ctrl key? ' + evt.ctrlKey.toString() + ' ' + tabUrl);
      let result: PromiseResult = new PromiseResult(this.CreateNewWindowIfRequired.name, this.AllAgents.Logger);
      let toReturn: IDataBrowserTab;
      if (!evt.ctrlKey) {
        await popHub.BrowserMan.CreateNewTab(tabUrl)
          .then((newTab: IDataBrowserTab) => {
            this.AllAgents.Logger.MarkerA();
            toReturn = newTab;
          });
        this.AllAgents.Logger.LogAsJsonPretty("toReturn", toReturn);
        result.MarkSuccessful();
      }
      else {
        toReturn = popHub.TabMan.CurrentTabData;
        result.MarkSuccessful();
      }

      this.AllAgents.Logger.FuncEnd(this.CreateNewWindowIfRequired.name);
      if (result.WasSuccessful) {
        resolve(toReturn);
      }
      else {
        reject(result.RejectReasons);
      }
    });
  }

  HndlrPresentationDetails(evt: MouseEvent, popHub: PopUpHub) {
    this.AllAgents.Logger.ErrorAndThrow(this.HndlrPresentationDetails.name, 'to do');
  }
}