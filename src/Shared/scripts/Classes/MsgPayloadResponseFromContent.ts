import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Content/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IMessageContentToController } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "./MsgFromXBase";
import { DefaultContentReplyPayload } from "./Defaults/DefaultScWindowState";

export class MsgContentToController extends MsgFromXBase implements IMessageContentToController {
  Payload: IDataContentReplyReceivedEvent_Payload = new DefaultContentReplyPayload()

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
  }
}