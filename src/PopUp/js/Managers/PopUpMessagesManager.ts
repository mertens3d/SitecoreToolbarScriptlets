import { PopUpManagerBase } from "./PopUpManagerBase";
import { MsgFlag } from "../../../JsShared/Enum/MessageFlag";
import { IMessageManager } from "../../../JsShared/Interfaces/IMessageManager";
import { IMsgFromX } from "../../../JsShared/Interfaces/IMsgPayload";

export class PopUpMessagesManager extends PopUpManagerBase implements IMessageManager {
  ReceiveMessage(msgPayload: IMsgFromX) {
  }

  SendMessage(msgPlayload: IMsgFromX) {
  }


  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}