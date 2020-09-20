﻿import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { SettingType } from "../../../Enums/SettingType";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { Enabled } from "../../../Enums/Enabled";
export class HindSiteSetting implements IHindSiteSetting {
  Enabled: Enabled;
  DataType: SettingType;
  DefaultValue: any;
  FriendlySetting: string;
  SettingFlavor: SettingFlavor;
  SettingKey: SettingKey;
  UiContainerSelector: string;
  ValueAsObj: any;

  constructor(settingKey: SettingKey, dataType: SettingType, valueAsObj: any, uiContainerSelector: string, defaultValue: any, settingFlavor: SettingFlavor, friendly: string, enabled: Enabled, hasUi: boolean = true) {
    this.SettingKey = settingKey;
    this.DataType = dataType;
    this.ValueAsObj = valueAsObj;
    this.UiContainerSelector = uiContainerSelector;
    this.DefaultValue = defaultValue;
    this.SettingFlavor = settingFlavor;
    this.FriendlySetting = friendly;
    this.HasUi = hasUi;
    this.Enabled = enabled;
  }

  HasUi: boolean;

  ValueAsInt(): number {
    var toReturn: number = Number.MIN_SAFE_INTEGER;
    if (this.ValueAsObj !== undefined && this.ValueAsObj !== null) {

      toReturn = parseInt(this.ValueAsObj.toString());
    } 

    return toReturn;
  }

  ValueAsBool(): boolean {
    let toReturn: boolean = this.DefaultValue;

    if (this.ValueAsObj !== undefined && this.ValueAsObj !== null) {
      toReturn = <boolean>this.ValueAsObj;
    } else {
      toReturn = this.DefaultValue;
    }

    return toReturn;
  }
  //  i am passing the setting in the message so the method doesn't come along
  //i either need a helper method or need to reconstruct the instances on the content side
}