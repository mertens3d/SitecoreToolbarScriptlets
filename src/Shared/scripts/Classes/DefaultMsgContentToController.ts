import { ReplyCommandMsgFlag } from "../Enums/ReplyCommandMsgFlag";
import { IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";
import { IMessageContentToController } from "../Interfaces/IMessageContentToController";
import { DefaultMessageContentToController_Payload } from "./Defaults/DefaultMessageContentToController_Payload";

export class DefaultMsgContentToController implements IMessageContentToController {
    Payload: IMessageContentToController_Payload = new DefaultMessageContentToController_Payload();

    MsgFlagReply: ReplyCommandMsgFlag = ReplyCommandMsgFlag.Unknown;

    constructor(replyCommandFlag: ReplyCommandMsgFlag) {
        this.MsgFlagReply = replyCommandFlag;
    }
}
