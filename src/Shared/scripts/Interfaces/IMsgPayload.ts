import { MsgFlag } from "../Enums/MessageFlag";

export interface IMsgFromX {
  MsgFlag: MsgFlag;
  Data: any;
}