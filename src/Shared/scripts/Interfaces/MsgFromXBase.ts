import { MsgFlag } from "../Enums/MessageFlag";

export class MsgFromXBase {
  MsgFlag: MsgFlag;
  greeting: string;


  constructor(msgFlag: MsgFlag) {
    this.MsgFlag = msgFlag;
    this.greeting = 'this is the base greeting';
  }
}