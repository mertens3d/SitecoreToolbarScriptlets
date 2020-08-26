import { SettingType } from "../../../../../../Shared/scripts/Enums/SettingType";
import { IAccordianManager } from "../../../../../../Shared/scripts/Interfaces/Agents/IAccordianManager";
import { ILoggerAgent } from "../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IOneGenericSetting } from "../../../../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting";
import { ISettingsAgent } from "../../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IUiModule } from "../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";

export class SettingsModule implements IUiModule {
  Logger: ILoggerAgent;
  SettingsAgent: ISettingsAgent;
  AccordianManager: IAccordianManager;
  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, accordianManager: IAccordianManager) {
    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.AccordianManager = accordianManager;
  }
  Init(): void {
  }

  RefreshUi() {
    this.Logger.FuncStart(this.RefreshUi.name);
    for (var idx = 0; idx < this.SettingsAgent.SettingsAr.length; idx++) {
      var oneSetting: IOneGenericSetting = this.SettingsAgent.SettingsAr[idx];
      //this.Logger.LogVal('setting', StaticHelpers.SettingKeyAsString(oneSetting.SettingKey));
      if (oneSetting.UiSelector) {
        var foundElem: HTMLElement = document.querySelector(oneSetting.UiSelector);
        if (foundElem) {
          if (oneSetting.DataType === SettingType.BoolCheckBox) {
            let valueToDisplay: boolean = <boolean>(oneSetting.ValueAsObj || oneSetting.DefaultValue);
            (<HTMLInputElement>foundElem).checked = valueToDisplay;
          }
          if (oneSetting.DataType === SettingType.Accordion) {
            this.AccordianManager.RestoreAccordionState(oneSetting);
          }
        } else {
          this.Logger.LogAsJsonPretty('oneSetting', oneSetting);
          this.Logger.ErrorAndThrow(this.RefreshUi.name, 'ui element not found: ' + oneSetting.UiSelector);
        }
      }
    }
    this.Logger.FuncEnd(this.RefreshUi.name);
  }
}