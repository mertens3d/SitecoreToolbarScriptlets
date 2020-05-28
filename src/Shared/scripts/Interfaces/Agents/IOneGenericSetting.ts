import { SettingFlavor } from "../../Enums/SettingFlavor";
import { SettingType } from "../../Enums/SettingType";
import { SettingKey } from "../../Enums/SettingKey";

export interface IOneGenericSetting {
    DataType: SettingType;
    DefaultValue: any;
    Friendly: string;
    SettingFlavor: SettingFlavor;
    SettingKey:SettingKey;
    UiSelector: any;
    ValueAsObj: any;
}
