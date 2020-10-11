import { HotKeyCommandFlag } from "../../Enums/KeyPressComboFlag";

export interface IUserKeyPressCombo {
  HotKeyCommandFlag: HotKeyCommandFlag;
  KeyWhich: number;
  IsCtrlKey: boolean;
  IsAltKey: boolean;
  IsShiftKey: boolean;
}