import { _CommonBase } from "../Shared/scripts/_CommonCoreBase";
import { IKeyPressPayload } from "../Shared/scripts/Interfaces/Agents/IKeypressPayload";
import { IUserKeyPressCombo } from "../Shared/scripts/Interfaces/Agents/IUserKeyPressCombo";
import { ICommonCore } from "../Shared/scripts/Interfaces/Agents/ICommonCore";
import { KeyBoardComboEvent_Subject } from "../Shared/scripts/Events/KeyBoardComboEvent/KeyBoardComboEvent_Subject";
import { IKeyBoardComboEvent_Payload } from "../Shared/scripts/Events/KeyBoardComboEvent/IKeyBoardComboEvent_Payload";
import { ReqCommandMsgFlag } from "../Shared/scripts/Enums/10 - MessageFlag";

export class KeyPressJacket extends _CommonBase {
  KeyPressCombos: IUserKeyPressCombo[];
  KeyBoardComboevent_Subject: KeyBoardComboEvent_Subject;

  constructor(commoncore: ICommonCore, keyPressCombos: IUserKeyPressCombo[]) {
    super(commoncore);
    this.KeyPressCombos = keyPressCombos;
    this.Instantiate();
    this.WireEvents();
  }

  private Instantiate(): void {
    this.KeyBoardComboevent_Subject = new KeyBoardComboEvent_Subject(this.CommonCore);
  }

 private  WireEvents() {
    //if (window === top) {
      window.addEventListener('keyup', ((event: KeyboardEvent) => this.CallBackOnNativeKeyPress(event)), false);
    //}
  }

  private CallBackOnNativeKeyPress(event: KeyboardEvent): void {
    let inComing: IKeyPressPayload = {
      IsShiftKey: false,
      IsAltKey: false,
      IsCtrlKey: false,
      Which: -1,
    }

    inComing.IsShiftKey = event.shiftKey;
    inComing.IsCtrlKey = event.ctrlKey;
    inComing.IsAltKey = event.altKey;
    inComing.Which = event.which;

    let matchingCombos: ReqCommandMsgFlag[] = [];

    this.KeyPressCombos.forEach((userKeyPressCombo: IUserKeyPressCombo) => {
      if ((inComing.Which === userKeyPressCombo.KeyWhich)
        && (inComing.IsCtrlKey === userKeyPressCombo.IsCtrlKey)
        && (inComing.IsAltKey === userKeyPressCombo.IsAltKey)
        && (inComing.IsShiftKey === userKeyPressCombo.IsShiftKey)) {
        matchingCombos.push(userKeyPressCombo.HotKeyCommandFlag);
      }
    });

    let keyBoardComboEvent_Payload: IKeyBoardComboEvent_Payload = {
      reqMsgFlags: matchingCombos
    }

    if (matchingCombos.length > 0) {
      this.KeyBoardComboevent_Subject.NotifyObserversAsync(keyBoardComboEvent_Payload);
    }
  }
}