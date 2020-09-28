import { LoggableBase } from "../../../../Shared/scripts/LoggableBase";
import { HindSiteSettingWrapper } from "../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { SettingType } from "../../../../Shared/scripts/Enums/SettingType";
import { UiPresence } from "../../../../Shared/scripts/Enums/UiPresence";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { AccordianModule } from "./AccordianModule";
import { HindSiteSettingCheckBoxModule } from "./HindSiteSettingCheckBoxModule";
import { HindSiteSettingNumberModule } from "./HindSiteSettingNumberModule";
import { _SettingsBasedModulesBase } from "./_SettingsBasedModulesBase";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";

export class SettingsBasedModules extends LoggableBase {
  private SettingsAgent: ISettingsAgent;
  CheckBoxModules: _SettingsBasedModulesBase[];
  AccordianModules: _SettingsBasedModulesBase[];
  NumberModules: _SettingsBasedModulesBase[];
  private DebuggingEnabled: boolean;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent) {
    super(logger)
    this.Logger.CTORStart(SettingsBasedModules.name);
    this.SettingsAgent = settingsAgent;
    this.DebuggingEnabled = this.SettingsAgent.GetByKey(SettingKey.EnableDebugging).ValueAsBool();
    this.Instantiate_SettingsBasedModules();

    this.Logger.CTOREnd(SettingsBasedModules.name);
  }

  Instantiate_SettingsBasedModules() {
    this.Logger.FuncStart(this.Instantiate_SettingsBasedModules.name);

    this.CheckBoxModules = this.BuildCheckBoxSettingModules();
    this.NumberModules = this.BuildNumberSettingModules();
    this.AccordianModules = <_SettingsBasedModulesBase[]>this.BuildAccordianModules();

    this.Logger.FuncEnd(this.Instantiate_SettingsBasedModules.name);
  }

  BuildAccordianModules(): AccordianModule[] { //oneSetting: IHindSiteSetting, uiElem: HTMLElement
    let toReturn: AccordianModule[] = [];

    this.SettingsAgent.HindSiteSettingsBucket.SettingWrappers.forEach((settingWrapper: HindSiteSettingWrapper) => {
      let isNormalAccordian: boolean = settingWrapper.HindSiteSetting.ModuleType === ModuleKey.AccordionTypical;
      let isDebuggingAccordian: boolean = settingWrapper.HindSiteSetting.ModuleType === ModuleKey.AccordionDebugging;

      if (isNormalAccordian || isDebuggingAccordian) {
        let accordianModule = new AccordianModule(this.Logger, settingWrapper);
        toReturn.push(accordianModule);

        if (isNormalAccordian || (isDebuggingAccordian && this.DebuggingEnabled)) {
        } else {
          accordianModule.DisableSelf();
        }
      }
    });

    return toReturn;
  }

  BuildCheckBoxSettingModules(): HindSiteSettingCheckBoxModule[] {
    let toReturn: HindSiteSettingCheckBoxModule[] = [];

    this.SettingsAgent.HindSiteSettingsBucket.SettingWrappers.forEach((settingWrapper: HindSiteSettingWrapper) => {
      if (settingWrapper.HindSiteSetting.DataType === SettingType.BoolCheckBox && settingWrapper.HindSiteSetting.HasUi === UiPresence.HasUi) {
        let hindSiteCheckboxSetting: HindSiteSettingCheckBoxModule = new HindSiteSettingCheckBoxModule(this.Logger, settingWrapper)

        toReturn.push(hindSiteCheckboxSetting);
      }
    });

    return toReturn;
  }

  BuildNumberSettingModules(): HindSiteSettingNumberModule[] {
    let toReturn: HindSiteSettingNumberModule[] = [];

    this.SettingsAgent.HindSiteSettingsBucket.SettingWrappers.forEach((settingWrapper: HindSiteSettingWrapper) => {
      if (settingWrapper.HindSiteSetting.DataType === SettingType.Number && settingWrapper.HindSiteSetting.HasUi === UiPresence.HasUi) {
        let hindSiteCheckboxSetting: HindSiteSettingNumberModule = new HindSiteSettingNumberModule(this.Logger, settingWrapper)

        toReturn.push(hindSiteCheckboxSetting);
      }
    });

    return toReturn;
  }
}