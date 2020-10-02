import { HindSiteSettingWrapper } from "../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _UiModuleBase } from "../_UiModuleBase";
import { UiSettingBasedModuleMutationEvent_Subject } from "../../Events/UiSettingBasedModuleMutationEvent/UiSettingBasedModuleMutationEvent_Subject";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";

//export namespace HindSiteUiLayer {
  export abstract class _SettingsBasedModulesBase extends _UiModuleBase implements IUiModule {
    protected SettingJacket: HindSiteSettingWrapper;
    public UiSettingBasedModuleMutationEvent_Subject: UiSettingBasedModuleMutationEvent_Subject;

    constructor(hindeCore: IHindeCore, hindSiteSetting: HindSiteSettingWrapper) {
      super(hindeCore, hindSiteSetting.HindSiteSetting.UiContainerSelector);

      this.Logger.CTORStart(_SettingsBasedModulesBase.name);

      if (!StaticHelpers.IsNullOrUndefined(hindSiteSetting)) {
        this.SettingJacket = hindSiteSetting;
        this.Friendly = _SettingsBasedModulesBase.name + '-' + SettingKey[hindSiteSetting.HindSiteSetting.SettingKey];
      }
      else {
        this.ErrorHand.ErrorAndThrow(_SettingsBasedModulesBase.name, 'Null settingsAgent or null hindSiteSetting');
      }
      this.Logger.CTOREnd(_SettingsBasedModulesBase.name);
    }

    abstract BuildHtmlForModule():void
    

    abstract Init_Module(): void

    abstract WireEvents_Module(): void

    abstract RefreshUi_Module(): void

    Init_BaseSettingsBasedModule() {
      this.Init_UiModuleBase();
      this.UiSettingBasedModuleMutationEvent_Subject = new UiSettingBasedModuleMutationEvent_Subject(this.HindeCore);
    }
  }
//}