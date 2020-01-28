import { PopUpManagerBase } from "./PopUpManagerBase";
import { IMessageManager } from "../../../Shared/Scripts/Interfaces/IMessageManager";
import { IMsgFromX } from "../../../Shared/Scripts/Interfaces/IMsgPayload";

export class PopUpMessagesManager extends PopUpManagerBase implements IMessageManager {
  ReceiveMessage(msgPayload: IMsgFromX) {
  }

  SendMessage(msgPlayload: IMsgFromX) {
  }


  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}