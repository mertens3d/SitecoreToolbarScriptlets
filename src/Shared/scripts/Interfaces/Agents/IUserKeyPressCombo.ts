import { ReqCommandMsgFlag } from "../../Enums/10 - MessageFlag";

export interface IUserKeyPressCombo {
  Friendly: String
  HotKeyCommandFlag: ReqCommandMsgFlag;
  KeyWhich: number;
  IsCtrlKey: boolean;
  IsAltKey: boolean;
  IsShiftKey: boolean;
}