import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export interface IMessageContentToController {
  MsgFlag: MsgFlag;
  Payload: IMessageContentToController_Payload;
}