import { CommandButtonEvents } from "../Enums/CommandButtonEvents";
import { ReqCommandMsgFlag } from "../Enums/10 - MessageFlag";
import { CommandTypeFlag } from "../Enums/CommandType";

export interface IEventHandlerData {
  Event: CommandButtonEvents;
  MsgFlag: ReqCommandMsgFlag;
  CommandType: CommandTypeFlag;
}