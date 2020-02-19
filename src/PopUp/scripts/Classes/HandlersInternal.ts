import { CommonEvents } from "./CommonEvents";
import { SettingKey } from "../../../Shared/scripts/Enums/SettingKey";
import { OneGenericSetting } from "../../../Shared/scripts/Classes/OneGenericSetting";
export class HandlersInternal extends CommonEvents {
  HndlrSelectChange(evt: any) {
    this.PopHub.UiMan.SelectChanged();
  }
  //__showDebugButtonClicked(evt: MouseEvent) {
  //    this.__initNewOperation();
  //    this.Log().FuncStart(this.__showDebugButtonClicked.name);
  //    this.Log().FuncEnd(this.__showDebugButtonClicked.name);
  //}
  __cleardebugTextWithConfirm() {
    this.Log().HndlrClearDebugText(this.Log(), true);
  }
  GenericSettingChanged() {
  }
  CloseWindow(evt: MouseEvent) {
    window.close();
  }
  __toggleAccordian(evt: MouseEvent, settingKey: SettingKey) {
    this.Log().FuncStart(this.__toggleAccordian.name);
    var srcElem: HTMLElement = <HTMLElement>(evt.target || evt.srcElement);
    var foundContentSib = this.UiMan().GetAccordianContentElem(srcElem);
    if (foundContentSib) {
      var oldValue: OneGenericSetting = this.Helpers().SettingsHelp.GetByKey(settingKey, this.SettingsMan().AllSettings.SettingsAr);
      if (oldValue) {
        var oldValueBool: boolean = <boolean>oldValue.ValueAsObj;
        var newVal: boolean = !oldValue;
        this.UiMan().SetAccordianClass(foundContentSib, newVal);
      }
      //this.PopAtticMan().UpdateAccodianState(srcElem.getAttribute('id'), newVal);

      this.SettingsMan().SetByKey(settingKey, newVal);
    }
    else {
      this.Log().Error(this.__toggleAccordian.name, 'did not find sib');
    }
    this.Log().FuncEnd(this.__toggleAccordian.name);
  }
}