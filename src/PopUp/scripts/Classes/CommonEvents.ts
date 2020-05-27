import { PopUpHub } from "../Managers/PopUpHub";
import { PopUpManagerBase } from "../Managers/PopUpManagerBase";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { IAllPopUpAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllPopUpAgents";

export class CommonEvents {
  protected PopHub: PopUpHub; //extends PopUpManagerBase
  protected AllPopUpAgents: IAllPopUpAgents;

  constructor(hub: PopUpHub, allPopUpAgents: IAllPopUpAgents) {
    //super(hub);
    this.PopHub = hub;
    this.AllPopUpAgents = allPopUpAgents;
  }

  protected __cleardebugText() {
    this.AllPopUpAgents.Logger.HndlrClearDebugText(this.AllPopUpAgents.Logger);
  }

  protected GoContentCommand(msgPlayload: MsgFromPopUp, targetTab: IDataBrowserTab = null) {
    return new Promise(async (resolve, reject) => {
      this.AllPopUpAgents.Logger.FuncStart(this.GoContentCommand.name);
      this.__cleardebugText();
      this.PopHub.UiMan.ClearCancelFlag();

      await this.PopHub.PopMsgMan.SendMessageToContentTab(msgPlayload, targetTab);

      this.AllPopUpAgents.Logger.FuncEnd(this.GoContentCommand.name);

      resolve();
    });
  }
}