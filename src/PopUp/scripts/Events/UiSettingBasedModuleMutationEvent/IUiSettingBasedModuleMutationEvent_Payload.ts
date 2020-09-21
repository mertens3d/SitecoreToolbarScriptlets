import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";

export interface IUiSettingBasedModuleMutationEven_Payload {
  ModuleKey: ModuleKey,
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