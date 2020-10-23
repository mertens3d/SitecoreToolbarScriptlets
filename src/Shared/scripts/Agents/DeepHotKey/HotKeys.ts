import { ReqCommandMsgFlag } from "../../Enums/10 - MessageFlag";
import { IUserKeyPressCombo } from "../../Interfaces/Agents/IUserKeyPressCombo";

export class HotKeys {
  public static AllHotKeys: IUserKeyPressCombo[] = [

    { Friendly: 'Go Selected - Ctrl+Alt+G', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.ReqGoToSelected, KeyWhich: 71 },

    { Friendly: 'Take Snap Shot - Ctrl+Alt+P', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.ReqTakeAndSaveSnapShot, KeyWhich: 80 },

    { Friendly: 'Presentation Details - Ctrl+Alt+D', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.OpenCERibbonPresentationDetails, KeyWhich: 68 },

    { Friendly: 'Navigate Links - Ctrl+Alt+L', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.OpenCERibbonNavigateLinks, KeyWhich: 76 },

    { Friendly: 'Toggle Raw Values - Ctrl+Alt+{ ([)', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.ReqToggleRawValues, KeyWhich: 219 },

    { Friendly: 'Navigate Back - Ctrl+Alt+Left Arrow,)', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.ReqNavigateBack, KeyWhich: 37 },

    { Friendly: 'Navigate Forward - Ctrl+Alt+Right Arrow', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.ReqNavigateForward, KeyWhich: 39 },

    { Friendly: 'Navigate Up - Ctrl+Alt+Up Arrow', IsAltKey: true, IsCtrlKey: true, IsShiftKey: false, HotKeyCommandFlag: ReqCommandMsgFlag.ReqNavigateUp, KeyWhich: 38 },
  ];
}