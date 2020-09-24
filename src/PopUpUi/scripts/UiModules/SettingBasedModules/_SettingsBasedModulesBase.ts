﻿import { HindSiteSettingWrapper } from "../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { _UiModuleBase } from "../_UiModuleBase";
import { HindSiteSettingCheckBoxModule } from "./HindSiteSettingCheckBoxModule";
import { UiSettingBasedModuleMutationEvent_Subject } from "../../Events/UiSettingBasedModuleMutationEvent/UiSettingBasedModuleMutationEvent_Subject";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";

export abstract class _SettingsBasedModulesBase extends _UiModuleBase implements IUiModule {
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

  abstract Init(): void

  abstract WireEvents_Module(): void

  abstract RefreshUi(): void

  Init_BaseSettingsBasedModule() {
    this.Init_UiModuleBase();
    this.UiSettingBasedModuleMutationEvent_Subject = new UiSettingBasedModuleMutationEvent_Subject(this.Logger);
  }
}