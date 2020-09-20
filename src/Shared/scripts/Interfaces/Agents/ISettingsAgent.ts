import { UiModulesManager } from "../../../../PopUp/scripts/Managers/UiManager/UiModulesManager";
import { HindSiteSettingsBucket } from "../../Agents/Agents/SettingsAgent/HindSiteSettingsBucket";
import { SettingKey } from "../../Enums/3xxx-SettingKey";
import { IOneGenericSettingForStorage } from "../IOneGenericSettingForStorage";
import { IHindSiteSetting } from "./IGenericSetting";
import { SettingFlavor } from "../../Enums/SettingFlavor";
import { HindSiteSettingWrapper } from "../../Agents/Agents/SettingsAgent/HindSiteSettingWrapper";


export interface ISettingsAgent {
  GetSettingsByFlavor(arg0: SettingFlavor[]): HindSiteSettingWrapper[];
  GetByKey(EnableLogging: SettingKey): IHindSiteSetting;
  IntroduceUiModulesManager(UiModulesMan: UiModulesManager);
  BooleanSettingChanged(SettingKey: SettingKey, checked: boolean);
  HindSiteSettingsBucket: HindSiteSettingsBucket;
  Init_SettingsAgent(): void;
  NumberSettingChanged(SettingKey: SettingKey, checked: number);
  ReadGenericSettingsFromStorage(): IOneGenericSettingForStorage[];
  SetByKey(settingKey: SettingKey, value: any): any;
  UpdateSettingsFromPopUpMsg(CurrentContentPrefs: IHindSiteSetting[]);
}