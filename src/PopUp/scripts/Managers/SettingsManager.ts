import { PopUpManagerBase } from "./PopUpManagerBase";
import { IOneSetting } from "../../../Shared/scripts/Classes/OneSetting";
export class SettingsManager extends PopUpManagerBase {
  AllSettings: IOneSetting[];

  CreateAllSettings() {
    this.AllSettings = [
      {
        SettingKey: SettingKey.ShowDebugData,
        DataType: SettingType.Bool,
        SettingAsString: '',
        UiSelector: this.PopConst().Selector.HS.iCBoxdSettingsShowDebugData,
        ValueAsBool: this.PopConst().Storage.Defaults.bool.DefaultShowDebugData,
      },
      {
        SettingKey: SettingKey.AutoSave,
        DataType: SettingType.Bool,
        SettingAsString: '',
        UiSelector: this.PopConst().Selector.HS.iCBoxdSettingsShowDebugData,
        ValueAsBool: this.PopConst().Storage.Defaults.bool.AutoSave,
      },
      {
        SettingKey: SettingKey.AutoLogin,
        DataType: SettingType.Bool,
        SettingAsString: '',
        UiSelector: this.PopConst().Selector.HS.iCBoxdSettingsAutoLogin,
        ValueAsBool: this.PopConst().Storage.Defaults.bool.AutoLogin,
      }
    ]
  }

  GetByKey(settingKey: SettingKey): IOneSetting {
    var toReturn: IOneSetting;

    return toReturn;
  }

  SetByKey(settingKey: SettingKey, value) {
  }
}