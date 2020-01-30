import { MsgFlag } from "../Enums/MessageFlag";

export interface IMsgFromX {
  greeting: string;
  MsgFlag: MsgFlag;
  Data: any;
  FlagAsString: string;
}