import { SettingType } from "../../../../../../Shared/scripts/Enums/SettingType";
import { IAccordianManager } from "../../../../../../Shared/scripts/Interfaces/Agents/IAccordianManager";
import { ILoggerAgent } from "../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IGenericSetting } from "../../../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { ISettingsAgent } from "../../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IUiModule } from "../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { StaticHelpers } from "../../../../../../Shared/scripts/Classes/StaticHelpers";

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
    this.refreshUiSettings();

    this.Logger.FuncEnd(this.RefreshUi.name);
  }

  private refreshUiSettings() {
    this.Logger.FuncStart(this.refreshUiSettings.name);
    let allSettings = this.SettingsAgent.GetAllSettings();
    for (var idx = 0; idx < allSettings.length; idx++) {
      var oneSetting: IGenericSetting = allSettings[idx];
      this.Logger.LogVal('setting', StaticHelpers.SettingKeyAsString(oneSetting.SettingKey));
      if (oneSetting.UiSelector) {
        var foundElem: HTMLElement = document.querySelector(oneSetting.UiSelector);
        if (foundElem) {

          if (oneSetting.DataType === SettingType.BoolCheckBox) {
            let valueToDisplay: boolean = oneSetting.ValueAsBool();
            (<HTMLInputElement>foundElem).checked = valueToDisplay;
            this.Logger.LogVal('Setting to', valueToDisplay);
          } else if (oneSetting.DataType === SettingType.Accordion) {
            this.AccordianManager.RestoreAccordionState(oneSetting);
          } else if (oneSetting.DataType == SettingType.Number) {
            let valueToDisplay: number = oneSetting.ValueAsInt();
            (<HTMLInputElement>foundElem).value = valueToDisplay.toString();
          }
        } else {
          this.Logger.LogAsJsonPretty('oneSetting', oneSetting);
          this.Logger.ErrorAndThrow(this.RefreshUi.name, 'ui element not found: ' + oneSetting.UiSelector);
        }
      }
    }
    this.Logger.FuncEnd(this.refreshUiSettings.name);
  }
}