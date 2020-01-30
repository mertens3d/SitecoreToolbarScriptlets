import { MsgFlag } from "../Enums/MessageFlag";

export class MsgFromXBase {
  MsgFlag: MsgFlag;
  greeting: string;
  FlagAsString: string;

  constructor(msgFlag: MsgFlag) {
    this.MsgFlag = msgFlag;
    this.FlagAsString = MsgFlag[this.MsgFlag];
    this.greeting = 'this is the base greeting';
  }
}