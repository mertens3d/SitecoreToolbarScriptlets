import { CommandType } from "../../Enums/CommandType";
import { IStateOfPopUp } from "../../Interfaces/IStateOfPopUp";
import { MsgFlag } from "../../Enums/10 - MessageFlag";

export interface IUiCommandFlagRaisedEvent_Payload {
  MsgFlag: MsgFlag,
  StateOfPopUp: IStateOfPopUp,
  CommandType: CommandType;
}