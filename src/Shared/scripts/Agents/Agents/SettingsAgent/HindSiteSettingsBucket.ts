import { HindSiteSettingWrapper } from "./HindSiteSettingWrapper";
import { LoggableBase } from "../../../../../HindSiteScUiProxy/scripts/Managers/LoggableBase";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { StaticHelpers } from "../../../Classes/StaticHelpers";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { DefaultSettings } from "./DefaultSettings";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";

export class HindSiteSettingsBucket extends LoggableBase {
  SettingWrappers: HindSiteSettingWrapper[] = [];

  constructor(logger: ILoggerAgent) {
    super(logger);
    this.SettingWrappers = (new DefaultSettings(this.Logger)).GetDefaultSettingsWrapper();
  }

  GetByKey(needleSettingKey: SettingKey): HindSiteSettingWrapper {
    var toReturn: HindSiteSettingWrapper = null;

    for (var idx = 0; idx < this.SettingWrappers.length; idx++) {
      let candidate: HindSiteSettingWrapper = this.SettingWrappers[idx];
      if (candidate.HindSiteSetting.SettingKey === needleSettingKey) {
        toReturn = candidate;
        break;
      }
    }

    if (!toReturn) {
      this.Logger.ErrorAndContinue(this.GetByKey.name, 'Setting not found ' + StaticHelpers.SettingKeyAsString(needleSettingKey));
    }

    return toReturn;
  }

  GetSettingsByFlavor(targetFlavors: SettingFlavor[]): HindSiteSettingWrapper[] {
    let toReturn: HindSiteSettingWrapper[] = [];

    for (var idx = 0; idx < this.SettingWrappers.length; idx++) {
      let candidate: HindSiteSettingWrapper = this.SettingWrappers[idx];
      if (targetFlavors.indexOf(candidate.HindSiteSetting.SettingFlavor) > -1) {
        toReturn.push(candidate);
      }
    }

    return toReturn;
  }
}