import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { PopUpHub } from "../Managers/PopUpHub";
import { CommonEvents } from "./CommonEvents";
import { scMode } from "../../../Shared/scripts/Enums/scMode";
import { ICommandHndlrDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHndlrDataForPopUp";

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

  async SetScModeInternal(data: ICommandHndlrDataForPopUp): Promise<void> {
    try {
      if (data.Command.EventData.ParameterData && data.Command.EventData.ParameterData.length > 0) {
        let newMode: scMode = data.Command.EventData.ParameterData[0];

        await data.PopUpHub.TabMan.SetScMode(newMode)
          .then(() => data.PopUpHub.UiMan.ClosePopUp());
      } else {
        throw ('SetScModeInternal no parameters')
      }
    } catch (err) {
      throw (err);
    }
  }
}