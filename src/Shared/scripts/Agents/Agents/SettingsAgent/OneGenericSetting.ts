import { SettingKey } from "../../../Enums/SettingKey";
import { SettingType } from "../../../Enums/SettingType";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";
export class OneGenericSetting implements IOneGenericSetting {
  Friendly: string;
  DataType: SettingType;
  ValueAsObj: any;
  SettingKey: SettingKey;
  SettingFlavor: SettingFlavor;
  UiSelector: string;
  DefaultValue: any;
  constructor(settingKey: SettingKey, dataType: SettingType, valueAsObj: any, uiSelector: string, defaultValue: any, settingFlavor: SettingFlavor, friendly: string, hasUi: boolean = true) {
    this.SettingKey = settingKey;
    this.DataType = dataType;
    this.ValueAsObj = valueAsObj;
    this.UiSelector = uiSelector;
    this.DefaultValue = defaultValue;
    this.SettingFlavor = settingFlavor;
    this.Friendly = friendly;
    this.HasUi = hasUi;
  }
  HasUi: boolean;
  ValueAsInt(): number {
    var toReturn: number = parseInt(this.ValueAsObj.toString());
    console.log('ValueAsObj');
    console.log(this.ValueAsObj);
    console.log('toReturn : ' + toReturn );
    return toReturn;
  }

  //  i am passing the setting in the message so the method doesn't come along
  //i either need a helper method or need to reconstruct the instances on the content side
}