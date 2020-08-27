import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IScMode } from "../../../Shared/scripts/Interfaces/IscMode";
import { PopUpHub } from "../Managers/PopUpHub";
import { CommonEvents } from "./CommonEvents";
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
    popHub.LocMan.ChangeLocationSwitchBoard(scWindowType.ContentEditor);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqOpenCE, this.PopHub));
  }
  GoDesktopInternal(evt: any, popHub: PopUpHub) {
    popHub.LocMan.ChangeLocationSwitchBoard(scWindowType.Desktop);
    //this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqGoDesktop, this.PopHub))
  }
  async SetScModeInternal(evt: MouseEvent, popHub: PopUpHub, parameters: any[]) {
    let newMode: IScMode = parameters[0];
    await popHub.LocMan.SetScMode(newMode)
      .then(() => popHub.UiMan.ClosePopUp());
    //.catch((ex) => popHub.Log.Error(popHub.EventMan.Handlers.External.SetScMode.name, ex));
  }
}