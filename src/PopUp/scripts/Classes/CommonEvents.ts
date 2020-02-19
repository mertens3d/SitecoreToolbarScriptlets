import { PopUpHub } from "../Managers/PopUpHub";
import { PopUpManagerBase } from "../Managers/PopUpManagerBase";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";

export class CommonEvents {
  protected PopHub: PopUpHub; //extends PopUpManagerBase
  constructor(hub: PopUpHub) {
    //super(hub);
    this.PopHub = hub;
  }

  protected __cleardebugText() {
    this.PopHub.Log.HndlrClearDebugText(this.PopHub.Log);
  }

  protected GoContentCommand(msgPlayload: MsgFromPopUp, targetTab: IDataBrowserTab = null) {
    return new Promise(async (resolve, reject) => {
      this.PopHub.Log.FuncStart(this.GoContentCommand.name);
      this.__cleardebugText();
      this.PopHub.UiMan.ClearCancelFlag();

      await this.PopHub.PopMsgMan.SendMessageToContentTab(msgPlayload, targetTab);

      this.PopHub.Log.FuncEnd(this.GoContentCommand.name);

      resolve();
    });
  }
}