import { MsgFlag } from "../Enum/MessageFlag";
import { PayloadDataFromPopUp } from "./PayloadDataReqPopUp";
import { IMsgFromX } from "../Interfaces/IMsgPayload";

export class MsgFromPopUp implements IMsgFromX {

  MsgFlag: MsgFlag;
  Data: PayloadDataFromPopUp;

  constructor(msgFlag: MsgFlag) {
    this.MsgFlag = msgFlag;
    this.Data = new PayloadDataFromPopUp();
  }
}