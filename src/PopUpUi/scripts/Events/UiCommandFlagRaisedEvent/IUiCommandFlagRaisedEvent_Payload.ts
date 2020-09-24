import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { CommandType } from "../../../../Shared/scripts/Enums/CommandType";
import { IStateOfPopUp } from "../../../../Shared/scripts/Interfaces/IStateOfPopUp";

export interface IUiCommandFlagRaisedEvent_Payload {
  MsgFlag: MsgFlag,
  StateOfPopUp: IStateOfPopUp,
  CommandType: CommandType;
}