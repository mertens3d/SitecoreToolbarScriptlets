import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { DefaultContentReplyPayload } from "./Defaults/DefaultScWindowState";

export class MsgFromContent extends MsgFromXBase implements IMsgFromX {
  Payload: IDataContentReplyReceivedEvent_Payload = new DefaultContentReplyPayload()

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
  }
}