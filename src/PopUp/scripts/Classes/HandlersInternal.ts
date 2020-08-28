import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { PopUpHub } from "../Managers/PopUpHub";
import { CommonEvents } from "./CommonEvents";
import { scMode } from "../../../Shared/scripts/Enums/scMode";
export class HandlersInternal extends CommonEvents {

  __cleardebugTextWithConfirm(evt: any, popHub: PopUpHub) {
    this.AllAgents.Logger.HndlrClearDebugText(this.AllAgents.Logger, true);
  }
  GenericSettingChanged() {
  }
  CloseWindow(evt: any, popHub: PopUpHub) {
    window.close();
  }
  async GoCeInternal(evt: any, popHub: PopUpHub) {
    popHub.TabMan.ChangeLocationSwitchBoard(scWindowType.ContentEditor);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqOpenCE, this.PopHub));
  }
  GoDesktopInternal(evt: any, popHub: PopUpHub) {
    popHub.TabMan.ChangeLocationSwitchBoard(scWindowType.Desktop);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqGoDesktop, this.PopHub))
  }
  async SetScModeInternal(evt: MouseEvent, popHub: PopUpHub, parameters: any[]) {
    let newMode: scMode = parameters[0];
    await popHub.TabMan.SetScMode(newMode)
      .then(() => popHub.UiMan.ClosePopUp());
    //.catch((ex) => popHub.Log.Error(popHub.EventMan.Handlers.External.SetScMode.name, ex));
  }
}