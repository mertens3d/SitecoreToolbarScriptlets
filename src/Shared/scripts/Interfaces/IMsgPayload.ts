import { MsgFlag } from "../Enums/1xxx-MessageFlag";

export interface IMsgFromX {
  MsgFlag: MsgFlag;
  Data: any;
}