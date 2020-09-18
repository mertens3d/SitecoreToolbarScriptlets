import { SettingType } from "../../../../Shared/scripts/Enums/SettingType";
import { IAccordianManager } from "../../../../Shared/scripts/Interfaces/Agents/IAccordianManager";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiModuleBase } from "../UiFeedbackModules/_UiFeedbackModuleBase";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { SettingFlavor } from "../../../../Shared/scripts/Enums/SettingFlavor";
import { HindSiteSettingCheckBoxModule } from "./HindSiteSettingCheckBoxModule";

export class SettingsBucketModule extends _UiModuleBase implements IUiModule {
  Logger: ILoggerAgent;
  SettingsAgent: ISettingsAgent;
  AccordianManager: IAccordianManager;
  ModuleKey = ModuleKey.Settings;
  CheckBoxModulesBucket: HindSiteSettingCheckBoxModule[];

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, accordianManager: IAccordianManager, selector: string) {
    super(logger, selector)
    this.SettingsAgent = settingsAgent;
    this.AccordianManager = accordianManager;

    this.CheckBoxModulesBucket = this.BuildCheckBoxSettingModules();
  }

  Init(): void {


  }

  RefreshUi(): void {
    this.Logger.FuncStart(this.RefreshUi.name);
    this.refreshUiSettings();

    this.Logger.FuncEnd(this.RefreshUi.name);
  }

  BuildCheckBoxSettingModules(): HindSiteSettingCheckBoxModule[] {
    let toReturn: HindSiteSettingCheckBoxModule[] = [];

    this.SettingsAgent.HindSiteSettings().forEach((hindSiteSetting: IHindSiteSetting) => {
      if (hindSiteSetting.DataType === SettingType.BoolCheckBox) {
        let hindSiteCheckboxSetting: HindSiteSettingCheckBoxModule = new HindSiteSettingCheckBoxModule(this.Logger, this.SettingsAgent, hindSiteSetting)

        toReturn.push(hindSiteCheckboxSetting);
      }
    });

    return toReturn;
  }

  private refreshUiSettings() {
    this.Logger.FuncStart(this.refreshUiSettings.name);
    let allSettings = this.SettingsAgent.HindSiteSettings();
    for (var idx = 0; idx < allSettings.length; idx++) {
      var oneSetting: IHindSiteSetting = allSettings[idx];
      if (oneSetting.UiSelector) {
        var foundElem: HTMLElement = document.querySelector(oneSetting.UiSelector);
        if (foundElem) {
          if (oneSetting.DataType === SettingType.BoolCheckBox) {
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