import { ReqCommandMsgFlag } from "../Enums/10 - MessageFlag";
import { IUserKeyPressCombo } from "../Interfaces/Agents/IUserKeyPressCombo";

export class HotKeys {
  public static AllHotKeys: IUserKeyPressCombo[] = [
    { Friendly: 'Take Snap Shot - Ctrl+Alt+G', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.ReqTakeSnapShot, KeyWhich: 71 },
    { Friendly: 'Presentation Details - Ctrl+Alt+D', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.ReqOpenPresentationDetails, KeyWhich: 68 },
  ];
}