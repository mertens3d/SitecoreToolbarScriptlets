import { IGenericSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { IAccordianManager } from "../../../../Shared/scripts/Interfaces/Agents/IAccordianManager";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiVisibilityTestAgent } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { SettingType } from "../../../../Shared/scripts/Enums/SettingType";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { _UiModuleBase } from "../UiFeedbackModules/_UiFeedbackModuleBase";

export class SettingsModule extends _UiModuleBase implements IUiModule {
  Logger: ILoggerAgent;
  SettingsAgent: ISettingsAgent;
  AccordianManager: IAccordianManager;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, accordianManager: IAccordianManager, selector: string) {
    super(logger, selector)
    this.SettingsAgent = settingsAgent;
    this.AccordianManager = accordianManager;
  }

  Hydrate(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, currentWindowType: ScWindowType, selectSnapShotId: GuidData): void {
  }

  Init(): void {
  }

  RefreshUi(): void {
    this.Logger.FuncStart(this.RefreshUi.name);
    this.refreshUiSettings();

    this.Logger.FuncEnd(this.RefreshUi.name);
  }

  private refreshUiSettings() {
    this.Logger.FuncStart(this.refreshUiSettings.name);
    let allSettings = this.SettingsAgent.GetAllSettings();
    for (var idx = 0; idx < allSettings.length; idx++) {
      var oneSetting: IGenericSetting = allSettings[idx];
      if (oneSetting.UiSelector) {
        var foundElem: HTMLElement = document.querySelector(oneSetting.UiSelector);
        if (foundElem) {
          if (oneSetting.DataType === SettingType.BoolCheckBox) {
            let valueToDisplay: boolean = oneSetting.ValueAsBool();
            (<HTMLInputElement>foundElem).checked = valueToDisplay;
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