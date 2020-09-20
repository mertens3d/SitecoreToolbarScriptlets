import { CommandButtonEvents } from "../Enums/CommandButtonEvents";
import { MsgFlag } from "../Enums/1xxx-MessageFlag";

export interface IEventHandlerData {
  Event: CommandButtonEvents;
  Handler: Function;
  MsgFlag: MsgFlag;
  ParameterData: any[];
}