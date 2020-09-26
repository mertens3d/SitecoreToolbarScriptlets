import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IMessageContentToController } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "./MsgFromXBase";
import { DefaultContentReplyPayload } from "./Defaults/DefaultScWindowState";
import { IDataContentReplyReceivedEvent_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export class MsgContentToController extends MsgFromXBase implements IMessageContentToController {
  Payload: IDataContentReplyReceivedEvent_Payload = new DefaultContentReplyPayload()

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
  }
}