import { IMsgFromX } from "../Interfaces/IMsgPayload";
//import { MsgFlag } from "../Enums/MessageFlag";
import { PayloadDataFromContent } from "./PayloadDataFromContent";
import { MsgFlag } from "../Enums/MessageFlag";


export class MsgFromContent implements IMsgFromX {
  MsgFlag: MsgFlag;
  Data: PayloadDataFromContent;


  constructor(msgFlag: MsgFlag) {
    this.MsgFlag = msgFlag;
  }

}