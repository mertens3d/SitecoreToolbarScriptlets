import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { SettingKey } from "../../../../Shared/scripts/Enums/30 - SettingKey";
import { HindSiteSetting } from "../../../../Shared/scripts/Agents/SettingsAgent/HindSiteSetting";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";

export interface IUiSettingBasedModuleMutationEven_Payload {
  ModuleKey: ModuleKey,
  HindSiteSetting: IHindSiteSetting,
  CheckBoxModule: {
    Checked: boolean,
    SettingKey: SettingKey,
  },
  NumberModule: {
    NumberValue: number,
  },
  AccordianModule: {
    NewVal: boolean
  }
}