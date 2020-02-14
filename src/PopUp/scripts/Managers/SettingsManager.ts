import { PopUpManagerBase } from "./PopUpManagerBase";
import { IOneGenericSetting } from "../../../Shared/scripts/Classes/OneSetting";
import { IAllGenericSettings } from "../../../Shared/scripts/Classes/IAllSettings";
import { SettingKey } from "../../../Shared/scripts/Enums/SettingKey";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { IOneGenericSettingForStorage } from "../../../Shared/scripts/Classes/IOneGenericSettingForStorage";
import { SettingFlavor } from "../../../Shared/scripts/Enums/SettingFlavor";
import { ConstAllSettings } from "./ConstAllSettings";

export class SettingsManager extends PopUpManagerBase {
  AllSettings: IAllGenericSettings;


  async Init() {
    this.AllSettings = {
      SettingsAr: ConstAllSettings.AllSettings
    }

    await this.HarvestNonDefaultGenericSettingsFromStorage();
  }


  //take in a setting
  // if get, spit back it's value
  // if set, update the cache and write to storage

  async HarvestNonDefaultGenericSettingsFromStorage() {
    this.Log().FuncStart(this.HarvestNonDefaultGenericSettingsFromStorage.name);
    let foundSettings: IOneGenericSettingForStorage[] = await this.PopAtticMan().ReadGenericSettings();
    this.Log().LogAsJsonPretty('settings from storage', foundSettings);

    if (foundSettings) {
      for (var idx = 0; idx < foundSettings.length; idx++) {
        let storageSetting: IOneGenericSettingForStorage = foundSettings[idx];
        let matchingSetting: IOneGenericSetting = this.Helpers().SettingsHelp.GetByKey(storageSetting.SettingKey, this.AllSettings.SettingsAr);
        if (matchingSetting) {
          matchingSetting.ValueAsObj = storageSetting.ValueAsObj;
        } else {
          this.Log().Error(this.HarvestNonDefaultGenericSettingsFromStorage.name, 'matching setting not found ' + StaticHelpers.SettingKeyAsString(storageSetting.SettingKey));
        }
      }
    } else {
      this.Log().Error(this.HarvestNonDefaultGenericSettingsFromStorage.name, 'settings not found');
    }

    this.Log().FuncEnd(this.HarvestNonDefaultGenericSettingsFromStorage.name);
  }

  CreateAllSettingsDefault() {
    this.AllSettings = {
      SettingsAr: ConstAllSettings.AllSettings
    }
  }

  GetOnlyContentPrefs(): IOneGenericSetting[] {
    let toReturn: IOneGenericSetting[] = [];

    for (var idx = 0; idx < this.AllSettings.SettingsAr.length; idx++) {
      let candidate: IOneGenericSetting = this.AllSettings.SettingsAr[idx];
      if (candidate.SettingFlavor = SettingFlavor.Content) {
        toReturn.push(candidate);
      }
    }

    return toReturn;
  }
  SettingChanged(SettingKey: SettingKey, valueAsObj: any): void {
    //this.SetByKey(SettingKey, target.)
    this.Log().Log(StaticHelpers.SettingKeyAsString(SettingKey));
    this.Log().LogVal('valueAsObj', valueAsObj.toString());
    this.SetByKey(SettingKey, valueAsObj);
  }

  SetByKey(settingKey: SettingKey, value: any): void {
    this.Log().FuncStart(this.SetByKey.name, StaticHelpers.SettingKeyAsString(settingKey));
    let foundSetting = this.Helpers().SettingsHelp.GetByKey(settingKey, this.AllSettings.SettingsAr);
    if (foundSetting) {
      if (foundSetting.DefaultValue !== value) {
        foundSetting.ValueAsObj = value;
      } else {
        foundSetting.ValueAsObj = null;
      }
      //switch (foundSetting.DataType) {
      //  case SettingType.BoolCheckBox:
          
      //    break;
      //  case SettingType.Accordian:


      //  default:
      //    this.Log().Error(this.SetByKey.name, 'setting type not found');
      //    break;
      //}

      let nonDefaultSettings: IOneGenericSettingForStorage[] = [];

      for (var udx = 0; udx < this.AllSettings.SettingsAr.length; udx++) {
        if (this.AllSettings.SettingsAr[udx].ValueAsObj !== null) {
          nonDefaultSettings.push(
            {
              SettingKey: this.AllSettings.SettingsAr[udx].SettingKey,
              ValueAsObj: this.AllSettings.SettingsAr[udx].ValueAsObj,
              SettingKeyFriendly: StaticHelpers.SettingKeyAsString(this.AllSettings.SettingsAr[udx].SettingKey)
            });
        }
      }

      this.PopAtticMan().WriteGenericSettings(nonDefaultSettings);
    } else {
      this.Log().Error(this.SetByKey.name, 'setting match not found');
    }
    this.Log().FuncEnd(this.SetByKey.name, StaticHelpers.SettingKeyAsString(settingKey));
  }
}