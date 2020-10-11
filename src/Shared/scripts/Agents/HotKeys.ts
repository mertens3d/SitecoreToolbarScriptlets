import { ReqCommandMsgFlag } from "../Enums/10 - MessageFlag";
import { IUserKeyPressCombo } from "../Interfaces/Agents/IUserKeyPressCombo";

export class HotKeys {
  public static AllHotKeys: IUserKeyPressCombo[] = [
    { Friendly: 'CtrlAltG', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.ReqTakeSnapShot, KeyWhich: 71 }
  ];
}