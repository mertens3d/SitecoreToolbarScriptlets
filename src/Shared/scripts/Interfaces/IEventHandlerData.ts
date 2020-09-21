import { CommandButtonEvents } from "../Enums/CommandButtonEvents";
import { MsgFlag, CommandType } from "../Enums/1xxx-MessageFlag";

export interface IEventHandlerData {
  Event: CommandButtonEvents;
  MsgFlag: MsgFlag;
  CommandTYpe: CommandType;
}