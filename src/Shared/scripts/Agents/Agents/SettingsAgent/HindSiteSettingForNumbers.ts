import { IHindSiteSettingForNumbers } from "../../../Interfaces/Agents/IGenericSetting";
import { HindSiteSetting } from "./HindSiteSetting";
import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { SettingType } from "../../../Enums/SettingType";
import { UiEnableState, UiPresence } from "../../../Enums/Enabled";
import { ModuleKey } from "../../../Enums/ModuleKey";

export class HindSiteSettingForNumbers extends HindSiteSetting implements IHindSiteSettingForNumbers {
  Max: number;
  Min: number;
  constructor(settingKey: SettingKey, dataType: SettingType, uiContainerSelector: string, defaultValue: any, settingFlavor: SettingFlavor, friendly: string, enableState: UiEnableState, hasUi: UiPresence, moduleType: ModuleKey, min: number, max: number) {
    super(settingKey, dataType, uiContainerSelector, defaultValue, settingFlavor, friendly, enableState, hasUi, moduleType)

    this.Min = min;
    this.Max = max;
  }
}