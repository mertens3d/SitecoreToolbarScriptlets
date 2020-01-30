import { PopUpManagerBase } from "./PopUpManagerBase";
import { IMessageManager } from "../../../Shared/Scripts/Interfaces/IMessageManager";
import { IMsgFromX } from "../../../Shared/Scripts/Interfaces/IMsgPayload";
import { MsgFlag } from "../../../Shared/scripts/Enums/MessageFlag";
import { MessageRunner } from "../../../Shared/scripts/Classes/MsgRunner";

export class PopUpMessagesManager extends PopUpManagerBase implements IMessageManager {
  MsgRunner: MessageRunner;

  Init() {
    var self = this;
    this.MsgRunner = new MessageRunner(
      (msgPayload: IMsgFromX) => { self.ReceiveMessageHndlr(msgPayload)},
       self.SendMessageHndlr, self.debug(), 'PopUp');
  }

  ReceiveMessageHndlr(msgPayload: IMsgFromX) {
    
    this.debug().FuncStart(this.ReceiveMessageHndlr.name, msgPayload.FlagAsString);

    
    this.debug().LogVal('greeting', msgPayload.greeting);


    this.debug().FuncEnd(this.ReceiveMessageHndlr.name, msgPayload.FlagAsString);
  }

  SendMessageHndlr(msgPlayload: IMsgFromX) {
    this.debug().FuncStart(this.SendMessageHndlr.name, MsgFlag[msgPlayload.MsgFlag]);
    if (this.MsgRunner) {
      msgPlayload.greeting = 'this is the greeting from the popup handler';
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