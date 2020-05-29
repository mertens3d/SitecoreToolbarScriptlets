import { SettingKey } from "../../../Enums/SettingKey";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";
export class SettingsAgent implements ISettingsAgent {

  private SettingAr: IOneGenericSetting[];

  SetContentSettings(currentContentPrefs: IOneGenericSetting[]) {
    this.SettingAr = currentContentPrefs;
  }


  GetByKey(settingKey: SettingKey): IOneGenericSetting {
    var toReturn: IOneGenericSetting;

    for (var idx = 0; idx < this.SettingAr.length; idx++) {
      if (this.SettingAr[idx].SettingKey === settingKey) {
        toReturn = this.SettingAr[idx];
        break;
      }
    }
    return toReturn;
  }

   ValueAsInteger(setting: IOneGenericSetting): number {
    let toReturn: number = 0;
    if (setting) {
      toReturn = <number>setting.ValueAsObj;
    }
    return toReturn;
  }

   ValueAsBool(setting: IOneGenericSetting): boolean {
    let toReturn: boolean = false;
    if (setting) {
      toReturn = <boolean>setting.ValueAsObj;
    }
    return toReturn;
  }
}
