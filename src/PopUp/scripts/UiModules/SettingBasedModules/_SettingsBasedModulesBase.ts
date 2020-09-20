import { HindSiteSettingCheckBoxModule } from "./HindSiteSettingCheckBoxModule";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { UiModuleMutationEvent_Subject } from "../../Events/UiModuleMutationEvent/UiModuleMutationEvent_Subject";
import { _UiModuleBase } from "../_UiModuleBase";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { HindSiteSettingWrapper } from "../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";

export class _SettingsBasedModulesBase extends _UiModuleBase {
  protected SettingWrapper: HindSiteSettingWrapper;
    public UiElementChangeEvent_Subject: UiModuleMutationEvent_Subject;

  constructor(logger: ILoggerAgent, hindSiteSetting: HindSiteSettingWrapper) {
    super(logger, hindSiteSetting.HindSiteSetting.UiContainerSelector);

        this.Logger.InstantiateStart(HindSiteSettingCheckBoxModule.name);

        if (!StaticHelpers.IsNullOrUndefined(hindSiteSetting)) {
          this.SettingWrapper = hindSiteSetting;
          this.Friendly = HindSiteSettingCheckBoxModule.name + '-' + SettingKey[hindSiteSetting.HindSiteSetting.SettingKey];
        }
        else {
            this.Logger.ErrorAndThrow(HindSiteSettingCheckBoxModule.name, 'Null settingsAgent or null hindSiteSetting');
        }
        this.Logger.InstantiateEnd(HindSiteSettingCheckBoxModule.name);
    }

    Init_BaseSettingsBasedModule() {
        this.InitUiModuleBase();
        this.UiElementChangeEvent_Subject = new UiModuleMutationEvent_Subject(this.Logger);
    }
}
