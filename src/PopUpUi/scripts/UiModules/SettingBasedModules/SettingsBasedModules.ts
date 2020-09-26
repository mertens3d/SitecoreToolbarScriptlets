﻿import { LoggableBase } from "../../../../Shared/scripts/LoggableBase";
import { HindSiteSettingWrapper } from "../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { SettingType } from "../../../../Shared/scripts/Enums/SettingType";
import { UiPresence } from "../../../../Shared/scripts/Enums/UiPresence";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { AccordianModule } from "./AccordianModule";
import { HindSiteSettingCheckBoxModule } from "./HindSiteSettingCheckBoxModule";
import { HindSiteSettingNumberModule } from "./HindSiteSettingNumberModule";
import { _SettingsBasedModulesBase } from "./_SettingsBasedModulesBase";

export class SettingsBasedModules extends LoggableBase {
  private SettingsAgent: ISettingsAgent;
  CheckBoxModules: _SettingsBasedModulesBase[];
  AccordianModules: _SettingsBasedModulesBase[];
  NumberModules: _SettingsBasedModulesBase[];

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent) {
    super(logger)
    this.Logger.InstantiateStart(SettingsBasedModules.name);
    this.SettingsAgent = settingsAgent;
    this.Instantiate_SettingsBasedModules();
    this.Logger.InstantiateEnd(SettingsBasedModules.name);
  }

  Instantiate_SettingsBasedModules() {
    this.Logger.FuncStart(this.Instantiate_SettingsBasedModules.name);

    this.CheckBoxModules = this.BuildCheckBoxSettingModules();
    this.NumberModules = this.BuildNumberSettingModules();
    this.AccordianModules = <_SettingsBasedModulesBase[]> this.BuildAccordianModules();

    this.Logger.FuncEnd(this.Instantiate_SettingsBasedModules.name);
  }

  BuildAccordianModules(): AccordianModule[] { //oneSetting: IHindSiteSetting, uiElem: HTMLElement
    let toReturn: AccordianModule[] = [];
    this.SettingsAgent.HindSiteSettingsBucket.SettingWrappers.forEach((hindSiteSetting: HindSiteSettingWrapper) => {
      if (hindSiteSetting.HindSiteSetting.DataType === SettingType.Accordion) {
        let newAccordianDrone = new AccordianModule(this.Logger, hindSiteSetting);

        toReturn.push(newAccordianDrone);
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