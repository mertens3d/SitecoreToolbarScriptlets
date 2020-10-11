import { ReqCommandMsgFlag } from "../../Enums/10 - MessageFlag";

export interface IUserKeyPressCombo {
  HotKeyCommandFlag: ReqCommandMsgFlag;
  KeyWhich: number;
  IsCtrlKey: boolean;
  IsAltKey: boolean;
  IsShiftKey: boolean;
}