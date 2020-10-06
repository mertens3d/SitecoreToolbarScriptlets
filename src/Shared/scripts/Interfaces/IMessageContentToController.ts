﻿import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";

export interface IMessageContentToController {
    MsgFlag: MsgFlag;
    Payload: IMessageContentToController_Payload;
}
