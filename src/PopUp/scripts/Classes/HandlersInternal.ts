import { CommonEvents } from "./CommonEvents";
import { SettingKey } from "../../../Shared/scripts/Enums/SettingKey";
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
      .then(() => popHub.UiMan.OnSuccessfullCommand());
    //.catch((ex) => popHub.Log.Error(popHub.EventMan.Handlers.External.SetScMode.name, ex));
  }
  Toggleaccordion(evt: any, popHub: PopUpHub, settingKey: SettingKey) {
    this.AllAgents.Logger.FuncStart(this.Toggleaccordion.name);
    var srcElem: HTMLElement = <HTMLElement>(evt.target || evt.srcElement);
    var foundContentSib = popHub.UiMan.GetaccordionContentElem(srcElem);
    if (foundContentSib) {
      var oldValue: IOneGenericSetting = this.AllAgents.SettingsAgent.GetByKey(settingKey);
      if (oldValue) {
        var oldValueBool: boolean = <boolean>oldValue.ValueAsObj;
        var newVal: boolean = !oldValue;
        popHub.UiMan.SetaccordionClass(foundContentSib, newVal);
      }
      //this.PopAtticMan().UpdateAccodianState(srcElem.getAttribute('id'), newVal);

      popHub.SettingsMan.SetByKey(settingKey, newVal);
    }
    else {
      this.AllAgents.Logger.Error(this.Toggleaccordion.name, 'did not find sib');
    }
    this.AllAgents.Logger.FuncEnd(this.Toggleaccordion.name);
  }
}