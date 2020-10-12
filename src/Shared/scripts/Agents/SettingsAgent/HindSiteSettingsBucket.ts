import { StaticHelpers } from "../../Classes/StaticHelpers";
import { SettingKey } from "../../Enums/30 - SettingKey";
import { SettingFlavor } from "../../Enums/SettingFlavor";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { _CommonBase } from "../../_CommonCoreBase";
import { DefaultSettings } from "./DefaultSettings";
import { HindSiteSettingWrapper } from "./HindSiteSettingWrapper";

export class HindSiteSettingsBucket extends _CommonBase {
  SettingWrappers: HindSiteSettingWrapper[] = [];

  constructor(hindeCore: ICommonCore) {
    super(hindeCore);
    this.SettingWrappers = (new DefaultSettings(this.CommonCore)).GetDefaultSettingsWrapper();
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
      this.ErrorHand.ErrorAndContinue(this.GetByKey.name, 'Setting not found ' + StaticHelpers.SettingKeyAsString(needleSettingKey));
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