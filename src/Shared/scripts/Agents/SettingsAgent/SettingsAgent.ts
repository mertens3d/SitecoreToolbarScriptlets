import { SettingKey } from "../../Enums/SettingKey";
import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IOneGenericSetting } from "../../Interfaces/Agents/IOneGenericSetting";
export class SettingsAgent implements ISettingsAgent {


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

  static ValueAsInteger(setting: IOneGenericSetting): number {
    let toReturn: number = 0;
    if (setting) {
      toReturn = <number>setting.ValueAsObj;
    }
    return toReturn;
  }

  static ValueAsBool(setting: IOneGenericSetting): boolean {
    let toReturn: boolean = false;
    if (setting) {
      toReturn = <boolean>setting.ValueAsObj;
    }
    return toReturn;
  }
}
