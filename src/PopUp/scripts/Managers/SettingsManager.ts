import { PopUpManagerBase } from "./PopUpManagerBase";
import { OneGenericSetting } from "../../../Shared/scripts/Classes/OneGenericSetting";
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
      SettingsAr: new ConstAllSettings().AllSettings
    }

    await this.HarvestNonDefaultGenericSettingsFromStorage();
  }

  
  //take in a setting
  // if get, spit back it's value
  // if set, update the cache and write to storage

  async HarvestNonDefaultGenericSettingsFromStorage() {
    this.AllPopUpAgents.Logger.FuncStart(this.HarvestNonDefaultGenericSettingsFromStorage.name);
    let foundSettings: IOneGenericSettingForStorage[];

    try {
    foundSettings = await this.PopAtticMan().ReadGenericSettings();

    } catch (e) {
      this.AllPopUpAgents.Logger.Error(this.HarvestNonDefaultGenericSettingsFromStorage.name, e.toString());
    }


    this.AllPopUpAgents.Logger.LogAsJsonPretty('settings from storage', foundSettings);

    if (foundSettings) {
      for (var idx = 0; idx < foundSettings.length; idx++) {
        let storageSetting: IOneGenericSettingForStorage = foundSettings[idx];
        this.AllPopUpAgents.Logger.LogVal('setting key', storageSetting.SettingKeyFriendly);
        let matchingSetting: OneGenericSetting = this.Helpers().SettingsHelp.GetByKey(storageSetting.SettingKey, this.AllSettings.SettingsAr);
        if (matchingSetting) {
          matchingSetting.ValueAsObj = storageSetting.ValueAsObj;
        } else {
          this.AllPopUpAgents.Logger.Error(this.HarvestNonDefaultGenericSettingsFromStorage.name, 'matching setting not found ' + StaticHelpers.SettingKeyAsString(storageSetting.SettingKey));
        }
      }
    } else {
      this.AllPopUpAgents.Logger.Error(this.HarvestNonDefaultGenericSettingsFromStorage.name, 'settings not found');
    }

    this.AllPopUpAgents.Logger.FuncEnd(this.HarvestNonDefaultGenericSettingsFromStorage.name);
  }



  GetOnlyContentPrefs(): OneGenericSetting[] {
    let toReturn: OneGenericSetting[] = [];

    for (var idx = 0; idx < this.AllSettings.SettingsAr.length; idx++) {
      let candidate: OneGenericSetting = this.AllSettings.SettingsAr[idx];
      if (candidate.SettingFlavor === SettingFlavor.ContentAndPopUp) {
        toReturn.push(candidate);
      }
    }

    return toReturn;
  }
  SettingChanged(SettingKey: SettingKey, valueAsObj: any): void {
    //this.SetByKey(SettingKey, target.)
    this.AllPopUpAgents.Logger.Log(StaticHelpers.SettingKeyAsString(SettingKey));
    this.AllPopUpAgents.Logger.LogVal('valueAsObj', valueAsObj.toString());
    this.SetByKey(SettingKey, valueAsObj);
  }

  GetByKey(settingKey: SettingKey): OneGenericSetting {
    let foundSetting = this.Helpers().SettingsHelp.GetByKey(settingKey, this.AllSettings.SettingsAr);
    console.log(foundSetting.Friendly);
    return foundSetting;
  }


  SetByKey(settingKey: SettingKey, value: any): void {
    this.AllPopUpAgents.Logger.FuncStart(this.SetByKey.name, StaticHelpers.SettingKeyAsString(settingKey));
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
      //    this.AllPopUpAgents.Logger.Error(this.SetByKey.name, 'setting type not found');
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
      this.AllPopUpAgents.Logger.Error(this.SetByKey.name, 'setting match not found');
    }
    this.AllPopUpAgents.Logger.FuncEnd(this.SetByKey.name, StaticHelpers.SettingKeyAsString(settingKey));
  }
}