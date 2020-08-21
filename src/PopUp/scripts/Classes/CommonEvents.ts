import { PopUpHub } from "../Managers/PopUpHub";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { ICurrStateContent } from "../../../Shared/scripts/Interfaces/ICurrState";

export class CommonEvents {
  protected PopHub: PopUpHub; //extends PopUpManagerBase
  protected AllAgents: IAllAgents;

  constructor(hub: PopUpHub, allAgents: IAllAgents) {
    //super(hub);
    this.PopHub = hub;
    this.AllAgents = allAgents;
  }

  protected __cleardebugText() {
    this.AllAgents.Logger.HndlrClearDebugText(this.AllAgents.Logger);
    this.AllAgents.Logger.Log('does this work?');
  }

  protected GoContentCommand(msgPlayload: MsgFromPopUp, targetTab: IDataBrowserTab = null) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.GoContentCommand.name);
      this.__cleardebugText();
      this.PopHub.UiMan.ClearCancelFlag();

      //this.AllAgents.Logger.LogAsJsonPretty("msgPayload", msgPlayload);

      await this.PopHub.MessageMan.SendMessageToContent(msgPlayload)
        .then((result: ICurrStateContent) => {
          this.PopHub.UiMan.RefreshUiFromContentState(result);
          resolve();
        })
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.GoContentCommand.name);
    });
  }
}