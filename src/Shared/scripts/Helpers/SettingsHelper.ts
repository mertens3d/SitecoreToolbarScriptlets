import { HelperBase } from "../Classes/HelperBase";
import { SettingKey } from "../Enums/SettingKey";
import { OneGenericSetting } from "../Classes/OneGenericSetting";
import { StaticHelpers } from "../Classes/StaticHelpers";
export class SettingsHelper extends HelperBase {

  GetByKey(settingKey: SettingKey, settingAr: OneGenericSetting[]): OneGenericSetting {
    var toReturn: OneGenericSetting;

    for (var idx = 0; idx < settingAr.length; idx++) {
      if (settingAr[idx].SettingKey === settingKey) {
        toReturn = settingAr[idx];
        console.log('found it ' + StaticHelpers.SettingKeyAsString(settingKey));
        break;
      }
    }
    return toReturn;
  }
  static ValueAsBool(setting: OneGenericSetting): boolean {
    let toReturn: boolean = false;
    if (setting) {
      toReturn = <boolean>setting.ValueAsObj;
    }
    else {
      console.log('no value as obj');
    }
    console.log('returning ' + toReturn);
    return toReturn;
  }
}
