import { MsgFlag } from "../Enums/MessageFlag";
import { PayloadDataFromPopUp } from "./PayloadDataReqPopUp";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";

export class MsgFromPopUp extends MsgFromXBase implements IMsgFromX {
  Data: PayloadDataFromPopUp;

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
    this.Data = new PayloadDataFromPopUp();
  }
}