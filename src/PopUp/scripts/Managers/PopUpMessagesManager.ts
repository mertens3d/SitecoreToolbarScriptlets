import { PopUpManagerBase } from "./PopUpManagerBase";
import { IMessageManager } from "../../../Shared/Scripts/Interfaces/IMessageManager";
import { IMsgFromX } from "../../../Shared/Scripts/Interfaces/IMsgPayload";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { MessageRunner } from "../../../Shared/scripts/Classes/MsgRunner";

export class PopUpMessagesManager extends PopUpManagerBase implements IMessageManager {
  MsgRunner: MessageRunner;

  Init() {
    this.MsgRunner = new MessageRunner(this.ReceiveMessageHndlr, this.SendMessageHndlr, this.debug(), 'PopUp');
  }

  ReceiveMessageHndlr(msgPayload: IMsgFromX) {
  }

  SendMessageHndlr(msgPlayload: IMsgFromX) {
    this.debug().FuncStart(this.SendMessageHndlr.name, MsgFlag[msgPlayload.MsgFlag]);
    if (this.MsgRunner) {
      this.MsgRunner.SendMessage(msgPlayload);

    } else {
      this.debug().Error(this.SendMessageHndlr.name, 'MsgRunner does not exist ' + MsgFlag[msgPlayload.MsgFlag]);
    }
    this.debug().FuncEnd(this.SendMessageHndlr.name, MsgFlag[msgPlayload.MsgFlag]);
  }

  FromAtticDrawStorage() {
    //AtticMan().DrawStorage
  }
}