import { MsgFlag } from "../Enums/MessageFlag";

export class MsgFromXBase {
  MsgFlag: MsgFlag = MsgFlag.Unknown;


  constructor(msgFlag: MsgFlag) {
    this.MsgFlag = msgFlag;
  }
}