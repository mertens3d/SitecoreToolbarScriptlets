import { PopUpHub } from "../Managers/PopUpHub";
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { IContentState } from "../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { DefaultContentState } from "../../../Shared/scripts/Classes/DefaultContentState";
import { ContentStateValidator } from "../../../Shared/scripts/Classes/ContentStateValidator";

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
  }

  protected GoContentCommand(msgPlayload: MsgFromPopUp, targetTab: IDataBrowserTab = null) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.GoContentCommand.name);
      this.__cleardebugText();
      this.PopHub.UiMan.ClearCancelFlag();

      //this.AllAgents.Logger.LogAsJsonPretty("msgPayload", msgPlayload);

      await this.PopHub.MessageMan.SendMessageToContent(msgPlayload)
        .then((contentState: IContentState) => {
          this.AllAgents.Logger.LogAsJsonPretty('contentState ' + this.GoContentCommand.name, contentState);
          this.PopHub.UiMan.SetContentState(contentState)
          this.PopHub.UiMan.RefreshUi();
          resolve();
        })
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.GoContentCommand.name);
    });
  }

  

}