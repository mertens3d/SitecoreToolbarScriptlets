import { CommonEvents } from "./CommonEvents";
import { SettingKey } from "../../../Shared/scripts/Enums/3xxx-SettingKey";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { PopUpHub } from "../Managers/PopUpHub";
import { IScMode } from "../../../Shared/scripts/Interfaces/IscMode";
import { IOneGenericSetting } from "../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting";
export class HandlersInternal extends CommonEvents {
  HndlrSelectChange(evt: any, popHub: PopUpHub) {
    this.PopHub.UiMan.SelectChanged();
  }
  //__showDebugButtonClicked(evt: MouseEvent) {
  //    this.__initNewOperation();
  //    popHub.Log.FuncStart(this.__showDebugButtonClicked.name);
  //    popHub.Log.FuncEnd(this.__showDebugButtonClicked.name);
  //}
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