import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFlag } from "../Enum/MessageFlag";
import { PayloadDataFromContent } from "./PayloadDataFromContent";


export class MsgFromContent implements IMsgFromX {
  MsgFlag: MsgFlag;
  Data: PayloadDataFromContent;


  constructor(msgFlag: MsgFlag) {
    this.MsgFlag = msgFlag;
  }

}