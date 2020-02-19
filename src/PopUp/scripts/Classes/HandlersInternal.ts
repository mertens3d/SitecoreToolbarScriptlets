import { CommonEvents } from "./CommonEvents";
import { SettingKey } from "../../../Shared/scripts/Enums/SettingKey";
import { OneGenericSetting } from "../../../Shared/scripts/Classes/OneGenericSetting";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { PopUpHub } from "../Managers/PopUpHub";
import { IScMode } from "../../../Shared/scripts/Interfaces/IscMode";
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
    popHub.Log.HndlrClearDebugText(popHub.Log, true);
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
    await  popHub.LocMan.SetScMode(newMode)
      .then(() => popHub.UiMan.OnSuccessfullCommand());
    //.catch((ex) => popHub.Log.Error(popHub.EventMan.Handlers.External.SetScMode.name, ex));
  }
  ToggleAccordian(evt: any, popHub: PopUpHub, settingKey: SettingKey) {
    popHub.Log.FuncStart(this.ToggleAccordian.name);
    var srcElem: HTMLElement = <HTMLElement>(evt.target || evt.srcElement);
    var foundContentSib = popHub.UiMan.GetAccordianContentElem(srcElem);
    if (foundContentSib) {
      var oldValue: OneGenericSetting = popHub.Helpers.SettingsHelp.GetByKey(settingKey, popHub.SettingsMan.AllSettings.SettingsAr);
      if (oldValue) {
        var oldValueBool: boolean = <boolean>oldValue.ValueAsObj;
        var newVal: boolean = !oldValue;
        popHub.UiMan.SetAccordianClass(foundContentSib, newVal);
      }
      //this.PopAtticMan().UpdateAccodianState(srcElem.getAttribute('id'), newVal);

      popHub.SettingsMan.SetByKey(settingKey, newVal);
    }
    else {
      popHub.Log.Error(this.ToggleAccordian.name, 'did not find sib');
    }
    popHub.Log.FuncEnd(this.ToggleAccordian.name);
  }
}