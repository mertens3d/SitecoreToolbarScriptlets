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
        UiSelector: this.Const().Selector.HS.iCBoxdSettingsShowDebugData,
        ValueAsBool: this.Const().Storage.Defaults.bool.DefaultShowDebugData,
      },
      {
        SettingKey: SettingKey.AutoSave,
        DataType: SettingType.Bool,
        SettingAsString: '',
        UiSelector: this.Const().Selector.HS.iCBoxdSettingsShowDebugData,
        ValueAsBool: this.Const().Storage.Defaults.bool.AutoSave,
      },
      {
        SettingKey: SettingKey.AutoLogin,
        DataType: SettingType.Bool,
        SettingAsString: '',
        UiSelector: this.Const().Selector.HS.iCBoxdSettingsAutoLogin,
        ValueAsBool: this.Const().Storage.Defaults.bool.AutoLogin,
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