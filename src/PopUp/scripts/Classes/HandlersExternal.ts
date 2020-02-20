import { CommonEvents } from "./CommonEvents";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { AbsoluteUrl } from "../../../Shared/scripts/Interfaces/AbsoluteUrl";
import { PopUpHub } from "../Managers/PopUpHub";

export class HandlersExternal extends CommonEvents {
  async AddCETab(evt: MouseEvent, popHub: PopUpHub) {
    popHub.EventMan.Handlers.External.GoContentCommand(new MsgFromPopUp(MsgFlag.ReqAddCETab, popHub));
 
    popHub.UiMan.OnSuccessfullCommand();
    ;
    //.catch((ex) =>  popHub.Log.Error(popHub.EventMan.Handlers.External.__hndlrAddCETab.name, ex.toString()));
  }
  async PutAdminB(evt: MouseEvent, popHub: PopUpHub) {
    popHub.EventMan.Handlers.External.GoContentCommand(new MsgFromPopUp(MsgFlag.ReqAdminB, popHub));
  }

  async QuickPublish(evt: MouseEvent, popHub: PopUpHub) {
    await popHub.EventMan.Handlers.External.GoContentCommand(new MsgFromPopUp(MsgFlag.ReqQuickPublish, popHub))
      .then(popHub.UiMan.OnSuccessfullCommand)
      .catch((ex) => popHub.Log.Error(popHub.EventMan.Handlers.External.QuickPublish.name, ex));
  }


  async HndlrSnapShotCreate(evt: MouseEvent, popHub: PopUpHub) {
    var msg = new MsgFromPopUp(MsgFlag.ReqTakeSnapShot, popHub);
    msg.Data.SnapShotSettings.Flavor = SnapShotFlavor.Manual;

    popHub.EventMan.Handlers.External.GoContentCommand(msg);
  }

  async HndlrSnapShotRestore(evt: MouseEvent, popHub: PopUpHub) {
    popHub.Log.FuncStart(this.HndlrSnapShotRestore.name);

    await popHub.EventMan.Handlers.External.CreateNewWindowIfRequired(evt,
      popHub,
      popHub.Helpers.UrlHelp.BuildFullUrlFromParts(popHub.TabMan.CurrentTabData.UrlParts))
      .then((newTab: IDataBrowserTab) => {

        var msg = new MsgFromPopUp(MsgFlag.ReqRestoreClick, popHub);
        msg.Data.IdOfSelect = popHub.UiMan.CurrentMenuState.SelectSnapshotId;

        this.GoContentCommand(msg, newTab);
      })
      .catch((ex) => {
        popHub.Log.Error(this.HndlrSnapShotRestore.name, ex.toString());
      });


    popHub.Log.FuncEnd(this.HndlrSnapShotRestore.name);
  }


  __hndlrCancelOperation(evt: MouseEvent, popHub: PopUpHub) {
    popHub.UiMan.SetCancelFlag();
  }
  MarkFavorite(evt: MouseEvent, popHub: PopUpHub) {
    popHub.PopMsgMan.SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqMarkFavorite, popHub));
  }
  __DrawStorage(evt: MouseEvent, popHub: PopUpHub) {
    popHub.PopMsgMan.FromAtticDrawStorage();
  }

  HndlrSnapShotRemove(evt: any, popHub: PopUpHub) {
    var msg: MsgFromPopUp = new MsgFromPopUp(MsgFlag.RemoveFromStorage, popHub);
    this.GoContentCommand(msg);
  }

  CreateNewWindowIfRequired(evt: MouseEvent, popHub: PopUpHub, tabUrl: AbsoluteUrl, ) {
    return new Promise(async (resolve, reject) => {
      popHub.Log.FuncStart(this.CreateNewWindowIfRequired.name, 'ctrl key? ' + evt.ctrlKey.toString() + ' ' + tabUrl);
      let result: PromiseResult = new PromiseResult(this.CreateNewWindowIfRequired.name, popHub.Log);
      let toReturn: IDataBrowserTab;
      if (!evt.ctrlKey) {
        await popHub.BrowserMan.CreateNewTab(tabUrl)
          .then((newTab: IDataBrowserTab) => {
            popHub.Log.MarkerA();
            toReturn = newTab;
          });
        popHub.Log.DebugIDataBrowserTab(toReturn);
        result.MarkSuccessful();
      }
      else {
        toReturn = popHub.TabMan.CurrentTabData;
        result.MarkSuccessful();
      }

      popHub.Log.FuncEnd(this.CreateNewWindowIfRequired.name);
      if (result.WasSuccessful) {
        resolve(toReturn);
      }
      else {
        reject(result.RejectReason);
      }
    });
  }


  HndlrPresentationDetails(evt: MouseEvent, popHub: PopUpHub) {
    popHub.Log.Error(this.HndlrPresentationDetails.name, 'to do');
  }


  HndlrSnapShotUpdateNickName(evt: MouseEvent, popHub: PopUpHub) {
    var msg = new MsgFromPopUp(MsgFlag.ReqUpdateNickName, popHub);
    msg.Data.IdOfSelect = popHub.UiMan.CurrentMenuState.SelectSnapshotId;
    msg.Data.SnapShotSettings.SnapShotNewNickname = popHub.UiMan.GetValueInNickname();
    this.GoContentCommand(msg);
  }
}