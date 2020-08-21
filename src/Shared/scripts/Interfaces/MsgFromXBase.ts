import { MsgFlag } from "../Enums/1xxx-MessageFlag";

export class MsgFromXBase {
  MsgFlag: MsgFlag = MsgFlag.Unknown;


  constructor(msgFlag: MsgFlag) {
    this.MsgFlag = msgFlag;
  }
}