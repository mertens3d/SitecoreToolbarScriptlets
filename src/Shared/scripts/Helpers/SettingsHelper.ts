import { HelperBase } from "../Classes/HelperBase";
import { SettingKey } from "../Enums/SettingKey";
import { IOneGenericSetting } from "../Classes/OneSetting";
export class SettingsHelper extends HelperBase {

  GetByKey(settingKey: SettingKey, settingAr: IOneGenericSetting[]): IOneGenericSetting {
    var toReturn: IOneGenericSetting;

    for (var idx = 0; idx < settingAr.length; idx++) {
      if (settingAr[idx].SettingKey === settingKey) {
        toReturn = settingAr[idx];
        break;
      }
    }
    return toReturn;
  }
}
