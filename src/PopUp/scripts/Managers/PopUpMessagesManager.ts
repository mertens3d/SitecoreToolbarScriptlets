import { PopUpManagerBase } from "./PopUpManagerBase";
import { IMessageManager } from "../../../Shared/Scripts/Interfaces/IMessageManager";
import { IMsgFromX } from "../../../Shared/Scripts/Interfaces/IMsgPayload";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";

export class PopUpMessagesManager extends PopUpManagerBase implements IMessageManager {
  ReceiveMessage(msgPayload: IMsgFromX) {
  }

  SendMessage(msgPlayload: IMsgFromX) {
    this.debug().LogVal('Sending Message', MsgFlag[ msgPlayload.MsgFlag])
  }


  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}