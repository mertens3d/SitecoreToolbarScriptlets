import { HelperBase } from "../Classes/HelperBase";
import { SettingKey } from "../Enums/SettingKey";
import { OneGenericSetting } from "../Classes/OneGenericSetting";
export class SettingsHelper extends HelperBase {


  GetByKey(settingKey: SettingKey, settingAr: OneGenericSetting[]): OneGenericSetting {
    var toReturn: OneGenericSetting;

    for (var idx = 0; idx < settingAr.length; idx++) {
      if (settingAr[idx].SettingKey === settingKey) {
        toReturn = settingAr[idx];
        break;
      }
    }
    return toReturn;
  }

  static ValueAsInteger(setting: OneGenericSetting): number {
    let toReturn: number = 0;
    if (setting) {
      toReturn = <number>setting.ValueAsObj;
    }
    return toReturn;
  }

  static ValueAsBool(setting: OneGenericSetting): boolean {
    let toReturn: boolean = false;
    if (setting) {
      toReturn = <boolean>setting.ValueAsObj;
    }
    return toReturn;
  }
}
