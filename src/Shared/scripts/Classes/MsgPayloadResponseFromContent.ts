import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IMessageContentToController } from "../Interfaces/IMsgPayload";
import { DefaultMessageContentToController_Payload } from "./Defaults/DefaultScWindowState";
import { MsgFromXBase } from "./MsgFromXBase";

export class DefaultMsgContentToController extends MsgFromXBase implements IMessageContentToController {
  Payload: IMessageContentToController_Payload = new DefaultMessageContentToController_Payload()

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
  }
}