import { CommandTypeFlag } from "../../Enums/CommandType";
import { IStateOfPopUp } from "../../Interfaces/IStateOfPopUp";
import { ReqCommandMsgFlag } from "../../Enums/10 - MessageFlag";

export interface IUiCommandFlagRaisedEvent_Payload {
  MsgFlag: ReqCommandMsgFlag,
  StateOfPopUp: IStateOfPopUp,
  CommandType: CommandTypeFlag;
}