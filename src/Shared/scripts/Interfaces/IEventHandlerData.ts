import { CommandButtonEvents } from "../Enums/CommandButtonEvents";
import { MsgFlag } from "../Enums/10 - MessageFlag";
import { CommandType } from "../Enums/CommandType";

export interface IEventHandlerData {
  Event: CommandButtonEvents;
  MsgFlag: MsgFlag;
  CommandType: CommandType;
}