import { ReqCommandMsgFlag, ReplyCommandMsgFlag } from "../Enums/10 - MessageFlag";
import { IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";

export interface IMessageContentToController {
  MsgFlagReply: ReplyCommandMsgFlag;
  Payload: IMessageContentToController_Payload;
}