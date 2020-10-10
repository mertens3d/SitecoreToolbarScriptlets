import { HindSiteSettingWrapper } from "../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { SettingType } from "../../../../Shared/scripts/Enums/SettingType";
import { UiPresence } from "../../../../Shared/scripts/Enums/UiPresence";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { AccordianModule } from "./AccordianModule";
import { HindSiteSettingCheckBoxModule } from "./HindSiteSettingCheckBoxModule";
import { HindSiteSettingNumberModule } from "./HindSiteSettingNumberModule";
import { _SettingsBasedModulesBase } from "./_SettingsBasedModulesBase";
import { SettingKey } from "../../../../Shared/scripts/Enums/30 - SettingKey";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { _CommonBase } from "../../../../Shared/scripts/_CommonCoreBase";
import { _FrontBase } from "../../../../Shared/scripts/_HindeCoreBase";

export class SettingsBasedModules extends _FrontBase {
  private SettingsAgent: ISettingsAgent;
  CheckBoxModules: _SettingsBasedModulesBase[];
  AccordianModules: _SettingsBasedModulesBase[];
  NumberModules: _SettingsBasedModulesBase[];
  private DebuggingEnabled: boolean;

  constructor(hindeCore: IHindeCore, settingsAgent: ISettingsAgent) {
    super(hindeCore)
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
        let accordianModule = new AccordianModule(this.HindeCore, settingWrapper);
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
        let hindSiteCheckboxSetting: HindSiteSettingCheckBoxModule = new HindSiteSettingCheckBoxModule(this.HindeCore, settingWrapper)

        toReturn.push(hindSiteCheckboxSetting);
      }
    });

    return toReturn;
  }

  BuildNumberSettingModules(): HindSiteSettingNumberModule[] {
    let toReturn: HindSiteSettingNumberModule[] = [];

    this.SettingsAgent.HindSiteSettingsBucket.SettingWrappers.forEach((settingWrapper: HindSiteSettingWrapper) => {
      if (settingWrapper.HindSiteSetting.DataType === SettingType.Number && settingWrapper.HindSiteSetting.HasUi === UiPresence.HasUi) {
        let hindSiteCheckboxSetting: HindSiteSettingNumberModule = new HindSiteSettingNumberModule(this.HindeCore, settingWrapper)

        toReturn.push(hindSiteCheckboxSetting);
      }
    });

    return toReturn;
  }
}