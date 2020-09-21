import { HindSiteSettingWrapper } from "../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { _UiModuleBase } from "../_UiModuleBase";
import { HindSiteSettingCheckBoxModule } from "./HindSiteSettingCheckBoxModule";
import { UiSettingBasedModuleMutationEvent_Subject } from "../../Events/UiSettingBasedModuleMutationEvent/UiSettingBasedModuleMutationEvent_Subject";

export class _SettingsBasedModulesBase extends _UiModuleBase {
  protected SettingJacket: HindSiteSettingWrapper;
  public UiSettingBasedModuleMutationEvent_Subject: UiSettingBasedModuleMutationEvent_Subject;

  constructor(logger: ILoggerAgent, hindSiteSetting: HindSiteSettingWrapper) {
    super(logger, hindSiteSetting.HindSiteSetting.UiContainerSelector);

    this.Logger.InstantiateStart(HindSiteSettingCheckBoxModule.name);

    if (!StaticHelpers.IsNullOrUndefined(hindSiteSetting)) {
      this.SettingJacket = hindSiteSetting;
      this.Friendly = HindSiteSettingCheckBoxModule.name + '-' + SettingKey[hindSiteSetting.HindSiteSetting.SettingKey];
    }
    else {
      this.Logger.ErrorAndThrow(HindSiteSettingCheckBoxModule.name, 'Null settingsAgent or null hindSiteSetting');
    }
    this.Logger.InstantiateEnd(HindSiteSettingCheckBoxModule.name);
  }

  Init_BaseSettingsBasedModule() {
    this.InitUiModuleBase();
    this.UiSettingBasedModuleMutationEvent_Subject = new UiSettingBasedModuleMutationEvent_Subject(this.Logger);

   
  }
}