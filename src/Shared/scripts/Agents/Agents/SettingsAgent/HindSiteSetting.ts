import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { SettingType } from "../../../Enums/SettingType";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { UiEnableState } from "../../../Enums/Enabled";
import { UiPresence } from "../../../Enums/UiPresence";
import { ModuleKey } from "../../../Enums/ModuleKey";

export class HindSiteSetting implements IHindSiteSetting {
  EnabledState: UiEnableState;
  DataType: SettingType;
  DefaultValue: any;
  FriendlySetting: string;
  SettingFlavor: SettingFlavor;
  SettingKey: SettingKey;
  UiContainerSelector: string;
  ValueAsObj: any;
  HasUi: UiPresence;
  ModuleType: ModuleKey;

  constructor(settingKey: SettingKey, dataType: SettingType, uiContainerSelector: string, defaultValue: any, settingFlavor: SettingFlavor, friendly: string, enableState: UiEnableState, hasUi: UiPresence, moduleType: ModuleKey) {
    this.SettingKey = settingKey;
    this.DataType = dataType;
    this.ValueAsObj = defaultValue;
    this.UiContainerSelector = uiContainerSelector;
    this.DefaultValue = defaultValue;
    this.SettingFlavor = settingFlavor;
    this.FriendlySetting = friendly;
    this.HasUi = hasUi;
    this.EnabledState = enableState;
    this.ModuleType = moduleType;
  }

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