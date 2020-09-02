import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { IContentState } from "../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { PopUpHub } from "../Managers/PopUpHub";

export class CommonEvents {
  protected PopHub: PopUpHub; 
  protected AllAgents: IAllAgents;

  constructor(hub: PopUpHub, allAgents: IAllAgents) {
    this.PopHub = hub;
    this.AllAgents = allAgents;
  }

  protected __cleardebugText() {
    this.AllAgents.Logger.HndlrClearDebugText(this.AllAgents.Logger);
  }

  protected SendContentCommand(msgPlayload: MsgFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.SendContentCommand.name);
      this.__cleardebugText();
      this.PopHub.UiMan.ClearCancelFlag();

      await this.PopHub.MessageMan.SendMessageToContent(msgPlayload)
        .then((contentState: IContentState) => {
          this.AllAgents.Logger.LogAsJsonPretty('contentState ' + this.SendContentCommand.name, contentState);
          this.PopHub.UiMan.SetContentState(contentState)
          this.PopHub.UiMan.RefreshUi();
          resolve();
        })
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.SendContentCommand.name);
    });
  }
}